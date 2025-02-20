import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "../../assets/Logo/Brainser-Logo.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/Home");
    }
  }, [user, location, navigate]);

  const handleTryForFreeClick = () => {
    if (user) {
      navigate("/Home");
    } else {
      navigate("/Sign");
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/Sign");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar bg-white shadow-md">
      <div className="navbar-start">
          <>
            <img src={Logo} alt="Brainser-Logo" className="h-12 mr-2" />
            <div className="text-2xl font-semibold">Brainser</div>
          </>
      </div>
      <div className="navbar-end flex items-center relative">
        {user ? (
          <>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="h-10 w-10 rounded-full mr-2"
              />
            )}
            <div className="dropdown dropdown-bottom">
              <label tabIndex={0} className="btn m-1" onClick={toggleDropdown}>
                {user.displayName}
              </label>
              {dropdownVisible && (
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a onClick={handleLogout}>Logout</a></li>
                  {/* Add more items as needed */}
                </ul>
              )}
            </div>
          </>
        ) : (
          <button
            className="btn black px-4 py-2 rounded hover:bg-black hover:text-white"
            onClick={handleTryForFreeClick}
          >
            Try For Free
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;