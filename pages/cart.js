import Link from "next/link";
import { useEffect, useState } from "react";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { toast, ToastContainer } from "react-nextjs-toast";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import axios from "axios";
import {
  removeFromBasket,
  plusItem,
  minusItem,
  setGetTotals,
} from "../slices/basketSlice";
import selectItems from "../slices/basketSlice";
import { baseUrl } from "./api/hello";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../slices/cartSlice";
const CartPage = () => {
  var items = useSelector((state) => state.cartitems);
  console.log(items);
  // console.log(items);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState([]);
  const [applieddis, setAppliedDis] = useState(0);
  let cCode;
  if (typeof window !== "undefined") {
    cCode = localStorage.getItem("couponCode");
  }
  let subTotal = useMemo(() => {
    return items.reduce(
      (total, val) => total + val.quantity * val.price,
      0
    );
  }, [items, applieddis]);
  useEffect(() => {
    {
      cCode ? setAppliedDis(cCode) : (subTotal = subTotal);
    }
  }, []);
  useEffect(() => {
    dispatch(
      setGetTotals(
        items.reduce((total, val) => total + val.quantity * val.price, 0)
      )
    );
  }, []);
  // console.log(items)

  useEffect(() => {
    axios
      .get(`${baseUrl}/coupons`)
      .then((res) => {
        setCoupons(res.data);
        console.log(res.data);

        for (let i = 0; i < items.length; i++) {
          console.log("Item", items[i]);
          for (let j = 0; j < items[i].category.length; j++) {
            console.log("itemcategory", items[i].category);
            for (let k = 0; k < res.data.length; k++) {
              console.log("coupon", res.data[k]);
              for (let l = 0; l < res.data[k].category.length; l++) {
                console.log("couponcategory", res.data[k].category);
                if (
                  items[i].category[j].category ==
                  res.data[k].category[l].category
                ) {
                  console.log(res.data[k].discount);
                  if (res.data[k].discountType == "rupees") {
                    setAppliedDis(applieddis + res.data[k].discount);
                    localStorage.setItem(
                      "couponCode",
                      applieddis + res.data[k].discount
                    );
                  } else {
                    let totaldiscount = Math.round(
                      (subTotal / 100) * res.data[i].discount
                    );
                    setAppliedDis(applieddis + totaldiscount);
                    localStorage.setItem(
                      "couponCode",
                      applieddis + totaldiscount
                    );
                  }
                }
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(items);
  const applyCoupon = () => {
    const applied = document.getElementById("coupon").value;
    if (cCode && cCode.code === applied) {
      toast.notify(`youhave already used this code`, {
        duration: 5,
        type: "error",
      });
    }
    if (applied == "") {
      toast.notify(`Please enter a coupon code`, {
        duration: 5,
        type: "error",
      });
    } else {
      for (let i = 0; i < coupons.length; i++) {
        if (coupons[i].code == applied) {
          document.getElementById("coupon").disabled = true;
          if (coupons[i].discountType == "rupees") {
            console.log("you have saved in rupees");
            setAppliedDis(applieddis + coupons[i].discount);
            localStorage.setItem(
              "couponCode",
              coupons[i].discount + applieddis
            );
            toast.notify(
              `Hurray you have saved ${coupons[i].discount} rupees`,
              {
                duration: 5,
                type: "success",
              }
            );
          } else {
            let totaldiscount = Math.round(
              (subTotal / 100) * coupons[i].discount
            );
            setAppliedDis(applieddis + totaldiscount);
            console.log("you have saved in percentage");
            localStorage.setItem("couponCode", applieddis + totaldiscount);
            document.getElementById("coupon").disabled = true;
            toast.notify(`Hurray you have saved ${totaldiscount} rupees`, {
              duration: 5,
              type: "success",
            });
          }
        }
      }
    }
  };

  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <Layout>
        <div className="cart-area py-50 rpy-100">
          <ToastContainer />
          <div className="container">
            <div className="cart-item-wrap mb-35 wow fadeInUp delay-0-2s">
              {items.length > 0 &&
                items.map((cart, i) => (
                  <div className="cart-single-item" key={i}>
                    <button
                      type="button"
                      className="close"
                      onClick={() => {
                        dispatch(removeFromCart(cart._id));
                        localStorage.removeItem("couponCode");
                        setAppliedDis(0);
                      }}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <div className="cart-img">
                      {/* {cart.length > 0
                        ? console.log(cart.images)
                        : console.log(cart.images.length)} */}
                      <img
                        src={`${baseUrl}/${
                          cart.images.length > 0 ? cart.images[0] : ""
                        }`}
                        alt="Product Image"
                      />
                    </div>
                    <h5 className="product-name">
                      {cart.name ? cart.name.slice(0, 40) : ""}
                    </h5>
                    <span className="product-price">{cart.price}</span>
                    <div className="quantity-input">
                      <button
                        className="quantity-down"
                        onClick={() => {
                          if (cart.quantity > 1) {
                            dispatch(decrementQuantity(cart._id));
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        className="quantity"
                        type="text"
                        defaultValue={cart.quantity}
                        value={cart.quantity}
                        name="quantity"
                      />
                      <button
                        className="quantity-up"
                        onClick={() => {
                          if (cart.quantity > 0) {
                            dispatch(incrementQuantity(cart._id));
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                    <span className="product-total-price">
                      {cart.quantity * cart.price}
                    </span>
                  </div>
                ))}
              {items.length <= 0 && (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <h2>Your Cart is Empty</h2>
                  <div style={{ display: "block", margin: "auto" }}>
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        marginTop: "20px",
                      }}
                      src="assets/images/shopping-cart.png"
                      alt="Authro"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="row text-center text-lg-left align-items-center wow fadeInUp delay-0-2s">
              <div className="col-lg-6">
                <div className="discount-wrapper rmb-30">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    action="#"
                    className="d-sm-flex justify-content-center justify-content-lg-start"
                  >
                    <input
                      type="text"
                      id="coupon"
                      placeholder="Coupon Code"
                      required=""
                    />
                    <button
                      className="theme-btn flex-none"
                      onClick={applyCoupon}
                    >
                      apply Coupon <i className="fas fa-angle-double-right" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="update-shopping text-lg-right">
                  <Link href="/shop">
                    <a className="theme-btn style-two">
                      shopping <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="payment-cart-total pt-25 wow fadeInUp delay-0-2s">
              <div className="row justify-content-end">
                <div className="col-lg-5">
                  <div className="shoping-cart-total mt-45">
                    <h4 className="form-title m-25">Cart Totals</h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>Cart Subtotal</td>
                          <td className="sub-total-price">
                            {items.reduce(
                              (val, item) => val + item.price * item.quantity,
                              0
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Discount</td>

                          <td className="shipping-price">{applieddis}</td>
                        </tr>

                        <tr>
                          <td>
                            <strong>Order Total</strong>
                          </td>
                          <td>
                            <strong className="total-price">
                              {subTotal - applieddis}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {items.length > 0 && (
                      <Link href="/checkout">
                        <a className="theme-btn style-two mt-25 w-100">
                          Proceed to checkout
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="client-logo-section text-center bg-light-green py-60">
          <div className="container">
            <ClientLogoSlider />
          </div>
          <div className="client-logo-shapes">
            <img
              className="shape-one"
              src="assets/images/shapes/cl-shape1.png"
              alt="Shape"
            />
            <img
              className="shape-two"
              src="assets/images/shapes/cl-shape2.png"
              alt="Shape"
            />
            <img
              className="shape-three"
              src="assets/images/shapes/cl-shape3.png"
              alt="Shape"
            />
            <img
              className="shape-four"
              src="assets/images/shapes/cl-shape4.png"
              alt="Shape"
            />
            <img
              className="shape-five"
              src="assets/images/shapes/cl-shape5.png"
              alt="Shape"
            />
            <img
              className="shape-six"
              src="assets/images/shapes/cl-shape6.png"
              alt="Shape"
            />
          </div>
        </div>
      </Layout>
    );
  }
};
export default CartPage;
