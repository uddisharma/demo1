import Isotope from "isotope-layout";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const PortfolioGridIsotope = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".portfolio-active", {
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
    <section className="portfolio-fluid-area rel z-1 py-130 rpy-100">
      <div className="container">
        <div className="row align-items-end pb-40">
          <div className="col-lg-6 wow fadeInUp delay-0-2s">
            <div className="section-title mb-20">
              <span className="sub-title mb-20">Photo Gallery</span>
              <h2>Insite Photo Gallery</h2>
            </div>
          </div>
          <div className="col-lg-6 text-lg-right wow fadeInUp delay-0-4s">
            <ul className="portfolio-filter mb-20">
              <li
                data-filter="*"
                className={`c-pointer ${activeBtn("*")}`}
                onClick={handleFilterKeyChange("*")}
              >
                Show All
              </li>
              <li
                data-filter=".fruits"
                className={`c-pointer ${activeBtn("fruits")}`}
                onClick={handleFilterKeyChange("fruits")}
              >
                Fruits
              </li>
              <li
                data-filter=".vegetables"
                className={`c-pointer ${activeBtn("vegetables")}`}
                onClick={handleFilterKeyChange("vegetables")}
              >
                Vegetables
              </li>
              <li
                data-filter=".bread"
                className={`c-pointer ${activeBtn("bread")}`}
                onClick={handleFilterKeyChange("bread")}
              >
                Bread
              </li>
              <li
                data-filter=".milk"
                className={`c-pointer ${activeBtn("milk")}`}
                onClick={handleFilterKeyChange("milk")}
              >
                Milk &amp; Eggs
              </li>
            </ul>
          </div>
        </div>
        <div className="row portfolio-active">
          <div className="col-lg-4 col-sm-6 item vegetables">
            <div className="gallery-style-two wow fadeInUp delay-0-2s">
              <img src="assets/images/gellery/portfolio1.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item fruits bread">
            <div className="gallery-style-two wow fadeInUp delay-0-4s">
              <img src="assets/images/gellery/portfolio2.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item vegetables milk">
            <div className="gallery-style-two wow fadeInUp delay-0-6s">
              <img src="assets/images/gellery/portfolio3.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item fruits">
            <div className="gallery-style-two wow fadeInUp delay-0-2s">
              <img src="assets/images/gellery/portfolio4.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item bread milk">
            <div className="gallery-style-two wow fadeInUp delay-0-4s">
              <img src="assets/images/gellery/portfolio5.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item vegetables">
            <div className="gallery-style-two wow fadeInUp delay-0-6s">
              <img src="assets/images/gellery/portfolio6.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item fruits">
            <div className="gallery-style-two wow fadeInUp delay-0-2s">
              <img src="assets/images/gellery/portfolio7.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item vegetables">
            <div className="gallery-style-two wow fadeInUp delay-0-4s">
              <img src="assets/images/gellery/portfolio8.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item fruits milk">
            <div className="gallery-style-two wow fadeInUp delay-0-6s">
              <img src="assets/images/gellery/portfolio9.jpg" alt="Portfolio" />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item bread">
            <div className="gallery-style-two wow fadeInUp delay-0-2s">
              <img
                src="assets/images/gellery/portfolio10.jpg"
                alt="Portfolio"
              />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item milk fruits">
            <div className="gallery-style-two wow fadeInUp delay-0-4s">
              <img
                src="assets/images/gellery/portfolio11.jpg"
                alt="Portfolio"
              />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 item fruits">
            <div className="gallery-style-two wow fadeInUp delay-0-6s">
              <img
                src="assets/images/gellery/portfolio12.jpg"
                alt="Portfolio"
              />
              <div className="gallery-over">
                <div className="content">
                  <span className="category">Foods</span>
                  <h4>
                    <Link href="/portfolio-details">Organic Fruits</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio-more-btn text-center pt-15">
        <Link href="/portfolio-fluid">
          <a className="theme-btn style-three mt-15">
            View More <i className="fas fa-angle-double-right" />
          </a>
        </Link>
      </div>
    </section>
  );
};
export default PortfolioGridIsotope;
