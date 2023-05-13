import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import "react-quill/dist/quill.snow.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
 
} from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-nextjs-toast";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { baseUrl } from "../api/hello";
import AdminSidebar from "../../src/components/AdminSidebar";
export default function ProfilePage() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [details, setDetails] = useState([]);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const newItems = [];
  const categoryNames = [];
  Array.from(categories).forEach((e, i) => {
    let obj = {
      id: i,
      _id: e._id,
      name: e.category,
    };
    newItems.push(obj);
  });

  const handleOnSelect = (item) => {
    categoryList.push(item._id);
    categoryNames.push(item.name);
    console.log(categoryList);
    const div = document.getElementById("category");
    div.className = "categorylist";
    const para = document.createElement("p");
    categoryNames.map((e, i) => {
      para.innerHTML = e;
      div.appendChild(para);
    });
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}/categories`)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(categories);
  const [convertedText, setConvertedText] = useState("");
  const [image, setImage] = useState([]);

  let list = [...new Set(categoryList)];
  const addproduct = (e) => {
    // console.log(setCategoryList)
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    Array.from(categoryList).forEach((item) => {
      formData.append("category", item);
    });
    formData.append("price", document.getElementById("price").value);
    formData.append("mrp", document.getElementById("mrp").value);
    formData.append("discount", document.getElementById("discount").value);
    formData.append("video", document.getElementById("video").value);
    Array.from(image).forEach((item) => {
      formData.append("products", item);
    });
    formData.append("stock", document.getElementById("stock").value);
    formData.append("description", convertedText);
    formData.append("keywords", document.getElementById("keywords").value);
    formData.append("length", document.getElementById("length").value);
    formData.append("weight", document.getElementById("weight").value);
    formData.append("breadth", document.getElementById("breadth").value);
    formData.append("height", document.getElementById("height").value);
    console.log(formData);
    if (
      document.getElementById("name").value == "" ||
      document.getElementById("price").value == "" ||
      document.getElementById("mrp").value == "" ||
      document.getElementById("discount").value == "" ||
      convertedText == "" ||
      document.getElementById("keywords").value == "" ||
      document.getElementById("length").value == ""
    ) {
      toast.notify("all fields are required", {
        duration: 2,
        type: "error",
      });
    } else if (image.length > 0 && list.length > 0) {
      setLoading(true);
      axios
        .post(`${baseUrl}/create-product`, formData)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.notify("Product is Updated successfully", {
            duration: 2,
            type: "success",
          });
          document.getElementById("name").value = "";
          document.getElementById("price").value = "";
          document.getElementById("mrp").value = "";
          document.getElementById("discount").value = "";
          document.getElementById("video").value = "";
          document.getElementById("keywords").value = "";
          document.getElementById("stock").value = "";
        })
        .catch((err) => {
          console.log(err);
          toast.notify("Something went wrong", {
            duration: 2,
            type: "error",
          });
        });
    } else {
      toast.notify("All fields are required", {
        duration: 2,
        type: "error",
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
        <div className="section-title text-center pt-20 mb-10">
          <h2>Add Product </h2>
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
                  <div className="row">
                    {Array.from(image).map((item) => {
                      return (
                        <span>
                          <img
                            style={{ padding: "10px" }}
                            width={150}
                            height={100}
                            src={item ? URL.createObjectURL(item) : null}
                          />
                        </span>
                      );
                    })}
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          onChange={(e) => {
                            setImage(e.target.files);
                           
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
                          id="name"
                          // autoComplete="given-name"
                          name="name"
                          // value={name}
                          // onChange={handleChange}
                          className="form-control"
                          defaultValue={details.name}
                          placeholder="Product Name"
                          required=""
                          data-error="Please enter your procuct name"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="price"
                          // autoComplete="phone"
                          name="phone"
                          // value={phone}
                          // onChange={handleChange}
                          className="form-control"
                          defaultValue={details.price}
                          placeholder="Price"
                          required=""
                          data-error="Please enter price"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="mrp"
                          // onChange={handleChange}
                          // value={alternatephone}
                          name="mrp"
                          className="form-control"
                          defaultValue={details.mrp}
                          placeholder="MRP"
                          required=""
                          data-error="Please enter your Alternate Number"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="discount"
                          name="discount"
                          // onChange={handleChange}
                          // value={state}
                          className="form-control"
                          defaultValue={details.discount}
                          placeholder="Discount"
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
                          id="video"
                          // onChange={handleChange}
                          // value={district}
                          name="district"
                          className="form-control"
                          defaultValue={details.video}
                          placeholder="Youtube Video"
                          required=""
                          data-error="Please enter your district"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          // onChange={handleChange}
                          // value={city}
                          className="form-control"
                          defaultValue={details.stock}
                          placeholder="Stock"
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
                          id="keywords"
                          // onChange={handleChange}
                          // value={address}
                          name="categories"
                          className="form-control"
                          defaultValue={details.keywords}
                          placeholder="Multiple Categories"
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
                          id="height"
                          name="stock"
                          // onChange={handleChange}
                          // value={city}
                          className="form-control"
                          defaultValue={14.3}
                          placeholder="Height"
                          required=""
                          data-error="Please enter your City"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="weight"
                          name="stock"
                          // onChange={handleChange}
                          // value={city}
                          className="form-control"
                          defaultValue={80}
                          placeholder="Weight"
                          required=""
                          data-error="Please enter your City"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="length"
                          name="stock"
                          // onChange={handleChange}
                          // value={city}
                          className="form-control"
                          defaultValue={14.3}
                          placeholder="Length"
                          required=""
                          data-error="Please enter your City"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="breadth"
                          name="stock"
                          // onChange={handleChange}
                          // value={city}
                          className="form-control"
                          defaultValue={3}
                          placeholder="Breadth"
                          required=""
                          data-error="Please enter your City"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={convertedText}
                          onChange={setConvertedText}
                          // style={{ minHeight: "250px" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        style={{
                          style: "grid",
                          gridTemplateColumns: "repeat(3,1fr)",
                          gap: "10px",
                        }}
                        id="category"
                      ></div>
                      <div
                        style={{
                          width: "100%",
                          zIndex: "-1",
                          marginBottom: "30px",
                        }}
                      >
                        <ReactSearchAutocomplete
                          placeholder="Enter Categories"
                          items={newItems}
                          onSelect={handleOnSelect}
                          autoFocus
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
                }}
              >
                <Link href="/admin/products">
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
                  <button onClick={addproduct} className="theme-btn style-two">
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
