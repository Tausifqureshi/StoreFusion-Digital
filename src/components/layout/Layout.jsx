import React, { useMemo, useContext } from "react";
import Navbar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { ThemeContext } from "../../context api/AllContext";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";

function Layout({ children }) {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  // ✅ ABSOLUTE SHIELDING: Instances are locked in memoized references
  // This ensures they are NEVER re-reconciled unless the theme actually changes.
  const memoNavbar = useMemo(() => <Navbar isDark={isDark} />, [isDark]);
  const memoFooter = useMemo(() => <Footer isDark={isDark} />, [isDark]);

  return (
    <div className={`transition-all duration-300 ${isDark ? "bg-[#131921]" : "bg-white"}`}>
      {memoNavbar}
      <main className="content relative z-40 min-h-[60vh]">
        {children}
      </main>
      <ScrollToTopButoon mode={mode} />
      {memoFooter}
    </div>
  );
}

export default React.memo(Layout);

// Layout component commends ---> Layout component ko is liye use karte hain kyunki project me kuch components, jaise Navbar aur Footer, har page pe dikhte hain. In components ko har page pe baar baar import karne ke bajaye, hum unhe Layout me include karte hain taaki yeh har route ke sath automatically show ho sakein.
