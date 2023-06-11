import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export const getNowPlaying = async (): Promise<Movie> => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20"
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    const movie: Movie =
      data.results[Math.floor(Math.random() * data.results.length)];
    return movie;
  } catch (e: any) {
    console.error(e);
    return {} as Movie;
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20&limit=4"
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    const movies: Movie[] = data.results.slice(0, 4).map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      release_date: new Date(movie.release_date).getFullYear(),
      vote_average: movie.vote_average,
    }));
    return movies;
  } catch (e: any) {
    console.error(e);
    return [];
  }
};

export const getMyMovies = async (): Promise<Movie[]> => {
  try {
    const { resources }: { resources: Image[] } = await cloudinary.v2.search
      .expression("folder:movies")
      .execute();

    const movies: Movie[] = resources.map((movie: Image) => ({
      id: movie.asset_id,
      title: movie.public_id.split("/")[1],
      backdrop_path: movie.url,
      release_date: Math.floor(Math.random() * (2023 - 1990) + 1990),
      vote_average: parseFloat((Math.random() * (10 - 5) + 5).toFixed(1)),
    }));

    return movies;
  } catch (e: any) {
    console.error(e);
    return [];
  }
};
