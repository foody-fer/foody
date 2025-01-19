import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { z } from "zod";
import { useRouter } from "expo-router";
import { apiCall, queryClient } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@/components/ui/CustomText";

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-ZČĆŠĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect name format"),
  surname: z
    .string()
    .min(2, "Surname must be at least 2 characters")
    .regex(/^[A-ZŠČĆĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect surname format"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect username format"),
  num: z
    .string()
    .regex(
      /^\+\d{1,4} \d{6,}$/,
      "Phone number must follow the format +(country_code) phone_number"
    ),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female"]),
});

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    num: "",
    email: "",
    password: "",
    gender: "male",
  });

  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = signUpSchema.parse(formData);
      setErrors({});
      const res = await apiCall("/registrations", {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...data,
            first_name: data.name,
            last_name: data.surname,
            phone: data.num,
          },
        }),
      });

      await AsyncStorage.setItem("token", res.token);
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      Alert.alert("Success", "Account created successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        return setErrors(formattedErrors);
      }

      Alert.alert("Error", "Error creating account");
    }
  };

  return (
    <ScrollView className="flex-grow items-center justify-center bg-[#CFE1B9] p-4">
      <View className="mt-2 mb-4">
        <Image
          source={require("../images/logo.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          alt="Logo"
        />
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-lg w-11/12 max-w-md">
        <Text className="text-xl font-bold text-center text-[#373737] mb-4">
          Create an account
        </Text>

        {/* Gender Selection */}
        <View className="flex-row border border-[#575A4B] rounded-full overflow-hidden mb-4">
          {["male", "female"].map((gender) => {
            const isSelected = formData.gender === gender;
            return (
              <TouchableOpacity
                key={gender}
                className={`flex-1 items-center py-2 ${
                  isSelected ? "bg-[#575A4B]" : ""
                }`}
                onPress={() => handleChange("gender", gender)}
              >
                <Text
                  className={`text-sm ${
                    isSelected ? "text-white" : "text-[#575A4B]"
                  }`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Form Inputs */}
        {[
          { name: "name", placeholder: "Name" },
          { name: "surname", placeholder: "Surname" },
          { name: "username", placeholder: "Username" },
          { name: "num", placeholder: "Phone (e.g., +123 4567890)" },
          { name: "email", placeholder: "Email" },
          { name: "password", placeholder: "Password", secureTextEntry: true },
        ].map(({ name, placeholder, secureTextEntry }) => (
          <View key={name} className="mb-3">
            <TextInput
              className="border border-[#AEB5A1] rounded-full px-4 py-2 bg-[#F8FBEF] text-sm"
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              value={formData[name]}
              onChangeText={(text) => handleChange(name, text)}
            />
            {errors[name] && (
              <Text className="text-sm text-red-600 mt-1">{errors[name]}</Text>
            )}
          </View>
        ))}

        {/* Terms and Policy */}
        <Text className="text-sm text-[#373737] mb-4">
          By signing up, you agree to our{" "}
          <Text className="text-[#718355] underline">Terms</Text> and{" "}
          <Text className="text-[#718355] underline">Privacy Policy</Text>.
        </Text>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-[#575A4B] py-3 rounded-full items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-base">Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Redirect to Sign-In */}
      <TouchableOpacity onPress={() => router.push("/sign-in")}>
        <Text className="text-sm text-[#373737] mt-4 text-center">
          Already have an account?{" "}
          <Text className="text-[#718355] underline">Sign in</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpPage;
