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
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [arr, setArr] = useState([]);
  const router = useRouter();
  const id = router.query.id;
 

  const [data, setData] = useState({
    category: "",
    subCategory: [],
    photo: [],
  });
  const { category, subCategory, photo } = data;
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, category: e.target.value });
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}/category/${id}`)
      .then((response) => {
        setCategories(response.data.category);
       
        setData({...data, category: response.data.category[0].category});
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [id]);
  //  console.log(categories);
  const addsubcategory = () => {
    if (document.getElementById("subcategory").value == "") {
      alert("Please add a subcategory");
    }
    arr.push(document.getElementById("subcategory").value);
    document.getElementById("subcategory").value = "";
    setData({ ...data, subCategory: arr });
  };

  const addcategory = () => {
    // console.log(data);
    let formData = new FormData();
    formData.append("category", category);
    formData.append("subcategory", subCategory);
    Array.from(photo).forEach((item) => {
      formData.append("products", item);
    });
    axios
      .patch(`${baseUrl}/updatecategory/${id}`, formData)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setData({ ...data, subCategory: [] });
          toast.notify(" Category is updated", {
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
  };
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
    setIsBrowser(typeof window !== "undefined");
  }, []);

  if (!initialRenderComplete) {
    return null;
  } else {
    return isBrowser ? (
      // <Layout>
      <section style={{ backgroundColor: "#eee" }}>
        <ToastContainer />
        <div className="section-title text-center pt-20 mb-10">
          <h2>Add Category </h2>
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
                            setData({ ...data, photo: e.target.files });
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
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          id="code"
                          value={category}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="code"
                          className="form-control"
                          placeholder="Category Name"
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
                          id="subcategory"
                          name="discount"
                          className="form-control"
                          placeholder="SubCategory"
                          required=""
                          data-error="Please enter discount amount"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                  </div>
                </form>
                <button
                  onClick={addsubcategory}
                  className="theme-btn style-two"
                >
                  Add SubCategory
                  <i className="fas fa-angle-double-right" />
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "15px",
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
                  <button onClick={addcategory} className="theme-btn style-two">
                    Update Category
                    <i className="fas fa-angle-double-right" />
                  </button>
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    ) : // </Layout>
    null;
  }
}
