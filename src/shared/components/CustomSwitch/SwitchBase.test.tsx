import { fireEvent, render } from "@testing-library/react-native";
import { SwitchBase } from "./SwitchBase";

describe("SwitchBase", () => {
  it("não deve chamar onChange quando está desabilitado", () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <SwitchBase value={false} onChange={mockOnChange} disabled />
    );

    fireEvent.press(getByTestId("switch-base-button"));

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("deve chamar onChange quando não está desabilitado", () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <SwitchBase value={false} onChange={mockOnChange} />
    );

    fireEvent.press(getByTestId("switch-base-button"));

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});
