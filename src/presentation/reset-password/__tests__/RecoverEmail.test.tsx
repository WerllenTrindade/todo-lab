import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ResetPassword } from "..";

jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
  },
}));

jest.mock("../useResetPassword", () => ({
  useResetPassword: () => ({
    control: {},
    handleSubmit: (fn: any) => fn,
    bottomSheetRef: { current: null },
    isSubmitting: false,
    isLoading: false,
    onSubmit: jest.fn(),
  }),
}));

describe("ResetPassword Component", () => {
  it("renderiza input de email e botão", () => {
    const { getByText} = render(<ResetPassword />);

    expect(getByText("Enviar código")).toBeTruthy();
  });

  it("permite digitar no input de email", () => {

    const { getByText, getByLabelText, getByPlaceholderText } = render(<ResetPassword />);
    
    const emailInput = getByPlaceholderText ? getByPlaceholderText("E-mail") : getByLabelText("E-mail");
    expect(emailInput).toBeTruthy();

    fireEvent.changeText(emailInput, "teste@teste.com");

  });

  it("chama onSubmit ao pressionar botão", () => {
    const mockOnSubmit = jest.fn();
    jest.mock("../useResetPassword", () => ({
      useResetPassword: () => ({
        control: {},
        handleSubmit: (fn: any) => fn,
        bottomSheetRef: { current: null },
        isSubmitting: false,
        isLoading: false,
        onSubmit: mockOnSubmit,
      }),
    }));

    jest.isolateModules(() => {
      const { getByText } = render(<ResetPassword />);
      const button = getByText("Enviar código");
      fireEvent.press(button);
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("desabilita botão quando carregando ou submetendo", () => {
    jest.mock("../useResetPassword", () => ({
      useResetPassword: () => ({
        control: {},
        handleSubmit: (fn: any) => fn,
        bottomSheetRef: { current: null },
        isSubmitting: false,
        isLoading: true,
        onSubmit: jest.fn(),
      }),
    }));

    jest.isolateModules(() => {
      const { getByText } = render(<ResetPassword />);
      const button = getByText("Enviar código");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });
});
