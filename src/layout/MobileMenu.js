import { useState } from "react";
import { Blog, Contact, Home, PagesMobile, Portfolio, Shop } from "./Menus";
import Link from "next/link";
const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  return (
    <ul className="navigation clearfix d-block d-lg-none mobile-header">
      <li className="dropdown">
      <Link href="/">HOME</Link>
        {/* <a href="#">Home</a>
        <ul style={activeLi("home")}>
          <Home />
        </ul>
        <div className="dropdown-btn" onClick={() => activeMenuSet("home")}>
          <span className="fas fa-chevron-down" />
        </div> */}
      </li>
      <li className="dropdown">
      <Link href="/shop">SHOP</Link>
      </li>
      <li className="dropdown">
      <Link href="/about">ABOUT US</Link>
      </li>
      <li className="dropdown">
      <Link href="/faqs">FAQS</Link>
      </li>
      <li className="dropdown">
      <Link href="/contact">CONTACT US</Link>
      </li>
      {/* <Contact /> */}
    </ul>
  );
};
export default MobileMenu;
