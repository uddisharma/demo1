// import axios from "axios";
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// const addsliders = () => {
//     const router = useRouter();
//     const id= router.query.id;
//     console.log(id)
//   const [image, setImage] = useState([]);
//   const addslider = (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     Array.from(image).forEach((item) => {
//       formData.append("products", item);
//     });
//     console.log(image);
//     axios
//       .put(`${baseUrl}/update-sliders/${id}`, formData)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div>
//       {Array.from(image).map((item) => {
//         return (
//           <span>
//             <img
//               style={{ padding: "10px" }}
//               width={150}
//               height={100}
//               src={item ? URL.createObjectURL(item) : null}
//             />
//           </span>
//         );
//       })}
//       <div className="col-md-12">
//         <div className="form-group">
//           <input
//             onChange={(e) => {
//               setImage(e.target.files);
//             }}
//             multiple
//             type="file"
//             id="photo"
//             name="photo"
//             className="form-control"
//             defaultValue=""
//             placeholder="Profile Photo"
//             required=""
//             data-error="Please select a photo"
//           />
//           <div className="help-block with-errors" />
//         </div>
//       </div>
//       <button onClick={addslider}>Add</button>
//     </div>
//   );
// };

// export default addsliders;

import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast, ToastContainer } from "react-nextjs-toast";
import AdminSidebar from "../../../src/components/AdminSidebar";
import { useRouter } from "next/router";
import Link from "next/link";

import { baseUrl } from "../../api/hello";
export default function Orders() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  const router = useRouter();
  const id = router.query.id;
  console.log(id);
  const [image, setImage] = useState([]);
  const addslider = (e) => {
    e.preventDefault();
    let formData = new FormData();
    Array.from(image).forEach((item) => {
      formData.append("products", item);
    });
    console.log(image);
    axios
      .put(`${baseUrl}/update-sliders/${id}`, formData)
      .then((res) => {
        console.log(res);
        if ((res.status = 200)) {
          toast.notify("Sliders are Updated successfully", {
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

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <ToastContainer />
        <div className="section-title text-center pt-20 mb-10">
          <h2>Update Home Sliders </h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol style={{}} lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  {Array.from(image).map((item) => {
                    return (
                      <span>
                        <img
                          style={{ padding: "10px" }}
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
                        placeholder="Category Name"
                        required=""
                        data-error="Please enter a code"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <Link href={"/admin/home/sliders"}>
                      <button
                        style={{ backgroundColor: "#ff7800" }}
                        className="theme-btn style-two"
                      >
                        Cancel
                        <i
                          style={{ marginRight: "7px" }}
                          className="fas fa-angle-double-right"
                        />
                      </button>
                    </Link>
                    <button
                      style={{ backgroundColor: "#ff7800" }}
                      className="theme-btn style-two"
                      onClick={addslider}
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
  }
}
