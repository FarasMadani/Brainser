import React from "react";
import Logo from "../../assets/Logo/Brainser-Logo.svg";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-white shadow-md">
        <div className="navbar-start">
          <img src={Logo} alt="Brainser-Logo" className="size-12"/>
  <div className="btn btn-ghost text-2xl">Brainser</div>
    </div>
      <div className="navbar-end">
        <button className="btn">Try For Free</button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
