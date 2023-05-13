import Link from "next/link";
import { Fragment } from "react";
import munfirmSlider from "../munfirmSlider";
export const HomeSlider1 = () => {
  const { active, setActive } = munfirmSlider();
  return (
    <div  style={{ maxHeight: "70vh" }}>

      <button
        className="slider-prev slick-arrow"
        onClick={() => setActive(active == 1 ? 2 : 1)}
        // onClick={() =>
        //   setActive(
        //     active == 1
        //       ? active == 2
        //         ? active == 3
        //         : active == 1
        //       : active == 2
        //   )
        // }
      >
        <i className="fas fa-chevron-left" />
      </button>
      <div
        // style={{border:'2px solid green' , maxHeight:"300px"}}
        className={`slider-single-item slide-one ${
          active == 3 ? "slick-active" : ""
        }`}
      >
        <div  className="container">
          <img
            className="image"
            src="assets/images/Fitbuzz/Banner3.jpg"
            alt="Slider"
          />
          <div className="slide-shapes">
            <img
              className="pumpkin-shape"
              src="assets/images/slider/pumpkin.png"
              alt="Pumpkin"
            />
            <img
              className="two-leaf"
              src="assets/images/slider/two-lear.png"
              alt="Leaf"
            />
            <img
              className="half-leaf"
              src="assets/images/slider/half-leaf.png"
              alt="Leaf"
            />
            <img
              className="leaf-one"
              src="assets/images/slider/leaf-1.png"
              alt="Leaf"
            />
            <img
              className="leaf-two"
              src="assets/images/slider/leaf-2.png"
              alt="Leaf"
            />
          </div>

        </div>
      </div>
      <div

        className={`slider-single-item slide-one ${
          active == 1 ? "slick-active" : ""
        }`}
      >
        <div className="container">
          <img
            className="image"
            src="assets/images/Fitbuzz/Banner1.jpg"
            alt="Slider"
          />
          <div className="slide-shapes">
            <img
              className="pumpkin-shape"
              src="assets/images/slider/pumpkin.png"
              alt="Pumpkin"
            />
            <img
              className="two-leaf"
              src="assets/images/slider/two-lear.png"
              alt="Leaf"
            />
            <img
              className="half-leaf"
              src="assets/images/slider/half-leaf.png"
              alt="Leaf"
            />
            <img
              className="leaf-one"
              src="assets/images/slider/leaf-1.png"
              alt="Leaf"
            />
            <img
              className="leaf-two"
              src="assets/images/slider/leaf-2.png"
              alt="Leaf"
            />
          </div>

        </div>
      </div>

      <div
        className={`slider-single-item slide-two ${
          active == 2 ? "slick-active" : ""
        }`}
      >
        <div className="container">
          <div  className="slide-shapes">
            <img
              className="pumpkin-shape"
              src="assets/images/slider/pumpkin.png"
              alt="Pumpkin"
            />
            <img
              className="two-leaf"
              src="assets/images/slider/two-lear.png"
              alt="Leaf"
            />
            <img
              className="half-leaf"
              src="assets/images/slider/half-leaf.png"
              alt="Leaf"
            />
            <img
              className="leaf-one"
              src="assets/images/slider/leaf-1.png"
              alt="Leaf"
            />
            <img
              className="leaf-two"
              src="assets/images/slider/leaf-2.png"
              alt="Leaf"
            />
          </div>
          <img
            className="image"
            src="assets/images/Fitbuzz/Banner2.jpg"
            alt="Slider"
          />

        </div>
      </div>
      <button
        className="slider-next slick-arrow"
        onClick={() => setActive(active == 2 ? 1 : 2)}
        // onClick={() =>
        //   setActive(
        //     active == 2
        //       ? active == 3
        //         ? active == 1
        //         : active == 2
        //       : active == 3
        //   )
        // }
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
};
export const HomeSlider2 = () => {
  const { active, setActive } = munfirmSlider();
  return (
    <Fragment>
      <button
        className="slider-prev slick-arrow"
        onClick={() => setActive(active == 1 ? 2 : 1)}
      >
        <i className="fas fa-chevron-left" />
      </button>

      <div
        className={`slider-single-item style-two ${
          active == 1 ? "slick-active" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="slider-content">
                <div className="sub-title mb-20">Welcome to Munfirm</div>
                <h1>Organic Foods &amp; Vegetables</h1>
                <div className="slider-btns mt-30">
                  <Link href="/shop-grid">
                    <a className="theme-btn style-two">
                      Shop Now <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                  <Link href="/about">
                    <a className="theme-btn style-two">
                      Learn More <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="slider-images">
                <img
                  className="image"
                  src="assets/images/slider/slider-two1.png"
                  alt="Slider"
                />
                <img
                  className="offer"
                  src="assets/images/shapes/organic.png"
                  alt="Organic"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`slider-single-item style-two ${
          active == 2 ? "slick-active" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="slider-content">
                <div className="sub-title mb-20">Welcome to Munfirm</div>
                <h1>Organic Foods &amp; Vegetables</h1>
                <div className="slider-btns mt-30">
                  <Link href="/about">
                    <a className="theme-btn style-two">
                      Learn More <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                  <Link href="/shop-grid">
                    <a className="theme-btn style-two">
                      Shop Now <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="slider-images">
                <img
                  className="image"
                  src="assets/images/slider/slider-two3.png"
                  alt="Slider"
                />
                <img
                  className="offer"
                  src="assets/images/shapes/organic.png"
                  alt="Organic"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="slider-next slick-arrow"
        onClick={() => setActive(active == 2 ? 1 : 2)}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </Fragment>
  );
};
export const HomeSlider3 = () => {
  const { active, setActive } = munfirmSlider();
  return (
    <Fragment>
      <button
        className="slider-prev slick-arrow"
        onClick={() => setActive(active == 1 ? 2 : 1)}
      >
        <i className="fas fa-chevron-left" />
      </button>

      <div
        className={`slider-single-item style-three slide-one ${
          active == 1 ? "slick-active" : ""
        }`}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-5">
              <div className="slider-content">
                <div className="sub-title mb-20">Welcome to Munfirm</div>
                <h1>Organic Food &amp; Vegetables</h1>
                <p>
                  On the other hand we denounce with righteou indignation and
                  dislike men who are so beguiled and demoralized
                </p>
                <div className="slider-btns mt-20">
                  <Link href="/shop-grid">
                    <a className="theme-btn style-two">
                      Shop Now <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                  <Link href="/about">
                    <a className="theme-btn style-three">
                      Learn More <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-9">
              <div className="slider-images">
                <img
                  className="image"
                  src="assets/images/slider/slider-three-1.png"
                  alt="Slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`slider-single-item style-three slide-two ${
          active == 2 ? "slick-active" : ""
        }`}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-9">
              <div className="slider-images">
                <img
                  className="image"
                  src="assets/images/slider/slider-three-1.png"
                  alt="Slider"
                />
              </div>
            </div>
            <div className="col-xl-5">
              <div className="slider-content">
                <div className="sub-title mb-20">Welcome to Munfirm</div>
                <h1>Organic Food &amp; Vegetables</h1>
                <p>
                  On the other hand we denounce with righteou indignation and
                  dislike men who are so beguiled and demoralized
                </p>
                <div className="slider-btns mt-20">
                  <Link href="/shop-grid">
                    <a className="theme-btn style-two">
                      Shop Now <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                  <Link href="/about">
                    <a className="theme-btn style-three">
                      Learn More <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="slider-next slick-arrow"
        onClick={() => setActive(active == 2 ? 1 : 2)}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </Fragment>
  );
};

// import Link from "next/link";
// import { Fragment } from "react";
// import munfirmSlider from "../munfirmSlider";
// export const HomeSlider1 = () => {
//   const { active, setActive } = munfirmSlider();
//   return (
//     <Fragment>
//       <button
//         className="slider-prev slick-arrow"
//         onClick={() => setActive(active == 1 ? 2 : 1)}
//       >
//         <i className="fas fa-chevron-left" />
//       </button>

//       <div
//         className={`slider-single-item slide-two ${
//           active == 1 ? "slick-active" : ""
//         }`}
//       >
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="slider-images">
//                 <img
//                   className="image"
//                   src="assets/images/slider/Acetylcysteine.png"
//                   alt="Slider"
//                 />
               
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="slider-content">
//                 <div className="sub-title mb-20">Welcome to Fitvuzz Shop</div>
//                 <h1>Fizz your way to Stronger Bones </h1>
//                 <h6></h6>
//                 <div className="slider-btns mt-30">
//                   <Link href="/shop-left-sidebar">
//                     <a className="theme-btn style-two">
//                       Shop Now <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                   <Link href="/about">
//                     <a className="theme-btn style-two">
//                       Learn More <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="slide-shapes">
//           <img
//             className="pumpkin-shape"
//             src="assets/images/slider/pumpkin.png"
//             alt="Pumpkin"
//           />
         
//           <img
//             className="leaf-one"
//             src="assets/images/slider/leaf-1.png"
//             alt="Leaf"
//           />
//           <img
//             className="leaf-two"
//             src="assets/images/slider/leaf-2.png"
//             alt="Leaf"
//           />
//         </div>
//       </div>
//       <div
//         className={`slider-single-item slide-two ${
//           active == 2 ? "slick-active" : ""
//         }`}
//       >
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="slider-images">
//                 <img
//                   className="image"
//                   src="assets/images/slider/Applecider.png"
//                   alt="Slider"
//                 />
               
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="slider-content">
//                 <div className="sub-title mb-20">Welcome to Fitvuzz Shop</div>
//                 <h1>Fizz away your Insomnia</h1>
//                 <h6>Have a better sleep</h6>
//                 <div className="slider-btns mt-30">
//                   <Link href="/shop-left-sidebar">
//                     <a className="theme-btn style-two">
//                       Shop Now <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                   <Link href="/about">
//                     <a className="theme-btn style-two">
//                       Learn More <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="slide-shapes">
//           <img
//             className="pumpkin-shape"
//             src="assets/images/slider/pumpkin.png"
//             alt="Pumpkin"
//           />
      
//           <img
//             className="leaf-one"
//             src="assets/images/slider/leaf-1.png"
//             alt="Leaf"
//           />
//           <img
//             className="leaf-two"
//             src="assets/images/slider/leaf-2.png"
//             alt="Leaf"
//           />
//         </div>
//       </div>
//       <button
//         className="slider-next slick-arrow"
//         onClick={() => setActive(active == 2 ? 1 : 2)}
//       >
//         <i className="fas fa-chevron-right" />
//       </button>
//     </Fragment>
//   );
// };
// export const HomeSlider2 = () => {
//   const { active, setActive } = munfirmSlider();
//   return (
//     <Fragment>
//       <button
//         className="slider-prev slick-arrow"
//         onClick={() => setActive(active == 1 ? 2 : 1)}
//       >
//         <i className="fas fa-chevron-left" />
//       </button>

//       <div
//         className={`slider-single-item style-two ${
//           active == 1 ? "slick-active" : ""
//         }`}
//       >
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="slider-content">
//                 <div className="sub-title mb-20">Welcome to Munfirm</div>
//                 <h1>Organic Foods &amp; Vegetables</h1>
//                 <div className="slider-btns mt-30">
//                   <Link href="/shop-grid">
//                     <a className="theme-btn style-two">
//                       Shop Now <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                   <Link href="/about">
//                     <a className="theme-btn style-two">
//                       Learn More <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="slider-images">
//                 <img
//                   className="image"
//                   src="assets/images/slider/slider-two1.png"
//                   alt="Slider"
//                 />
//                 <img
//                   className="offer"
//                   src="assets/images/shapes/organic.png"
//                   alt="Organic"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className={`slider-single-item style-two ${
//           active == 2 ? "slick-active" : ""
//         }`}
//       >
//         <div className="container">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <div className="slider-content">
//                 <div className="sub-title mb-20">Welcome to Munfirm</div>
//                 <h1>Organic Foods &amp; Vegetables</h1>
//                 <div className="slider-btns mt-30">
//                   <Link href="/about">
//                     <a className="theme-btn style-two">
//                       Learn More <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                   <Link href="/shop-grid">
//                     <a className="theme-btn style-two">
//                       Shop Now <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="slider-images">
//                 <img
//                   className="image"
//                   src="assets/images/slider/slider-two3.png"
//                   alt="Slider"
//                 />
//                 <img
//                   className="offer"
//                   src="assets/images/shapes/organic.png"
//                   alt="Organic"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <button
//         className="slider-next slick-arrow"
//         onClick={() => setActive(active == 2 ? 1 : 2)}
//       >
//         <i className="fas fa-chevron-right" />
//       </button>
//     </Fragment>
//   );
// };
// export const HomeSlider3 = () => {
//   const { active, setActive } = munfirmSlider();
//   return (
//     <Fragment>
//       <button
//         className="slider-prev slick-arrow"
//         onClick={() => setActive(active == 1 ? 2 : 1)}
//       >
//         <i className="fas fa-chevron-left" />
//       </button>

//       <div
//         className={`slider-single-item style-three slide-one ${
//           active == 1 ? "slick-active" : ""
//         }`}
//       >
//         <div className="container-fluid">
//           <div className="row align-items-center">
//             <div className="col-xl-5">
//               <div className="slider-content">
//                 <div className="sub-title mb-20">Welcome to Munfirm</div>
//                 <h1>Organic Food &amp; Vegetables</h1>
//                 <p>
//                   On the other hand we denounce with righteou indignation and
//                   dislike men who are so beguiled and demoralized
//                 </p>
//                 <div className="slider-btns mt-20">
//                   <Link href="/shop-grid">
//                     <a className="theme-btn style-two">
//                       Shop Now <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                   <Link href="/about">
//                     <a className="theme-btn style-three">
//                       Learn More <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-7 col-lg-9">
//               <div className="slider-images">
//                 <img
//                   className="image"
//                   src="assets/images/slider/slider-three-1.png"
//                   alt="Slider"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className={`slider-single-item style-three slide-two ${
//           active == 2 ? "slick-active" : ""
//         }`}
//       >
//         <div className="container-fluid">
//           <div className="row align-items-center">
//             <div className="col-xl-7 col-lg-9">
//               <div className="slider-images">
//                 <img
//                   className="image"
//                   src="assets/images/slider/slider-three-1.png"
//                   alt="Slider"
//                 />
//               </div>
//             </div>
//             <div className="col-xl-5">
//               <div className="slider-content">
//                 <div className="sub-title mb-20">Welcome to Munfirm</div>
//                 <h1>Organic Food &amp; Vegetables</h1>
//                 <p>
//                   On the other hand we denounce with righteou indignation and
//                   dislike men who are so beguiled and demoralized
//                 </p>
//                 <div className="slider-btns mt-20">
//                   <Link href="/shop-grid">
//                     <a className="theme-btn style-two">
//                       Shop Now <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                   <Link href="/about">
//                     <a className="theme-btn style-three">
//                       Learn More <i className="fas fa-angle-double-right" />
//                     </a>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <button
//         className="slider-next slick-arrow"
//         onClick={() => setActive(active == 2 ? 1 : 2)}
//       >
//         <i className="fas fa-chevron-right" />
//       </button>
//     </Fragment>
//   );
// };
