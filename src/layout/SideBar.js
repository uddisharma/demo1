import { Fragment, useEffect, useState } from "react";
import { sidebarToggle } from "../utils";
import axios from "axios";
import { baseUrl } from "../../pages/api/hello";
import Link from "next/link";
const SideBar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}/categories`).then((res) => {
      // console.log(res.data.categories);
      setCategories(res.data.categories);
    });
  }, []);
  return (
    <Fragment>
      <div className="form-back-drop" onClick={() => sidebarToggle()} />
      {/* Hidden Sidebar */}
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon" onClick={() => sidebarToggle()}>
            <span className="fa fa-times" />
          </div>
          <div className="title">
            <h4>All Categories</h4>
          </div>
          {/*Appointment Form*/}
          {/* <div className="appointment-form">
            <form onSubmit={(e) => e.preventDefault()} method="post">
              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  defaultValue=""
                  placeholder="Name"
                  required=""
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  defaultValue=""
                  placeholder="Email Address"
                  required=""
                />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" rows={5} defaultValue={""} />
              </div>
              <div className="form-group">
                <button type="submit" className="theme-btn">
                  Submit now
                </button>
              </div>
            </form>
          </div> */}
          {/*Social Icons*/}
          {/* <div className="social-style-one">
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
            <a href="#">
              <i className="fab fa-pinterest-p" />
            </a>
          </div> */}
          {categories
            ? categories.map((e) => (
                <Link href={`/category/${e.category}`}>
                  <p
                    onClick={() => sidebarToggle()}
                    style={{ color: "white", cursor: "pointer" }}
                    key={e._id}
                  >
                    {e.category}
                  </p>
                </Link>
              ))
            : ""}
        </div>
      </section>
    </Fragment>
  );
};
export default SideBar;
