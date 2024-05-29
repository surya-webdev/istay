import { supabase, supabaseUrl } from "./supabase";

export async function getAuth({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function useCurrentAuth() {
  const { data } = await supabase.auth.getSession();

  if (!data) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function userLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function newUser({ email, password, fullName }) {
  //
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  //
  return data;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1)update fullName or Password
  let updateUserData;
  if (fullName) updateUserData = { data: { fullName } };
  if (password) updateUserData = { password };

  const { data, error } = await supabase.auth.updateUser(updateUserData);
  // console.log(data.user.id);
  if (!avatar) return data;

  if (error) {
    throw new Error(error.message);
  }
  // update avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storgaeError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storgaeError) {
    throw new Error(storgaeError.message);
  }

  // update the avator state
  const { data: data2, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    throw new Error(error2.message);
  }

  return data2;
}
