import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "../../pages/api/hello";
const Sidebar = () => {
  
  const [categories, setCategories] = useState([]);
  useEffect(() => {
   
    axios.get(`${baseUrl}/categories`).then((res) => {
      // console.log(res.data.categories);
      setCategories(res.data.categories);
    });
  }, []);
  //   console.log(products.length)
  return (
    <div>
      <div  className="widget widget-menu wow fadeInUp delay-0-4s">
        <h4 className="widget-title">
          <i className="flaticon-leaf-1" />
          Category
        </h4>
        <ul>
          <li>
            <Link href="/shop">All Products</Link>{" "}
            {/* <span>({products.length})</span> */}
          </li>
          {categories.length > 0 ? (
            categories.map((e) => (
              <div key={e._id}>
                {" "}
                <li>
                  <Link href={`/category/${e.category}`}>{e.category}</Link>{" "}
                  {/* <span>({skin.length})</span> */}
                </li>
              </div>
            ))
          ) : (
            <>
              <li>
                <Link href="/product/skinhealth">Skin health</Link>{" "}
                {/* <span>({skin.length})</span> */}
              </li>
              <li>
                <Link href="/product/boostimmunity">Boost Immunity</Link>{" "}
                {/* <span>({boost.length})</span> */}
              </li>
              <li>
                <Link href="/product/strongerbones">Stronger bone</Link>{" "}
                {/* <span>({bone.length})</span> */}
              </li>
              <li>
                <Link href="/product/goodsleep">Good sleep</Link>{" "}
                {/* <span>({sleep.length})</span> */}
              </li>
              <li>
                <Link href="/product/weightmanagement">Weight management</Link>{" "}
                {/* <span>({weight.length})</span> */}
              </li>
              <li>
                <Link href="/product/dailywellness">Daily Wellnesst</Link>{" "}
                {/* <span>({Wellness.length})</span> */}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
