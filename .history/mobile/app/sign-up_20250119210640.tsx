import React, { useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";

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
      // Perform API call
      alert("Form submitted successfully!");
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      } else {
        alert("Error submitting form");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-200 p-6">
      <div className="mb-6">
        <img src="/logo.png" alt="Logo" className="h-32 w-32 object-contain" />
      </div>
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-800">
          Create an Account
        </h2>
        <div className="mb-4 flex space-x-2 border border-gray-400 rounded-full">
          {["male", "female"].map((gender) => (
            <button
              key={gender}
              className={`flex-1 py-2 rounded-full ${
                formData.gender === gender
                  ? "bg-gray-600 text-white"
                  : "bg-white text-gray-600"
              }`}
              onClick={() => handleChange("gender", gender)}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </button>
          ))}
        </div>
        {[
          { name: "name", placeholder: "Name" },
          { name: "surname", placeholder: "Surname" },
          { name: "username", placeholder: "Username" },
          { name: "num", placeholder: "Phone (e.g., +123 4567890)" },
          { name: "email", placeholder: "Email" },
          { name: "password", placeholder: "Password", type: "password" },
        ].map(({ name, placeholder, type }) => (
          <div key={name} className="mb-4">
            <input
              type={type || "text"}
              className="w-full rounded-full border border-gray-300 bg-gray-100 p-3 text-sm focus:border-green-500 focus:ring-green-500"
              placeholder={placeholder}
              value={formData[name]}
              onChange={(e) => handleChange(name, e.target.value)}
            />
            {errors[name] && (
              <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
            )}
          </div>
        ))}
        <p className="mb-4 text-center text-sm text-gray-600">
          By signing up, you agree to our{" "}
          <a href="#" className="text-green-500 underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-green-500 underline">
            Privacy Policy
          </a>
          .
        </p>
        <button
          onClick={handleSubmit}
          className="w-full rounded-full bg-gray-600 py-3 text-white hover:bg-gray-700"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            onClick={() => router.push("/sign-in")}
            className="cursor-pointer text-green-500 underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
