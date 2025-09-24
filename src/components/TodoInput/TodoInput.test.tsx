import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { TodoInput } from ".";

jest.mock("@expo/vector-icons/Feather", () => {
  return {
    __esModule: true,
    default: "Feather",
  };
});

describe('TodoInput', () => {

it('deve renderizar o valor inicial corretamente', () => {
    render(<TodoInput value="teste" onChangeText={() => {}} onAdd={() => {}} />);

    const input = screen.getByPlaceholderText('Busca por tasks');
    expect(input.props.value).toBe('teste');
  });
  it('deve chamar onChangeText ao digitar', () => {
    const onChangeTextMock = jest.fn();
    render(<TodoInput value="" onChangeText={onChangeTextMock} onAdd={() => {}} />);
    
    const input = screen.getByPlaceholderText('Busca por tasks');
    fireEvent.changeText(input, 'Nova task');

    expect(onChangeTextMock).toHaveBeenCalledWith('Nova task');
  });


  it('deve chamar onAdd ao pressionar o botão', () => {
    const onAddMock = jest.fn();
    render(<TodoInput value="" onChangeText={() => {}} onAdd={onAddMock} />);
    
    const button = screen.getByTestId('add-button'); // <- aqui
    fireEvent.press(button);
    expect(onAddMock).toHaveBeenCalledTimes(1);
  });
});
