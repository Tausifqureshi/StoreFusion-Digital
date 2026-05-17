import React, { useMemo, useContext } from "react";
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { ThemeContext } from "../../context/AllContext";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";

function Layout({ children }) {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  // 🛡️ RE-SYNC: Standard components to ensure immediate reactivity

  return (
    <div className={`transition-all duration-300 ${isDark ? "bg-[#111827]" : "bg-white"}`}>
      <Navbar isDark={isDark} />
      <main className="content relative z-40 min-h-[60vh]">
        {children}
      </main>
      <ScrollToTopButoon mode={mode} />
      <Footer isDark={isDark} />
    </div>
  );
}

export default React.memo(Layout);

// Layout component commends ---> Layout component ko is liye use karte hain kyunki project me kuch components, jaise Navbar aur Footer, har page pe dikhte hain. In components ko har page pe baar baar import karne ke bajaye, hum unhe Layout me include karte hain taaki yeh har route ke sath automatically show ho sakein.
