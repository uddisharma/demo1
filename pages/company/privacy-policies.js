import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../api/hello";

const Privacypolicies = () => {
  const [convertedText, setConvertedText] = useState("");
  useEffect(() => {
    axios
      .get(`${baseUrl}/privacy-policy`)
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
      <h2 style={{textAlign:'center'}}>Privacy-Policies</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: convertedText ? convertedText : "",
        }}
      />
    </div>
  );
};

export default Privacypolicies;
