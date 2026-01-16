import React from "react";
import Header from "./../Header/Header.jsx";
import Footer from "./../Footer/Footer.jsx";
import Routers from "../../router/Routers.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
