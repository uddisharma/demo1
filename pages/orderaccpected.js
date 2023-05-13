import React from "react";
import Layout from "../src/layout/Layout";
import Link from "next/link";
const orderaccpected = () => {
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
          Order Confirmed
        </h3>
        <div className="content-image">
          <p style={{textAlign:'center', display:'block', width:'100%'}}>Hi , thanks for placing your order with us. Your package is being processed and will be on its way soon. You can track your order at <Link href='/'> http://bit.ly/p1we1/trackorder</Link></p>
         
        </div>
        <div className="feedback-author">
         
          <div style={{display:'block', margin:'auto'}}>
            <img
            style={{width:'150px', height:'150px'}}
              src="assets/images/bag.png"
              alt="Authro"
            />
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default orderaccpected;
