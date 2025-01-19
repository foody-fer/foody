"use client";

import Feed from "../../components/Feed";
import AddPost from "../../components/addPost";
import { useState } from "react";

export default function Homepage() {
  return (
    <div className="text-textColor bg-backgroundGreen">
      <div className="flex flex-col gap-2 ml-[7%] sm:ml-[15%] pt-3 w-full">
        <AddPost/>
        <Feed/>
      </div>
    </div>
  );
}
