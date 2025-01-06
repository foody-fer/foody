"use client";

import Feed from "../../components/Feed";
import AddPost from "../../components/AddPost";
import { useState } from "react";

export default function Homepage() {
  const [data, setData] = useState<any>({});

  const handleNewPost = (formData: any) => {
    setData(formData);
  };

  return (
    <div className="text-textColor bg-backgroundGreen">
      <div className="flex flex-col gap-2 ml-[7%] sm:ml-[15%] pt-3 w-full">
        <AddPost name={"Account owner"} onNewPost={handleNewPost} />
        <Feed newData={data} />
      </div>
    </div>
  );
}
