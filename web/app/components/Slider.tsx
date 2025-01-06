import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useState, useEffect } from "react";

export default function Slider({ pictures }: any) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(pictures.split("$$$$").filter((str:any) => str.trim() !== ""))
  }, [pictures])

  return (
    <>
      <div className="bg-gray-200 text-white">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {images.map((pic: any, ind: number) => (
            <SwiperSlide key={ind}>
              <img
                src={pic}
                alt="pexels photo"
                className="w-full h-[315px] object-cover"
              />
            </SwiperSlide>
          ))}
          <div className="swiper-button-next" style={{color:"white"}}></div>
          <div className="swiper-button-prev" style={{color:"white"}}></div>
        </Swiper>
      </div>
    </>
  );
}
