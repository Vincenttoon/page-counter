import React, { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Auth from "../../utils/auth";
import classes from "./Header.module.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuToggleHandler = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    Auth.logout();
    setMenuOpen(false); // Close the menu after logout
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h2 className={classes.header__content__logo}>Page Counter</h2>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <a href="/" onClick={menuToggleHandler}>
                Feed
              </a>
            </li>
            <li>
              <a href="/search" onClick={menuToggleHandler}>
                Search
              </a>
            </li>
            {Auth.loggedIn() ? (
              <>
                <li>
                  <a href="/profile" onClick={menuToggleHandler}>
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/worms" onClick={menuToggleHandler}>
                    Worms
                  </a>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={menuToggleHandler}>
                    <a href="/login">Login</a>
                  </button>
                </li>
                <li>
                  <button onClick={menuToggleHandler}>
                    <a href="/signup">Signup</a>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className={classes.header__content__toggle}>
          {menuOpen ? (
            <AiOutlineClose onClick={menuToggleHandler} />
          ) : (
            <BiMenuAltRight onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
