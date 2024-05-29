import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, getValues, reset, formState } = useForm();
  const { errors } = formState;
  const { signUp, isSignUp } = useSignUp();
  function submit({ fullName, password, email }) {
    signUp({ fullName, password, email }, { onSettled: reset() });
  }
  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSignUp}
          {...register("fullName", { required: "this field required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSignUp}
          {...register("email", {
            required: "this field required",
            pattern: /\S+@\S+\.\S+/,
            message: "please enter the correct email ",
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSignUp}
          {...register("password", {
            required: "this field required",
            minLength: {
              value: 8,
              message: "password should have minimum of 8 characters ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSignUp}
          {...register("passwordConfirm", {
            required: "this field required",
            validate: (value) =>
              value === getValues().password || "password should match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" sizes="large" type="reset">
          Cancel
        </Button>
        <Button variations="primary" sizes="large">
          {isSignUp ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
