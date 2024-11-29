import { useState, useEffect } from "react";
import logo from '../assets/logo.svg';
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltRight } from 'react-icons/bi';
import { navlinks } from '../Constants';
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { itemVariants, sideVariants } from '../Utils/Motion';
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase-config";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false); // Track authentication state
  const navigate = useNavigate();
  const controls = useAnimation();

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuth(true); // User is logged in
      } else {
        setIsAuth(false); // No user is logged in
      }
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  // Toggle Menu State
  const handleMenuClick = () => {
    setMenuOpen((prevState) => !prevState);
  };

  // Handle Hover Animation
  const handleHover = () => {
    controls.start({ x: [0, -5, 5, -5, 0], transition: { duration: 0.7 } });
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      setIsAuth(false);
      alert("You have been signed out."); // Inform the user
      navigate("/signin"); // Redirect to login page
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="z-10 hidden md:flex lg:flex justify-around fixed w-full bg-[white]">
        <Link to="/" className="w-[12%] h-12 cursor-pointer mt-1">
          <img src={logo} alt="website logo" />
        </Link>

        <div className="flex items-center justify-between lg:w-[30%] md:w-[40%]">
          {navlinks.map((link, index) => (
            <div key={index}>
              <Link to={link.url} className="list-none">{link.title}</Link>
            </div>
          ))}
        </div>
        {!isAuth ? (
          <Link to="/signin">
            <motion.button
              onHoverStart={handleHover}
              onHoverEnd={() => controls.start({ x: 0 })}
              animate={controls}
              className="w-[211px] h-[50px] bg-[#5454D4] text-white rounded-xl text-[17px]"
            >
              Login
            </motion.button>
          </Link>
        ) : (
          <button
            className="w-[211px] h-[50px] bg-[#cf2626] text-white rounded-xl text-[17px]"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </nav>

      {/* Mobile Navbar */}
      <nav className="z-10 md:hidden flex justify-center w-[90vw] bg-[white] pb-[10px] fixed">
        <div className="pt-5 px-2 flex justify-around">
          <div className="w-[40%]">
            <img src={logo} alt="" className="w-[100%] pt-2" />
          </div>
          {!isAuth ? (
            <Link to="/signin">
              <button className="w-[120px] h-[50px] bg-[#5454D4] text-white rounded-xl text-[17px] mt-3">
                Login
              </button>
            </Link>
          ) : (
            <button
              className="w-[120px] h-[50px] bg-[#cf2626] text-white rounded-xl text-[17px] mt-3"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          )}
        </div>

        <div className="w-[10%] pt-3 pl-4" onClick={handleMenuClick}>
          {isMenuOpen ? (
            <AiOutlineClose size="40px" cursor="pointer" />
          ) : (
            <BiMenuAltRight size="40px" cursor="pointer" style={{ color: 'black' }} />
          )}
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 500 }}
            exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              className="nav-container md:hidden border flex flex-col fixed text-white w-[55vw] mt-[120px] h-[350px] justify-around items-end pr-[18vw] ml-[28%] z-10 rounded-2xl pt-4 bg-[#0000ff7b]"
            >
              <div className="flex flex-col items-center w-[30%]">
                {navlinks.map((link) => (
                  <motion.div className="flex flex-col pr-7 text-[16px]" key={link.name}>
                    <Link to={link.url}>
                      <motion.div variants={itemVariants} className="list-none p-3">
                        {link.title}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
