"use client"

import Feed from "../../components/Feed";
import AddPost from "../../components/AddPost";

export default function Homepage() {
    
    return (
      <div className="text-textColor bg-backgroundGreen">
          <div className="flex ml-60 pt-3 w-full">
            <AddPost/>
            <Feed/>
          </div>
      </div>
    );
}  