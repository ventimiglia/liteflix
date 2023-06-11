import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Menu from ".";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      pathname: "/",
    };
  },
}));

describe("Menu", () => {
  it("opens the menu when the button is clicked", () => {
    const children = "Open Menu"
    const { container, getByText, getByRole } = render(
      <Menu>{children}</Menu>
    );
    const menuButton = getByText(children);

    fireEvent.click(menuButton);

    const menu = getByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("closes the menu when the close button is clicked", async () => {
    const { getByText, queryByRole, getByAltText } = render(<Menu>Open Menu</Menu>);
    const menuButton = getByText("Open Menu");

    fireEvent.click(menuButton);

    const closeButton = getByAltText("close menu");
    fireEvent.click(closeButton);

    await waitFor(() => {
      const menu = queryByRole("menu");
      expect(menu).not.toBeInTheDocument();
    });
  });
});