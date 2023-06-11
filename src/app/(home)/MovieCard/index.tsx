import Image from "next/image";
import { CATEGORY } from "../MovieList";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

const MovieCard = ({
  movie,
  selectedCategory,
}: {
  movie: Movie;
  selectedCategory: CATEGORY;
}) => {
  const [isCardHovered, toggleCardHovered] = useState(false);
  const [isPlayHovered, togglePlayHovered] = useState(false);

  const handleCardHover = useCallback(() => {
    toggleCardHovered((prevHovered) => !prevHovered);
  }, []);

  const handlePlayHover = useCallback(() => {
    togglePlayHovered((prevHovered) => !prevHovered);
  }, []);

  return (
    <motion.article
      key={movie.id}
      className="flex flex-col justify-between gap-4 w-80 lg:w-56 h-44 lg:h-36 relative rounded-md p-3 lg:min-h-[9rem] bg-gradient-card transition-all"
      whileHover={{
        backgroundColor: "rgba(0,0,0,0.7)",
        cursor: "pointer",
      }}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardHover}
    >
      <Image
        src={`${
          selectedCategory === CATEGORY.POPULAR
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : movie.backdrop_path
        }`}
        alt={movie?.title || "Movie title"}
        fill
        priority
        className="absolute -z-10 object-cover w-full h-full rounded-md"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 360px"
      />
      <AnimatePresence>
        {isCardHovered ? (
          <motion.div
            className="flex flex-col gap-4 h-full justify-end p-1 overflow-y-hidden"
            initial={{ opacity: 0, y: "25%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "25%" }}
          >
            <div className="flex gap-3 items-center">
              <div
                onMouseEnter={handlePlayHover}
                onMouseLeave={handlePlayHover}
                className="w-8 h-8 flex-shrink-0 border border-white rounded-full bg-transparent hover:bg-primary hover:border-black transition-all relative"
              >
                <Image
                  src={isPlayHovered ? "/play-fill.svg" : "/play.svg"}
                  alt="Reproducir"
                  width={10}
                  height={10}
                  className="w-auto h-auto relative top-1/2 left-1/2 transform -translate-x-[35%] -translate-y-1/2"
                />
              </div>
              <h3 className="flex-grow">{movie.title}</h3>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Image
                  src="star.svg"
                  alt="Estrella"
                  width={14}
                  height={14}
                  className="w-auto h-auto"
                />
                <p>{movie.vote_average}</p>
              </div>
              <p>{movie.release_date}</p>
            </div>
          </motion.div>
        ) : (
          <>
            <div
              className="w-10 h-10 border border-white rounded-full bg-transparent self-center relative top-1/2 -translate-y-1/2"
            >
              <Image
                src="/play.svg"
                alt="Reproducir"
                width={14}
                height={14}
                className="w-auto h-auto relative top-1/2 left-1/2 transform -translate-x-[35%] -translate-y-1/2"
              />
            </div>
            <motion.h3
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              className="text-center w-full overflow-ellipsis whitespace-nowrap overflow-hidden"
            >
              {movie?.title}
            </motion.h3>
          </>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default MovieCard;
