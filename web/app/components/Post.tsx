import { useState, useEffect } from "react";
import Comments from "./Comments";
import Slider from "./Slider";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsSave, BsSaveFill } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import ReadMore from "./ReadMore";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { apiCall } from "~/api";
import { useGetUser } from "~/queries/getUser";

export default function Post({ info, preview, posts }: any) {
  const [comm, setComm] = useState(false);
  const [saves, setSaves] = useState(false);

  const userQuery = useGetUser();

  const handleLikes = async () => {
    if (!preview) {
      if (info.liked_by_current_user) {
        const response = await apiCall(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${info.id}/likes`,
          {
            method: "DELETE",
          }
        );
        console.log(response);
      } else {
        const response = await apiCall(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${info.id}/likes`,
          {
            method: "POST",
          }
        );
        console.log(response);
      }
      posts.refetch();
    }
  };

  const handleEdit = () => {

  };

  const handleDelete = async () => {
    const response = await apiCall(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${info.id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);

    posts.refetch();
  };

  return (
    <div className="h-auto w-[93%] bg-gray-100 flex flex-col gap-3 mb-4 p-2 rounded-lg">
      {/* USER */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          {info.user.avatar !== null ? (
            <img
              src={info.user.avatar}
              alt={info.user.username + " profile picture"}
              className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-2 object-cover"
            />
          ) : (
            <FaUserCircle
              height={24}
              width={24}
              className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-2 text-gray-700"
            />
          )}
          <span className="text-textColor mt-2">{info?.user.username}</span>
        </div>

        {preview ? (
          <IoIosMore
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            height={16}
            width={16}
            className="h-6 w-6 mt-1 p-1 rounded-xl transition duration-300"
          />
        ) : (
          <MenuRoot positioning={{ placement: "bottom-start" }}>
            <MenuTrigger asChild>
              <Button className="outline-none" size="sm">
                <IoIosMore
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  height={16}
                  width={16}
                  className="h-6 w-6 mt-1 p-1 rounded-xl hover:bg-gray-300 transition duration-300"
                />
              </Button>
            </MenuTrigger>
            {userQuery.data.username === info.user.username && (
              <MenuContent className="cursor-pointer absolute right-[3%] sm:right-[14%] md:right-[20%] lg:right-[32%] z-50 mt-[2rem]">
                <MenuItem
                  value="new-txt"
                  onClick={handleDelete}
                  className="cursor-pointer"
                >
                  Delete
                </MenuItem>
                <MenuItem
                  value="new-txt"
                  onClick={handleEdit}
                  className="cursor-pointer"
                >
                  Edit post
                </MenuItem>
              </MenuContent>
            )}
          </MenuRoot>
        )}
      </div>
      {/* CONTENT */}
      <div className="flex flex-col gap-2">
        {info?.images.length > 0 && (
          <Slider
            pictures={info?.images}
            title={info?.title}
            preview={preview}
          />
        )}
        <ReadMore message={info?.content} />
      </div>
      {/* INTERACTION */}
      <div className="flex flex-row justify-between text-xs">
        <div className="flex flex-row gap-2">
          <div
            className={
              "flex flex-row bg-white rounded-full p-1 transition duration-300"
            }
          >
            {!info.liked_by_current_user ? (
              <BiLike
                className="cursor-pointer text-resedaGreen mt-[0.1rem] ml-1"
                size={17}
                onClick={handleLikes}
              />
            ) : (
              <BiSolidLike
                className="cursor-pointer text-resedaGreen mt-[0.1rem] ml-1"
                size={17}
                onClick={handleLikes}
              />
            )}
            <span
              className="ml-1 cursor-pointer mt-[0.1rem] hidden md:block"
              onClick={handleLikes}
            >
              Likes
            </span>
            <span className="pr-2 mt-[0.1rem] ml-1 cursor-pointer tabular-nums">
              | {info.likes_count}
            </span>
          </div>
          <div className="text-textColor flex flex-row  bg-white rounded-full p-1">
            <TfiCommentAlt
              onClick={() => {
                !preview && setComm(!comm);
              }}
              className="cursor-pointer text-resedaGreen h-5 w-5 mr-1 mt-[0rem] pl-1 ml-1 md:mr-2"
            />
            <span
              className="cursor-pointer hidden md:block"
              onClick={() => {
                !preview && setComm(!comm);
              }}
            >
              Comments
            </span>
            <span className="pr-2 ml-1 cursor-pointer tabular-nums">
              | {info.comments_count}
            </span>
          </div>
        </div>
        <div
          className={
            "text-textColor flex flex-row rounded-full p-1 transition duration-300" +
            (saves ? " bg-green-400 text-white" : " bg-white")
          }
        >
          {!saves ? (
            <BsSave
              onClick={() => {
                !preview && setSaves(!saves);
              }}
              className="cursor-pointer text-resedaGreen h-3 w-4 mr-2 mt-[0.2rem] pl-1 ml-1 md:mr-1"
            />
          ) : (
            <BsSaveFill
              onClick={() => {
                !preview && setSaves(!saves);
              }}
              className="cursor-pointer h-3 w-4 mr-2 mt-[0.2rem] pl-1 ml-1 md:mr-1"
            />
          )}
          <span
            className="pl-1 cursor-pointer hidden md:block"
            onClick={() => {
              !preview && setSaves(!saves);
            }}
          >
            Saves
          </span>
          <span className="pr-2 ml-1 cursor-pointer tabular-nums">
            | {info.user_saved_posts_count}
          </span>
        </div>
      </div>
      {/* COMMENTS */}
      <Comments bool={comm} postInfo={info} preview={preview} posts={posts}/>
    </div>
  );
}
