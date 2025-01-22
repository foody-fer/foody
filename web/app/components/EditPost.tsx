import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";
import { apiCall } from "~/api";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";

export default function EditPost({ info, posts, close, edit }: any) {
  const [postInfo, setPostInfo] = useState(info)
  const [rmImg, setRmImg] = useState<any>([]);
  const [addImg, setAddImg] = useState<any>([]);

  useEffect(() => {
    console.log("Updated info:", postInfo);
  }, [info]);
  
  useEffect(() => {
    setRmImg([])
    setAddImg([])
  }, [edit]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    //slanje na backend
  };

  const handleImgDelete = (id: any) => {
    setRmImg((prev:any) => [...prev, id]);
    console.log("delete ", id, rmImg);
    console.log(postInfo);
  };

  const handleImgAdd = (e: any) => {
    const selectedFiles = e.target.files;
    const maxFiles = 5 - info.images.length + rmImg.length;
    console.log(maxFiles);
    console.log(postInfo);
    console.log(rmImg);
    
    if (selectedFiles.length > maxFiles) {
      alert(`You can select maximum of ${maxFiles} images.`);
      e.target.value = null; // Resetiraj input
    } else {
      let arr = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        let file = e.target.files[i];
        arr.push(URL.createObjectURL(file));
      }
      setAddImg((prev:any) => [...prev, ...arr]);
      console.log("AAAAAAAAAA");
      console.log(arr); 
    }
  };

  return (
    <div className="bg-gray-200 w-[50%] rounded p-4">
      <div className="flex justify-between mb-2">
        <div></div>
        <p className="font-semibold text-lg">Edit your post</p>
        <div className="group">
          <IoCloseCircleOutline className="cursor-pointer group-hover:hidden h-6 w-6" />
          <IoCloseCircle
            onClick={() => {
              close(false);
            }}
            className="cursor-pointer h-6 w-6 hidden text-red-500 group-hover:block"
          />
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="post[content]">Change posts content:</label>
          <br />
          <input
            type="text"
            placeholder={info.content || ""}
            defaultValue={info.content}
            name="post[content]"
            className="p-2 rounded mt-1 w-full mb-2"
          />

          <label htmlFor="" className="mt-2">
            Add/Remove images:
          </label>
          <div className="flex gap-1 overflow-x-auto bg-gray-300 rounded mt-1">
            {info.images.map(
              (pic: any) =>
                rmImg.filter((id: any) => id === pic.id).length === 0 && (
                  <div
                    className="relative flex justify-center items-start min-w-full mr-2"
                    key={pic.id}
                  >
                    <img
                      src={pic.url}
                      alt={info.title}
                      className="w-full h-[200px] object-cover"
                    />
                    <IoTrashBinOutline
                      onClick={() => handleImgDelete(pic.id)}
                      className="absolute w-5 h-5 top-1 right-1 text-red-500 hover:scale-125 transition duration-300 cursor-pointer"
                    />
                  </div>
                )
            )}
            {addImg?.map((pic: any) => (
              <div
                className="relative flex justify-center items-start min-w-full mr-2"
                key={pic}
              >
                <img
                  src={pic}
                  alt={info.title}
                  className="w-full h-[200px] object-cover"
                />
                <IoTrashBinOutline
                  onClick={() => handleImgDelete(pic)}
                  className="absolute w-5 h-5 top-1 right-1 text-red-500 hover:scale-125 transition duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <label
            htmlFor="imageUpload22"
            className="mt-[0.7rem] w-full cursor-pointer bg-navbarColor hover:bg-[#c3dfa1] transition duration-300 border-s-slate-100 rounded-full py-[0.35rem] flex justify-center items-center gap-2"
          >
            <span className="text-gray-100">Add image</span>
            <MdAddPhotoAlternate className="text-gray-100" />
          </label>
          <input
            type="file"
            id="imageUpload22"
            name="post[add_images][]"
            accept="image/*"
            className="hidden"
            onChange={handleImgAdd}
            multiple
          />

          <div className="flex justify-center gap-2 w-full mt-4">
            <button
              type="submit"
              className="rounded-full w-36 py-2 bg-resedaGreen text-gray-100 hover:scale-110 transition duration-300"
            >
              Save changes
            </button>
            <button
              onClick={() => close(false)}
              className="rounded-full w-36 py-2 bg-gray-400 text-gray-200 hover:bg-red-500 hover:text-gray-100 hover:scale-110 transition duration-300"
            >
              Discard changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
