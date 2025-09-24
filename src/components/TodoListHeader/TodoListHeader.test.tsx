import { render, screen } from "@testing-library/react-native";
import { TodoListHeader } from ".";

describe('TodoListHeader', () => {
  it('deve renderizar o itemCount corretamente', () => {
    render(<TodoListHeader itemCount={0} />);

    const itemCountText = screen.getByText('0 Items');
    expect(itemCountText).toBeTruthy();

    const title = screen.getByText('Lista');
    expect(title).toBeTruthy();
  });

  it('deve renderizar corretamente com outro itemCount', () => {
    render(<TodoListHeader itemCount={5} />);
    expect(screen.getByText('5 Items')).toBeTruthy();
  });
});
