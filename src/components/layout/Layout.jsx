import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Layout({ children }) {
  return (
    <div>
      {/* <h1>Layout Page </h1> */}
      <Navbar />
      <div className="content">
        {children}

        {/* Yeh content bar-bar change hota rahega, isliye hum `children` prop ka use karte hain. Lekin, `Layout` component me Navbar aur Footer same rehte hain har page pe. */}
      </div>
      <Footer />

    </div>
  );
}

export default Layout;

// Layout component commends ---> Layout component ko is liye use karte hain kyunki project me kuch components, jaise Navbar aur Footer, har page pe dikhte hain. In components ko har page pe baar baar import karne ke bajaye, hum unhe Layout me include karte hain taaki yeh har route ke sath automatically show ho sakein.
