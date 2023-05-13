import Link from "next/link";
import { useEffect, useState } from "react";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../slices/wishlistSlice";
import { addToBasket } from "../slices/basketSlice";
import { baseUrl } from "./api/hello";
const WishlistPage = () => {
  const wishlist = useSelector((state) => state.wishlist.wishItems);
  const dispatch = useDispatch();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <Layout>
        <div className="wishlist-area py-130 rpy-100">
          <div className="container">
            <div className="cart-item-wrap wow fadeInUp delay-0-2s">
              {wishlist &&
                wishlist.map((w, i) => (
                  <div className="cart-single-item" key={i}>
                    <button
                      type="button"
                      className="close"
                      onClick={
                        () => dispatch(removeFromWishlist(w))
                        // setwishList(wishList.filter((c) => c.id !== w.id))
                      }
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <div className="cart-img">
                      <img
                        src={`http://localhost:5000/${w.images[0]}`}
                        alt="Product Image"
                      />
                    </div>
                    <h5 className="product-name">
                      {w.name ? w.name.slice(0, 15) + "..." : ""}
                    </h5>
                    <span className="product-price">{w.price}</span>
                    <strong className="stock">
                      {w.stock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                    {w.stock > 0 ? (
                      <a
                        onClick={() => {
                          dispatch(addToBasket(w));
                        }}
                        className="theme-btn style-two"
                      >
                        Add to Cart
                      </a>
                    ) : (
                      <a className="theme-btn style-two">Not Available</a>
                    )}
                  </div>
                ))}
              {wishlist.length <= 0 && (
                <div style={{ width: "100%", textAlign: "center" }}>
                  <h2>Your Wishlist is Empty</h2>
                  <div style={{ display: "block", margin: "auto" }}>
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        marginTop: "20px",
                      }}
                      src="assets/images/wishlist.png"
                      alt="Authro"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Wishlist Area End */}
        {/* Client Logo Section Start */}
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
export default WishlistPage;
