import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoCloseCircleOutline, IoCloseCircle } from "react-icons/io5";

export default function AddPost({ name, onNewPost }: any) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formVaules = Object.fromEntries(form.entries());

    const obj = {
      name: name,
      pic: "https://images.pexels.com/photos/238480/pexels-photo-238480.jpeg?auto=compress&cs=tinysrgb&w=800",
      message: formVaules.message,
      like: 0,
      comm: 0,
      description: formVaules.description
    };
    onNewPost(obj);

    setOpen(!open);
  };

  return (
    <div className="h-auto w-[94%] sm:w-[70%] md:w-[62%] lg:w-[46%] bg-navbarColor rounded-lg flex gap-2 justify-start items-center">
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

      <form
        className={
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 " +
          (open ? "flex justify-center items-center" : "hidden")
        }
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-around items-center gap-2 bg-resedaGreen h-[40%] w-[80%] sm:w-[60%] md:w-[48%] lg:w-[35%] rounded-lg">
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
              <span className="text-gray-300 mt-1">{name}</span>
            </div>
            <div className="flex gap-1 text-gray-700 w-[11.5rem]">
              <label className="has-[:checked]:bg-[#6b6b6b] has-[:checked]:text-gray-100  bg-[#ffff] border-1 border-gray-300 rounded-md w-[5rem] h-9 flex justify-center items-center">
                <input
                  type="radio"
                  className="opacity-0 absolute"
                  name="description"
                  value="Post"
                  required
                />
                Post
              </label>

              <label className="has-[:checked]:bg-[#6b6b6b] has-[:checked]:text-gray-100 bg-[#ffff] border-1 border-gray-300 rounded-md  w-[5rem] h-9 flex justify-center items-center">
                <input
                  type="radio"
                  className="opacity-0 absolute"
                  name="description"
                  value="Recipes"
                  required
                />
                Recipes
              </label>
            </div>
          </div>
          <textarea
            name="message"
            placeholder="Share what's new..."
            className="bg-resedaGreen p-2 mt-[-1rem] rounded-m outline-none h-[6rem] w-full text-white break-all placeholder-white"
          />
          <label
            htmlFor="imageUpload"
            className="mt-[-1rem] cursor-pointer bg-navbarColor hover:bg-[#c3dfa1] transition duration-300 border-s-slate-100 w-[95%] rounded-lg py-[0.35rem] flex justify-center items-center gap-2"
          >
            <span>Add image</span>
            <MdAddPhotoAlternate />
          </label>
          <input
            type="file"
            id="imageUpload"
            name="image"
            accept="image/*"
            className="hidden"
          />
          <button
            type="submit"
            className="bg-gray-200 w-[95%] rounded-lg py-[0.35rem] mt-[-1rem] font-semibold hover:bg-gray-400 hover:text-white transition duration-300"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
