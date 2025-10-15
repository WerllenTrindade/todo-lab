import { Task } from "@/infra/database/model";
import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { CardTask } from "../CardTask";

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

const mockTask: Task = {
  id: 1,
  title: "Estudar React Native",
  description: "Aprofundar nos hooks e contextos",
  date: "2025-09-30",
  startTime: "10:00",
  endTime: "11:00",
  priority: "alta",
  alert: true,
  completed: false,
};

describe("CardTask", () => {
  it("deve renderizar o título e a data", () => {
    const { getByText } = render(
      <CardTask data={mockTask} index={0} updateCompleteTask={jest.fn()} />
    );

    expect(getByText("Estudar React Native")).toBeTruthy();
    expect(getByText(/2025/)).toBeTruthy();
  });

  it("deve navegar para /task_form com o id da tarefa ao pressionar o card", () => {
    const { getByTestId } = render(
      <CardTask data={mockTask} index={0} updateCompleteTask={jest.fn()} />
    );

    fireEvent.press(getByTestId("card-task-container"));

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: "/task_form",
      params: { id: mockTask.id },
    });
  });

it("deve chamar updateCompleteTask ao pressionar o Radio", () => {
  const mockUpdateCompleteTask = jest.fn();
  const { getByTestId } = render(
    <CardTask data={mockTask} index={0} updateCompleteTask={mockUpdateCompleteTask} />
  );

  const radio = getByTestId("radio-button");
  fireEvent.press(radio);

  expect(mockUpdateCompleteTask).toHaveBeenCalledWith(mockTask.id);
});

});
