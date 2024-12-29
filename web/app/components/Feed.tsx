import { useEffect, useState } from "react";
import Post from "./Post";
import list from "../../public/posts.json";

export default function Feed({ newData }: any) {
  return (
    <div className="w-[94%] sm:w-[70%] md:w-[62%] lg:w-[46%] h-auto bg-navbarColor rounded-lg flex flex-col justify-center items-center pt-3">
      {list.map((item, ind) => (
        <Post
          name={item[0]}
          pic={item[1]}
          message={item[2]}
          like={item[3]}
          com={item[4]}
          key={ind}
          preview={false}
        />
      ))}
    </div>
  );
}
