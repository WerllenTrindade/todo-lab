import { render } from "@testing-library/react-native";
import React from "react";
import { ProgressBar } from ".";

describe("ProgressBar", () => {
  it("deve renderizar corretamente com valores padrão", () => {
    const { getByTestId } = render(
      <ProgressBar progress={0.5} testID="progress-bar" />
    );

    const container = getByTestId("progress-bar");
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ height: 8, backgroundColor: "#BA83DE41" }),
      ])
    );
  });

  it("deve aplicar a largura correta do preenchimento com base no progresso", () => {
    const { getByTestId } = render(
      <ProgressBar progress={0.75} testID="progress-bar" />
    );

    const fill = getByTestId("progress-bar-fill");
    expect(fill.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: "75%", backgroundColor: "#BA83DE" }),
      ])
    );
  });

  it("deve permitir sobrescrever cores e altura", () => {
    const { getByTestId } = render(
      <ProgressBar
        progress={0.3}
        height={12}
        backgroundColor="gray"
        fillColor="green"
        testID="progress-bar"
      />
    );

    const container = getByTestId("progress-bar");
    const fill = getByTestId("progress-bar-fill");

    expect(container.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ height: 12, backgroundColor: "gray" })])
    );
    expect(fill.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: "30%", backgroundColor: "green" })])
    );
  });
});
