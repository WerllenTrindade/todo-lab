import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { TimeInput } from ".";
import { useTimePicker } from "./useTimePicker";

jest.mock("./useTimePicker");

describe("TimeInput", () => {
  const mockParseTime = jest.fn(() => new Date("2025-09-30T12:00:00"));
  const mockedUseTimePicker = useTimePicker as jest.Mock; // agora funciona porque jest.mock já mockou o módulo

  beforeEach(() => {
    mockedUseTimePicker.mockReturnValue({ parseTime: mockParseTime });
  });

  function Wrapper() {
    const { control } = useForm<{ time: string }>({ defaultValues: { time: "" } });
    return <TimeInput control={control} name="time" title="Hora" />;
  }

  it("renderiza título e hora inicial", () => {
    const { getByText } = render(<Wrapper />);
    expect(getByText("Hora")).toBeTruthy();
    expect(getByText("12:00")).toBeTruthy();
  });

  it("abre o picker ao pressionar o input", () => {
    const { getByText, queryByTestId } = render(<Wrapper />);
    fireEvent.press(getByText("12:00"));
    expect(queryByTestId("RNDateTimePicker")).toBeTruthy();
  });
});
