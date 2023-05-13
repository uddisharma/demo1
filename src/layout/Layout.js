import { Fragment, useEffect } from "react";
import niceSelect from "react-nice-select";
import ImageView from "../components/ImageView";
import VideoPopup from "../components/VideoPopup";
import { animation, stickyNav } from "../utils";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
const Layout = ({ header, footer, children }) => {
  useEffect(() => {
    stickyNav();
    animation();
    niceSelect();
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/index3") {
      document.querySelector("body").classList.add("home-three");
    } else {
      document.querySelector("body").classList.remove("home-three");
    }
  }, []);
  return (
    <Fragment>
      <VideoPopup />
      <ImageView />
      {/* <ImageGallery /> */}
      <div className="page-wrapper">
        <Header header={header} />
        <SideBar />
        {children}
        <Footer footer={footer} />
      </div>
    </Fragment>
  );
};
export default Layout;
