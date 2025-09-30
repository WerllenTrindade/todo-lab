import { Mask } from "@/utils/masks";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { InputMask } from ".";

jest.mock("@/utils/masks", () => ({
  Mask: {
    format: jest.fn((mask: string, text: string) => {
      if (mask === "cpf") {
        return text.replace(/(\d{3})(?=\d)/g, "$1.");
      }
      return `masked-${text}`;
    }),
  },
}));

describe("InputMask", () => {
  it("deve renderizar o componente", () => {
    const { getByPlaceholderText } = render(
      <InputMask placeholder="Digite algo" />
    );
    expect(getByPlaceholderText("Digite algo")).toBeTruthy();
  });

  it("deve chamar onChangeText normalmente quando mask não é fornecida", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <InputMask placeholder="Digite algo" onChangeText={onChangeTextMock} />
    );

    const input = getByPlaceholderText("Digite algo");
    fireEvent.changeText(input, "1234");

    expect(onChangeTextMock).toHaveBeenCalledWith("1234");
  });

  it("InputMask com CPF e defaultValue", () => {
    it("deve aplicar máscara ao defaultValue quando mask='cpf'", () => {
      const { getByDisplayValue } = render(
        <InputMask
          placeholder="Digite o CPF"
          defaultValue="12345678901"
          mask="cpf"
        />
      );

      // Espera o valor formatado simulado
      expect(getByDisplayValue("123.456.789.01")).toBeTruthy();

      // Verifica se Mask.format foi chamado corretamente
      expect(Mask.format).toHaveBeenCalledWith("cpf", "12345678901");
    });
  });

  it("deve usar defaultValue normalmente quando mask não é fornecida", () => {
    const { getByDisplayValue } = render(
      <InputMask placeholder="Digite algo" defaultValue="5678" />
    );

    expect(getByDisplayValue("5678")).toBeTruthy();
  });
});
