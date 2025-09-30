import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { GoogleKeep } from ".";

describe("GoogleKeep", () => {
  it("deve renderizar corretamente", () => {
    const { getByTestId } = render(<GoogleKeep />);
    expect(getByTestId("google-keep-button")).toBeTruthy();
  });

  it("deve renderizar o ícone 'plus'", () => {
    const { getByTestId } = render(<GoogleKeep />);
    expect(getByTestId("google-keep-icon")).toBeTruthy();
  });

  it("deve chamar onPress ao clicar", () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<GoogleKeep onPress={mockOnPress} />);
    
    fireEvent.press(getByTestId("google-keep-button"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
