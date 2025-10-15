import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Checkbox, ICON_CHECKBOX } from ".";

describe("Checkbox", () => {
  it("deve renderizar o label corretamente", () => {
    const { getByText } = render(
      <Checkbox label="Minha tarefa" check={false} />
    );

    expect(getByText("Minha tarefa")).toBeTruthy();
  });

  it("deve renderizar o ícone de check quando check=true e type=SINGLE", () => {
    const { getByTestId } = render(
      <Checkbox label="Check test" check={true} type={ICON_CHECKBOX.SINGLE} />
    );

    expect(getByTestId("icon-check")).toBeTruthy();
  });

  it("deve renderizar o ícone de minus quando check=true e type=ALL", () => {
    const { getByTestId } = render(
      <Checkbox label="Minus test" check={true} type={ICON_CHECKBOX.ALL} />
    );

    expect(getByTestId("icon-minus")).toBeTruthy();
  });

  it("deve chamar onPress ao clicar", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Checkbox label="Clickable" check={false} onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId("checkbox-button"));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
