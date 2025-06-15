"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import NextImage from "next/image";
import NextLink from "next/link";
import { useQuery } from "@tanstack/react-query";
import { StarIcon, TrendingFilms, usePaginationComponent } from "@/components";

export default function Home() {
  const [totalResults, setTotalResults] = useState(0);

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdmNmM0MWQ2YTUyMGEzM2E4ZjI4YWRiODc1M2EyZSIsIm5iZiI6MTcyMTg0Mjk2OC44OTQsInN1YiI6IjY2YTEzZDE4ZjdhMTE0YTA4M2UwZDkwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MT0N_4i_WUOPFnVXp6y-cdMovLgJln4P8-4763te7TI";

  const { PaginationComponent, totalPages, currentPage } =
    usePaginationComponent({
      resultsPerPage: 20,
      total: totalResults,
    });

  const {
    data: films,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["getMovies", currentPage],
    queryFn: async () => {
      return (
        await axios.get("https://api.themoviedb.org/3/trending/movie/day", {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          params: {
            page: currentPage,
          },
        })
      ).data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: popularFilms,
    isLoading: isLoadingPopularFilms,
    isSuccess: isSuccessRecentlyUpdated,
  } = useQuery({
    queryKey: ["getPopularFilms"],
    queryFn: async () => {
      return (
        await axios.get("https://api.themoviedb.org/3/movie/popular", {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
      ).data;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: topRatedFilms,
    isLoading: isLoadingTopRatedFilms,
    isSuccess: isSuccessTopRatedFilms,
  } = useQuery({
    queryKey: ["getTopRatedFilms"],
    queryFn: async () => {
      return (
        await axios.get("https://api.themoviedb.org/3/movie/top_rated", {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
      ).data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && films) {
      setTotalResults(films.total_results);
    }
  }, [films]);

  return (
    <>
      <div className="w-[1024px] my-10 mx-auto pb-4 p-10">
        {!isLoadingPopularFilms && !!popularFilms.results.length && (
          <div className="mb-10">
            <h3 className="text-2xl font-medium mb-4">Trending</h3>

            <TrendingFilms items={popularFilms.results} />
          </div>
        )}
      </div>

      <div className="w-full bg-amber-400">
        <div className="w-[1024px] my-10 mx-auto px-8 py-16 back">
          {!isLoadingTopRatedFilms && !!topRatedFilms.results.length && (
            <>
              <h3 className="text-4xl text-black font-bold mb-6">
                Top Rated Films
              </h3>
              <div className="flex justify-between gap-4">
                {topRatedFilms.results.slice(0, 4).map((film: any) => (
                  <div key={film.id} className="w-[200px] flex justify-center">
                    <NextLink href={`/films?id=${film.id}`}>
                      <div className="flex flex-col items-center gap-1">
                        <NextImage
                          alt={film.title}
                          src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                          height={250}
                          width={200}
                          className="rounded"
                        />
                        <div className="flex justify-between w-full items-start">
                          <span className="max-w-36 font-bold text-base text-black">
                            {film.title.length > 35
                              ? `${film.title.slice(0, 35)}...`
                              : film.title}
                          </span>
                          <div className="flex items-center border-gray-900 border rounded-md p-1">
                            <StarIcon color="black" />
                            <p className="text-black font-bold text-base">
                              {film.vote_average.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </NextLink>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 m-4 w-[1024px] my-10 mx-auto pb-4 p-10">
        {films?.results.map((film: any, index: number) => (
          <div key={index} className="flex justify-center">
            <NextLink href={`/films?id=${film.id}`}>
              <div className="bg-gray-200 rounded-md p-5 h-full">
                <div className="flex justify-start h-full flex-col ">
                  <div
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.poster_path})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "180px",
                      height: "270px",
                    }}
                  />
                  <span className="font-semibold text-center mt-3 max-w-44">
                    {film.title.length > 35
                      ? `${film.title.slice(0, 35)}...`
                      : film.title}
                  </span>
                </div>
              </div>
            </NextLink>
          </div>
        ))}
      </div>
      <PaginationComponent />
    </>
  );
}
