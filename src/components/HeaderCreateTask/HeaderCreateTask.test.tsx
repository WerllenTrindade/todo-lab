import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { HeaderCreateTask } from ".";

// Mock do router
jest.mock("expo-router", () => ({
  router: { back: jest.fn() },
}));

describe("HeaderCreateTask", () => {
  it("deve renderizar o título corretamente", () => {
    const { getByText } = render(<HeaderCreateTask />);
    expect(getByText("Criar nova tarefa")).toBeTruthy();
  });

  it("deve renderizar o botão do ícone", () => {
    const { getByTestId } = render(<HeaderCreateTask />);
    const button = getByTestId("back-button");
    expect(button).toBeTruthy();
  });

  it("deve chamar router.back() ao pressionar o botão", () => {
    const { getByTestId } = render(<HeaderCreateTask />);
    const button = getByTestId("back-button");

    fireEvent.press(button);

    const { router } = require("expo-router");
    expect(router.back).toHaveBeenCalledTimes(1);
  });
});
