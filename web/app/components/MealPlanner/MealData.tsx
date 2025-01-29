import { format } from "date-fns";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";

export default function MealData({ meal, remove }: any) {
  return (
    <div className="bg-[#f4ffe6] text-textColor w-[25rem] rounded flex flex-col p-6">
      {/* day's meal */}
      <div className="flex justify-between">
        <div className="text-sm">
          Meal Planner - {format(meal.date, "EEEE")} {meal.meal_time}
        </div>
        <div className="group mr-2">
          <IoCloseCircleOutline className="cursor-pointer group-hover:hidden h-6 w-6" />
          <IoCloseCircle
            onClick={() => remove(false)}
            className="cursor-pointer h-6 w-6 hidden text-red-500 group-hover:block"
          />
        </div>
      </div>
      {/* food name */}
      <div className="text-xl font-semibold mt-3">{meal.title}</div>
      {/* macros info + img */}
      <div className="mt-4 flex justify-between h-auto">
        <div className="flex flex-col ">
          <p>
            <b>Calories:</b> {meal.macros.calories} kcal
          </p>
          <p>
            <b>Carbs:</b> {meal.macros.carbs}g
          </p>
          <p>
            <b>Proteins:</b> {meal.macros.protein}g
          </p>
          <p>
            <b>Fats:</b> {meal.macros.fat}g
          </p>
        </div>
        <img
          src={meal.image}
          alt={meal.title}
          className="w-[200px] h-[200px] object-cover mr-3 rounded"
        />
      </div>
      {/* description */}
      <div className="mt-4">
        <p className="font-semibold">Description:</p>
        <p className="text-sm text-justify mr-2">{meal.description}</p>
      </div>
    </div>
  );
}
