import { useState, useEffect } from "react";
import Comments from "./Comments";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsSave, BsSaveFill } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import ReadMore from "./ReadMore";

export default function Post({ name, pic, message, like, com, preview }: any) {
  const [likes, setLikes] = useState(false);
  const [comm, setComm] = useState(true);
  const [saves, setSaves] = useState(false);
  const [likeNum, setLikeNum] = useState(like);
  const [commNum, setCommNum] = useState(com);

  const handleClick1 = () => {
    if (!preview) {
      if (likes) {
        let tmp = like;
        setLikeNum(tmp);
      } else {
        let tmp = like + 1;
        setLikeNum(tmp);
      }
      setLikes(!likes);
    }
  };

  const handleComments = () => {
    let tmp = commNum + 1;
    setCommNum(tmp);
  };

  return (
    <div className="h-auto w-[93%] bg-gray-100 flex flex-col gap-3 mb-4 p-2 rounded-lg">
      {/* USER */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <FaUserCircle
            height={24}
            width={24}
            className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-2 text-gray-700"
          />
          <span className="text-textColor mt-2">{name}</span>
        </div>
        <img src="./images/more.svg" alt="" height={16} width={16} />
      </div>
      {/* CONTENT */}
      <div className="flex flex-col gap-2">
        {pic && <img src={pic} alt="food" className="w-full rounded-md" />}
        <ReadMore message={message} />
      </div>
      {/* INTERACTION */}
      <div className="flex flex-row justify-between text-xs">
        <div className="flex flex-row gap-2">
          <div
            className={
              "flex flex-row  bg-white rounded-full p-1 transition duration-300 " +
              (likes ? "text-resedaGreen font-semibold" : " text-textColor")
            }
          >
            {!likes ? (
              <BiLike
                className="cursor-pointer text-resedaGreen mt-[0.1rem] ml-1"
                size={17}
                onClick={handleClick1}
              />
            ) : (
              <BiSolidLike
                className="cursor-pointer text-resedaGreen mt-[0.1rem] ml-1"
                size={17}
                onClick={handleClick1}
              />
            )}
            <span
              className="mr-1 ml-1 cursor-pointer mt-[0.1rem] hidden md:block"
              onClick={handleClick1}
            >
              Like
            </span>
            <span className="pr-2 mt-[0.1rem] ml-1 cursor-pointer">
              | {likeNum}
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
              className="mr-1 cursor-pointer hidden md:block"
              onClick={() => {
                !preview && setComm(!comm);
              }}
            >
              Comment
            </span>
            <span className="pr-2 ml-1 cursor-pointer">| {commNum}</span>
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
            className="pr-2 pl-1 cursor-pointer hidden md:block"
            onClick={() => {
              !preview && setSaves(!saves);
            }}
          >
            Save
          </span>
        </div>
      </div>
      {/* COMMENTS */}
      <Comments bool={comm} addComm={handleComments} preview={preview} />
    </div>
  );
}
