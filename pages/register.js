import { useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { toast, ToastContainer } from "react-nextjs-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { baseUrl } from "./api/hello";
const Register = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const { name, lastname, phone, email, password, password_confirmation } =
    data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const register = (e) => {
    e.preventDefault();

    if (password !== password_confirmation) {
      toast.notify("passwords not match", {
        duration: 5,
        type: "error",
      });

      // alert('password did not match')
      return;
    }
    if (password.length < 6) {
      toast.notify("passwords must be atleast 6 characters", {
        duration: 5,
        type: "error",
      });
      return;
    }
    axios
      .post(`${baseUrl}/register`, data)
      .then((res) => {
        if (res.data.token) {
          toast.notify("Registration successfull", {
            duration: 5,
            type: "success",
          });
          //   router.push('/')
        } else if (res.data.message == "Email already exists") {
          toast.notify("Email Already Exist", {
            duration: 5,
            type: "error",
          });
        }
      })
      .catch((err) => {
        toast.notify("Something went wrong", {
          duration: 5,
          type: "error",
        });
        // toast.error("🦄  Something went wrong  ", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   theme: "colored",
        // });
      });
  };
  return (
    <Layout>
      <section className="contact-form-area rel z-1 pt-70 rpt-70 pb-130 rpb-100">
        <ToastContainer />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <form
                onSubmit={register}
                id="contactForm"
                className="contact-form rmb-65 wow fadeInLeft delay-0-2s"
                name="contactForm"
                action="assets/php/form-process.php"
                method="post"
              >
                <div className="section-title contact-title mb-55">
                  {/* <span className="sub-title mb-15">Contact With Us</span> */}
                  <h3>Sign Up</h3>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                        value={name}
                        name="name"
                        className="form-control"
                        defaultValue=""
                        placeholder="First Name"
                        required=""
                        data-error="Please enter your first name"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="lastname"
                        onChange={handleChange}
                        value={lastname}
                        name="lastname"
                        className="form-control"
                        defaultValue=""
                        placeholder="Last Name"
                        required=""
                        data-error="Please enter your last name"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="number"
                        id="phone"
                        onChange={handleChange}
                        value={phone}
                        name="phone"
                        className="form-control"
                        defaultValue=""
                        placeholder="Phone Number"
                        required=""
                        data-error="Please enter your Phone Number"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        onChange={handleChange}
                        value={password_confirmation}
                        className="form-control"
                        defaultValue=""
                        placeholder="Confirm Password"
                        required=""
                        data-error="Please enter your Confirm Password"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>

                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', }} className="col-md-12">
                    <div style={{flex:'4'}} className="form-group mb-0">
                      <button type="submit" className="theme-btn style-two">
                        Register
                        <i className="fas fa-angle-double-right" />
                      </button>
                      <div id="msgSubmit" className="hidden" />
                    </div>
                    <h5 style={{flex:'6'}}>
                      Already a user ?<Link href="/login" ><span  style={{color:'#ff7800', cursor:'pointer'}}> Login here</span></Link>
                    </h5>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="contact-right-image wow fadeInRight delay-0-4s">
                <img
                style={{height:'300px', width:'400px'}}
                  src="/assets/images/register.png"
                  alt="Contact From"
                />
                <img
                 style={{opacity:"0.3"}}
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
  );
};
export default Register;
