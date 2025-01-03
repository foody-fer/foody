import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiCall } from "~/api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const inputOnChange = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e: any) => {
    setPassword(e.target.value);
  };

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    apiCall(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      method: "POST",
      body: JSON.stringify({ user: { email: email, password: password } }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(([data, status]) => {
        if (status === 200) {
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
  };

  return (
    <div className="bg-white text-textColor rounded-[1.3rem] h-[31rem] w-[65%] sm:w-[58%] md:w-[47%] lg:w-[38%] border-2 border-white absolute top-[17%] left-[18%] sm:left-[22%] md:left-[28%] lg:left-[32%] p-8">
      <h2 className="font-bold text-[21px] sm:text-[22px] md:text-[24px] lg:text-[26px] mb-4">
        Welcome back 👋
      </h2>
      <p className="sm:text-[16px] md:text-[18px]">We've been missing you!</p>
      <p className="sm:text-[16px] md:text-[18px]">Find out what's new.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={inputOnChange}
          placeholder="E-mail"
          className="form-control mt-3"
          maxLength={50}
          required
        />
        <input
          type="password"
          onChange={passwordOnChange}
          placeholder="Password"
          className="form-control mt-3"
          maxLength={20}
          required
        />

        {serverErrorMessage && (
          <div style={{ color: "red" }} className="lg:text-[15px]">
            {serverErrorMessage}
          </div>
        )}

        <div className="buttons mt-3">
          <button
            type="submit"
            className="bg-resedaGreen text-white rounded-md px-4 py-2 mr-2 hover:bg-green-800 transition duration-300"
          >
            Sign in
          </button>

          <Link href="/">
            <button className="bg-[#737380] text-white rounded-md p-2 px-4 hover:bg-red-600 transition duration-300">
              Close
            </button>
          </Link>
        </div>
      </form>

      <div className="text-[17px] absolute bottom-14">
        <span>Don't have an account?</span>
        <Link href="/sign-up">
          <button className="ml-[0.4rem] text-resedaGreen font-semibold">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
