"use client";

import CustomDropdown from "@/components/Dropdown";
import { useState } from "react";
import MovieCard from "../MovieCard";
import { AnimatePresence } from "framer-motion";

type Props = {
  popularMovies: Movie[];
  myMovies: Movie[];
  className?: string;
};

export const enum CATEGORY {
  POPULAR = "POPULARES",
  MY_MOVIES = "MIS PELICULAS",
}

const MovieList = ({ popularMovies, myMovies, className }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY.POPULAR);
  const movies =
    selectedCategory === CATEGORY.POPULAR ? popularMovies : myMovies;
  return (
    <aside
      className={`lg:animate-fade-left lg:animate-once lg:animate-delay-1000 lg:animate-ease-linear lg:animate-normal lg:animate-fill-both flex-col z-0 items-center justify-start h-full self-center w-56 min-w-max py-6 gap-4 overflow-y-auto overflow-x-hidden lg:max-h-[46rem] ${className}`}
    >
      <CustomDropdown
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <AnimatePresence>
        {movies.length === 0 ? (
          <p className="text-white text-center">No hay peliculas</p>
        ) : (
          <>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} selectedCategory={selectedCategory} />
            ))}
          </>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default MovieList;
