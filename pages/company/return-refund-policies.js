import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../api/hello";

const ReturnRefund = () => {
  const [convertedText, setConvertedText] = useState("");
  useEffect(() => {
    axios
      .get(`${baseUrl}/return-policy`)
      .then((res) => {
        console.log(res);
        setConvertedText(res.data[0].content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <h2 style={{textAlign:'center'}}>Return & Refund Policies</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: convertedText ? convertedText : "",
        }}
      />
    </div>
  );
};

export default ReturnRefund;
