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
import AdminSidebar from "../../src/components/AdminSidebar";
import { baseUrl } from "../api/hello";
import Select from "react-select";
export default function ProfilePage() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [data, setData] = useState({
    category: [],
    code: "",
    discount: 0,
    discountType: "",
  });
  const { code, discount } = data;
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
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleOnSelect = (item) => {
    categoryList.push(item._id);
    setData({ ...data, category: categoryList });
    console.log(data.category);
    categoryNames.push(item.name);
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

  const addcoupon = (e) => {
    e.preventDefault();

    if (document.getElementById("discount").value == "") {
      toast.notify("Discount fields is required", {
        duration: 2,
        type: "error",
      });
    } else if (categoryList.length <= 0) {
      toast.notify("Please add atleast one category", {
        duration: 2,
        type: "error",
      });
    } else {
      console.log(data);
      setLoading(true);

      axios
        .post(`${baseUrl}/create-coupon`, data)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            setLoading(false);
            toast.notify("Coupon Code is Created successfully", {
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
        });
    }
  };
  const handlediscounttype = (e) => {
    setData({ ...data, discountType: e.value });
    console.log(data.discountType)
  };
  const options = [
    { value: "rupees", label: "Rupees" },
    { value: "percentage", label: "Percentage" },
  ];
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
          <h2>Add Coupon Code </h2>
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
                  action="assets/php/form-process.php"
                  method="post"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="code"
                          value={code}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="code"
                          className="form-control"
                          placeholder="Coupon Code (optionnal)"
                          required=""
                          data-error="Please enter a code"
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
                          value={discount}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          className="form-control"
                          placeholder="Discount"
                          required=""
                          data-error="Please enter discount amount"
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
                      <div
                        style={{
                          width: "100%",
                          zIndex: "-1",
                          marginBottom: "30px",
                        }}
                      >
                        <ReactSearchAutocomplete
                          placeholder="Select Categories.."
                          items={newItems}
                          onSelect={handleOnSelect}
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <Select
                      
                        onChange={(e) => {
                          handlediscounttype(e);
                        }}
                        options={options}
                      />
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
                  <button onClick={addcoupon} className="theme-btn style-two">
                    Create Coupon
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
