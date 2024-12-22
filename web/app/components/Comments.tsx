import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Comments({ bool }: any) {
  const [list, setList] = useState([""]);

  let br = list.filter((str) => str.trim() === "").length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tmp = new FormData(e.currentTarget);
    let tmp2 = tmp.get("comment") || "";
    const tmp3 = list.filter((str) => str.trim() !== "");
    if (typeof tmp2 === "string" && tmp2 != "") setList([...tmp3, tmp2]);
  };
  return (
    <div className="flex flex-col gap-2">
      {/* WRITING */}
      <div className="flex flex-row gap-2">
        <FaUserCircle
          width={30}
          height={30}
          className="rounded-full mt-[0.3rem]"
        />
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            name="comment"
            placeholder="Write a comment ..."
            className="w-full text-xs outline-none rounded-lg px-2 py-1 mt-[0.1rem]"
          />
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </div>
      {/* COMMENTS */}
      {bool && br < 1 && (
        <div className="flex flex-col gap-1 w-full text-xs">
          {list.map((item, ind) => (
            <div className="flex flex-row gap-3 w-full" key={ind}>
              <div>
                <img
                  src="./images/user_icon.jpg"
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full w-9 h-9"
                />
              </div>
              <div className="w-[80%]">
                <span className="font-semibold w-[60%]">Anonimus</span>
                <p>{item}</p>
              </div>
              <div>
                <img
                  src="./images/more.svg"
                  alt="options"
                  height={16}
                  width={16}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
