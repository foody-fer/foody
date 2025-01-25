import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { GrSend } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { useGetUser } from "~/queries/getUser";
import { useQuery } from "@tanstack/react-query";
import { apiCall } from "~/api";

export default function Comments({ bool, postInfo, preview, posts }: any) {
  const [comments, setComments] = useState<any>([]);
  const [triger, setTriger] = useState(false);
  const [open, setOpen] = useState(0);

  const userQuery = useGetUser();

  const fetchComments = async () => {
    if (postInfo.id === undefined) return;

    const response = await apiCall(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postInfo.id}/comments`,
      { method: "GET" }
    );
    setComments(response);
  };

  useEffect(() => {
    fetchComments();
  }, [triger]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!preview) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(e.target);
      const response = await apiCall(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postInfo.id}/comments`,
        { method: "POST", body: formData }
      );
      console.log(response);
      setTriger(!triger);
      form.reset();
      posts.refetch();
    }
  };

  const handleDeleteCom = async (id: any) => {
    const response = await apiCall(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postInfo.id}/comments/${id}`,
      { method: "DELETE" }
    );
    console.log(response);
    setTriger(!triger);
    posts.refetch();
  };

  const openEditCom = async (id: any) => {
    setOpen(id);
  };

  const handleEditCom = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const response = await apiCall(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postInfo.id}/comments/${open}`,
      { method: "PATCH", body: formData }
    );
    console.log(response);
    setTriger(!triger);
    setOpen(0);
  };

  return (
    <div className="flex flex-col gap-2 text-gray-700">
      {/* WRITING */}
      <div className="flex flex-row gap-2">
        {userQuery.data.avatar !== null ? (
          <img
            src={userQuery.data.avatar}
            alt={userQuery.data.username + " profile picture"}
            className="rounded-full w-[2rem] h-[1.7rem] mt-1 object-cover"
          />
        ) : (
          <FaUserCircle
            width={24}
            height={24}
            className="rounded-full mt-[0.15rem] text-gray-700 w-6 h-6"
          />
        )}
        <form className="w-full flex gap-1" onSubmit={handleSubmit}>
          <input
            type="text"
            name="comment[content]"
            placeholder="Write a comment ..."
            className="w-full text-xs outline-none rounded-lg px-2 py-1 mt-[0.1rem]"
            readOnly={!preview ? undefined : true}
          />
          <button type="submit" className="flex justify-center items-center">
            <GrSend className="bg-gray-200 hover:bg-gray-300 transition duration-300 p-1 rounded w-5 h-5 flex-1" />
          </button>
        </form>
      </div>
      {/* COMMENTS */}
      {bool && comments[0]?.length > 0 && (
        <div className="flex flex-col gap-1 w-full text-xs">
          {comments[0].map((com: any) => (
            <div className="flex flex-row gap-3  w-full" key={com.id}>
              <div>
                {com.user.avatar !== null ? (
                  <img
                    src={com.user.avatar}
                    alt={com.user.username + " profile picture"}
                    className="rounded-full w-[1.5rem] h-[1.2rem] mt-1 object-cover"
                  />
                ) : (
                  <FaUserCircle
                    width={16}
                    height={16}
                    className="rounded-full mt-[0.1rem] text-gray-700 w-5 h-5"
                  />
                )}
              </div>
              <div className="w-[90%]">
                <span className="font-semibold">{com.user.username}</span>
                {open === com.id ? (
                  <form onSubmit={handleEditCom} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={com.content}
                      className="p-1 rounded w-full"
                      name="comment[content]"
                    />
                    <button type="submit">
                      <FaCheck className="hover:text-green-500 transition duration-300" />
                    </button>
                    <button onClick={() => setOpen(0)}>
                      <IoClose className="w-4 h-4 hover:text-red-600 transition duration-300" />
                    </button>
                  </form>
                ) : (
                  <p className="break-all">{com.content}</p>
                )}
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
                  {userQuery.data.id === com.user.id && (
                    <MenuContent className="cursor-pointer absolute right-[3%] sm:right-[14%] md:right-[20%] lg:right-[32%] z-50 mt-[-1rem]">
                      <MenuItem
                        value="new-txt"
                        onClick={() => handleDeleteCom(com.id)}
                        className="text-xs cursor-pointer"
                      >
                        Delete
                      </MenuItem>
                      <MenuItem
                        value="new-txt"
                        onClick={() => openEditCom(com.id)}
                        className="text-xs cursor-pointer"
                      >
                        Edit comment
                      </MenuItem>
                    </MenuContent>
                  )}
                </MenuRoot>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
