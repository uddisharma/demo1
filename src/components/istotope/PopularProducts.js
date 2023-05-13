import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
const PopularProducts = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".popular-products-active", {
        itemSelector: ".item",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "current" : "");
  return (
    <Fragment>
      <div className="row align-items-center pb-30">
        <div className="col-lg-6 wow fadeInUp delay-0-2s">
          <div className="section-title mb-20">
            <span className="sub-title mb-20">Popular Products</span>
            <h2>Popular Products</h2>
          </div>
        </div>
        <div className="col-lg-6 text-lg-right wow fadeInUp delay-0-4s">
          <ul className="popular-products-filter filter-btns-one mb-20">
            <li
              data-filter="*"
              className={`c-pointer ${activeBtn("*")}`}
              onClick={handleFilterKeyChange("*")}
            >
              Show All
            </li>
            <li
              data-filter=".vegetables"
              className={`c-pointer ${activeBtn("vegetables")}`}
              onClick={handleFilterKeyChange("vegetables")}
            >
              Vegetables
            </li>
            <li
              data-filter=".fruits"
              className={`c-pointer ${activeBtn("fruits")}`}
              onClick={handleFilterKeyChange("fruits")}
            >
              Fruits
            </li>
            <li
              data-filter=".bread"
              className={`c-pointer ${activeBtn("bread")}`}
              onClick={handleFilterKeyChange("bread")}
            >
              Bread &amp; Cakes
            </li>
            <li
              data-filter=".seafish"
              className={`c-pointer ${activeBtn("seafish")}`}
              onClick={handleFilterKeyChange("seafish")}
            >
              Sea Fish
            </li>
          </ul>
        </div>
      </div>
      <div className="row popular-products-active">
        <div className="col-xl-3 col-lg-4 col-sm-6 item fruits bread">
          <div className="product-item wow fadeInUp delay-0-2s">
            <span className="offer">53 Off</span>
            <div className="image">
              <img src="assets/images/products/product1.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Organic Brocolli</Link>
              </h5>
              <span className="price">
                <del>25</del>
                <span>18</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item seafish vegetables">
          <div className="product-item wow fadeInUp delay-0-3s">
            <div className="image">
              <img src="assets/images/products/product2.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Fresh Carrots</Link>
              </h5>
              <span className="price">
                <span>49.58</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item bread fruits">
          <div className="product-item wow fadeInUp delay-0-4s">
            <span className="offer bg-red">sale</span>
            <div className="image">
              <img src="assets/images/products/product3.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Organic Brocolli</Link>
              </h5>
              <span className="price">
                <del>25</del>
                <span>18</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item vegetables">
          <div className="product-item wow fadeInUp delay-0-5s">
            <span className="offer">20 Off</span>
            <div className="image">
              <img src="assets/images/products/product4.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Chiken Egg</Link>
              </h5>
              <span className="price">
                <del>55</del>
                <span>36</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item seafish fruits">
          <div className="product-item wow fadeInUp delay-0-6s">
            <div className="image">
              <img src="assets/images/products/product5.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Fresh Gooseberry</Link>
              </h5>
              <span className="price">
                <span>205</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item bread seafish">
          <div className="product-item wow fadeInUp delay-0-7s">
            <span className="offer">53 Off</span>
            <div className="image">
              <img src="assets/images/products/product6.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Fresh Croissants</Link>
              </h5>
              <span className="price">
                <del>25</del>
                <span>18</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item vegetables">
          <div className="product-item wow fadeInUp delay-0-2s">
            <div className="image">
              <img src="assets/images/products/product7.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Chiken Egg’s</Link>
              </h5>
              <span className="price">
                <span>205</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item seafish bread">
          <div className="product-item wow fadeInUp delay-0-3s">
            <span className="offer">53 Off</span>
            <div className="image">
              <img src="assets/images/products/product8.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Oragic Orange</Link>
              </h5>
              <span className="price">
                <span>85</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item fruits">
          <div className="product-item wow fadeInUp delay-0-4s">
            <div className="image">
              <img src="assets/images/products/product13.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Organic Carrots</Link>
              </h5>
              <span className="price">
                <span>18</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item seafish vegetables">
          <div className="product-item wow fadeInUp delay-0-5s">
            <span className="offer">20 Off</span>
            <div className="image">
              <img src="assets/images/products/product14.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Fresh Banana</Link>
              </h5>
              <span className="price">
                <del>55</del>
                <span>36</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item bread fruits">
          <div className="product-item wow fadeInUp delay-0-6s">
            <div className="image">
              <img src="assets/images/products/product15.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Green Spinach</Link>
              </h5>
              <span className="price">
                <span>205</span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-sm-6 item fruits vegetables">
          <div className="product-item wow fadeInUp delay-0-7s">
            <div className="image">
              <img src="assets/images/products/product10.png" alt="Product" />
            </div>
            <div className="content">
              <div className="ratting">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <h5>
                <Link href="/product-details">Pomegranate</Link>
              </h5>
              <span className="price">
                <del>25</del>
                <span>18</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default PopularProducts;
