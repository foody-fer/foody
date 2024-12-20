"use client"

import Navbar from "../components/Navbar";
import Feed from "../components/Feed";

export default function Homepage() {
    
    return (
      <div className="text-textColor bg-backgroundGreen min-h-screen min-w-screen">
          <Navbar/>
          <div className="h-auto w-full flex justify-center pt-3">
            <Feed/>
          </div>
      </div>
    );
}  