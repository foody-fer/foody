import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Comments({ bool, addComm }: any) {
  const [list, setList] = useState([""]);

  let br = list.filter((str) => str.trim() === "").length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tmp = new FormData(e.currentTarget);
    let tmp2 = tmp.get("comment") || "";
    const tmp3 = list.filter((str) => str.trim() !== "");
    if (typeof tmp2 === "string" && tmp2 != "") setList([...tmp3, tmp2]);
    addComm()    
  };
  return (
    <div className="flex flex-col gap-2 text-gray-700">
      {/* WRITING */}
      <div className="flex flex-row gap-2">
        <FaUserCircle
          width={20}
          height={20}
          className="rounded-full mt-[0.15rem] text-gray-700 w-5 h-5"
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
            <div className="flex flex-row gap-3  w-full" key={ind}>
              <div>
                <FaUserCircle
                  width={16}
                  height={16}
                  className="rounded-full mt-[0.1rem] text-gray-700 w-4 h-4"
                />
              </div>
              <div className="w-[90%]">
                <span className="font-semibold">Anonimus</span>
                <p className="break-all">{item}</p>
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
