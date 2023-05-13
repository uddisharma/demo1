import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
  } from "mdb-react-ui-kit";
  import React, { useEffect, useState } from "react";
  import AdminSidebar from "../../../src/components/AdminSidebar";
  import { toast, ToastContainer } from "react-nextjs-toast";
  import dynamic from "next/dynamic";
  const ReactQuill = dynamic(import("react-quill"), { ssr: false });
  import "react-quill/dist/quill.snow.css";
  import axios from "axios";
  import { baseUrl } from "../../api/hello";
  const Privacypolicies = () => {
    const [convertedText, setConvertedText] = useState("");
    useEffect(() => {
      axios
        .get(`${baseUrl}/terms-conditions`)
        .then((res) => {
          console.log(res);
          setConvertedText(res.data[0].content);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    const update = () => {
      axios
        .put(`${baseUrl}/update-terms-conditions/645f184f3c0cf1cfccb88b22`, {
          content: convertedText,
        })
        .then((res) => {
          console.log(res);
          toast.notify("Successfully Updated", {
            duration: 2,
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.notify("Something went wrong", {
            duration: 2,
            type: "error",
          });
        });
    };
  
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Terms & Conditions </h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol style={{}} lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <ToastContainer />
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
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      style={{
                        backgroundColor: "#ff7800",
                        marginTop: "20px",
                      }}
                      onClick={update}
                      className="theme-btn style-two"
                    >
                      Update
                      <i
                        style={{ marginRight: "7px" }}
                        className="fas fa-angle-double-right"
                      />
                    </button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  };
  
  export default Privacypolicies;
  