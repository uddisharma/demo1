import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import "react-quill/dist/quill.snow.css";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-nextjs-toast";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminSidebar from "../../../src/components/AdminSidebar";
import { baseUrl } from "../../api/hello";
import Select from "react-select";
export default function ProfilePage() {
  const [image, setImage] = useState([]);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [convertedText, setConvertedText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/blog/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  setTimeout(() => {
    setConvertedText(data ? data.content : "");
  }, 500);
  const addblog = () => {
    let formData = new FormData();
    Array.from(image).forEach((item) => {
      formData.append("products", item);
    });
    formData.append("heading", document.getElementById("heading").value);
    formData.append("content", convertedText);

    if (image.length <= 0) {
      toast.notify("Please atleast one photo", {
        duration: 2,
        type: "error",
      });
    } else {
      setLoading(true);
      axios
        .put(`${baseUrl}/update-blog/${id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setLoading(false);
            toast.notify("Blog is Updated", {
              duration: 2,
              type: "success",
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
          <h2>Edit Blog </h2>
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          onChange={(e) => {
                            setImage(e.target.files);
                          }}
                          multiple
                          type="file"
                          name="images"
                          className="form-control"
                          placeholder="Category Name"
                          required=""
                          data-error="Please enter a code"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="heading"
                          name="discount"
                          defaultValue={data ? data.heading : ""}
                          className="form-control"
                          placeholder="Heading"
                          required=""
                          data-error="Please enter discount amount"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={convertedText}
                          onChange={setConvertedText}
                          // style={{ minHeight: "250px" }}
                        />
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
                  marginTop: "50px",
                }}
              >
                <Link href="/admin/categories">
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
                  <button onClick={addblog} className="theme-btn style-two">
                    Save Changes
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
