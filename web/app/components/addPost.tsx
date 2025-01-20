import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import Post from "../../app/components/Post";
import { apiCall } from "~/api";
import { useGetUser } from "~/queries/getUser";

export default function AddPost({ posts }: any) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [postInfo, setPostInfo] = useState<any>({
    user: {
      username: "",
    },
    likes_count: 0,
    comments_count: 0,
    liked_by_current_user: false,
    content: "",
    images: [],
  });
  const [data, setData] = useState<any>();

  const userQuery = useGetUser();
  const maxFiles = 5;

  const imgUpload = (e: any) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > maxFiles) {
      alert(`You can select maximum of ${maxFiles} images.`);
      e.target.value = null; // Resetiraj input
    } else {
      let arr = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        let file = e.target.files[i];
        arr.push(URL.createObjectURL(file));
      }
      setImages([...images, arr]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const content = formData.get("post[content]");    

    setPostInfo({
      user: {
        username: userQuery.data.username,
        avatar: userQuery.data.avatar
      },
      likes_count: 0,
      comments_count: 0,
      user_saved_posts_count: 0,
      liked_by_current_user: false,
      content: content,
      images: images,
    });
    setData(formData);

    setConfirm(!confirm);
    setOpen(!open);
  };

  const handleConfirm = async (e: any) => {
    // send data from data to backend and publish post
    const response = await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      body: data,
    });
    console.log(response);

    setConfirm(!confirm);
    posts.refetch();
  };

  return (
    <div className="h-auto w-[94%] sm:w-[70%] md:w-[62%] lg:w-[46%] bg-navbarColor rounded-lg flex gap-2 justify-start items-center py-2">
      {/* addPost definiton */}
      <FaUserCircle
        height={37}
        width={40}
        className="rounded-full ml-2 w-10 h-[2.3rem] text-gray-700"
      />
      <div className="flex flex-1 justify-start items-end py-[0.6rem]">
        <textarea
          placeholder="Share what's new..."
          className="flex-1 p-1 mr-1 rounded-md bg-gray-100 outline-none h-[3.7rem] cursor-pointer"
          onClick={() => setOpen(!open)}
          readOnly
        />
        <MdAddPhotoAlternate
          className="h-5 w-5 align-bottom mr-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      {/* interactive addPost modal */}
      <form
        className={
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-30 " +
          (open ? "flex justify-center items-center" : "hidden")
        }
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-around items-center gap-2 bg-resedaGreen h-[320px] w-[80%] sm:w-[60%] md:w-[48%] lg:w-[35%] rounded-lg">
          <div className="flex flex-row justify-around items-center gap-20 mt-2 w-full text-white">
            <div className="opacity-0">e</div>
            <span className="font-semibold">Create new post</span>
            <div className="group">
              <IoCloseCircleOutline className="cursor-pointer group-hover:hidden h-6 w-6" />
              <IoCloseCircle
                onClick={() => setOpen(!open)}
                className="cursor-pointer h-6 w-6 hidden text-red-700 group-hover:block"
              />
            </div>
          </div>
          <div className="w-full border-s-white bg-white h-[0.01rem] mt-[-0.7rem]" />
          <div className="flex flex-row justify-between items-start text-white w-full ml-3 mt-[-0.7rem]">
            <div className="flex gap-2">
              <FaUserCircle
                height={32}
                width={32}
                className="rounded-full w-[2rem] h-[2rem] text-gray-300"
              />
              <span className="text-gray-300 mt-1">
                {userQuery.data.username}
              </span>
            </div>
            {/*<div className="flex gap-1 text-gray-700 w-[11.5rem]">
              <label className="has-[:checked]:bg-[#6b6b6b] has-[:checked]:text-gray-100  bg-[#ffff] border-1 border-gray-300 rounded-md w-[5rem] h-9 flex justify-center items-center cursor-pointer">
                <input
                  type="radio"
                  className="opacity-0 absolute cursor-pointer"
                  name="title"
                  value="Post"
                  required
                />
                Post
              </label>

              <label className="has-[:checked]:bg-[#6b6b6b] has-[:checked]:text-gray-100 bg-[#ffff] border-1 border-gray-300 rounded-md  w-[5rem] h-9 flex justify-center items-center cursor-pointer">
                <input
                  type="radio"
                  className="opacity-0 absolute cursor-pointer"
                  name="title"
                  value="Recipes"
                  required
                />
                Recipes
              </label>
            </div>*/}
          </div>
          <input
            name="post[title]"
            className="hidden"
            placeholder="New post"
            defaultValue={"New post"}
          />
          <textarea
            name="post[content]"
            placeholder="Share what's new..."
            className="bg-resedaGreen p-2 mt-[-1rem] rounded-m outline-none h-[6rem] w-full text-white break-all placeholder-white"
            required
          />
          <label
            htmlFor="imageUpload"
            className="mt-[-1rem] cursor-pointer bg-navbarColor hover:bg-[#c3dfa1] transition duration-300 border-s-slate-100 w-[95%] rounded-lg py-[0.35rem] flex justify-center items-center gap-2"
          >
            <span>Add image</span>
            {images.length != 0 ? (
              <img
                src={images[0][0]}
                className="h-3 w-3 border-1 border-yellow-500 rounded-sm"
              />
            ) : (
              <MdAddPhotoAlternate />
            )}
          </label>
          <input
            type="file"
            id="imageUpload"
            name="post[images][]"
            accept="image/*"
            className="hidden"
            onChange={imgUpload}
            multiple
          />
          <button
            type="submit"
            className="bg-gray-200 w-[95%] rounded-lg py-[0.35rem] mt-[-1rem] font-semibold hover:bg-gray-400 hover:text-white transition duration-300"
          >
            Post
          </button>
        </div>
      </form>
      {/* interactive confirm modal */}
      <div
        className={
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 " +
          (confirm
            ? "flex justify-center items-start overflow-y-auto scrollbar-hide"
            : "hidden")
        }
      >
        <div className=" bg-resedaGreen rounded-lg py-3 m-4 flex flex-col justify-center items-center h-auto overflow-y-auto w-[24rem]">
          <div className="flex flex-row justify-around items-center gap-20 w-full text-white">
            <div className="opacity-0">e</div>
            <span className="font-semibold">Post preview</span>
            <div className="group">
              <IoCloseCircleOutline className="cursor-pointer group-hover:hidden h-6 w-6" />
              <IoCloseCircle
                onClick={() => {
                  setConfirm(!confirm);
                  setOpen(!open);
                  setImages("");
                }}
                className="cursor-pointer h-6 w-6 hidden text-red-700 group-hover:block"
              />
            </div>
          </div>
          <div className="w-full border-s-white bg-white h-[0.01rem] mt-[0.5rem] mb-4" />
          <div className="flex justify-center items-center w-full px-2">
            <Post info={postInfo} preview={true} />
          </div>
          <div className="flex gap-10">
            <button
              onClick={handleConfirm}
              className="group flex bg-gray-100 rounded-full px-2 py-1 hover:text-white hover:bg-green-400 transition duration-300"
            >
              <IoIosCheckmarkCircleOutline className="cursor-pointer mr-1 group-hover:hidden h-6 w-6" />
              <IoIosCheckmarkCircle className="cursor-pointer h-6 w-6 hidden mr-1 text-white group-hover:block" />
              <span className="cursor-pointer">Confirm</span>
            </button>
            <button
              onClick={() => {
                setConfirm(!confirm);
                setOpen(!open);
                setImages("");
              }}
              className="group flex bg-gray-100 rounded-full px-2 py-1 hover:text-white hover:bg-red-500 transition duration-300"
            >
              <IoCloseCircleOutline className="cursor-pointer mr-1 group-hover:hidden h-6 w-6" />
              <IoCloseCircle className="cursor-pointer h-6 w-6 mr-1 hidden text-white group-hover:block" />
              <span className="cursor-pointer">Discard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
