import React, { useState } from "react";
import Header from "./Header/index.js";
import Footer from "./Footer/index.js";
import SignupModal from "./SignupModal/SignupModal";

import classes from "./Layout.module.scss";

const Layout = ({ children }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  return (
    <>
      <Header setShowModal={setShowModal} />{" "}
      {/* Pass setShowModal to Header component */}
      <SignupModal showModal={showModal} setShowModal={setShowModal} />{" "}
      {/* Pass showModal and setShowModal to SignupModal */}
      <div className={classes.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
