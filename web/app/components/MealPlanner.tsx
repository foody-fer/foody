const meals = {};

import { useState } from "react";
import {
  IoIosArrowDropleft,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowDropright,
} from "react-icons/io";
import MealCard from "./MealCard";

const getCurrentDay = (date: any) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
};

export default function MealPlanner() {
  const [option, setOption] = useState("Generate");
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    // slanje podataka na backend
  };

  const addOneDay = (date: any) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const RemoveOneDay = (date: any) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* SELECTS */}
      <div className="flex gap-2 group justify-center">
        <button
          className={
            "rounded-full w-[10rem] py-[6px] text-sm text-textColor font-semibold " +
            (option === "Generate"
              ? "bg-textColor border-none text-white"
              : "bg-navbarGreen border-1 border-textColor transition duration-300 hover:scale-105")
          }
          onClick={() => {
            setOption("Generate");
          }}
        >
          Generate weekly plan
        </button>
        <button
          className={
            "rounded-full w-[10rem] py-[6px] text-sm text-textColor font-semibold " +
            (option === "View"
              ? "bg-textColor border-none text-white"
              : "bg-navbarGreen border-1 border-textColor transition duration-300 hover:scale-105")
          }
          onClick={() => {
            setOption("View");
          }}
        >
          View weekly plan
        </button>
      </div>
      {/* TABS */}
      <div className="bg-[#f4ffe6] text-textColor px-4 py-3 rounded">
        {/* GENERATE FORM */}
        {option === "Generate" && (
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="text" className="mb-1 font-semibold">
                My preferences:{" "}
              </label>{" "}
              <br />
              <textarea
                name="my_preferences"
                id="text"
                className="rounded p-1 bg-white border-1 border-textColor text-sm w-full"
                placeholder="Describe what you like..."
                required
              />{" "}
              <br />
              <div className="flex gap-2 md:gap-6 mt-3">
                <div>
                  <label className="mb-1 font-semibold">My goal: </label>
                  <div className="flex flex-col gap-1 text-gray-700 text-sm ">
                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Weight loss
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Be more active
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      ...
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor  rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      ...
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Gain muscle
                    </label>
                  </div>
                </div>
                <div>
                  <label className="mb-1 font-semibold">Meals per day: </label>
                  <div className="flex flex-col gap-1">
                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="option"
                        value="Post"
                      />
                      Breakfast
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="option"
                        value="Post"
                      />
                      AM Snack
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="option"
                        value="Post"
                      />
                      Lunch
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="option"
                        value="Post"
                      />
                      PM Snack
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="option"
                        value="Post"
                      />
                      Dinner
                    </label>
                  </div>
                </div>
                <div className="flex justify-end items-end w-full">
                  <button
                    type="submit"
                    className="rounded-full font-semibold px-3 py-2 text-sm bg-textColor text-gray-100 hover:scale-110 transition duration-300"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* VIEW MEALS */}
        {option === "View" && (
          <div>
            {/* SPECIFIC DAY */}
            <div className="flex items-center justify-between text-textColor">
              <div className="flex items-center gap-3">
                <p className="text-xl w-[7rem] font-semibold">
                  {getCurrentDay(date)}
                </p>
                <p className="text-base w-[6rem] font-semibold">
                  {date.getDate()}. {date.getMonth() + 1}. {date.getFullYear()}.
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="group">
                  <IoIosArrowDropleft className="h-6 w-6 flex group-hover:hidden" />
                  <IoIosArrowDropleftCircle
                    className="h-6 w-6 hidden group-hover:block"
                    onClick={() => RemoveOneDay(date)}
                  />
                </div>
                <div className="group">
                  <IoIosArrowDropright className="h-6 w-6 flex group-hover:hidden" />
                  <IoIosArrowDroprightCircle
                    className="h-6 w-6 hidden group-hover:block"
                    onClick={() => addOneDay(date)}
                  />
                </div>
              </div>
            </div>
            {/* SEPARATOR */}
            <div className="border-1 border-textColor mt-2 w-full"></div>
            {/* MEALS IN DAY */}
            <div>
              <MealCard meal={meals} />
              <MealCard meal={meals} />
              <MealCard meal={meals} />
              <MealCard meal={meals} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
