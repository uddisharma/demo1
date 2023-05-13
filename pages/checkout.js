import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { setGetTotals } from "../slices/basketSlice";
import { toast, ToastContainer } from "react-nextjs-toast";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
import generateUniqueId from "generate-unique-id";
import { useMemo } from "react";
import { useRouter } from "next/router";
import {
  baseUrl,
  razorpayApi,
  razorpayKey,
  shiprocketOrder,
  shiprocketPushOrder,
} from "./api/hello";
import { hostPass, shiprocketAuth, shiprocketHost } from "./api/hello";
import { setuserLogin } from "../slices/userloginSlice";
const Checkout = () => {
  const user = useSelector((state) => state.user);
  // console.log(user.IsLogin);
  // console.log(shiprocketOrder)
  const dispatch = useDispatch();
  const router = useRouter();
  var items = useSelector((state) => state.cartitems);
  console.log(items)
  const [details, setDetails] = useState([]);
  const [razorpayloadId, setRazorpayId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [deliverCharge, setDeliveryCharge] = useState(0);
  const [weightage, setWeightage] = useState(1);
  const [CodNot, setCodNot] = useState(false);
  const [payment_method, setpayment_method] = useState("");
  const [loading, setloading] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [shippingtoken, setShippingToken] = useState("");

  const [payment_method_change, setPaymentMethod_change] = useState(false);
  let username;
  if (typeof window !== "undefined") {
    username = window.localStorage.getItem("username");
  }
  // let username = window.localStorage.getItem("username");
  useEffect(() => {
    axios
      .post(`${shiprocketAuth}`, {
        email: `${shiprocketHost}`,
        password: `${hostPass}`,
      })
      .then((res) => {
        setShippingToken(res.data.token);
        // console.log(res.data.token)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let coupon;
  if (typeof window !== "undefined") {
    coupon = localStorage.getItem("couponCode");
  }
  // let coupon = localStorage.getItem("couponCode");
  let subTotal = useMemo(() => {
    return items.reduce((total, val) => total + val.quantity * val.price, 0);
  }, [items]);
  let COD;
  {
    CodNot == true ? (COD = 0) : (COD = 1);
  }
  // console.log(COD);
  const checkdeliverychargebyCOD = () => {
    const zipcode = localStorage.getItem("zipcode");
    const api = `${shiprocketOrder}&delivery_postcode=${zipcode}&weight=${weightage}&cod=1`;

    if (zipcode == "") {
      alert("Please Enter Zipcode");
    } else {
      axios
        .get(api, { headers: { Authorization: `Bearer ${shippingtoken}` } })
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            console.log(payment_method);
            setPaymentMethod_change(true);
            setOrder({
              ...order,
              amount:
                subTotal +
                (res.data.data.available_courier_companies[0].freight_charge +
                  res.data.data.available_courier_companies[0].cod_charges),
              paymentmethod: "COD",
            });
            setDeliveryCharge(
              res.data.data.available_courier_companies[0].freight_charge +
                res.data.data.available_courier_companies[0].cod_charges
            );
            // console.log(res.data.data.available_courier_companies);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const checkdeliverychargebyPrepaid = () => {
    const zipcode = localStorage.getItem("zipcode");
    const api = `${shiprocketOrder}&delivery_postcode=${zipcode}&weight=${weightage}&cod=0`;

    if (zipcode == "") {
      alert("Please Enter Zipcode");
    } else {
      axios
        .get(api, { headers: { Authorization: `Bearer ${shippingtoken}` } })
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            setPaymentMethod_change(true);
            console.log(payment_method);

            setOrder({
              ...order,
              amount:
                subTotal +
                (res.data.data.available_courier_companies[0].freight_charge +
                  res.data.data.available_courier_companies[0].cod_charges),
              paymentmethod: "Prepaid",
            });
            setDeliveryCharge(
              res.data.data.available_courier_companies[0].freight_charge +
                res.data.data.available_courier_companies[0].cod_charges
            );
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // console.log(deliverCharge);
  let arr = [];
  for (var i = 0; i < items.length; i++) {
    let new_arr = {
      name: items[i].name,
      selling_price: items[i].price,
      sku: items[i]._id,
      units: items[i].quantity,
    };
    arr.push(new_arr);
  }

  let cCode;
  if (typeof window !== "undefined") {
    cCode = localStorage.getItem("couponCode");
  }
  {
    cCode ? (subTotal = subTotal - cCode) : (subTotal = subTotal);
  }
  // console.log(subTotal);

  const [order, setOrder] = useState({
    name: "",
    email: username,
    phone: "",
    alternatephone: "",
    state: "",
    district: "",
    city: "",
    zipcode: "",
    address: "",
    order: items,
    paymentmethod: "",
    amount: subTotal,
    orderDate: new Date(),
    deliveryDate: new Date(),
    status: "",
    paymentID: "",
    orderID: "",
    shipmentID: "",
  });
  // const [orderdata,setorderdata]= useState({
  //   name: "",
  //   email: username,
  //   phone: "",
  //   alternatephone: "",
  //   state: "",
  //   district: "",
  //   city: "",
  //   zipcode: "",
  //   address: "",
  //   order: items,
  //   paymentmethod: "",
  //   amount: subTotal,
  //   orderDate: new Date(),
  //   deliveryDate: new Date(),
  //   status: "",
  //   paymentID: "",
  //   orderID: "",
  //   shipmentID: "",
  // })
  // console.log(orderdata);
  const {
    name,
    phone,
    alternatephone,
    state,
    district,
    city,
    zipcode,
    address,
    paymentmethod,
  } = order;
  useEffect(() => {
    axios
      .post(`${baseUrl}/userprofile/${username}`)
      .then((res) => {
        setDetails(res.data);
        // console.log(res.data);
        setOrder({
          name: res.data.name ? res.data.name : "",
          phone: res.data.phone ? res.data.phone : "",
          alternatephone: res.data.alternatephone
            ? res.data.alternatephone
            : "",
          address: res.data.address ? res.data.address : "",
          zipcode: res.data.zipcode ? res.data.zipcode : "",
          city: res.data.city ? res.data.city : "",
          district: res.data.district ? res.data.district : "",
          state: res.data.state ? res.data.state : "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setGetTotals(subTotal));
  }, [setuserLogin]);
  const id = generateUniqueId({
    length: 10,
    useLetters: true,
  });

  const initialState = {
    order_id: "order_" + id,
    order_date: new Date(),
    pickup_location: "Primary",
    billing_customer_name: name,
    billing_last_name: name,
    billing_address: address,
    billing_city: city,
    billing_pincode: zipcode,
    billing_state: state,
    billing_country: "India",
    billing_email: details.email,
    billing_phone: phone,
    shipping_is_billing: true,
    order_items: arr,
    payment_method: paymentmethod,
    sub_total: order.amount,
    length: 10,
    breadth: 15,
    height: 20,
    weight: 2.5,
  };

  // var token = localStorage.getItem("token");
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const check = () => {
    console.log(initialState);
  };
  const handleChange = (e) => {
    {
      zipcode &&
        zipcode.length == 6 &&
        localStorage.setItem("zipcode", zipcode);
    }
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };
  const handlepaymentChange = (e) => {
    setpayment_method(e.target.value);
    console.log(e.target.value);
    setOrder({ ...order, paymentmethod: e.target.value });
    console.log(payment_method);
  };

  const handleorder = () => {
    if (
      name == "" ||
      phone == "" ||
      alternatephone == "" ||
      state == "" ||
      district == "" ||
      city == "" ||
      zipcode == "" ||
      address == ""
    ) {
      // toast.error("Please fill all the fields", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   theme: "colored",
      // });
      toast.notify("All Fields are required", {
        duration: 5,
        type: "error",
      });
      return;
    } else if (address.length < 10) {
      // toast.error("Address must be atleast 3 to 4 words", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   theme: "colored",
      // });
      toast.notify("Address must be ateast 3 to 4 characters", {
        duration: 5,
        type: "error",
      });
    } else {
      setloading(true);
      const api = `${shiprocketPushOrder}`;

      axios
        .post(api, initialState, {
          headers: { Authorization: `Bearer ${shippingtoken}` },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status_code == 1) {
            setOrder({
              ...order,
              orderID: res.data.order_id,
              shipmentID: res.data.shipment_id,
              status: res.data.status,
            });
            // console.log("283", order);
            setDelivery(true);
          } else {
            toast.error("order Failed ", {
              position: "top-right",
              autoClose: 3000,
              theme: "colored",
            });
            // navigate("/order/failed");
            // alert("Order Failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // console.log("300", order);

  // {
  //   delivery &&
  //     axios
  //       .post("${baseUrl}/addorder", order)
  //       .then((res) => {
  //         console.log(res);
  //         // if (res.status == 200) {
  //         //   console.log(res);
  //         //   setRazorpayId("");
  //         //   setloading(false);
  //         //   localStorage.removeItem("zipcode");
  //         //   for (var i = 0; i < items.length; i++) {
  //         //     const remainingStock =
  //         //       items[i].stock - items[i].quantity;

  //         //     axios
  //         //       .patch(
  //         //         `${baseUrl}/update-stock/${items[i]._id}`,
  //         //         {
  //         //           stock: remainingStock,
  //         //         }
  //         //       )
  //         //       .then((res) => {
  //         //         console.log(res);
  //         //       })
  //         //       .catch((err) => {
  //         //         console.log(err);
  //         //       });
  //         //   }
  //         //   router.push('/')
  //         //   // navigate("/order/accpected");
  //         //   // alert("order accopected successfully");
  //         // } else if (res.status == 404 || res.status == 500) {
  //         //   // navigate("/order/failed");
  //         //   // alert("order failed");
  //         // }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         // navigate("/order/failed");
  //       });
  // }
  // {
  //   delivery && console.log("delivery");
  // }
  // useEffect(() => {
  //   {
  //     name != "" &&
  //       axios
  //         .post(`${baseUrl}/addorder`, order)
  //         .then((res) => {
  //           console.log(res.data);
  //           if (res.status == 200) {
  //             router.push("/orderaccpected");
  //           } else {
  //             router.push("/orderfailed");
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //   }
  // }, [delivery == true]);

  const postorder = () => {
    console.log(order)
    // axios
    
    //   .post(`${baseUrl}/addorder`, order)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status == 200) {
    //       router.push("/orderaccpected");
    //     } else {
    //       router.push("/orderfailed");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const [isLoaded, setIsLoaded] = useState(true);

  // Payment Gatway

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const makePayment = async (amount) => {
    // if (
    //   name == "" ||
    //   phone == "" ||
    //   alternatephone == "" ||
    //   state == "" ||
    //   district == "" ||
    //   city == "" ||
    //   zipcode == "" ||
    //   address == ""
    // ) {
    //   toast.error("Please fill all the fields", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     theme: "colored",
    //   });
    //   return;
    // } else {
    const res = await loadScript(`${razorpayApi}`);
    if (!res) {
      // toast.error("Tracsaction failed ", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   theme: "colored",
      // });
      alert("tracsaction failed");

      return;
    }
    const options = {
      key: `${razorpayKey}`,
      currency: "INR",
      amount: amount * 100,
      name: "Fitbuzz Shop",
      description: "thanks for purchase",
      image:
        "https://res.cloudinary.com/dvuphar2o/image/upload/v1679116392/ak5a3rzzdsls1wvzg1qb.png",
      handler: function (res) {
        console.log(res);
        localStorage.setItem("razorpay_payment_id", res.razorpay_payment_id);
        setRazorpayId(res.razorpay_payment_id);
        setOrder({ ...order, paymentID: res.razorpay_payment_id });
        setPaymentStatus(true);
        console.log(razorpayloadId);
        localStorage.removeItem("couponCode");

        // toast.success("Payment Successfull", {
        //   position: "top-right",
        //   autoClose: 3000,
        //   theme: "colored",
        // });
      },
      prefill: {
        name: details.name,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    // }
  };

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  const [userloading, setuserLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;
  const handleuserChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  // useEffect(() => {
  //   {
  //     user.IsLogin == true && window.location.reload();
  //   }
  // }, []);
  const refresh = () => window.location.reload(true);
  const login = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      toast.notify("All Fields are required", {
        duration: 5,
        type: "error",
      });
    } else {
      setuserLoading(true);
      axios
        // .post(`${api}/login`, data)

        .post(`${baseUrl}/login`, data)
        .then((res) => {
          location.reload();
          console.log(res);
          localStorage.setItem("username", email);
          localStorage.setItem("token", res.data.token);
          if (res.status == 200) {
            setuserLoading(false);
            dispatch(setuserLogin(true));

            localStorage.setItem("username", email);
            localStorage.setItem("token", res.data.token);
            // setuserLogin(true)
            toast.notify("Login Successfull", {
              duration: 5,
              type: "success",
            });
          } else if (res.data.status == "failed") {
            toast.notify("Wrong Credentials", {
              duration: 5,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          //   toast.notify("Something went wrong", {
          //     duration: 5,
          //     type: "error",
          //   });
        });
    }
  };
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <Layout>
        <ToastContainer />
        {/* <PageBanner pageName={"Checkout"} /> */}
        <div className="checkout-form-area py-50 rpy-100">
          <div className="container">
            <Accordion
              className="checkout-faqs wow fadeInUp delay-0-2s"
              id="checkout-faqs"
            >
              {user.IsLogin == false ? (
                <div className="alert bg-lighter">
                  <h6>
                    Returning customer?{" "}
                    <Accordion.Toggle
                      as={"a"}
                      className="collapsed card-header c-cursor"
                      data-toggle="collapse"
                      data-target="#collapse0"
                      aria-expanded="false"
                      eventKey="collapse0"
                    >
                      Click here to login
                    </Accordion.Toggle>
                  </h6>
                  <Accordion.Collapse eventKey="collapse0" className="content">
                    <form onSubmit={(e) => e.preventDefault()} action="#">
                      <p>Please login your accont.</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              value={email}
                              onChange={handleuserChange}
                              type="email"
                              id="email-address"
                              name="email"
                              className="form-control"
                              defaultValue=""
                              placeholder="Your Email Address"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="password"
                              value={password}
                              onChange={handleuserChange}
                              id="password"
                              name="password"
                              className="form-control"
                              defaultValue=""
                              placeholder="Your Password"
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-footer">
                        {userloading ? (
                          <button className="theme-btn style-two">
                            <img
                              style={{ width: "25px", height: "25px" }}
                              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                            />
                            <i className="fas fa-angle-double-right" />
                          </button>
                        ) : (
                          <button
                            onClick={login}
                            className="theme-btn style-two"
                          >
                            login <i className="fas fa-angle-double-right" />
                          </button>
                        )}
                        <input
                          type="checkbox"
                          name="loss-passowrd"
                          id="loss-passowrd"
                          required=""
                        />
                        <label htmlFor="loss-passowrd">Remember me</label>
                      </div>
                      <a onClick={refresh} href="#">
                        Lost your password?
                      </a>
                    </form>
                  </Accordion.Collapse>
                </div>
              ) : (
                <div className="alert bg-lighter">
                  <h6>
                    {details.name} is Already Logined{" "}
                    <Accordion.Toggle
                      as={"a"}
                      className="collapsed card-header c-cursor"
                      data-toggle="collapse"
                      data-target="#collapse5"
                      aria-expanded="false"
                      eventKey="collapse5"
                    >
                      Click here to see you details
                    </Accordion.Toggle>
                  </h6>
                  <Accordion.Collapse eventKey="collapse5" className="content">
                    <form onSubmit={(e) => e.preventDefault()} action="#">
                      <p>Click here to see you details</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              id="email-address"
                              name="email-address"
                              className="form-control"
                              disabled
                              defaultValue={
                                details.name
                                  ? details.name
                                  : "" + " " + details.lastname
                                  ? details.lastname
                                  : ""
                              }
                              // placeholder="Your Email Address"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              disabled
                              className="form-control"
                              defaultValue={details.email}
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="form-footer">
                      <button type="submit" className="theme-btn style-two">
                        login <i className="fas fa-angle-double-right" />
                      </button>
                      <input
                        type="checkbox"
                        name="loss-passowrd"
                        id="loss-passowrd"
                        required=""
                      />
                      <label htmlFor="loss-passowrd">Remember me</label>
                    </div>
                    <a href="#">Lost your password?</a> */}
                    </form>
                  </Accordion.Collapse>
                </div>
              )}

              <div className="alert bg-lighter">
                {user.IsLogin ? (
                  <h6>
                    Billing Details{" "}
                    <Accordion.Toggle
                      as={"a"}
                      className="collapsed card-header c-cursor"
                      data-toggle="collapse"
                      data-target="#collapse2"
                      aria-expanded="false"
                      eventKey="collapse2"
                    >
                      Click here add billing details
                    </Accordion.Toggle>
                  </h6>
                ) : (
                  <h6>
                    Billing Details{" "}
                    <Accordion.Toggle
                      as={"a"}
                      className="collapsed card-header c-cursor"
                      data-toggle="collapse"
                      data-target="#collapse2"
                      aria-expanded="false"
                      eventKey="collapse2"
                    >
                      Please login to add billing details
                    </Accordion.Toggle>
                  </h6>
                )}
                {user.IsLogin && (
                  <Accordion.Collapse
                    style={{ paddingTop: "30px" }}
                    eventKey="collapse2"
                    className="content"
                  >
                    <>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        id="checkout-form"
                        className="checkout-form wow fadeInUp delay-0-2s"
                        name="checkout-form"
                        action="#"
                        method="post"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <h6>Personal Information</h6>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                id="first-name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="Name"
                                required=""
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            className="form-control"
                            defaultValue=""
                            placeholder="Last Name"
                            required=""
                          />
                        </div>
                      </div> */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="number"
                                id="number"
                                name="phone"
                                value={phone}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="Phone Number"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={details.email}
                                // onChange={handleChange}
                                disabled
                                className="form-control"
                                defaultValue=""
                                placeholder="Email Address"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                id="company-name"
                                name="alternatephone"
                                value={alternatephone}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="Alternate phone number"
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="company-address"
                            name="company-address"
                            className="form-control"
                            defaultValue=""
                            placeholder="Company Address (optional)"
                          />
                        </div>
                      </div> */}
                          {/* <div className="col-lg-12">
                        <h6>Your Address</h6>
                      </div>
                      <div className="col-md-6 mb-30">
                        <div className="form-group">
                          <select name="country" id="country">
                            <option value="value1">Select Country</option>
                            <option value="value2">Australia</option>
                            <option value="value3">Canada</option>
                            <option value="value4">China</option>
                            <option value="value5">Morocco</option>
                            <option value="value6">Saudi Arabia</option>
                            <option value="value7">United Kingdom (UK)</option>
                            <option value="value8">United States (US)</option>
                          </select>
                        </div>
                      </div> */}

                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                id="state"
                                name="state"
                                value={state}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="State"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                id="district"
                                name="district"
                                value={district}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="District"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                value={city}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="City"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="number"
                                id="zip"
                                name="zipcode"
                                value={zipcode}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="Zip"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="address"
                                id="street-name"
                                name="address"
                                value={address}
                                onChange={handleChange}
                                className="form-control"
                                defaultValue=""
                                placeholder="House, street name"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="text"
                                id="apartment-name"
                                name="apartment-name"
                                className="form-control"
                                defaultValue=""
                                placeholder="Apartment, suite, unit etc. (optional)"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <h6>Order Notes (optional)</h6>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group mb-0">
                              <textarea
                                name="order-note"
                                id="order-note"
                                className="form-control"
                                rows={5}
                                placeholder="Notes about your order, e.g. special notes for delivery."
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                      </form>

                      {/* <button
                  onClick={check}
                    style={{ marginTop: "30px" }}
                    className="theme-btn style-two"
                  >
                    Add address{" "}
                    <i className="fas fa-angle-double-right" />
                  </button> */}
                    </>
                  </Accordion.Collapse>
                )}
              </div>
              {coupon ? (
                <div className="alert bg-lighter">
                  <h6>
                    Coupon Code Applied Already{" "}
                    <Accordion.Toggle
                      // onClick={handleclick}
                      as={"a"}
                      className="collapsed card-header c-cursor"
                      data-toggle="collapse"
                      data-target="#collapse3"
                      aria-expanded="false"
                      eventKey="collapse3"
                    >
                      Click here to See your Coupon
                    </Accordion.Toggle>
                  </h6>
                  <Accordion.Collapse eventKey="collapse3" className="content">
                    <form onSubmit={(e) => e.preventDefault()} action="#">
                      {/* <p>If you have a coupon code, please apply it below.</p>
                   <div className="form-group">
                     <input
                       type="text"
                       id="coupon-code"
                       name="coupon-code"
                       className="form-control"
                       defaultValue=""
                       placeholder="Coupon Code"
                       required=""
                     />
                   </div> */}
                      <button className="theme-btn style-two">
                        You have saved <strong> ₹ {coupon}</strong>{" "}
                        <i className="fas fa-angle-double-right" />
                      </button>
                    </form>
                  </Accordion.Collapse>
                </div>
              ) : (
                <div className="alert bg-lighter">
                  <h6>
                    Have a coupon?{" "}
                    <Accordion.Toggle
                      // onClick={handleclick}
                      as={"a"}
                      className="collapsed card-header c-cursor"
                      data-toggle="collapse"
                      data-target="#collapse3"
                      aria-expanded="false"
                      eventKey="collapse3"
                    >
                      Click here to enter your code
                    </Accordion.Toggle>
                  </h6>
                  <Accordion.Collapse eventKey="collapse3" className="content">
                    <form onSubmit={(e) => e.preventDefault()} action="#">
                      <p>If you have a coupon code, please apply it below.</p>
                      <div className="form-group">
                        <input
                          type="text"
                          id="coupon-code"
                          name="coupon-code"
                          className="form-control"
                          defaultValue=""
                          placeholder="Coupon Code"
                          required=""
                        />
                      </div>
                      <button type="submit" className="theme-btn style-two">
                        apply coupon <i className="fas fa-angle-double-right" />
                      </button>
                    </form>
                  </Accordion.Collapse>
                </div>
              )}
            </Accordion>
            {/* <h4 className="form-title mt-50 mb-25">Billing Details</h4> */}

            <div className="payment-cart-total pt-25">
              <div className="row justify-content-between">
                <div className="col-lg-6">
                  <div className="payment-method mt-45 wow fadeInUp delay-0-2s">
                    <h4 className="form-title my-25">Payment Method</h4>
                    <Accordion
                      defaultActiveKey="collapseOne"
                      as="ul"
                      id="paymentMethod"
                      className="mb-30"
                    >
                      {/* Default unchecked */}
                      {/* <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodone"
                        name="defaultExampleRadios"
                        defaultChecked
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label"
                        htmlFor="methodone"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        eventKey="collapseOne"
                      >
                        Direct Bank Transfer{" "}
                        <i className="fas fa-money-check" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseOne"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped our account.
                        </p>
                      </Accordion.Collapse>
                    </li> */}
                      {/* Default unchecked */}
                      <li className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input"
                          id="methodtwo"
                          // name="defaultExampleRadios"
                          value="COD"
                          name="paymentmethod"
                        />
                        <Accordion.Toggle
                          onClick={checkdeliverychargebyCOD}
                          as="label"
                          className="custom-control-label collapsed"
                          htmlFor="methodtwo"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          eventKey="collapseTwo"
                        >
                          Cash On Delivery <i className="fas fa-truck" />
                        </Accordion.Toggle>
                        <Accordion.Collapse
                          eventKey="collapseTwo"
                          data-parent="#paymentMethod"
                          style={{}}
                        >
                          <>
                            <p>Pay with cash on delivery.</p>
                            <p>
                              Delivery Charge :{" "}
                              <strong>₹{deliverCharge}</strong>{" "}
                            </p>
                          </>
                        </Accordion.Collapse>
                      </li>
                      {/* Default unchecked */}
                      <li className="custom-control custom-radio">
                        <input
                          value="Prepaid"
                          name="paymentmethod"
                          type="radio"
                          className="custom-control-input"
                          id="methodthree"
                          // name="defaultExampleRadios"
                        />
                        <Accordion.Toggle
                          onClick={checkdeliverychargebyPrepaid}
                          as="label"
                          className="custom-control-label collapsed"
                          htmlFor="methodthree"
                          data-toggle="collapse"
                          data-target="#collapsethree"
                          eventKey="collapsethree"
                        >
                          Prepaid Payment <i className="fab fa-cc-paypal" />
                        </Accordion.Toggle>
                        <Accordion.Collapse
                          eventKey="collapsethree"
                          data-parent="#paymentMethod"
                          style={{}}
                        >
                          {/* <p>
                          Pay via PayPal; you can pay with your credit card if
                          you don’t have a PayPal account.
                        </p> */}
                          <>
                            <div className="social-style-two pt-10">
                              <a>
                                {/* <i className="fab fa-facebook-f" /> */}
                                <img
                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                  alt="not found"
                                />
                              </a>

                              <a>
                                <img
                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                  alt="not found"
                                />
                              </a>

                              <a>
                                <img
                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                  alt="not found"
                                />
                              </a>

                              <a>
                                <img
                                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                  alt="not found"
                                />
                              </a>
                            </div>
                            <p>
                              Delivery Charge :{" "}
                              <strong>₹{deliverCharge}</strong>{" "}
                            </p>
                          </>
                        </Accordion.Collapse>
                      </li>
                    </Accordion>
                    <p>
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described ins our privacy policy.
                    </p>
                    {/* <button
                    onClick={()=>{
                      makePayment(100)
                    }}
                    type="button"
                    className="theme-btn mt-15"
                  >
                    Place order
                  </button> */}
                    {paymentmethod === "COD" ? (
                      <>
                        {/* <h3>Delivery Charges : {deliverCharge}</h3> */}
                        <button
                          onClick={() => {
                            // handleorder();
                            postorder();
                          }}
                          className="theme-btn mt-15"
                        >
                          Confirm Order
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                    {paymentmethod === "Prepaid" ? (
                      <>
                        {/* <h3>Delivery Charges : {deliverCharge}</h3> */}
                        <button
                          onClick={() => {
                            makePayment(Math.round(subTotal + deliverCharge));
                          }}
                          className="theme-btn mt-15"
                        >
                          Pay Now
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                    {razorpayloadId.length > 0 && paymentStatus == true ? (
                      <button
                        style={{ marginLeft: "30px" }}
                        onClick={() => {
                          handleorder();
                        }}
                        className="theme-btn mt-15"
                      >
                        Confirm Order
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="shoping-cart-total mt-45 wow fadeInUp delay-0-4s">
                    <h4 className="form-title m-25">Cart Totals</h4>
                    <table>
                      <tbody>
                        {items.map((card) => (
                          <tr key={card._id}>
                            <td>
                              {card.name ? card.name.slice(0, 20) : ""}{" "}
                              <strong>× {card.quantity}</strong>
                            </td>
                            <td>₹{(card.quantity * card.price).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td>Total Discount</td>
                          <td>₹{cCode}</td>
                        </tr>
                        <tr>
                          <td>Shipping Fee</td>
                          <td>₹{deliverCharge}</td>
                        </tr>
                        {/* <tr>
                        <td>Vat</td>
                        <td>₹{Number(vat).toFixed(2)}</td>
                      </tr> */}
                        <tr>
                          <td>
                            <strong>Order Total</strong>
                          </td>
                          <td>
                            <strong>₹{subTotal + deliverCharge}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
export default Checkout;
