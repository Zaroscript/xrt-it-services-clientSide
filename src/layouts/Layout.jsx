import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-vh-100 mt-5" >
          {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
