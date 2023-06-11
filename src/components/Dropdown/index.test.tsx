import React from "react";
// import '@testing-library/jest-dom'

import { render, fireEvent } from "@testing-library/react";
import CustomDropdown from "./";
import { CATEGORY } from "@/app/(home)/MovieList";

const defaultProps = {
  selectedCategory: CATEGORY.POPULAR,
  setSelectedCategory: jest.fn(),
};
describe("CustomDropdown", () => {
  describe("Rendering", () => {
    it("renders the dropdown button with selected category", () => {
      const { getByText } = render(<CustomDropdown {...defaultProps} />);
      const dropdownButton = getByText(CATEGORY.POPULAR);
      expect(dropdownButton).toBeInTheDocument();
    });
  });

  describe("Actions", () => {
    it("opens the dropdown menu when the button is clicked", () => {
      const { getByText } = render(<CustomDropdown {...defaultProps} />);
      const dropdownButton = getByText(CATEGORY.POPULAR);

      fireEvent.click(dropdownButton);

      const dropdownMenu = getByText(CATEGORY.MY_MOVIES);
      expect(dropdownMenu).toBeInTheDocument();
    });

    it("selects a category when an option is clicked", () => {
      const setSelectedCategory = jest.fn();
      const { getByText } = render(
        <CustomDropdown
          {...defaultProps}
          setSelectedCategory={setSelectedCategory}
        />
      );

      const dropdownButton = getByText(CATEGORY.POPULAR);
      fireEvent.click(dropdownButton);

      const myMoviesOption = getByText(CATEGORY.MY_MOVIES);
      fireEvent.click(myMoviesOption);

      expect(setSelectedCategory).toHaveBeenCalledWith(CATEGORY.MY_MOVIES);
    });
  });
});
