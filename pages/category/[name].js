import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PageBanner from "../../src/components/PageBanner";
import Pagination from "../../src/components/Pagination";
import Layout from "../../src/layout/Layout";
import { useRouter } from "next/router";
import { baseUrl } from "../api/hello";
import Sidebar from "../../src/components/Sidebar";
const Category = () => {
  const router = useRouter();
  const [isloaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("name");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const handlesort = (e) => {
    setSort(e.target.value);
    console.log(sort);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const name = router.query;
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        console.log(res);
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let users = data.filter(function (user) {
    for (var index = 0; index < user.category.length; index++) {
      var data = user.category[index];
      if (data.category === name.name) {
        return true;
      }
    }
    return false;
  });
  // console.log(users);
  // console.log(name.name)
  // const finalname = name.name.split(" ");
  // console.log(finalname)
  // console.log(finalname[0])
  // useEffect(() => {
  //   setIsLoaded(true);
  //   axios
  //     .get(
  //       `${baseUrl}/products?sort=${sort}&page=${page}&limit=${limit}&keywords=${finalname[0]}`
  //     )
  //     .then((response) => {
  //       setIsLoaded(false);
  //       setProducts(response.data.products);
  //     })
  //     .catch((error) => {
  //       setError(true);
  //       console.log(error);
  //     });
  // }, [sort, limit, page, finalname[0]]);
  // if (isloaded) {
  //   return (
  //     <div style={{ display: "grid", placeItems: "center" }}>
  //       <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
  //     </div>
  //   );
  // } else {
  return (
    <Layout>
      <section className="shop-page rel z-1 rpt-35 pb-130 rpb-100">
        <div style={{ width: "90%", margin: "auto" }} className="">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-8">
              <Sidebar />
            </div>

            <div className="col-xl-9 col-lg-8 mt-55">
              <div className="shop-shorter rel z-3 pt-10 mb-40 wow fadeInUp delay-0-2s"></div>
              {isloaded ? (
                <div style={{ display: "grid", placeItems: "center" }}>
                  <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
                </div>
              ) : (
                <div className="row shop-left-sidebar-row">
                  {users &&
                    users.map((e) => (
                      <Link
                        key={e._id}
                        href={`/product/${e._id}`}
                        // href={{
                        //   pathname: `/product/${e.slug}`,
                        //   query: { id: e._id },
                        // }}
                      >
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
                            <div className="image">
                              <img
                                style={{
                                  margin: "auto",
                                  height: "160%",
                                  width: "150%",
                                }}
                                src={`${baseUrl}/${e.images[0]}`}
                                alt="Product"
                              />
                            </div>
                            <div className="content">
                              {/* <div className="ratting">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                              </div> */}
                              <h5 style={{marginTop:'40px'}}>
                                {e.name ? e.name.slice(0, 15) + "..." : ""}
                              </h5>
                              <span className="price">
                                <del> ₹{e.mrp}</del>
                                <span> ₹{e.price}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
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
  // }
};
export default Category;
