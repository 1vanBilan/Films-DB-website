import React from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import Slider from "react-slick";

export const TrendingFilms = ({ items }: { items: any[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <div>
      <Slider {...settings}>
        {items.map((film) => (
          <div key={film.id}>
            <NextLink href={`/films?id=${film.id}`}>
              <div className="flex items-center flex-col gap-2 text-center">
                <NextImage
                  alt={film.title}
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  height={180}
                  width={120}
                  className="rounded"
                />
                <div>
                  <h4 className="font-semibold">{film.title}</h4>
                </div>
              </div>
            </NextLink>
          </div>
        ))}
      </Slider>
    </div>
  );
};
