import Link from "next/link";
import { useEffect, useState } from "react";
import ClientLogoSlider from "../../../src/components/ClientLogoSlider";
import PageBanner from "../../../src/components/PageBanner";
import Layout from "../../../src/layout/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "../../api/hello";
const OrderDetails = () => {
  const router = useRouter();
  const id = router.query;
  // console.log(id);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/order/${id.id}`)
      .then((res) => {
        setLoading(false);
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(order);

  return (
    <Layout>
      {/* <PageBanner pageName={"Wishlist Page"} /> */}
      <div className="wishlist-area py-50 rpy-100">
        <div className="container">
          {loading && (
            <div
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
            </div>
          )}
          <div className="cart-item-wrap wow fadeInUp delay-0-2s">
            {order.order
              ? order.order.map((w, i) => (
                  <div className="cart-single-item" key={i}>
                    {/* <button
                  type="button"
                  className="close"
                  onClick={() =>
                    setwishList(wishList.filter((c) => c.id !== w.id))
                  }
                >
                  <span aria-hidden="true">×</span>
                </button> */}
                    <div className="cart-img">
                      <img
                        src={`${baseUrl}/${w.images[0]}`}
                        alt="Product Image"
                      />
                    </div>
                    <h5 className="product-name">
                      {w.name ? w.name.slice(0, 35)+"..." : ""}
                    </h5>
                    <span className="product-price">{w.price}</span>
                    <strong className="stock">{w.status}</strong>
                    <Link href={`/product/${w._id}`}>
                      <a className="theme-btn style-two">Buy Again</a>
                    </Link>
                  </div>
                ))
              : ""}
          </div>
          <div className="payment-cart-total pt-25 pb-30 wow fadeInUp delay-0-2s">
            <div className="row justify-content-end">
              <div className="col-lg-5">
                <div className="shoping-cart-total mt-45">
                  <h4 className="form-title m-25">Total Amount</h4>
                  <table>
                    <tbody>
                      <tr>
                        <td>Cart Subtotal</td>
                        <td className="sub-total-price">
                          {/* {order
                            ? order.reduce(
                                (val, item) => val + item.price * item.quantity,
                                0
                              )
                            : ""} */}
                          {order.amount + Math.round((order.amount / 100) * 10)}
                        </td>
                      </tr>
                      <tr>
                        <td>Total Saving</td>
                        <td className="shipping-price">
                          {Math.round((order.amount / 100) * 10)}{" "}
                        </td>
                      </tr>
                      {/* <tr>
                        <td>Vat</td>
                        <td>₹{vat}</td>
                      </tr> */}
                      <tr>
                        <td>
                          <strong>Order Total</strong>
                        </td>
                        <td>
                          <strong className="total-price">
                            {/* {items.items.reduce(
                              (val, item) => val + item.price * item.quantity,
                              0
                            ) - 60} */}
                            {/* {subTotal} */}
                            {order.amount}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Link href="/shop">
                    <a className="theme-btn style-two mt-25 w-100">Shop More</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Area End */}
      {/* Client Logo Section Start */}
      {/* <div className="client-logo-section text-center bg-light-green py-60">
       
        <div className="client-logo-shapes">
          <img
            className="shape-one"
            src="/assets/images/shapes/c1-shape1.png"
            alt="/Shape"
          />
          <img
            className="shape-two"
            src="/assets/images/shapes/cl-shape2.png"
            alt="Shape"
          />
          <img
            className="shape-three"
            src="/assets/images/shapes/cl-shape3.png"
            alt="Shape"
          />
          <img
            className="shape-four"
            src="/assets/images/shapes/cl-shape4.png"
            alt="Shape"
          />
          <img
            className="shape-five"
            src="/assets/images/shapes/cl-shape5.png"
            alt="Shape"
          />
          <img
            className="shape-six"
            src="/assets/images/shapes/cl-shape6.png"
            alt="Shape"
          />
        </div>
      </div> */}
    </Layout>
  );
};
export default OrderDetails;
