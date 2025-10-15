import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SwitchBase } from "./SwitchBase";

type CustomSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
};


export function CustomSwitch<T extends FieldValues>({
  control,
  name,
  disabled = false,
}: CustomSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <SwitchBase value={!!value} onChange={onChange} disabled={disabled} />
      )}
    />
  );
}
