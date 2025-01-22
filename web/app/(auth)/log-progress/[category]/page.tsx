"use client";
import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { IoArrowBackCircleOutline, IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";

export default function LogProgressPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = React.use(params); // za dohvatiti koja kategorija se radi
  const flatpickrRef = useRef<any>(null);

  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    // ovdje treba dovrsiti dio kada se popuni sta napraviti
  };

  const openDatePicker = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex flex-row gap-3 justify-center items-center pb-8">
        <Link href={`/progress/${category}`} className="group">
          <IoArrowBackCircleOutline className="self-center w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-16 lg:h-16 group-hover:hidden" />
          <IoArrowBackCircle className="self-center w-8 h-8 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-16 lg:h-16 hidden group-hover:block" />
        </Link>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textColor leading-none">
          Log Progress for <span>{category}</span>
        </h1>
      </div>

      {category === "weight" ? (
        <input
          type="number"
          className="h-16 rounded-full px-4 w-80 sm:w-96 mb-4 bg-white text-xl text-center"
          placeholder="Enter value in kg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <input
          type="number"
          className="h-16 rounded-full px-4 w-80 sm:w-96 mb-4 bg-white text-xl text-center"
          placeholder="Enter value in cm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      <div className="flex flex-col text-lg">
        <Flatpickr
          ref={flatpickrRef} // Attach ref to the Flatpickr instance
          value={date}
          onChange={(selectedDates: React.SetStateAction<Date>[]) =>
            setDate(selectedDates[0])
          }
          options={{ dateFormat: "d.m.Y" }}
          className="bg-white border border-gray-300 px-[3.5rem] sm:px-[5.5rem] py-3 rounded-full text-center read-only"
        />
      </div>

      <div className="mt-4">
        <button
          className="bg-resedaGreen px-10 sm:px-14 py-3 rounded-full text-white text-lg font-bold"
          onClick={handleSubmit}
        >
          Submit Progress
        </button>
      </div>
    </div>
  );
}
