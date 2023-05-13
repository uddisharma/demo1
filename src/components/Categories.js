import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { baseUrl } from "../../pages/api/hello";
const Categories = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // setIsLoaded(true);
    axios
      .get(`${baseUrl}/categories`)
      .then((response) => {
        setData(response.data.categories);
      })
      .catch((error) => {
        // setError(true);
        console.log(error);
      });
  }, []);
  // console.log(data);
  return (
    <div>
      <section className="category-section pt-50 rpt-100">
        <div className="section-title text-center mb-10">
          <h2>Shop by Categories </h2>
        </div>
        <div className="">
          <div
            style={{
              width: "90%",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
            }}
            className="category-wrap"
          >
            {data
              ? data.slice(0, 5).map((e) => (
                  <Link href={`/category/${e.category ? e.category : ""}`}>
                    <div
                      style={{
                        flex: e.category == "Weight Management" ? 1.5 : 1,
                        cursor: "pointer",
                      }}
                      className="category-item wow fadeInUp delay-0-3s"
                    >
                      <div className="icon">
                        <img
                          src={`${baseUrl}/${e.photo ? e.photo[0] : ""}`}
                          alt="Icon"
                        />
                      </div>
                      <h5>{e.category ? e.category : ""}</h5>
                      <img src="assets/images/category/arrow.png" alt="Arrow" />
                    </div>
                  </Link>
                ))
              : ""}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
