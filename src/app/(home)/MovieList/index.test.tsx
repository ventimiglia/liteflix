import React from "react";
import { render, screen, fireEvent, getByAltText } from "@testing-library/react";
import MovieList, { CATEGORY } from "./";

describe("MovieList", () => {
  const popularMovies = [
    {
      id: 1,
      title: "Movie 1",
      backdrop_path: "/backdrop1.jpg",
      vote_average: 7.5,
      release_date: 2022,
    },
    {
      id: 2,
      title: "Movie 2",
      backdrop_path: "/backdrop2.jpg",
      vote_average: 8.0,
      release_date: 2022,
    },
  ];

  const myMovies = [
    {
      id: 3,
      title: "Movie 3",
      backdrop_path: "/backdrop3.jpg",
      vote_average: 7.2,
      release_date: 2022,
    },
  ];

  it("renders the movie list with popular movies by default", () => {
    const { container, getByText, queryByText } = render(
      <MovieList popularMovies={popularMovies} myMovies={myMovies} />
    );

    expect(getByText("POPULARES")).toBeInTheDocument();
    expect(queryByText("MIS PELICULAS")).not.toBeInTheDocument();
    expect(getByText("Movie 1")).toBeInTheDocument();
    expect(getByText("Movie 2")).toBeInTheDocument();
    expect(queryByText("Movie 3")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders the movie list with my movies when selected", () => {
    const { container, getByText, queryByText, getByAltText } = render(
      <MovieList popularMovies={popularMovies} myMovies={myMovies} />
    );

    const dropdown = getByAltText("arrow");
    fireEvent.click(dropdown);
    const myMoviesOption = getByText("MIS PELICULAS");
    fireEvent.click(myMoviesOption);

    expect(queryByText("Movie 1")).not.toBeInTheDocument();
    expect(queryByText("Movie 2")).not.toBeInTheDocument();
    expect(getByText("Movie 3")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders a message when there are no movies in the selected category", () => {
    const {getByText, container } = render(
      <MovieList popularMovies={[]} myMovies={[]} />
    );

    expect(getByText("No hay peliculas")).toBeInTheDocument();
    expect(container).toMatchSnapshot();

  });
});
