import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function Slider({ pictures, title, preview }: any) {
  return (
    <>
      <div className="bg-gray-200 text-white rounded-md">
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
          {!preview
            ? pictures.map((pic: any) => (
                <SwiperSlide key={pic.id}>
                  <img
                    src={pic.url}
                    alt={title}
                    className="w-full h-[512px] object-contain"
                  />
                </SwiperSlide>
              ))
            : pictures[0].map((pic: any) => (
                <SwiperSlide key={pic}>
                  <img
                    src={pic}
                    alt={title || "post preview"}
                    className="w-full h-[512px] object-contain"
                  />
                </SwiperSlide>
              ))}
          <div className="swiper-button-next" style={{ color: "white" }}></div>
          <div className="swiper-button-prev" style={{ color: "white" }}></div>
        </Swiper>
      </div>
    </>
  );
}
