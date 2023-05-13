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
import { baseUrl } from "../api/hello";
import Layout from "../../src/layout/Layout";
import axios from "axios";
import Link from "next/link";
import AdminSidebar from "../../src/components/AdminSidebar";
export default function Dashboard() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Home Page </h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol style={{}} lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <div className="row mt-30">
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-wheat-sack" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/categories">Categories</Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-fruits" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/sliders">Sliders</Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-eggs-1" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/videos">Videos</Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-social-care" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/imagegallery">
                            Image Gallery
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-eggs-1" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/reviews">Reviews</Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-social-care" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/imagegallery">
                            <Link href="/admin/home/blogs">Blogs</Link>
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-social-care" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/imagegallery">
                            <Link href="/admin/home/privacy-policies">
                              Privacy Policies
                            </Link>
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-social-care" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/imagegallery">
                            <Link href="/admin/home/terms-conditions">
                              Terms & Conditions
                            </Link>
                          </Link>
                        </h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="about-feature-two">
                        <div className="icon">
                          {/* <i className="flaticon-social-care" /> */}
                        </div>
                        <h4>
                          <Link href="/admin/home/imagegallery">
                            <Link href="/admin/home/return-refund-policies">
                              Return & Refund Policies
                            </Link>
                          </Link>
                        </h4>
                      </div>
                    </div>
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
