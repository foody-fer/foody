const api = ""; //backend

function Login({ disabled }: { disabled: boolean }) {
  return (
    <>
      <button
        onClick={() =>
          (window.location.href = `${api}/oauth2/authorization/google`)
        }
        className={`bg-midGreen text-textColor mt-5 rounded-full border-[3px] border-resedaGreen text-base sm:text-lg md:text-xl font-bold px-[0.7rem] sm:px-6 md:px-14 py-2.5
                ${disabled ? "" : "cursor-pointer duration-200 hover:bg-[#a0b87e] hover:shadow-2xl  hover:scale-105"}`}
        disabled={disabled}
        role="button"
      >
        <div className="flex justify-center space-x-3">
          <img src="/images/google-logo.png" alt="" className="w-8" />
          <div>Sign up with Google</div>
        </div>
      </button>

      <button
        onClick={() =>
          (window.location.href = `${api}/oauth2/authorization/github`)
        }
        className={`login-buttons bg-midGreen text-textColor mt-[0.6rem] mb-2 rounded-full border-[3px] border-resedaGreen text-base sm:text-lg md:text-xl font-bold px-[0.7rem] sm:px-6 md:px-14 py-2.5 
                    ${disabled ? "" : "cursor-pointer duration-200 hover:bg-[#a0b87e] hover:shadow-2xl  hover:scale-105"}`}
        disabled={disabled}
        role="button"
      >
        <div className="flex justify-center space-x-3">
          <img src="/images/github-logo.png" alt="" className="w-8" />
          <div>Sign up with GitHub</div>
        </div>
      </button>

      <div className="flex ml-1.5 mt-1">
        <div className="w-[4.5rem] sm:w-[6rem] md:w-[8.5rem] bg-textColor h-[1px] mt-[0.8rem]"></div>

        <div>
          <p className="text-textColor pl-2 pr-2 font-bold">or</p>
        </div>

        <div className="w-[4.5rem] sm:w-[6rem] md:w-[8.5rem] bg-textColor h-[1px] mt-[0.8rem]"></div>
      </div>

      <button
        onClick={() => (window.location.href = "/sign-up")}
        className={`login-buttons bg-ebony text-white mt-3 mb-2 rounded-full box-border text-base sm:text-lg md:text-xl font-semibold px-11 sm:px-16 md:px-24 py-3 
                ${disabled ? "" : "duration-200 hover:bg-[#414339] hover:shadow-2xl  hover:scale-105"}`}
        disabled={disabled}
        role="button"
      >
        Create an account
      </button>

      <div className="mt-3 font-semibold text-resedaGreen">
        Already have an account?
      </div>

      <button
        onClick={() => (window.location.href = "/sign-in")}
        className={`login-buttons bg-ebony text-white mt-2 mb-2 rounded-full box-border text-base sm:text-lg md:text-xl font-semibold px-[5.5rem] sm:px-28 md:px-36 py-3
                ${disabled ? "" : "duration-200 hover:bg-[#414339] hover:shadow-2xl  hover:scale-105"}`}
        disabled={disabled}
        role="button"
      >
        Sign in
      </button>

      <br />
    </>
  );
}

export default Login;
