import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  addWeeks,
  format,
  isMonday,
  isSunday,
  startOfWeek,
  subDays,
  subWeeks,
} from "date-fns";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { apiCallWithErrorHandling } from "../Meal-planner";
import MealData from "../MealData";

const MEAL_TIME_CONFIG = {
  breakfast: "Breakfast 9-11AM",
  morning_snack: "Morning Snack 11AM-1PM",
  lunch: "Lunch 1-3PM",
  afternoon_snack: "Afternoon Snack 3-5PM",
  dinner: "Dinner 5-7PM",
};

const useWeekNavigation = (initialDate: Date) => {
  const [weekStart, setWeekStart] = useState(
    startOfWeek(initialDate, { weekStartsOn: 1 })
  );

  return {
    weekStart,
    prevWeek: () => setWeekStart((current) => subWeeks(current, 1)),
    nextWeek: () => setWeekStart((current) => addWeeks(current, 1)),
  };
};

export default function MealsScreen() {
  const { weekStart, prevWeek, nextWeek } = useWeekNavigation(new Date());
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [refetching, setRefetching] = useState(false);

  const weekPlanQuery = useQuery({
    queryKey: ["week_plan", weekStart],
    queryFn: () =>
      apiCallWithErrorHandling(
        `/planner/week_plans/random?week_monday=${format(
          startOfWeek(weekStart, { weekStartsOn: 1 }),
          "yyyy-MM-dd"
        )}`
      ),
    refetchInterval: refetching ? 1000 : false,
  });

  const generateWeekPlan = async () => {
    await apiCallWithErrorHandling(`/planner/week_plans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week_plan: { monday: format(weekStart, "yyyy-MM-dd") },
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
  }, [weekPlanQuery.data]);

  const renderWeekStatus = () => {
    if (weekPlanQuery.isLoading) return <ActivityIndicator size="large" />;

    const [weekPlan, status] = weekPlanQuery.data || [];

    if (status === 404) {
      return (
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg mt-4"
          onPress={generateWeekPlan}
        >
          <Text className="text-white text-center font-bold">
            Generate This Week's Plan
          </Text>
        </TouchableOpacity>
      );
    }

    if (!weekPlan) return <Text>Error loading week plan</Text>;

    switch (weekPlan.status) {
      case "generated":
        return (
          <MealList
            weekId={weekPlan.id}
            weekStart={weekStart}
            onMealSelect={setSelectedMeal}
          />
        );
      case "pending":
        return (
          <Text className="text-center mt-4">
            Meal plan pending generation...
          </Text>
        );
      case "in_progress":
        return (
          <View className="mt-4">
            <Text className="text-center">
              Generating... {Math.round(weekPlan.progress * 100)}%
            </Text>
            <View className="h-2 bg-gray-200 rounded-full mt-2">
              <View
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${weekPlan.progress * 100}%` }}
              />
            </View>
          </View>
        );
      case "failed":
        return (
          <Text className="text-center mt-4 text-red-500">
            Generation failed
          </Text>
        );
      default:
        return <Text className="text-center mt-4">Unknown status</Text>;
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
      {/* Week Header */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={prevWeek}>
          <Ionicons name="chevron-back" size={24} color="#4a5568" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-gray-700">
          {format(weekStart, "MMM dd")} -{" "}
          {format(addDays(weekStart, 6), "MMM dd, yyyy")}
        </Text>

        <TouchableOpacity onPress={nextWeek}>
          <Ionicons name="chevron-forward" size={24} color="#4a5568" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {renderWeekStatus()}

      {/* Meal Detail Modal */}
      <Modal visible={!!selectedMeal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          {selectedMeal && (
            <MealData
              meal={selectedMeal}
              remove={() => setSelectedMeal(null)}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

function MealList({ weekId, onMealSelect }: any) {
  const { data } = useQuery({
    queryKey: ["week_meals", weekId],
    queryFn: () =>
      apiCallWithErrorHandling(`/planner/week_plans/${weekId}/meals`),
  });

  const mealsByDate = (data?.[0] || []).reduce((acc, meal) => {
    acc[meal.date] = acc[meal.date] || [];
    acc[meal.date].push(meal);
    return acc;
  }, {});

  return (
    <FlatList
      data={Object.entries(mealsByDate)}
      keyExtractor={([date]) => date}
      renderItem={({ item: [date, meals] }) => (
        <View className="mb-6 bg-white rounded-lg shadow-sm">
          <Text className="p-3 text-lg font-bold border-b border-gray-200">
            {format(new Date(date.split(" ")[0]), "EEEE, MMM dd")}
          </Text>

          {(meals as any[]).map((meal) => (
            <TouchableOpacity
              key={meal.id}
              className="flex-row items-center p-3 border-b border-gray-100"
              onPress={() => onMealSelect(meal)}
            >
              <View className="flex-1">
                <Text className="text-sm text-gray-500">
                  {MEAL_TIME_CONFIG[meal.meal_time]}
                </Text>
                <Text className="text-lg font-semibold">{meal.title}</Text>
              </View>
              {meal.image && (
                <Image
                  source={{ uri: meal.image }}
                  className="w-16 h-16 ml-3 rounded-lg"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  cardTime: {
    fontSize: 14,
    color: "#888",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
