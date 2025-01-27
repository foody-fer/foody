import { useEffect, useState } from "react";
import MealData from "./MealData";

export default function MealCard({ meal }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="flex justify-between border-1 border-textColor mt-3 rounded-xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="mt-2 ml-2">
          <div className="text-sm">Breakfast 9-11AM</div>
          <div className="text-xl font-semibold ml-2 mb-2 mt-2">
            Burger - GRMILICA
          </div>
        </div>
        <div className="rounded-xl">
          <img
            src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="burger"
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
        onClick={() => setOpen(false)}
      >
        <MealData meal={meal} remove={setOpen}/>
      </div>
    </>
  );
}
