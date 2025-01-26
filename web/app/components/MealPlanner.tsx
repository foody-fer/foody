import { useState } from "react";
import {
  IoIosArrowDropleft,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowDropright,
} from "react-icons/io";

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
    <div className="w-full flex flex-col gap-3 p-3">
      {/* SELECTS */}
      <div className="flex gap-2 group">
        <button
          className={
            "rounded-full w-[10rem] py-[6px] text-sm text-white font-semibold " +
            (option === "Generate"
              ? "bg-textColor border-none"
              : "bg-navbarGreen border-1 border-white transition duration-300 hover:scale-105")
          }
          onClick={() => {
            setOption("Generate");
          }}
        >
          Generate weekly plan
        </button>
        <button
          className={
            "rounded-full w-[10rem] py-[6px] text-sm text-white font-semibold " +
            (option === "View"
              ? "bg-textColor border-none"
              : "bg-navbarGreen border-1 border-white transition duration-300 hover:scale-105")
          }
          onClick={() => {
            setOption("View");
          }}
        >
          View weekly plan
        </button>
      </div>
      {/* TABS */}
      <div className="bg-resedaGreen px-4 py-3 rounded w-[]">
        {/* GENERATE FORM */}
        {option === "Generate" && (
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="text" className="text-gray-100 mb-1">
                My preferences:{" "}
              </label>{" "}
              <br />
              <textarea
                name="my_preferences"
                id="text"
                className="rounded p-1 bg-gray-200 text-sm w-[75%]"
                placeholder="Describe what you like..."
              />{" "}
              <br />
              <div className="flex gap-24 mt-3">
                <div>
                  <label className="mb-1 text-gray-100">My goal: </label>
                  <div className="flex flex-col gap-1 text-gray-700 text-sm ">
                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Weight loss
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Be more active
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      ...
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      ...
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
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
                  <label className="mb-1 text-gray-100">Meals per day: </label>
                  <div className="flex flex-col gap-1">
                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Breakfast
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      AM Snack
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Lunch
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      PM Snack
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-gray-100 border-1 border-gray-100 text-gray-100 rounded-full w-[10rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="title"
                        value="Post"
                        required
                      />
                      Dinner
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* VIEW MEALS */}
        {option === "View" && (
          <div>
            <div
              className="flex items-center justify-between text-gray-100"
            >
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
          </div>
        )}
      </div>
    </div>
  );
}
