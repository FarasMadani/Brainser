import React from "react";
import Navbar from "./Navbar"
import Hero from "./Hero"

const Landingpage = () => {
  return (
    <div>
        <Navbar />
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <Hero />
        </div>
    </div>
  );
}

export default Landingpage;