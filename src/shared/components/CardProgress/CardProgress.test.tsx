import * as ContextHome from "@/presentation/home/context/ContextHome";
import { render } from "@testing-library/react-native";
import React from "react";
import { CardProgress } from ".";

jest.spyOn(ContextHome, "useContextHome").mockReturnValue({
  todayTasksCount: 3,
  completedTasksCount: 2,
  progress: 2 / 3,
  todayTasks: [],
  tomorrowTasks: [],
  updateCompleteTask: jest.fn(),
});

describe("CardProgress", () => {
  it("deve renderizar os textos corretamente", () => {
    const { getByText } = render(<CardProgress />);

    expect(getByText("Tarefa Diária")).toBeTruthy();
    expect(getByText("2/3 Tarefas Concluídas")).toBeTruthy();
    expect(
      getByText("Você está quase terminando, vá em frente")
    ).toBeTruthy();
    expect(getByText("67%")).toBeTruthy();
  });
});
