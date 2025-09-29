import { render } from '@testing-library/react-native';
import React from 'react';
import { CardProgress } from '.';


describe('CardProgress', () => {
  it('deve renderizar os textos corretamente', () => {
    const { getByText } = render(<CardProgress  />);

    expect(getByText('Tarefa Diária')).toBeTruthy();
    expect(getByText('2/3 Tarefa Concluída')).toBeTruthy();
    expect(getByText('Você está quase terminando, vá em frente')).toBeTruthy();
    expect(getByText('66%')).toBeTruthy();
  });
});
