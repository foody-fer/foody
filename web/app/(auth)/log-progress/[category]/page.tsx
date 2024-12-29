"use client"
import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";

export default function LogProgressPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = React.use(params); // za dohvatiti koja kategorija se radi
  const flatpickrRef = useRef<any>(null);

  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("cm");
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
      <h1 className="text-5xl mb-16 font-bold text-textColor text-center">
        Log Progress for <span className="">{category}</span>
      </h1>

      <input 
        type="number"
        className="h-16 rounded-full px-4 w-96 mb-4 bg-white text-xl text-center"
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="w-96 rounded-full h-16 overflow-hidden mb-4 bg-white flex items-center px-4 text-xl">
        <select
          className="w-full h-full bg-transparent border-none outline-none text-center"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="m">m</option>
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
      </div>

      <div className="flex flex-col text-lg">
        <Flatpickr
          ref={flatpickrRef} // Attach ref to the Flatpickr instance
          value={date}
          onChange={(selectedDates: React.SetStateAction<Date>[]) => setDate(selectedDates[0])}
          options={{ dateFormat: "d.m.Y" }}
          className="bg-white border border-gray-300 px-8 py-3 rounded-full text-center read-only"
        />

        <button 
          className="mt-3 bg-resedaGreen px-8 py-3 rounded-full text-white font-bold"
          onClick={openDatePicker}
        >
          Change date
        </button>
      </div>

      <div className="mt-4">
        <button
          className="bg-resedaGreen px-32 py-3 rounded-full text-white text-lg font-bold"
          onClick={handleSubmit}
        >
          Submit Progress
        </button>
      </div>
    </div>
  );
}