import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-nextjs-toast";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminSidebar from "../../src/components/AdminSidebar";
import { baseUrl } from "../api/hello";
import Select from "react-select";
export default function ProfilePage() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [data, setData] = useState({
    name: "",
    review: "",
    photos: [],
  });
  const { name, review, photos } = data;
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addcategory = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("review", review);
    Array.from(photos).forEach((item) => {
      formData.append("products", item);
    });
    if (photos.length <= 0 || name == "" || review == "") {
      toast.notify("All fields are required", {
        duration: 2,
        type: "error",
      });
    } else {
      axios
        .post(`${baseUrl}/createreview`, formData)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setData({ ...data, subCategory: [] });
            toast.notify("New Review is Added", {
              duration: 2,
              type: "success",
            });
          } else {
            toast.notify("Something went wrong", {
              duration: 2,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.notify("Something went wrong", {
            duration: 2,
            type: "error",
          });
        });
    }
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
        <ToastContainer />
        <div className="section-title text-center pt-20 mb-10">
          <h2>Add Review </h2>
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
                  id="contactForm"
                  className="contact-form rmb-65 wow fadeInLeft delay-0-2s"
                  name="contactForm"
                  action=""
                  method="post"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          onChange={(e) => {
                            // setImage(e.target.files);
                            setData({ ...data, photos: e.target.files });
                          }}
                          multiple
                          type="file"
                          id="photo"
                          name="photo"
                          className="form-control"
                          defaultValue=""
                          placeholder="Profile Photo"
                          required=""
                          data-error="Please select a photo"
                        />
                        <div className="help-block with-errors" />
                        {/* <p style={{ color: "red", marginLeft: "10px" }}>
                          Choose 1st for user 2nd for Main display and 3rd for
                          background
                        </p> */}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          id="code"
                          value={name}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="name"
                          className="form-control"
                          placeholder="User Name"
                          required=""
                          data-error="Please enter a code"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          id="review"
                          value={review}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="review"
                          className="form-control"
                          placeholder="Review By Customer"
                          required=""
                          data-error="Please enter discount amount"
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
                <Link href="/admin/home/reviews">
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
                  <button onClick={addcategory} className="theme-btn style-two">
                    Create Review
                    <i className="fas fa-angle-double-right" />
                  </button>
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      // </Layout>
    );
  }
}
