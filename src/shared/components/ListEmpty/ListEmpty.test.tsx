import { render, screen } from "@testing-library/react-native";
import React from "react";
import { ListEmpty } from ".";

describe('ListEmpty', () => {
  it('deve renderizar título e descrição padrão quando emptySearch é false', () => {
    render(<ListEmpty />);
    
    expect(screen.getByText('Nada por aqui...')).toBeTruthy();
    expect(screen.getByText('Comece criando sua primeira tarefa!')).toBeTruthy();
  });

  it('deve renderizar descrição de busca quando emptySearch é true', () => {
    render(<ListEmpty emptySearch={true} />);
    
    expect(screen.getByText('Nada por aqui...')).toBeTruthy();
    
    expect(screen.getByText('Nenhum resultado encontrado para sua busca.')).toBeTruthy();
  });
});
