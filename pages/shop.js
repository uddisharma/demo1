import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PageBanner from "../src/components/PageBanner";
import Pagination from "../src/components/Pagination";
import Layout from "../src/layout/Layout";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../slices/wishlistSlice";
import { addToBasket } from "../slices/basketSlice";
import SideBar from "../src/layout/SideBar";
import Sidebar from "../src/components/Sidebar";
import { baseUrl } from "../pages/api/hello.js";
import Select from "react-select";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";
import { addToCart } from "../slices/cartSlice";
// import { useSearchParams } from 'next/navigation';
const ShopLeftSidebar = () => {
  // const searchParams = useSearchParams();

  // searchParams.set("page", "1");
  const options = [
    { value: "name", label: "Name : A-Z" },
    { value: "-name", label: "Name : Z-A" },
    { value: "-price", label: "Price : H-L" },
    { value: "price", label: "Price : L-H" },
    { value: "-discount", label: "Discount : H-L" },
    { value: "discount", label: "Discount : L-H" },
  ];
  const dispatch = useDispatch();
  const [cartAdded, setCartAdded] = useState(false);
  const [wishAdded, setWishAdded] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("-price");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handlesort = (e) => {
    setSort(e.value);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  function isProductInCart(productId) {
    // Get the cart items from localStorage
    let cartItems;
    if (typeof window !== "undefined") {
      cartItems = JSON.parse(localStorage.getItem("cartadded")) || [];
    }

    // Check if the product is already in the cart
    if (cartItems.length > 0) {
      return cartItems.some((item) => item.id == productId);
    }
  }
  let arr;
  if (typeof window !== "undefined") {
    arr = localStorage.getItem("cartadded") || [];
  }
  const cartAdd = (id) => {
    let obj = {
      id,
    };
    arr.push(obj);
    localStorage.setItem("cartadded", JSON.stringify(arr));
    // isProductInCart(id);
  };

  useEffect(() => {
    setIsLoaded(true);
    axios
      .get(`${baseUrl}/products?sort=${sort}`)
      .then((response) => {
        setIsLoaded(false);
        setProducts(response.data.products);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, [sort, limit, page]);
  let newarr = [];
  Array.from(products).forEach((e, i) => {
    let obj = {
      id: i,
      _id: e._id,
      name: e.keywords,
    };
    newarr.push(obj);
  });
  const handleOnSelect = (item) => {
    router.push(`/product/${item._id}`);
  };
  console.log(products);
  return (
    <Layout>
      <section className="shop-page rel z-1 rpt-35 pb-130 rpb-100">
        <div style={{ width: "90%", margin: "auto" }} className="">
          <div className="row">
            <div className="col-xl-2 col-lg-4 col-md-8">
              <div className="shop-sidebar mt-50">
                <Sidebar />
                {/* <div
                  style={{ marginTop: "30px" }}
                  className="widget widget-tag-cloud wow fadeInUp delay-0-2s pt-30"
                >
                  <h4 className="widget-title">
                    <i className="flaticon-leaf-1" />
                    Popular Tags
                  </h4>
                  <div className="tag-coulds">
                    <Link href="/shop-grid">Sleep</Link>
                    <Link href="/shop-grid">Weight</Link>
                    <Link href="/shop-grid">Wellness</Link>
                    <Link href="/shop-grid">Skin</Link>
                    <Link href="/shop-grid">Immunity</Link>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-xl-10 col-lg-8 mt-55">
              <div
                // style={{ display: "flex", justifyContent: "right" }}
                className="shop-shorter rel z-3 pt-10 mb-40 wow fadeInUp delay-0-2s"
              >
                <div style={{ height: "fit-content" }} className="col-md-6">
                  <ReactSearchAutocomplete
                    styling={{ width: "100%", height: "50px" }}
                    placeholder="Search products..."
                    items={newarr}
                    onSelect={handleOnSelect}
                    autoFocus
                  />
                </div>
                <div style={{ width: "200px" }}>
                  <Select
                    onChange={(e) => {
                      handlesort(e);
                    }}
                    options={options}
                  />
                </div>
              </div>

              {isloaded ? (
                <div style={{ display: "grid", placeItems: "center" }}>
                  <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
                </div>
              ) : (
                <div className="row shop-left-sidebar-row">
                  {products &&
                    products.map((e) => (
                      <div
                        key={e._id}
                        style={{ cursor: "pointer" }}
                        className="col-xl-4 col-lg-6 col-md-4 col-sm-6"
                      >
                        <div
                          style={{ width: "120%", margin: "10px" }}
                          className="product-item wow fadeInUp delay-0-2s"
                        >
                          <span className="offer">{e.discount}% Off</span>

                          <>
                            <div className="image">
                              <Link
                                key={e._id}
                                href={`/product/${e._id}`}
                                //  href={{
                                //   pathname: `/product/${e.slug}`,
                                //   query: { id: e._id },
                                // }}
                              >
                                {/* // href={`product/${e._id}`}> */}
                                <img
                                  style={{
                                    margin: "auto",
                                    height: "160%",
                                    width: "150%",
                                  }}
                                  src={`${baseUrl}/${e.images[0]}`}
                                  alt="Product"
                                />
                              </Link>
                            </div>
                            <div className="content">
                              {/* <Link key={e._id} href={`/products/${e._id}`}> */}
                              <h5 style={{ paddingTop: "20px" }}>
                                {e.name ? e.name.slice(0, 15) + "..." : ""}
                              </h5>
                              {/* </Link> */}
                              <span className="price">
                                <del> ₹{e.mrp}</del>
                                <span> ₹{e.price}</span>
                              </span>
                            </div>
                          </>
                          {/* {isProductInCart(e._id) ? (
                            <button>View</button>
                          ) : (
                            <button
                              onClick={() => {
                                cartAdd(e._id);
                              }}
                            >
                              add to cart
                            </button>
                          )} */}

                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "center",
                            }}
                          >
                            {e.stock == 0 ? (
                              <>
                                <button className="theme-btn">
                                  <img
                                    style={{ height: "20px", width: "20px" }}
                                    src="/assets/images/out-of-stock.png"
                                    alt="not"
                                  />
                                  <i className="fas fa-angle-double-right" />
                                </button>
                              </>
                            ) : cartAdded == false ? (
                              <button
                                onClick={() => {
                                  dispatch(addToCart(e));
                                  setCartAdded(true);
                                  // cartAdd(e._id);
                                }}
                                // type="submit"
                                className="theme-btn style-two"
                              >
                                <img
                                  style={{ height: "20px", width: "20px" }}
                                  src="/assets/images/shopping-cart.png"
                                  alt="not"
                                />{" "}
                                <i className="fas fa-angle-double-right" />
                              </button>
                            ) : (
                              <Link href="/cart">
                                <button className="theme-btn style-two">
                                  <img
                                    style={{ height: "20px", width: "20px" }}
                                    src="/assets/images/view.png"
                                    alt="not"
                                  />{" "}
                                  <i className="fas fa-angle-double-right" />
                                </button>
                              </Link>
                            )}
                            {wishAdded == false ? (
                              <button
                                onClick={() => {
                                  dispatch(addToWishlist(e));
                                  setWishAdded(true);
                                }}
                                // type="submit"
                                className="theme-btn style-two"
                              >
                                <img
                                  style={{ height: "20px", width: "20px" }}
                                  src="/assets/images/love.png"
                                  alt="not"
                                />{" "}
                                <i className="fas fa-angle-double-right" />
                              </button>
                            ) : (
                              <Link href="/wishlist">
                                <button className="theme-btn style-two">
                                  <img
                                    style={{ height: "20px", width: "20px" }}
                                    src="/assets/images/view.png"
                                    alt="not"
                                  />{" "}
                                  <i className="fas fa-angle-double-right" />
                                </button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              {products.length > 0 && (
                <ul className="pagination flex-wrap justify-content-center pt-10">
                  <Pagination
                    paginationCls={".shop-left-sidebar-row .col-xl-4"}
                    defaultSort={12}
                  />
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ShopLeftSidebar;
