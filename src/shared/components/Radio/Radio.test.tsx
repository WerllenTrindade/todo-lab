import theme from "@/shared/theme";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Radio } from ".";

describe("Radio", () => {
  it("deve renderizar com estado não selecionado", () => {
    const { getByTestId, queryByTestId } = render(
      <Radio selected={false} onPress={jest.fn()} />
    );

    const button = getByTestId("radio-button");
    expect(button).toHaveStyle({ backgroundColor: theme.colors.darCard });

    // Ícone de check não deve existir
    expect(queryByTestId("radio-check-icon")).toBeNull();
  });

  it("deve renderizar com estado selecionado", () => {
    const { getByTestId } = render(
      <Radio selected={true} onPress={jest.fn()} />
    );

    const button = getByTestId("radio-button");
    expect(button).toHaveStyle({ backgroundColor: theme.colors.radio });
  });

  it("deve chamar onPress quando pressionado", () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(<Radio selected={false} onPress={mockPress} />);

    fireEvent.press(getByTestId("radio-button"));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
