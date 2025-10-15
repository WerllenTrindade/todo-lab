import { PRIORITYS } from "@/shared/constants/priorities";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CardPriority } from "../CardPriority";

function renderWithForm(defaultValues = { priority: "" }) {
  const Wrapper = () => {
    const methods = useForm({ defaultValues });
    return (
      <FormProvider {...methods}>
        <CardPriority
          data={PRIORITYS[2]}
          control={methods.control}
          name={"priority"}
          testID="priority-button"
        />
      </FormProvider>
    );
  };

  return render(<Wrapper />);
}

describe("CardPriority", () => {
  it("deve renderizar o label corretamente", () => {
    const { getByText } = renderWithForm();
    expect(getByText("Alta")).toBeTruthy();
  });

  it("deve aplicar estilo de não selecionado inicialmente", () => {
    const { getByText } = renderWithForm();
    const text = getByText("Alta");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: "white" }),
      ])
    );
  });

  it("deve selecionar quando clicado", () => {
    const { getByText, getByTestId } = renderWithForm();

    const button = getByTestId("priority-button");
    fireEvent.press(button);

    const text = getByText("Alta");

    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: "transparent" }),
      ])
    );
  });
});
