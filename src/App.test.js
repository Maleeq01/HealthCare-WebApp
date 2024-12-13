import { render } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  // Mock the ResizeObserver
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
  window.ResizeObserver = mockResizeObserver;

  render(<App />);
});
