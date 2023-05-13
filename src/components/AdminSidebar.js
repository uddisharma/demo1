import React, { useEffect, useState } from "react";
import { baseUrl } from "../../pages/api/hello";
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
import Link from "next/link";
import axios from "axios";
import { setadminLogin } from "../../slices/adminloginslice";
import { useDispatch } from "react-redux";
const AdminSidebar = () => {
  const dispatch = useDispatch();

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  const logoutadmin = () => {
    dispatch(setadminLogin(false));
    localStorage.removeItem("admintoken");
    window.location.href = "/";
  };
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <div>
        <MDBCard className="mb-4 mb-lg-0">
          <MDBCardBody className="p-0">
            <MDBListGroup flush className="rounded-3">
              <Link href="/admin/dashboard">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Dashboard
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              <Link href="/admin/products">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Products
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              {/* <Link href="/admin/addproduct">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Add Product
                  </MDBCardText>
                </MDBListGroupItem>
              </Link> */}
              <Link href="/admin/orders">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Orders
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              <Link href="/admin/payments">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Payments
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              <Link href="/admin/users">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Users
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              <Link href="/admin/coupons">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Coupons
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              <Link href="/admin/categories">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Categories
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              <Link href="/admin/homepage">
                <MDBListGroupItem
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-between align-items-center p-3"
                >
                  <MDBCardText style={{ fontWeight: "bold" }}>
                    Home Page
                  </MDBCardText>
                </MDBListGroupItem>
              </Link>
              <MDBListGroupItem
                onClick={() => {
                  logoutadmin();
                }}
                style={{ cursor: "pointer" }}
                className="d-flex justify-content-between align-items-center p-3"
              >
                <MDBCardText style={{ fontWeight: "bold" }}>Logout</MDBCardText>
              </MDBListGroupItem>
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
};

export default AdminSidebar;
