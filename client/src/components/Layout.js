import React, { useState } from "react";
import Header from "./Header/index.js";
import Footer from "./Footer/index.js";
import SignupModal from "./SignupModal/SignupModal";
import LoginModal from "./LoginModal/LoginModal";

import classes from "./Layout.module.scss";

const Layout = ({ children }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Header
        setShowModal={setShowModal}
        showLoginModal={showLoginModal} // Pass showLoginModal as a prop
        setShowLoginModal={setShowLoginModal} // Pass setShowLoginModal as a prop
      />
      <SignupModal
        showModal={showModal}
        setShowModal={setShowModal}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />{" "}
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />{" "}
      <div className={classes.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
