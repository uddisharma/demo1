import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/layout/Layout";
import Link from "next/link";
import { baseUrl } from "../api/hello";
const Blog = () => {
  const router = useRouter();
  const id = router.query.id;
  // console.log(id)
  const [data, setData] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/blog/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${baseUrl}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <Layout>
        <section className="news-details-page rel z-1  rpt-35 pb-130 rpb-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 mt-45">
                <div className="blog-details-content">
                  <div>
                    <h3 className="title">{data ? data.heading : ""}</h3>
                    <div className="image my-35">
                      <img
                        src={`${baseUrl}/${
                          data && data.images ? data.images[0] : "no data"
                        }`}
                        alt="Blog"
                      />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data ? data.content : "",
                      }}
                    />
                  </div>
                  <div className="tag-share mt-35 pt-20 pb-10 mb-55">
                    {/* <div className="tags">
                      <h6>Popular Tags : </h6>
                      <Link href="/blog/apple-cider-vineger">
                        Mits Apple Cider Vinegar
                      </Link>
                      <Link href="/blog/melatonin-l-theanine">
                        melatonin and L-theanine
                      </Link>
                      <Link href="/blog/calcium-deficiency">
                        Calcium Deficiency
                      </Link>
                    </div> */}
                    <div className="social-style-one">
                      <h6>Share Projects : </h6>
                      <Link href="/contact">
                        <a>
                          {" "}
                          <i className="fab fa-facebook-f" />
                        </a>
                      </Link>
                      <Link href="/contact">
                        <a>
                          {" "}
                          <i className="fab fa-twitter" />
                        </a>
                      </Link>
                      <Link href="/contact">
                        <a>
                          {" "}
                          <i className="fab fa-youtube" />
                        </a>
                      </Link>
                      <Link href="/contact">
                        <a>
                          {" "}
                          <i className="fab fa-instagram" />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    id="comment-form"
                    className="comment-form pt-45 wow fadeInUp delay-0-2s"
                    name="comment-form"
                    action="#"
                    method="post"
                  >
                    <div className="section-title mb-35">
                      <span className="sub-title mb-15">Send Message</span>
                      <h3>Leave a Comments</h3>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="full-name"
                            name="full-name"
                            className="form-control"
                            defaultValue=""
                            placeholder="Full Name"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            id="blog-email"
                            name="blog-email"
                            className="form-control"
                            defaultValue=""
                            placeholder="Email Address"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            id="website"
                            name="website"
                            className="form-control"
                            defaultValue=""
                            placeholder="Website"
                            required=""
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            name="message"
                            id="message"
                            className="form-control"
                            rows={4}
                            placeholder="Comments"
                            required=""
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-0">
                          <button type="submit" className="theme-btn style-two">
                            Send Comments
                            <i className="fas fa-angle-double-right" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-8">
                <div className="blog-sidebar mt-65">
                  <div className="widget widget-menu wow fadeInUp delay-0-4s">
                    <h4 className="widget-title">
                      <i className="flaticon-leaf-1" />
                      Category
                    </h4>

                    <ul>
                      {blogs
                        ? blogs.map((e) => (
                            <>
                              <h5>
                                <Link href={`/blog/${e._id}`}>
                                  {e.heading ? e.heading : ""}
                                </Link>
                              </h5>
                              <p>
                                <Link href={`/blog/${e._id}`}>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: data
                                        ? data.content.slice(0, 50)
                                        : "",
                                    }}
                                  />
                                </Link>
                              </p>
                            </>
                          ))
                        : ""}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Blog;
