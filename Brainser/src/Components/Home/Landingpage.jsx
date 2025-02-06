import React from "react";
import Navbar from "./Navbar"
import Hero from "./Hero"
import Features from "./Features";
import Footer from "./Footer";

const Landingpage = () => {
  return (
    <div>
        <Navbar />
          <Hero />
          <Features />
        <Footer />
    </div>
  );
}

export default Landingpage;