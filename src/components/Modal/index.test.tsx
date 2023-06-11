import { render, fireEvent, waitFor } from "@testing-library/react";
import Modal from "./";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      refresh: jest.fn(),
    };
  },
}));

const children = "Open Modal";

describe("Modal", () => {
  it("renders modal button", () => {
    const { getByText } = render(<Modal>{children}</Modal>);
    const buttonElement = getByText(children);
    expect(buttonElement).toBeInTheDocument();
  });

  it("opens modal on button click", () => {
    const { getByText, container, getByRole } = render(
      <Modal>{children}</Modal>
    );
    const buttonElement = getByText(children);
    fireEvent.click(buttonElement);
    const modalElement = getByRole("modal");
    expect(modalElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("closes modal on close button click", async () => {
    const { getByText, getByRole, getByAltText  } = render(<Modal>{children}</Modal>);
    const buttonElement = getByText(children);
    fireEvent.click(buttonElement);

    const modalElement = getByRole("modal");
    expect(modalElement).toBeInTheDocument();

    const closeModalButton = getByAltText("Cerrar");
    fireEvent.click(closeModalButton);

    await waitFor(() => {
      expect(modalElement).not.toBeInTheDocument();
    });
  });
});
