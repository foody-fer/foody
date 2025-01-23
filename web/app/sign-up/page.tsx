"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { apiCall } from "~/api";

const signUpSchema = z.object({
  first_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[A-ZČĆŠĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect first_name format"),
  last_name: z
    .string()
    .min(2, "last_name must be at least 2 characters")
    .regex(/^[A-ZŠČĆĐŽ][a-zA-ZČĆŠĐŽčćšđž]*$/, "Incorrect last_name format"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9._]*$/, "Incorrect username format"),
  phone: z
    .string()
    .regex(
      /^\+\d{1,4} \d{6,}$/,
      "Incorrect phone number format: +X/XX/XXX XXXXXX..."
    ),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    avatar_url?: string;
  }>;
}) {
  const params = use(searchParams);
  const [formData, setFormData] = useState({
    first_name: params.first_name || "",
    last_name: params.last_name || "",
    username: params.username || params.email?.split("@")[0] || "",
    num: "",
    email: params.email || "",
    password: "",
    gender: "",
    avatar_url: params.avatar_url || "",
    phone: "",
  });

  // varijabla koja mijenja stanje je objekt
  const [errors, setErrors] = useState<any>({});
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //provjera formata inputa na submit
  const handleSubmit = async (e: any) => {
    /*ova funkcija sprecava refresh stranice nakon submit-anja form-a / klika na link / itd. */
    e.preventDefault();

    try {
      signUpSchema.parse(formData);
      setErrors({});

      apiCall(`/registrations`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...formData,
            gender: formData.gender.toLowerCase(),
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(([data, status]) => {
          if (status === 201) {
            console.log(data);

            localStorage.setItem("token", data.token);
            router.push("/homepage");
          } else {
            console.log(data);
            setServerErrorMessage(data.error);
          }
        })
        .catch((error) => {
          setServerErrorMessage(error.message);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc: any, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="create-acc-container bg-backgroundGreen min-h-screen min-w-screen pb-4">
      <div className="logopic w-[12rem]">
        <img src="/images/logo.png" className="pt-[1.5rem] pl-[1.5rem]" />
      </div>
      <div className="create-card bg-gray-100 rounded-[1rem] p-[1.4rem] pb-5 mt-[2rem] sm:mt-[1.5rem] sm:w-[40%] w-[60%] h-[auto] text-textColor relative top-[10%] left-[23%] sm:left-[31%]">
        <h3 className="h3 ml-2">Create an account</h3>
        <p className=" ml-2 mt-[1rem]">Sign up today and</p>
        <p className=" ml-2 mt-[-0.2rem]">see the change tomorrow !</p>

        <form onSubmit={handleSubmit}>
          <div className=" form-container mt-4 flex flex-col justify-center items-center">
            <div className="flex flex-row w-75">
              <label className="has-[:checked]:bg-[#6b6b6b] has-[:checked]:text-gray-100  bg-[#ffff] border-1 border-gray-300 rounded-md w-50 h-9 flex justify-center items-center">
                <input
                  type="radio"
                  className="opacity-0 absolute"
                  onChange={handleChange}
                  name="gender"
                  value="Male"
                  required
                />{" "}
                Male
              </label>

              <label className="has-[:checked]:bg-[#6b6b6b] has-[:checked]:text-gray-100 bg-[#ffff] border-1 border-gray-300 rounded-md  w-50 h-9 flex justify-center items-center">
                <input
                  type="radio"
                  className="opacity-0 absolute"
                  onChange={handleChange}
                  name="gender"
                  value="Female"
                  required
                />{" "}
                Female
              </label>
            </div>

            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Firstname"
              className="form-control mt-2 mb-[0.1rem] w-75"
              maxLength={20}
              required
            />
            {errors.first_name && (
              <div className="text-red-700 text-xs md:text-sm">
                {errors.first_name}
              </div>
            )}

            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Lastname"
              className="form-control mt-2 mb-[0.1rem] w-75"
              maxLength={20}
              required
            />
            {errors.last_name && (
              <div className="text-red-700 text-xs md:text-sm">
                {errors.last_name}
              </div>
            )}

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="form-control mt-2 mb-[0.1rem] w-75"
              maxLength={20}
              required
            />
            {errors.username && (
              <div className="text-red-700 text-xs md:text-sm">
                {errors.username}
              </div>
            )}

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contact (mobile/telephone phone)"
              className="form-control mt-2 mb-[0.1rem] w-75"
              maxLength={19}
              required
            />
            {errors.num && (
              <div className="text-red-700 text-xs md:text-sm">
                {errors.num}
              </div>
            )}

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="form-control mt-2 mb-[0.1rem] w-75"
              maxLength={50}
              required
            />
            {errors.email && (
              <div className="text-red-700 text-xs md:text-sm">
                {errors.email}
              </div>
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control mt-2 mb-[0.1rem] w-75"
              maxLength={20}
              required
            />
            {errors.password && (
              <div className="text-red-700 text-xs md:text-sm">
                {errors.password}
              </div>
            )}

            <div className="w-75">
              <input type="checkbox" className="mt-3" required />
              <p className="text-xs ml-[1rem] mt-[-20px]">
                I have read and agree to Foody's
                <a href="" className="no-underline text-blue-600">
                  {" "}
                  Terms of Service{" "}
                </a>
                and{" "}
                <a href="" className="no-underline text-blue-500">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          <div className="buttons ml-2 mt-[3rem] flex justify-center items-center">
            <button
              type="submit"
              className="btn1 rounded-[0.5rem] mr-3 py-[0.4rem] px-[0.6rem] bg-resedaGreen text-gray-100 hover:bg-green-800 transition duration-300 md:py-2 md:px-[1.8rem]"
            >
              Continue
            </button>
            <Link href={"/"} className="no-underline">
              <button className="close-btn mr-2 py-[0.4rem] px-[0.8rem] bg-gray-500 text-gray-100 rounded-[0.5rem] hover:bg-red-600 transition duration-300 md:py-2 md:px-[1.8rem]">
                Close
              </button>
            </Link>
          </div>

          {serverErrorMessage && (
            <div style={{ color: "red" }} className="lg:text-[15px] mt-3">
              {serverErrorMessage}
            </div>
          )}
        </form>
      </div>
      <Link href={"/sign-in"} className="no-underline">
        <div className="group flex flex-row gap-1 cursor-pointer absolute top-[4%] right-[2.5%] bg-gray-100 text-textColor p-[0.8rem] md:p-[1rem] text-xs md:text-sm rounded-[0.7rem] hover:bg-gray-300 transition duration-300 hover:text-white">
          <span className="message">Already have an account? </span>
          <span className="signUp text-blue-500 pr-5 group-hover:pr-0">
            {" "}
            Sign in
          </span>
          <span className="arrow text-white hidden group-hover:block"> ➜</span>
        </div>
      </Link>
    </div>
  );
}

export default SignUpPage;
