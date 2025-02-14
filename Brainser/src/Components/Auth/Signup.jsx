import React from "react";
import Logo from "../../assets/Logo/Brainser-Logo.svg"
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import Background from "../App/Background";

const Signup = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        navigate("/Home"); // Redirect to the home page after successful login
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  };

  return (
    <>
    <Background />
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <img className="mb-4" src={Logo}/>
        <button
          className="btn px-4 py-2 rounded text-black hover:bg-black hover:text-white"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    </div>
    </>
  );
};

export default Signup;