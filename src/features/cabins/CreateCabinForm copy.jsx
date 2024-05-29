import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/cabinApi";
import toast from "react-hot-toast";
import StyledForm from "../../ui/StyledForm";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  console.log(errors);

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (data) => addCabin(data),
    onSuccess: () => {
      toast.success("cabin added sucessfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  function onsubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  return (
    <Form onSubmit={handleSubmit(onsubmit)}>
      <StyledForm error={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required " })}
        />
      </StyledForm>

      <StyledForm error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required for maximum capacity ",
          })}
        />
      </StyledForm>

      <StyledForm error={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required for pricing",
            min: 2,
          })}
        />
      </StyledForm>

      <StyledForm error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required for discount",
            validate: (value) =>
              value <= getValues().regularPrice || "Discount is invalid ",
          })}
        />
      </StyledForm>

      <StyledForm
        error={errors?.description?.message}
        label="Description for website"
      >
        <Input
          type="text"
          id="description"
          disabled={isCreating}
          {...register("description", {
            required: "Give the descrption about the cabin ",
          })}
        />
      </StyledForm>

      <StyledForm label="Cabin photo">
        <FileInput
          type="file"
          id="image"
          disabled={isCreating}
          accept="image/*"
          {...register("image")}
        />
      </StyledForm>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" sizes="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} variations="primary" sizes="medium">
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
