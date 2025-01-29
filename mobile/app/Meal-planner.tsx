import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "./(tabs)";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GOALS = [
  "Weight loss",
  "Weight gain",
  "Have more energy",
  "Gain muscle",
  "Be healthier",
];

const MEAL_TIMES = [
  "breakfast",
  "morning_snack",
  "lunch",
  "afternoon_snack",
  "dinner",
];

export const apiCallWithErrorHandling = async (
  url: string,
  options: RequestInit = {}
) => {
  const token = await AsyncStorage.getItem("token");
  const res = await fetch(`https://foody-backend.zeko.run/api/v1${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    await AsyncStorage.removeItem("token");
  }

  return [await res.json(), res.status] as const;
};

export default function MealPlanner() {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("");

  const plannerConfigQuery = useQuery({
    queryKey: ["planner_config"],
    queryFn: () => apiCallWithErrorHandling("/planner"),
  });

  useEffect(() => {
    if (plannerConfigQuery.data) {
      if (plannerConfigQuery.data?.[1] !== 404) {
        setPreferences(plannerConfigQuery.data?.[0].base_prompt);
        setSelectedGoal(plannerConfigQuery.data?.[0].goals[0]);
        setSelectedMeals(
          Object.entries(plannerConfigQuery.data?.[0].meal_time_config)
            .filter(([_, value]) => value)
            .map(([key]) => key)
        );
      }
    }
  }, [plannerConfigQuery.data]);

  const handleSubmit = async () => {
    await apiCallWithErrorHandling("/planner", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base_prompt: preferences,
        goals: [selectedGoal],
        meal_time_config: Object.fromEntries(
          selectedMeals.map((meal) => [meal, true])
        ),
      }),
    });
    router.push("/meals");
  };

  if (plannerConfigQuery.isLoading) return <Text>Loading...</Text>;
  if (plannerConfigQuery.isError || !plannerConfigQuery.data) {
    return <Text>Error loading planner</Text>;
  }

  return (
    <View className="flex h-full w-full items-center justify-center">
      <ScrollView className="p-4">
        <View style={{ backgroundColor: "#cfe1b9" }} className="p-4 rounded-lg">
          <View
            style={{ backgroundColor: "#cfe1b9" }}
            className="p-4 rounded-lg"
          >
            <Text
              style={{ color: "#373737" }}
              className="text-lg font-bold mb-2"
            >
              My Preferences
            </Text>
            <TextInput
              style={{ borderColor: "#718355" }}
              className="bg-white p-3 rounded-lg border mb-4"
              placeholder="Describe your preferences..."
              multiline
              value={preferences}
              onChangeText={setPreferences}
            />

            <Text
              style={{ color: "#373737" }}
              className="text-lg font-bold mb-2"
            >
              Primary Goal
            </Text>
            {GOALS.map((goal) => (
              <TouchableOpacity
                key={goal}
                style={{
                  backgroundColor: selectedGoal === goal ? "#b7d18a" : "white",
                  borderColor: "#718355",
                }}
                className="p-3 rounded-lg mb-2 border"
                onPress={() => setSelectedGoal(goal)}
              >
                <Text style={{ color: "#373737" }}>{goal}</Text>
              </TouchableOpacity>
            ))}

            <Text
              style={{ color: "#373737" }}
              className="text-lg font-bold mt-4 mb-2"
            >
              Meal Times
            </Text>
            {MEAL_TIMES.map((meal) => (
              <TouchableOpacity
                key={meal}
                style={{
                  backgroundColor: selectedMeals.includes(meal)
                    ? "#b7d18a"
                    : "white",
                  borderColor: "#718355",
                }}
                className="p-3 rounded-lg mb-2 border"
                onPress={() =>
                  setSelectedMeals((prev) =>
                    prev.includes(meal)
                      ? prev.filter((m) => m !== meal)
                      : [...prev, meal]
                  )
                }
              >
                <Text style={{ color: "#373737" }}>
                  {meal.replace("_", " ").toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={{ backgroundColor: "#718355" }}
              className="p-3 rounded-lg mt-6"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-bold">
                Save Preferences
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
