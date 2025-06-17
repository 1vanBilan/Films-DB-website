import React from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { StarIcon } from "@/components/icons";

interface FilmListProps {
  title: string;
  items: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }[];
  link?: string;
  textColor?: string;
}

export const FilmList = ({
  title,
  items,
  link,
  textColor = "white",
}: FilmListProps): React.ReactElement => {
  return (
    <>
      <h3
        style={{
          color: textColor,
        }}
        className="text-3xl font-semibold mb-6"
      >
        {title}
      </h3>
      <div className="flex justify-between gap-4">
        {items.slice(0, 4).map((film) => (
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
                  <span
                    style={{
                      color: textColor,
                    }}
                    className="max-w-36 font-bold text-base"
                  >
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
    </>
  );
};
