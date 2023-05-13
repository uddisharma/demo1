import { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { toast, ToastContainer } from "react-nextjs-toast";
import axios from "axios";
import { setuserLogin } from "../slices/userloginSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import { baseUrl } from "./api/hello";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  // const api = baseUrl;
  // console.log(api)
  const port = process.env.PORT;
  const router = useRouter();
  const user = useSelector((state) => state.user);
  // console.log(user.IsLogin);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  // console.log(userlogin)
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const login = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      toast.notify("All Fields are required", {
        duration: 5,
        type: "error",
      });
    } else {
      setLoading(true);
      axios
        // .post(`${api}/login`, data)

        .post(`${baseUrl}/login`, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.token) {
            setLoading(false)
            dispatch(setuserLogin(true));
            setToken(res.data.token);
            localStorage.setItem("username", email);
            localStorage.setItem("token", res.data.token);
            // setuserLogin(true)
            toast.notify("Login Successfull", {
              duration: 5,
              type: "success",
            });
            window.location.href='/'
            // router.push('/')
          } else if (res.data.status == "failed") {
            toast.notify("Wrong Credentials", {
              duration: 5,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          //   toast.notify("Something went wrong", {
          //     duration: 5,
          //     type: "error",
          //   });
        });
    }
  };

  // useEffect(() => {
  //   location.reload();
  // }, [user.IsLogin == true]);
  return (
    <>
      {/* {ulogin == true ? (
        <div style={{display:'grid', placeItems:'center'}}>
        <img src="https://media3.giphy.com/media/YOw8mpVUyG8RIyR4uM/giphy.gif" />
        </div>
      ) : ( */}
      <Layout>
        <section className="contact-form-area rel z-1 pt-70 rpt-70 pb-130 rpb-100">
          <ToastContainer />
          {/* {token.length > 0 && router.push("/")} */}
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <form
                  onSubmit={login}
                  id="contactForm"
                  className="contact-form rmb-65 wow fadeInLeft delay-0-2s"
                  name="contactForm"
                  action="assets/php/form-process.php"
                  method="post"
                >
                  <div className="section-title contact-title mb-55">
                    {/* <span className="sub-title mb-15">Contact With Us</span> */}
                    <h3>Sign In</h3>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          onChange={handleChange}
                          value={email}
                          name="email"
                          className="form-control"
                          defaultValue=""
                          placeholder="Email Address"
                          required=""
                          data-error="Please enter your Email Address"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="password"
                          id="password"
                          onChange={handleChange}
                          value={password}
                          name="password"
                          className="form-control"
                          defaultValue=""
                          placeholder="Your password"
                          required=""
                          data-error="Please enter your password"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="col-md-12"
                    >
                      <div style={{ flex: "4" }} className="form-group mb-0">
                      {loading ? (
                          <button className="theme-btn style-two">
                            <img
                              style={{ width: "25px", height: "25px" }}
                              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                            />
                            <i className="fas fa-angle-double-right" />
                          </button>
                        ) : (
                          <button type="submit" className="theme-btn style-two">
                            Login
                            <i className="fas fa-angle-double-right" />
                          </button>
                        )}
                        <div id="msgSubmit" className="hidden" />
                      </div>
                      <h5 style={{ flex: "6" }}>
                        Not Yet Registered ?
                        <Link href="/register">
                          <span style={{ color: "#ff7800", cursor: "pointer" }}>
                            {" "}
                            Register here
                          </span>
                        </Link>
                      </h5>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-6">
                <div className="contact-right-image wow fadeInRight delay-0-4s">
                  <img src="/assets/images/login.png" alt="Contact From" />
                  <img
                    style={{ opacity: "0.3" }}
                    className="bg"
                    src="assets/images/contact/contact-right-bg.png"
                    alt="Contact From BG"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="contact-shapes">
            <img
              className="leaf"
              src="assets/images/shapes/leaf-1.png"
              alt="Leaf"
            />
            <img
              className="shape"
              src="assets/images/shapes/contact-shape.png"
              alt="Shape"
            />
            <img
              className="two-leaf"
              src="assets/images/shapes/two-lear.png"
              alt="Leaf"
            />
          </div>
        </section>
      </Layout>
      {/* )} */}
    </>
  );
};
export default Login;
