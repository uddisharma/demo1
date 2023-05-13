import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { baseUrl } from "../../api/hello";
import Link from "next/link";
import AdminSidebar from "../../../src/components/AdminSidebar";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
    axios
      .get(`${baseUrl}/sliders`)
      .then((res) => {
        // console.log(res);
        setData(res.data.sliders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);
  let id = data.length > 0 ? data[0]._id : null;
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Home Silders </h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol style={{}} lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <Link href={`/admin/slideredit/${id}`}>
                      <button
                        style={{ backgroundColor: "#ff7800" }}
                        type="submit"
                        className="theme-btn style-two"
                      >
                        Update Sliders
                        <i
                          style={{ marginRight: "7px" }}
                          className="fas fa-angle-double-right"
                        />
                      </button>
                    </Link>
                  </div>
                  {data.length > 0 &&
                    data[0].images.map((e, i) => (
                      <>
                        <img
                          style={{ marginBottom: "30px" }}
                          src={`${baseUrl}/${e}`}
                          alt="not found"
                        />
                      </>
                    ))}
                  {data.length <= 0 && <p>there is no sliders</p>}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
