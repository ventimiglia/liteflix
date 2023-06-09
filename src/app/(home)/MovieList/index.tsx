"use client";

import CustomDropdown from "@/components/Dropdown";
import { useState } from "react";
import MovieCard from "../MovieCard";

type Props = {
  popularMovies: Movie[];
  myMovies: Movie[];
  className?: string;
};

export const enum CATEGORY {
  POPULAR = "POPULAR",
  MY_MOVIES = "MY MOVIES",
}

const MovieList = ({ popularMovies, myMovies, className }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY.POPULAR);

  return (
        <aside className={`flex-col z-0 items-center justify-start h-full self-center w-56 min-w-max py-6 gap-4 overflow-y-auto overflow-x-hidden xl:max-h-[46rem] ${className}`}>
        <CustomDropdown 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory === CATEGORY.POPULAR ? (
          <MovieCard movies={popularMovies} category={CATEGORY.POPULAR}/>
        ) : (
          <MovieCard movies={myMovies} category={CATEGORY.MY_MOVIES}/>)
        }
      </aside>
  );
};

export default MovieList;
