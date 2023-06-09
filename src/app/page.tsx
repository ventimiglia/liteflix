import Menu from "@/components/Menu";
import Modal from "@/components/Modal";
import { getMyMovies, getNowPlaying, getPopularMovies } from "@/services/movie";
import Image from "next/image";
import React from "react";
import MovieList from "./(home)/MovieList";

export const revalidate = 0;

export const Home = async () => {
  const featuredMovie = await getNowPlaying();
  const popularMovies = await getPopularMovies();
  const myMovies = await getMyMovies();

  return (
    <main className="">
      <section className="max-h-full xl:h-screen relative w-full background-gradient xl:bg-none xl:overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/original${featuredMovie?.backdrop_path}`}
          alt={featuredMovie?.title || "Movie title"}
          fill
          priority
          className="absolute -z-10 object-cover w-full h-screen"
          sizes="100vw"
          quality={100}
        />
        <section className="flex flex-col justify-between h-full w-full max-w-7xl mx-auto px-6 pt-6 pb-16 xl:py-8">
          <header className="flex justify-between xl:hidden">
            <Menu>
              <Image
                src="/menu.svg"
                alt="Menu"
                width={26}
                height={26}
                className="scale-x-[-1] w-auto h-auto"
              />
            </Menu>
            <Image
              src="/logo.svg"
              alt="Liteflix"
              width={98}
              height={28}
              className="w-auto h-auto"
            />
            <button>
              <Image src="/avatar.svg" alt="Profile" width={36} height={36} />
            </button>
          </header>
          <header className="hidden xl:flex xl:justify-between xl:h-10">
            <div className="flex items-center gap-16">
              <Image
                src="/logo.svg"
                alt="Liteflix"
                width={113}
                height={34}
                className="w-auto h-auto"
              />
              <Modal>
                <Image
                  src="/plus.svg"
                  alt="Agregar película"
                  width={14}
                  height={14}
                  className="relative font-bold text-lg"
                />
                <span>AGREGAR PELÍCULA</span>
              </Modal>
            </div>
            <div className="flex gap-10">
              <Menu>
                <Image
                  src="/menu.svg"
                  alt="Menu"
                  width={26}
                  height={26}
                  className="w-auto h-auto"
                />
              </Menu>
              <button className="transition-transform hover:scale-110">
                <Image
                  src="/notification.svg"
                  alt="Notifications"
                  width={26}
                  height={26}
                />
              </button>
              <button className="transition-transform hover:scale-110">
                <Image src="/avatar.svg" alt="Profile" width={40} height={40} />
              </button>
            </div>
          </header>
          <section className="flex flex-1 flex-col gap-4 h-full justify-end xl:justify-start xl:flex-row">
            <article className="flex flex-col justify-end pt-20 xl:pt-0 xl:pb-20 w-full overflow-hidden items-center xl:items-start">
              <h2 className="text-xl mb-4">
                ORIGINAL DE <b>LITEFLIX</b>
              </h2>
              <h1 className="w-full text-7xl xl:text-[120px] text-primary tracking-[12px] xl:tracking-[16px] leading-[77px] xl:leading-[100px] mb-8 overflow-ellipsis overflow-hidden text-center xl:text-left">
                {featuredMovie?.title}
              </h1>
              <div className="flex flex-col xl:flex-row gap-6 py-1">
                <button className="flex items-center gap-3 text-lg bg-gray-700 w-[248px] px-2 justify-center h-14 transition hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:bg-gray-900">
                  <Image
                    src="/play.svg"
                    alt="Reproducir"
                    width={14}
                    height={14}
                    className="w-auto h-auto"
                  />
                  REPRODUCIR
                </button>
                <button className="flex items-center gap-3 text-lg border border-white/50 bg-gray-800/50 w-[248px] px-2 justify-center h-14 transition hover:scale-105 hover:bg-gray-800/75 active:bg-gray-900/75 focus:outline-none">
                  <Image
                    src="/plus.svg"
                    alt="Agregar película"
                    width={14}
                    height={14}
                    className="relative font-bold text-lg"
                  />
                  MI LISTA
                </button>
              </div>
            </article>
            <MovieList className="hidden xl:flex" popularMovies={popularMovies} myMovies={myMovies}/>
          </section>
        </section>
      </section>
      <MovieList className="xl:hidden flex flex-col w-full items-center gap-4 bg-secondary pb-12 relative py-0" popularMovies={popularMovies} myMovies={myMovies}/>
    </main>
  );
};

export default Home;
