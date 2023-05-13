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
import { ReactSearchAutocomplete } from "react-search-autocomplete";
export default function ProfilePage() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [imgs, setImgs] = useState([]);
  const router = useRouter();
  const Id = router.query;
  const [categories, setCategories] = useState([]);
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
  const [convertedText, setConvertedText] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: "",
    mrp: "",
    discount: "",
    video: "",
    stock: "",
    keywords: "",
    length: 14.3,
    breadth: 3,
    height: 14.3,
    weight: 80,
  });
  const {
    name,
    price,
    mrp,
    discount,
    video,
    stock,
    keywords,
    length,
    breadth,
    height,
    weight,
  } = product;
  useEffect(() => {
    axios
      .get(`${baseUrl}/product/${Id.id}`)
      .then((res) => {
        // console.log(res.data.products);
        setProduct({
          ...product,
          name: res.data.products[0].name,
          price: res.data.products[0].price,
          mrp: res.data.products[0].mrp,
          discount: res.data.products[0].discount,
          video: res.data.products[0].video,
          stock: res.data.products[0].stock,
          keywords: res.data.products[0].keywords,
          length: res.data.products[0].length,
          breadth: res.data.products[0].breadth,
          height: res.data.products[0].height,
          weight: res.data.products[0].weight,
        });
        setDetails(res.data.products);
        setImgs(res.data.products.images);
        setConvertedText(res.data.products[0].description);
        setData(true);
        // localStorage.setItem("desc", res.data.products.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Id]);
  {
    console.log(product);
    console.log(details);
  }
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
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const [image, setImage] = useState([]);
  // console.log(image);
  const updateproduct = (e) => {
    e.preventDefault();
    // console.log(image);
    let formData = new FormData();
    formData.append("name", name);
    Array.from(categoryList).forEach((item) => {
      formData.append("category", item);
    });
    formData.append("price", price);
    formData.append("mrp", mrp);
    formData.append("discount", discount);
    formData.append("video", video);
    Array.from(image).forEach((item) => {
      formData.append("products", item);
    });
    formData.append("stock", stock);
    formData.append("description", convertedText);
    formData.append("keywords", keywords);
    formData.append("length", length);
    formData.append("weight", weight);
    formData.append("breadth", breadth);
    formData.append("height", height);
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
    } else if (image.length > 0 && categoryList.length > 0) {
      setLoading(true);
      axios
        .put(`${baseUrl}/update-product/${Id.id}`, formData)
        .then((res) => {
          if (res.data.code == 400) {
            setLoading(false);
            toast.notify("Something went wrong", {
              duration: 2,
              type: "error",
            });
          } else {
            console.log(res);
            setLoading(false);
            toast.notify("Product is Updated successfully", {
              duration: 2,
              type: "success",
            });
            router.push("/admin/products");
            document.getElementById("name").value = "";
            document.getElementById("category").value = "";
            document.getElementById("price").value = "";
            document.getElementById("mrp").value = "";
            document.getElementById("discount").value = "";
            document.getElementById("video").value = "";
            document.getElementById("keywords").value = "";
            document.getElementById("stock").value = "";
          }
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
  // console.log(details)
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
          <h2>Update Product </h2>
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          onChange={(e) => {
                            setImage(e.target.files);
                            // console.log(e.target.files)
                          }}
                          multiple
                          type="file"
                          id="photo"
                          name="photo"
                          // onChange={(e) => onUploadImage(e.target.files[0])}
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
                          // autoComplete="given-name"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Product Name"
                          required=""
                          data-error="Please enter your procuct name"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="category"
                          // autoComplete="family-name"
                          name="category"
                          // value={lastname}
                          // onChange={handleChange}
                          className="form-control"
                          defaultValue={details.category}
                          placeholder="Category"
                          required=""
                          data-error="Please enter Category"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="price"
                          // autoComplete="phone"
                          name="price"
                          value={price}
                          onChange={handleChange}
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
                          onChange={handleChange}
                          value={mrp}
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
                          onChange={handleChange}
                          value={discount}
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
                          onChange={handleChange}
                          value={video}
                          name="video"
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
                          onChange={handleChange}
                          value={stock}
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
                          onChange={handleChange}
                          value={keywords}
                          name="keywords"
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
                          name="height"
                          onChange={handleChange}
                          value={height}
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
                          name="weight"
                          onChange={handleChange}
                          value={weight}
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
                          name="length"
                          onChange={handleChange}
                          value={length}
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
                          name="breadth"
                          onChange={handleChange}
                          value={breadth}
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
                      <div
                        style={{
                          style: "grid",
                          gridTemplateColumns: "repeat(3,1fr)",
                          gap: "10px",
                        }}
                        id="category"
                      ></div>
                      <ReactSearchAutocomplete
                        placeholder="Enter Categories"
                        items={newItems}
                        onSelect={handleOnSelect}
                        autoFocus
                      />
                    </div>
                    <div className="col-md-12">
                      <div>
                        <ReactQuill
                          theme="snow"
                          value={convertedText}
                          onChange={setConvertedText}
                          style={{ minHeight: "250px" }}
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
                  <button
                    onClick={updateproduct}
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
      // </Layout>
    );
  }
}
