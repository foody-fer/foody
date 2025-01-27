import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";

export default function MealData({ meal, remove }: any) {
  return (
    <div className="bg-[#f4ffe6] text-textColor h-[400px] w-[25rem] rounded flex flex-col pt-2 pl-3">
      {/* day's meal */}
      <div className="flex justify-between">
        <div className="text-sm">Meal Planner - Monday breakfast</div>
        <div className="group mr-2">
          <IoCloseCircleOutline
            className="cursor-pointer group-hover:hidden h-6 w-6"
          />
          <IoCloseCircle
            onClick={() => remove(false)}
            className="cursor-pointer h-6 w-6 hidden text-red-500 group-hover:block"
          />
        </div>
      </div>
      {/* food name */}
      <div className="text-xl font-semibold mt-3">Burger - GRMILICA</div>
      {/* macros info + img */}
      <div className="mt-4 flex justify-between h-auto">
        <div className="flex flex-col ">
          <p>
            <b>Calories:</b> 1101 kcal
          </p>
          <p>
            <b>Carbonhydrates:</b> 268g
          </p>
          <p>
            <b>Proteins:</b> 43g
          </p>
          <p>
            <b>Fats:</b> 67g
          </p>
        </div>
        <img
          src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="burger"
          className="w-24 h-[100px] object-cover mr-3 rounded"
        />
      </div>
      {/* description */}
      <div className="mt-4">
        <p className="font-semibold">Description:</p>
        <p className="text-sm text-justify mr-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          quia recusandae doloremque quod minus, repellat tempore, facere
          voluptas repudiandae quis minima maxime perspiciatis. Exercitationem
          neque, animi quia vero adipisci ratione.
        </p>
      </div>
    </div>
  );
}
