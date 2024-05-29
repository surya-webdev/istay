import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import StyledForm from "../../ui/StyledForm";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditingCabin } from "./useEditingCabin";

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

function CreateCabinForm({ cabinToEdit = {}, onClose, onCloseEdit }) {
  const { id: editId, ...cabinValue } = cabinToEdit;

  const hasEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: hasEditSession ? cabinValue : "",
  });

  const { isCreating, mutate } = useCreateCabin();
  const { isEditing, editMutate } = useEditingCabin();

  const hasLoading = isEditing || isCreating;

  function onsubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (hasEditSession)
      editMutate(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseEdit?.();
            onClose?.();
          },
        }
      );
    else
      mutate(
        { ...data, image },
        {
          onSuccess: (data) => {
            reset();
            onCloseEdit?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onsubmit)}
      type={hasEditSession ? "regular" : "modal"}
    >
      <StyledForm error={errors?.name?.message} label="Cabin name">
        <Input
          type="text"
          id="name"
          disabled={hasLoading}
          {...register("name", { required: "This field is required " })}
        />
      </StyledForm>

      <StyledForm error={errors?.maxCapacity?.message} label="Maximum capacity">
        <Input
          type="number"
          id="maxCapacity"
          disabled={hasLoading}
          {...register("maxCapacity", {
            required: "This field is required for maximum capacity ",
          })}
        />
      </StyledForm>

      <StyledForm error={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          disabled={hasLoading}
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
          disabled={hasLoading}
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
          disabled={hasLoading}
          {...register("description", {
            required: "Give the descrption about the cabin ",
          })}
        />
      </StyledForm>

      <StyledForm label="Cabin photo">
        <FileInput
          type="file"
          id="image"
          disabled={hasLoading}
          accept="image/*"
          {...register("image")}
        />
      </StyledForm>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onClose?.()}
          variations="secondary"
          sizes="medium"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={hasLoading} variations="primary" sizes="medium">
          {hasEditSession ? "Edit Cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
