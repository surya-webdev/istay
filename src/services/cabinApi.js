import { supabase, supabaseUrl } from "./supabase";
export default async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabin is loading");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins is not deleting");
  }
  return data;
}

// CREATE AND EDIT CABIN
export async function addCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  console.log(hasImagePath);

  const imageName = hasImagePath
    ? newCabin?.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin?.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  // console.log(imageName);
  // console.log(imagePath);

  let query = supabase.from("cabins");

  // 1) Create a cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2 Edit a cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  // Upload cabin image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin photo is not uploaded , try again :)");
  }

  // Edit and Create Cabin

  if (error) {
    console.error(error);
    throw new Error("cabins is not added");
  }

  return data;
}
