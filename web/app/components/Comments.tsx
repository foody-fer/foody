import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Button,
} from "@chakra-ui/react";

export default function Comments({ bool, addComm, preview }: any) {
  const [list, setList] = useState([""]);

  let br = list.filter((str) => str.trim() === "").length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!preview) {
      let tmp = new FormData(e.currentTarget);
      let tmp2 = tmp.get("comment") || "";
      const tmp3 = list.filter((str) => str.trim() !== "");
      if (typeof tmp2 === "string" && tmp2 != "") setList([...tmp3, tmp2]);
      addComm();
    }
  };

  const handleDeleteCom = () => {
    // delete comment
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
            readOnly={!preview ? undefined : true}
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
                <MenuRoot positioning={{ placement: "bottom-start" }}>
                  <MenuTrigger asChild>
                    <Button className="outline-none" size="sm">
                      <IoIosMore
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        height={16}
                        width={16}
                        className="h-5 w-5 mt-[-15px] p-1 rounded-xl hover:bg-gray-300 transition duration-300"
                      />
                    </Button>
                  </MenuTrigger>
                  <MenuContent className="cursor-pointer absolute right-[3%] sm:right-[14%] md:right-[20%] lg:right-[32%] z-50 mt-[-1rem]">
                    <MenuItem value="new-txt" onClick={handleDeleteCom} className="text-xs">
                      Delete
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
