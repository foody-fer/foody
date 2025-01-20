import React, { useState } from "react";
import { z } from "zod";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

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
      Alert.alert("Success", "Account created successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        Alert.alert("Error", "Error submitting form");
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#CFE1B9]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="w-full p-4 font-quicksand"
      >
        <View className="items-center mb-4">
          <Image
            source={require("../images/logo.png")}
            className="w-36 h-36"
            resizeMode="contain"
          />
        </View>

        <View className="bg-white rounded-2xl p-4 shadow-md w-11/12 max-w-md mx-auto">
          <Text className="font-quicksand text-lg font-bold text-center text-[#373737] mb-2">
            Create an Account
          </Text>
          <Text className="font-quicksand text-sm text-center text-[#575A4B] mb-4">
            Join us and enjoy personalized experiences!
          </Text>

          {/* Gender Toggle Button */}
          <View className="flex-row justify-center items-center mb-4">
            <View className="flex-row border border-[#575A4B] rounded-full bg-[#F8FBEF]">
              <TouchableOpacity
                className={`flex-1 px-4 py-2 rounded-l-full ${
                  formData.gender === "male" ? "bg-[#575A4B]" : ""
                }`}
                onPress={() => handleChange("gender", "male")}
              >
                <Text
                  className={`text-center text-sm font-bold ${
                    formData.gender === "male" ? "text-white" : "text-[#575A4B]"
                  }`}
                >
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 px-4 py-2 rounded-r-full ${
                  formData.gender === "female" ? "bg-[#575A4B]" : ""
                }`}
                onPress={() => handleChange("gender", "female")}
              >
                <Text
                  className={`text-center text-sm font-bold ${
                    formData.gender === "female"
                      ? "text-white"
                      : "text-[#575A4B]"
                  }`}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          {[
            { name: "name", placeholder: "Name" },
            { name: "surname", placeholder: "Surname" },
            { name: "username", placeholder: "Username" },
            { name: "num", placeholder: "Phone (e.g., +123 4567890)" },
            { name: "email", placeholder: "Email" },
            {
              name: "password",
              placeholder: "Password",
              secureTextEntry: true,
            },
          ].map(({ name, placeholder, secureTextEntry }) => (
            <View key={name} className="mb-3">
              <TextInput
                className="font-quicksand border border-[#AEB5A1] rounded-full px-4 py-3 bg-[#F8FBEF] text-sm"
                placeholder={placeholder}
                value={formData[name]}
                onChangeText={(value) => handleChange(name, value)}
                secureTextEntry={secureTextEntry}
              />
              {errors[name] && (
                <Text className="text-xs text-red-500 mt-1">
                  {errors[name]}
                </Text>
              )}
            </View>
          ))}

          <Text className="font-quicksand text-sm text-center text-[#575A4B] mb-4">
            By signing up, you agree to our{" "}
            <Text className="text-[#718355] underline">Terms</Text> and{" "}
            <Text className="text-[#718355] underline">Privacy Policy</Text>.
          </Text>

          <TouchableOpacity
            className="bg-[#575A4B] rounded-full px-4 py-3 items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white text-sm font-bold">Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4 items-center"
            onPress={() => router.push("/sign-in")}
          >
            <Text className="text-sm text-center text-[#373737]">
              Already have an account?{" "}
              <Text className="text-[#718355] underline">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpPage;
