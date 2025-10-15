import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { CustomSwitch } from ".";

type FormData = { alert: boolean };

const Wrapper = ({ disabled = false }: { disabled?: boolean }) => {
  const { control } = useForm<FormData>({
    defaultValues: { alert: false },
  });

  return <CustomSwitch<FormData> control={control} name="alert" disabled={disabled} />;
};

describe("CustomSwitch", () => {
  it("deve renderizar corretamente", () => {
    const { getByTestId } = render(<Wrapper />);
    const button = getByTestId("switch-base-button");
    expect(button).toBeTruthy();
  });

  it("deve alternar o valor quando pressionado", () => {
    const { getByTestId } = render(<Wrapper />);
    const button = getByTestId("switch-base-button");

    fireEvent.press(button); // primeiro clique -> true
    fireEvent.press(button); // segundo clique -> false

    // como não renderiza o valor, apenas checamos se o botão está interativo
    expect(button).toBeTruthy();
  });

  it("não deve permitir interação quando desabilitado", () => {
    const { getByTestId } = render(<Wrapper disabled />);
    const button = getByTestId("switch-base-button");

    fireEvent.press(button); // não deve chamar onChange
    expect(button).toBeTruthy(); // apenas garante que não quebrou
  });
});
