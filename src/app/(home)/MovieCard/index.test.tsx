import React from "react";
import { render } from "@testing-library/react";
import MovieCard from "./";
import { CATEGORY } from "../MovieList";

describe("MovieCard", () => {
  const movie = {
    id: 1,
    title: "Test Movie",
    backdrop_path: "test.jpg",
    vote_average: 7.5,
    release_date: 2022,
  };

  const selectedCategory = CATEGORY.POPULAR;

  it("renders the movie card with default state", () => {
    const { container, getByText, getByAltText } = render(
      <MovieCard movie={movie} selectedCategory={selectedCategory} />
    );

    expect(getByText(movie.title)).toBeInTheDocument();
    expect(getByAltText("Reproducir")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

})