import Form from "../../ui/Form";
import FormRow from "../../ui/StyledForm";
import Input from "../../ui/Input";

import Spinner from "../../ui/Spinner.jsx";
import { useSettings } from "./useSettings.js";
import { useUpadteSetting } from "./useUpdateSetting.js";

function UpdateSettingsForm() {
  const {
    setting: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBook,
      breakFastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { setting, isUpdating } = useUpadteSetting();
  function handleEvent(e, field) {
    const { value } = e.target;

    if (!value) return;

    setting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleEvent(e, "minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleEvent(e, "maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBook}
          onBlur={(e) => handleEvent(e, "maxGuestsPerBook")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakFastPrice}
          onBlur={(e) => handleEvent(e, "breakFastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
