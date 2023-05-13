import React from "react";
import Layout from "../src/layout/Layout";
import Link from "next/link";
const orderfailed = () => {
  return (
    <Layout>
      <div
        style={{
          display: "block",
          margin: "auto",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
        className="feedback-item style-two "
      >
        <h3 style={{ textAlign: "center", display: "block", width: "100%" }}>
          Order Failed
        </h3>
        <div className="content-image">
          <p style={{ textAlign: "center", display: "block", width: "100%" }}>
            {" "}
            Oops! Your Order has been declined. Please try again later{" "}
            <Link href="/shop"> http://bit.ly/p1we1/shop</Link>
          </p>
        </div>
        <div className="feedback-author">
          <div style={{ display: "block", margin: "auto" }}>
            <img
              style={{ width: "100px", height: "100px" }}
              src="assets/images/delete.png"
              alt="Authro"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default orderfailed;
