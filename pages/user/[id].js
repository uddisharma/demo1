import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import Layout from "../../src/layout/Layout";
import { toast, ToastContainer } from "react-nextjs-toast";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "../api/hello";
import { useRouter } from "next/router";
export default function ProfilePage() {
  let username;
  if (typeof window !== "undefined") {
    username = localStorage.getItem("username");
  }
  // const username = localStorage.getItem("username");
  const [details, setDetails] = useState([]);
  const [img, setImg] = useState("");
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  //   console.log(img)
  const router = useRouter();
  const Id = router.query;
  // console.log(Id)
  const [data, setData] = useState({
    name: "",
    lastname: "",
    phone: "",
    photo: "",
    alternatephone: "",
    state: "",
    district: "",
    city: "",
    zipcode: "",
    address: "",
  });

  const {
    name,
    lastname,
    phone,
    photo,
    alternatephone,
    state,
    district,
    city,
    zipcode,
    address,
  } = data;
  useEffect(() => {
    axios
      .post(`${baseUrl}/userprofile/${username}`)
      .then((res) => {
        setDetails(res.data);
        setData({
          ...data,
          name: res.data.name,
          lastname: res.data.lastname,
          phone: res.data.phone,
          photo: res.data.photo,
          alternatephone: res.data.alternatephone,
          state: res.data.state,
          district: res.data.district,
          city: res.data.city,
          zipcode: res.data.zipcode,
          address: res.data.zipcode,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onUploadImage = (file) => {
    // console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mivjmkcg");
    axios
      .post("https://api.cloudinary.com/v1_1/dvuphar2o/image/upload", formData)
      .then((res) => {
        setImg(res.data.url);
        setData({ ...data, photo: res.data.url });
        // console.log(res.data.url);
      });
  };
  const [loading, setLoading] = useState(false);
  const handleclick = () => {
    setLoading(true);
    axios
      .put(`${baseUrl}/updateprofle/${Id.id}`, data)
      .then((res) => {
        if (res.data.status == "success") {
          setLoading(false);
          console.log(res);
          window.location.href = "/";
          toast.notify("Profile Updated Successfully", {
            duration: 5,
            type: "success",
          });
        } else {
          toast.notify("Something went wrong", {
            duration: 5,
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.notify("something went wrong", {
          duration: 5,
          type: "error",
        });
        // toast.error("Something went wrong", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   theme: "colored",
        // });
      });
  };
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <Layout>
        <section style={{ backgroundColor: "#eee" }}>
          <ToastContainer />
          <MDBContainer className="py-30">
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    {/* <img src={img !== "" ? img : "/img/avatar/img-5.jpg"} alt="not found" /> */}
                    {photo !== "" ? (
                      <MDBCardImage
                        src={photo}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                    ) : (
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="not found"
                      />
                    )}

                    <p
                      style={{ fontWeight: "bold" }}
                      className="text-muted mb-1"
                    >
                      {details.name}
                    </p>
                    <p className="text-muted mb-4">{details.email}</p>
                    <div className="d-flex justify-content-center mb-2">
                      {/* <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                    </div>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <Link href="/user/profile">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/user.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Profile
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                      <Link href="/user/orders">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          {/* <MDBIcon
                        fab
                        icon="github fa-lg"
                        style={{ color: "#333333" }}
                      /> */}
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/clipboard.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Orders
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                      <Link href="/wishlist">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/love.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Wishlist
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                      <Link href="/cart">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/shopping-cart.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Cart
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <div className="">
                  <form
                    // onSubmit={register}
                    id="contactForm"
                    className="contact-form rmb-65 wow fadeInLeft delay-0-2s"
                    name="contactForm"
                    action="assets/php/form-process.php"
                    method="post"
                  >
                    <div className="section-title contact-title mb-55">
                      {/* <span className="sub-title mb-15">Contact With Us</span> */}
                      <h3>Edit Profile</h3>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="file"
                            id="photo"
                            name="photo"
                            onChange={(e) => onUploadImage(e.target.files[0])}
                            // onChange={handleChange}
                            // value={password_confirmation}
                            className="form-control"
                            defaultValue=""
                            placeholder="Profile Photo"
                            required=""
                            data-error="Please select a photo"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="name"
                            autoComplete="given-name"
                            name="name"
                            value={name}
                            onChange={handleChange}
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
                            autoComplete="family-name"
                            name="lastname"
                            value={lastname}
                            onChange={handleChange}
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
                            autoComplete="phone"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            className="form-control"
                            defaultValue=""
                            placeholder="Phone Number"
                            required=""
                            data-error="Please enter your Phone Number"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="phone"
                          onChange={handleChange}
                          value={phone}
                          name="email"
                          className="form-control"
                          defaultValue=""
                          placeholder="Email Address"
                          required=""
                          data-error="Please enter your Email Address"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div> */}
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="number"
                            id="alternatephone"
                            onChange={handleChange}
                            value={alternatephone}
                            name="alternatephone"
                            className="form-control"
                            defaultValue=""
                            placeholder="Alternate Number"
                            required=""
                            data-error="Please enter your Alternate Number"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="State"
                            name="state"
                            onChange={handleChange}
                            value={state}
                            className="form-control"
                            defaultValue=""
                            placeholder="State"
                            required=""
                            data-error="Please enter your State"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="district"
                            onChange={handleChange}
                            value={district}
                            name="district"
                            className="form-control"
                            defaultValue=""
                            placeholder="District"
                            required=""
                            data-error="Please enter your district"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="city"
                            name="city"
                            onChange={handleChange}
                            value={city}
                            className="form-control"
                            defaultValue=""
                            placeholder="City"
                            required=""
                            data-error="Please enter your City"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="address"
                            onChange={handleChange}
                            value={address}
                            name="address"
                            className="form-control"
                            defaultValue=""
                            placeholder="Address"
                            required=""
                            data-error="Please enter your address"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="number"
                            id="zipcode"
                            name="zipcode"
                            onChange={handleChange}
                            value={zipcode}
                            className="form-control"
                            defaultValue=""
                            placeholder="Zip Code"
                            required=""
                            data-error="Please enter your Zip Code"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "15px",
                  }}
                >
                  <Link href="/user/profile">
                    <button
                      style={{ backgroundColor: "#ff7800" }}
                      type="submit"
                      className="theme-btn style-two"
                    >
                      <i
                        style={{ marginRight: "7px" }}
                        className="fas fa-angle-double-left"
                      />
                      Cancel
                    </button>
                  </Link>
                  {loading ? (
                    <button className="theme-btn style-two">
                      <img
                        style={{ width: "25px", height: "25px" }}
                        src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                      />
                      <i className="fas fa-angle-double-right" />
                    </button>
                  ) : (
                    <button
                      onClick={handleclick}
                      className="theme-btn style-two"
                    >
                      Save Changes
                      <i className="fas fa-angle-double-right" />
                    </button>
                  )}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Layout>
    );
  }
}
