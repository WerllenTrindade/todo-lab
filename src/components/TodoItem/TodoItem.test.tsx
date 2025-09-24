import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TodoItem } from "./TodoItem.tsx";

describe("TodoItem", () => {


  it("chama removeItem quando o botão de lixeira é pressionado", async () => {
    const removeMock = jest.fn();

    const { getByTestId } = render(
      <TodoItem title="teste" removeItem={removeMock} />
    );
    const button = getByTestId("label-button");

    await act(async () => {
      fireEvent.press(button);
    });

    expect(removeMock).toHaveBeenCalledTimes(1);
  });

  it("chama onPress quando o container principal é pressionado", async () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <TodoItem
        title="teste"
        removeItem={() => null}
        onPress={onPressMock}
        testID="todo-container"
      />
    );

    const container = getByTestId("todo-container");

    await act(async () => {
      fireEvent.press(container);
    });

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
  it("aplica props corretas no texto para truncamento", () => {
    const { getByText } = render(
      <TodoItem title="task long" removeItem={() => {}} />
    );
    const text = getByText("task long");

    expect(text.props.numberOfLines).toBe(1);
    expect(text.props.ellipsizeMode).toBe("tail");
  });

});
