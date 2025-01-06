import { useEffect, useState } from "react";
import Post from "./Post";
import list from "../../public/posts.json";

export default function Feed({ newData }: any) {
  const pic = (item1: any) => {
    let result = "";     

    if (item1.length > 1 && item1.length < 6) {
      for (let i = 0; i < item1.length; i++) {
        result += item1[i] + "$$$$";        
      }
    } else {
      result += item1 + "$$$$"
    }
    return result;
  };

  return (
    <div className="w-[94%] sm:w-[70%] md:w-[62%] lg:w-[46%] h-auto rounded-lg flex flex-col justify-center items-center pt-3 mb-3">
      {list.map((item, ind) => (
        <Post
          name={item[0]}
          pic={pic(item[1])}
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
