import Image from "next/image";
import { CATEGORY } from "../MovieList";

const MovieCard = ({
  movies,
  category,
}: {
  movies: Movie[];
  category: CATEGORY;
}) => (
  <>
    {movies?.length > 0 ? (
      movies.map((movie) => (
        <article
          key={movie.id}
          className="flex flex-col justify-between gap-4 w-80 xl:w-56 h-44 xl:h-36 relative bg-gradient-to-t from-gray-800 to-transparent rounded-sm p-3 xl:min-h-[9rem]"
        >
          <Image
            src={`${
              category === CATEGORY.POPULAR
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : movie.backdrop_path
            }`}
            alt={movie?.title || "Movie title"}
            fill
            priority
            className="absolute -z-10 object-cover w-full h-full rounded-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 360px"
          />
          <div className="w-10 h-10 border border-white rounded-full bg-transparent text-center self-center relative top-1/2 -translate-y-1/2">
            <Image
              src="/play.svg"
              alt="Reproducir"
              width={14}
              height={14}
              className="relative top-1/2 left-1/2 transform -translate-x-[35%] -translate-y-1/2"
            />
          </div>
          <h3 className="text-center w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
            {movie?.title}
          </h3>
        </article>
      ))
    ) : (
      <p>No hay peliculas</p>
    )}
  </>
);

export default MovieCard;
