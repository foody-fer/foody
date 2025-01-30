import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "~/api";
import { WeeklyPlan } from "./plan";

export default function MealPlanner() {
  const [option, setOption] = useState("View");

  const plannerConfigQuery = useQuery({
    queryKey: ["planner_config"],
    queryFn: () => apiCall("/planner"),
  });

  useEffect(() => {
    if (option === "View" && plannerConfigQuery.data?.[1] === 404) {
      setOption("Generate");
    }
  }, [plannerConfigQuery.data]);

  if (plannerConfigQuery.isLoading) return <div>Loading...</div>;
  if (plannerConfigQuery.isError || !plannerConfigQuery.data) {
    return <div>Error</div>;
  }

  const [data, status] = plannerConfigQuery.data;
  const showPlanner = status !== 404;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      base_prompt: formData.get("my_preferences"),
      goals: [formData.get("primary_goal")],
      meal_time_config: Object.fromEntries(
        formData.getAll("meals_per_day").map((meal) => [meal, true])
      ),
    };

    const res = await apiCall("/planner", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    plannerConfigQuery.refetch();
    setOption("View");
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
        {showPlanner && (
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
        )}
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
                defaultValue={data.base_prompt}
              />{" "}
              <br />
              <div className="flex gap-2 md:gap-6 mt-3">
                <div>
                  <label className="mb-1 font-semibold">
                    My primary goal:{" "}
                  </label>
                  <div className="flex flex-col gap-1 text-gray-700 text-sm ">
                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="primary_goal"
                        value="Weight loss"
                        required
                        defaultChecked={data.goals?.includes("Weight loss")}
                      />
                      Weight loss
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="primary_goal"
                        value="Weight gain"
                        required
                        defaultChecked={data.goals?.includes("Weight gain")}
                      />
                      Weight gain
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="primary_goal"
                        value="Have more energy"
                        required
                        defaultChecked={data.goals?.includes(
                          "Have more energy"
                        )}
                      />
                      Have more energy
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor  rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="primary_goal"
                        value="Gain muscle"
                        required
                        defaultChecked={data.goals?.includes("Gain muscle")}
                      />
                      Gain muscle
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="radio"
                        className="opacity-0 absolute cursor-pointer"
                        name="primary_goal"
                        value="Be healthier"
                        required
                        defaultChecked={data.goals?.includes("Be healthier")}
                      />
                      Be healthier
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
                        name="meals_per_day"
                        value="breakfast"
                        defaultChecked={data.meal_time_config?.breakfast}
                      />
                      Breakfast
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="meals_per_day"
                        value="morning_snack"
                        defaultChecked={data.meal_time_config?.morning_snack}
                      />
                      Morning snack
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="meals_per_day"
                        value="lunch"
                        defaultChecked={data.meal_time_config?.lunch}
                      />
                      Lunch
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="meals_per_day"
                        value="afternoon_snack"
                        defaultChecked={data.meal_time_config?.afternoon_snack}
                      />
                      Afternoon snack
                    </label>

                    <label className="has-[:checked]:bg-[#afc2baba] has-[:checked]:text-textColor border-1 border-textColor rounded-full w-[9rem] h-7 flex justify-center items-center cursor-pointer transition duration-300 hover:scale-105">
                      <input
                        type="checkbox"
                        className="opacity-0 absolute cursor-pointer"
                        name="meals_per_day"
                        value="dinner"
                        defaultChecked={data.meal_time_config?.dinner}
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
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* VIEW MEALS */}
        {option === "View" && <WeeklyPlan />}
      </div>
    </div>
  );
}
