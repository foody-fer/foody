import { useState } from "react";
import MealData from "./MealData";

const MEAL_TIME_CONFIG = {
  breakfast: "Breakfast 9-11AM",
  morning_snack: "Morning Snack 11AM-1PM",
  lunch: "Lunch 1-3PM",
  afternoon_snack: "Afternoon Snack 3-5PM",
  dinner: "Dinner 5-7PM",
};

export default function MealCard({ meal }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex justify-between border-1 border-textColor mt-3 rounded-xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="mt-2 ml-2">
          <div className="text-sm">
            {
              // @ts-ignore
              MEAL_TIME_CONFIG[meal.meal_time]
            }
          </div>
          <div className="text-xl font-semibold ml-2 mb-2 mt-2">
            {meal.title}
          </div>
        </div>
        <div className="rounded-xl">
          <img
            src={meal.image}
            alt={meal.title}
            className="w-20 h-20 object-cover rounded-tr-xl rounded-br-xl"
          />
        </div>
      </div>
      {/* MEAL MODAL */}
      <div
        className={
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 " +
          (open ? "flex justify-center items-center" : "hidden")
        }
      >
        <MealData meal={meal} remove={setOpen} />
      </div>
    </>
  );
}
