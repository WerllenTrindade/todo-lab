import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { TimeInput } from ".";
import { useTimePicker } from "./useTimePicker";

// Mock do hook useTimePicker
jest.mock("./useTimePicker", () => ({
  useTimePicker: () => ({
    parseTime: jest.fn(() => new Date("2025-09-30T12:00:00")),
  }),
}));


describe("TimeInput", () => {
  const mockParseTime = jest.fn(() => new Date("2025-09-30T12:00:00"));

  beforeEach(() => {
    (useTimePicker as jest.Mock).mockReturnValue({
      parseTime: mockParseTime,
    });
  });

  function Wrapper() {
    const { control } = useForm<{ time: string }>({ defaultValues: { time: "" } });
    return <TimeInput control={control} name="time" title="Hora" />;
  }

  it("deve renderizar título e hora inicial", () => {
    const { getByText } = render(<Wrapper />);
    expect(getByText("Hora")).toBeTruthy();
    expect(getByText("12:00")).toBeTruthy();
  });

it("deve abrir o picker ao pressionar o input", () => {
  const { getByText, queryByTestId } = render(<Wrapper />);
  const input = getByText("12:00");
  fireEvent.press(input);

  expect(queryByTestId("RNDateTimePicker")).toBeTruthy();
});

});
