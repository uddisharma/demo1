import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
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
import Layout from "../../../src/layout/Layout";
import { toast, ToastContainer } from "react-nextjs-toast";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "../../api/hello";
import { useRouter } from "next/router";
import AdminSidebar from "../../../src/components/AdminSidebar";
export default function ProfilePage() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [orders, setOrders] = useState([]);
  const [laoding, setLoading] = useState(false);
  const router = useRouter();
  const id = router.query;
  // console.log(id);
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
  const Orders = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/userprofile/${id.id}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
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
        // localStorage.setItem("userprofile", JSON.stringify(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Orders();
  }, [id]);

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
        // setImg(res.data.url);
        setData({ ...data, photo: res.data.url });
      });
  };
  const handleclick = () => {
    // console.log(data);
    axios
      .put(`${baseUrl}/updateprofle/${id.id}`, data)
      .then((res) => {
        if (res.data.status == "success") {
          console.log(res);
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
      });
  };
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      // <Layout>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Update User </h2>
        </div>
        <ToastContainer />
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol lg="10">
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
                    {/* {photo !== userdata.photo ? (
                      <MDBCardImage
                        src={photo}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                    ) : (
                      <MDBCardImage
                        src={photo}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                    )} */}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          onChange={(e) => onUploadImage(e.target.files[0])}
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
                <Link href="/admin/users">
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
                <button onClick={handleclick} className="theme-btn style-two">
                  Save Changes
                  <i className="fas fa-angle-double-right" />
                </button>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      // </Layout>
    );
  }
}
