"use client";
import React from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import {
  CalendarIcon,
  DollarIcon,
  LoadingIcon,
  StarIcon,
  ChevronIcon,
} from "@/components/icons";

export default function Comics() {
  const searchParams = useSearchParams();
  const filmId = searchParams.get("id");

  const {
    data: similarFilms,
    isLoading: isSimilarLoading,
    isSuccess: isSimilarSuccess,
  } = useQuery({
    queryKey: ["getSimilarFilms", filmId],
    queryFn: async () => {
      return (await axios.get(`/movie/${filmId}/recommendations`)).data.results;
    },
    refetchOnWindowFocus: false,
  });

  const {
    data: film,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["getFilm", filmId],
    queryFn: async () => {
      return (await axios.get(`/movie/${filmId}`, {})).data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl my-10 mx-auto p-5">
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingIcon width={60} height={60} />
          </div>
        )}
        {isSuccess && !!film && (
          <>
            <div className="flex gap-8 p-4 pt-2">
              <div className="min-w-[250px]">
                <NextImage
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt="comic image"
                  width={250}
                  height={250}
                  className="rounded-lg"
                />
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="text-4xl font-semibold mb-10">
                    {film.title}
                  </div>
                  <div className="flex items-center mt-5">
                    <div className="flex gap-2">
                      {film.genres.map((genre: any) => (
                        <div
                          className="text-md text-black font-semibold px-2 py-1 rounded-md bg-white"
                          key={genre.id}
                        >
                          {genre.name}
                        </div>
                      ))}
                    </div>
                    <div className="flex ml-6 gap-5">
                      <div className="flex items-center gap-2">
                        <CalendarIcon />
                        <p className="text-md">
                          {!!film.release_date
                            ? dayjs(film.release_date).format("YYYY")
                            : "No release date available"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarIcon />
                        <p className="text-md">
                          {new Intl.NumberFormat().format(film.budget)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarIcon />
                        <p className="text-md">
                          {film.vote_average.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-md font-light mt-6">{film.overview}</div>
                  <div className="text-md font-light mt-8 grid grid-cols-4 gap-2">
                    {!!film.production_countries?.length && (
                      <>
                        <span className="mr-2 text-right col-span-1">
                          Countries:
                        </span>
                        <span className="col-span-3">
                          {film.production_countries
                            .map((country: any) => country.name)
                            .join(", ")}
                        </span>
                      </>
                    )}
                    {!!film.genres?.length && (
                      <>
                        <span className="mr-2 text-right col-span-1">
                          Genre:
                        </span>
                        <span className="col-span-3">
                          {film.genres
                            .map((genre: any) => genre.name)
                            .join(", ")}
                        </span>
                      </>
                    )}
                    {!!film.release_date && (
                      <>
                        <span className="mr-2 text-right col-span-1">
                          Date Release:
                        </span>
                        <span className="col-span-3">
                          {dayjs(film.release_date).format("DD MMMM YYYY")}
                        </span>
                      </>
                    )}
                    {!!film.production_companies?.length && (
                      <>
                        <span className="mr-2 text-right col-span-1">
                          Production:
                        </span>
                        <span className="col-span-3">
                          {film.production_companies
                            .map((company: any) => company.name)
                            .join(", ")}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {isSimilarSuccess && !!similarFilms.length && (
          <div className="px-4">
            <h3 className="text-2xl font-semibold mt-6 mb-4">
              You may also like
            </h3>
            <div className="grid grid-cols-4 gap-5">
              {similarFilms.map((film: any, index: number) => (
                <div key={index} className="flex justify-center">
                  <NextLink href={`/films?id=${film.id}`}>
                    <div className="h-full">
                      <div className="flex justify-start h-full flex-col">
                        <NextImage
                          src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                          alt={film.title}
                          width={200}
                          height={250}
                          className="mb-3 rounded-md"
                        />

                        <div className="flex justify-between">
                          <span className="max-w-36">
                            {film.title.length > 35
                              ? `${film.title.slice(0, 35)}...`
                              : film.title}
                          </span>
                          <div>
                            <div className="bg-red p-1 rounded-md">
                              {film.vote_average.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NextLink>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
