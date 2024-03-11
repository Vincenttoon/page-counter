import React from "react";
import Header from "./Header/index.js";
import Footer from "./Footer/index.js";

import classes from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.container}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
