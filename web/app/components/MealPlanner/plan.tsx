import {
  IoIosArrowDropleft,
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoIosArrowDropright,
} from "react-icons/io";
import MealCard from "./MealCard";
import {
  addHours,
  startOfWeek,
  format,
  subDays,
  addDays,
  isMonday,
  isSunday,
} from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "~/api";

const RenderPlan = ({
  weekId,
  initDate,
}: {
  weekId: number;
  initDate: Date;
}) => {
  const [date, { prev, next }] = useDateLeftRight(initDate, 1);
  const mealsQuery = useQuery({
    queryKey: ["meals", weekId],
    queryFn: () => apiCall(`/planner/week_plans/${weekId}/meals`),
  });

  return (
    <div>
      {/* SPECIFIC DAY */}
      <div className="flex items-center justify-between text-textColor">
        <div className="flex items-center gap-3">
          <p className="text-xl w-[7rem] font-semibold">
            {format(date, "EEE")}
          </p>
          <p className="text-base w-[6rem] font-semibold">
            {format(date, "dd.MM.yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="group">
            <IoIosArrowDropleft className="h-6 w-6 flex group-hover:hidden" />
            <IoIosArrowDropleftCircle
              className={`h-6 w-6 hidden group-hover:block ${
                isMonday(date) ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => (isMonday(date) ? {} : prev())}
            />
          </div>
          <div className="group">
            <IoIosArrowDropright className="h-6 w-6 flex group-hover:hidden" />
            <IoIosArrowDroprightCircle
              className={`h-6 w-6 hidden group-hover:block ${
                isSunday(date) ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => (isSunday(date) ? {} : next())}
            />
          </div>
        </div>
      </div>
      {/* SEPARATOR */}
      <div className="border-1 border-textColor mt-2 w-full"></div>
      {/* MEALS IN DAY */}

      {mealsQuery.isLoading ? (
        <div>Loading...</div>
      ) : mealsQuery.isError || !mealsQuery.data ? (
        <div>Error</div>
      ) : (
        <div>
          {mealsQuery.data[0]
            .filter((meal: any) =>
              meal.date.startsWith(format(date, "yyyy-MM-dd"))
            )
            .map((meal: any) => (
              <MealCard meal={meal} key={meal.id} />
            ))}
        </div>
      )}
    </div>
  );
};

const useDateLeftRight = (initDate: Date, offset: 1 | 7) => {
  const [date, setDate] = useState(
    addHours(startOfWeek(initDate, { weekStartsOn: 1 }), 2)
  );

  return [
    date,
    {
      prev: () => setDate((d) => subDays(d, offset)),
      next: () => setDate((d) => addDays(d, offset)),
    },
  ] as const;
};

export const WeeklyPlan = () => {
  const [week, weekActions] = useDateLeftRight(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    7
  );

  const [refetching, setRefetching] = useState(false);

  const weekPlanQuery = useQuery({
    queryKey: ["week_plan", week],
    queryFn: () =>
      apiCall(
        `/planner/week_plans/random?week_monday=${format(week, "yyyy-MM-dd")}`
      ),
    refetchInterval: refetching ? 1000 : false,
  });

  const generateWeekPlan = () => {
    apiCall(`/planner/week_plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week_plan: {
          monday: format(week, "yyyy-MM-dd"),
        },
      }),
    });

    setRefetching(true);
  };

  useEffect(() => {
    if (
      weekPlanQuery.data?.[0]?.status === "pending" ||
      weekPlanQuery.data?.[0]?.status === "in_progress"
    ) {
      setRefetching(true);
    } else {
      setRefetching(false);
    }
  }, [weekPlanQuery.data?.[0]]);

  const Inner = () => {
    if (weekPlanQuery.isLoading) return <div>Loading...</div>;
    if (weekPlanQuery.isError || !weekPlanQuery.data) return <div>Error</div>;

    const [weekPlan, status] = weekPlanQuery.data;
    if (status === 404) {
      return <button onClick={generateWeekPlan}>Generate this week</button>;
    }

    if (weekPlan.status === "generated") {
      return (
        <RenderPlan weekId={weekPlan.id} initDate={week} key={weekPlan.id} />
      );
    }

    if (weekPlan.status === "failed") {
      return <div>Failed 😢</div>;
    }

    if (weekPlan.status === "pending") {
      return <div>Pending generation...</div>;
    }

    if (weekPlan.status === "in_progress") {
      return (
        <div>
          <div>
            In progress...
            <span>{Math.round(weekPlan.progress * 100)}%</span>
          </div>

          <div
            style={{ width: `${weekPlan.progress * 100}%` }}
            className="h-2 bg-textColor"
          ></div>
        </div>
      );
    }

    return <div>Unknown status</div>;
  };

  return (
    <WeekContainer week={week} weekActions={weekActions}>
      <Inner />
    </WeekContainer>
  );
};

const WeekContainer = ({ children, week, weekActions }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-textColor">
        <div className="flex items-center gap-3">
          <p className="text-xl font-semibold">
            {`${format(week, "wo")} week (${format(week, "dd.MM.yyyy")})`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="group">
            <IoIosArrowDropleft className="h-6 w-6 flex group-hover:hidden" />
            <IoIosArrowDropleftCircle
              className={`h-6 w-6 hidden group-hover:block`}
              onClick={weekActions.prev}
            />
          </div>
          <div className="group">
            <IoIosArrowDropright className="h-6 w-6 flex group-hover:hidden" />
            <IoIosArrowDroprightCircle
              className={`h-6 w-6 hidden group-hover:block`}
              onClick={weekActions.next}
            />
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
