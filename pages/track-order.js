import React, { useState } from "react";
import Layout from "../src/layout/Layout";
import { toast, ToastContainer } from "react-nextjs-toast";
import axios from "axios";
const Trackorder = () => {
  const [id, setId] = useState("");
  const trackorder = () => {
    if (id == "") {
      toast.notify("Please Enter Order Id", {
        duration: 5,
        type: "error",
      });
    } else {
      const api = `https://apiv2.shiprocket.in/v1/external/courier/track?order_id=${id}`;
      const token = localStorage.getItem("shiprockettoken");
      axios
        .get(api, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res);
          setOrder(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.notify("Order Id is not Valid", {
            duration: 5,
            type: "error",
          });
        });
    }
  };
  return (
    <Layout>
      {/* <div></div> */}
      <ToastContainer />
      <div className="container py-50">
        <div style={{ margin: "auto" }} className="col-md-6 ">
          <div className="form-group">
            <input
              type="number"
              id="tracking Id"
              onChange={(e) => {
                setId(e.target.value);
              }}
              value={id}
              name="order id"
              className="form-control"
              defaultValue=""
              placeholder="Enter Order Id"
              required=""
              data-error="Please enter your  Order Id"
            />
            <div className="help-block with-errors" />
          </div>
          <div style={{ textAlign: "center" }} className="form-group mb-0">
            <button
              onClick={() => {
                trackorder();
              }}
              className="theme-btn style-two"
            >
              Track
              <i className="fas fa-angle-double-right" />
            </button>
            <div id="msgSubmit" className="hidden" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Trackorder;
