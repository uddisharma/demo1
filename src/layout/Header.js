import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { sidebarToggle } from "../utils";
import { Home } from "./Menus";
import MobileMenu from "./MobileMenu";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setuserLogin } from "../../slices/userloginSlice";
import { baseUrl } from "../../pages/api/hello";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Modal from "react-modal";
import { useRouter } from "next/router";
const Header = ({ header }) => {
  switch (header) {
    case 1:
      return <Header1 />;
    case 2:
      return <Header2 />;
    case 3:
      return <Header3 />;

    default:
      return <DefaultHeader />;
  }
};
export default Header;

const UserAccount = () => {
  const user = useSelector((state) => state.user);
  // const [logout, setLogout] = useState(user.IsLogin || false);
  const logout = typeof window !== "undefined" ? false : user.IsLogin;
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(setuserLogin(false));
    location.reload();
  };
  return (
    <Fragment>
      <button onClick={() => setToggle(!toggle)} className="user">
        <i className="far fa-user-circle" />
      </button>

      <form
        onSubmit={(e) => e.preventDefault()}
        action="#"
        className={`${toggle ? "" : "hide"}`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Link href="/user/profile">Account</Link>
          <a
            onClick={() => {
              handlelogout();
            }}
            href="#"
          >
            Logout
          </a>
        </div>
      </form>
    </Fragment>
  );
};

const LoginLog = () => {
  const user = useSelector((state) => state.user);
  const logout = typeof window !== "undefined" ? false : user.IsLogin;
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(setuserLogin(false));

    console.log(user);
  };
  return (
    <Fragment>
      <button onClick={() => setToggle(!toggle)} className="user">
        <i className="far fa-user-circle" />
      </button>

      <form
        onSubmit={(e) => e.preventDefault()}
        action="#"
        className={`${toggle ? "" : "hide"}`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </form>
    </Fragment>
  );
};

const SearchBtn = () => {
  const [toggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let newarr = [];
  useEffect(() => {
    axios
      .get(`${baseUrl}/products`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(products)
  Array.from(products).forEach((e, i) => {
    let obj = {
      id: i,
      _id: e._id,
      name: e.keywords + e.name,
    };
    newarr.push(obj);
  });
  const router = useRouter();
  const handleOnSelect = (item) => {
    router.push(`/product/${item._id}`);
  };
  return (
    <Fragment>
      <button className="far fa-search" onClick={() => setToggle(!toggle)} />

      <form
        onSubmit={(e) => e.preventDefault()}
        action="#"
        className={`${toggle ? "" : "hide"}`}
      >
        <div style={{ height: "60px" }} className="col-md-12">
          <ReactSearchAutocomplete
            styling={{ width: "100%", height: "100%" }}
            placeholder="Search products..."
            items={newarr}
            onSelect={handleOnSelect}
            autoFocus
          />
        </div>
      </form>
    </Fragment>
    // <div>
    //   <button onClick={() => setIsOpen(true)}>Open Modal</button>
    //   <Modal
    //     isOpen={isOpen}
    //     onRequestClose={() => setIsOpen(false)}
    //     style={customStyles}
    //   >
    //     <h1>Modal Content</h1>
    //     <button onClick={() => setIsOpen(false)}>Close Modal</button>
    //   </Modal>
    // </div>
  );
};

const DaskTopMenu = () => (
  <ul className="navigation clearfix d-none d-lg-flex">
    <li className="dropdown">
      <Link href="/">HOME</Link>
      <Link href="/">
        <ul>
          <Home />
        </ul>
      </Link>
    </li>
    <li className="dropdown">
      <Link href="/shop">SHOP</Link>
    </li>
    <li className="dropdown">
      <Link href="/about">ABOUT US</Link>
    </li>
    {/* <li className="dropdown">
      <a href="#">Pages</a>
      <ul>
        <PagesDasktop />
      </ul>
      <div className="dropdown-btn">
        <span className="fas fa-chevron-down" />
      </div>
    </li> */}
    <li className="dropdown">
      <Link href="/faqs">FAQ</Link>
    </li>
    <li className="dropdown">
      <Link href="/contact">CONTACT US</Link>
    </li>
    {/* <Contact /> */}
  </ul>
);

const Nav = () => {
  const [nav, setNav] = useState(false);
  return (
    <nav className="main-menu navbar-expand-lg mobile-nav">
      <div className="navbar-header">
        <div className="mobile-logo my-15">
          <Link href="/">
            <a>
              <img
                style={{ width: "150px", height: "40px" }}
                src="/assets/images/logos/logo.png"
                alt="Logo"
                title="Logo"
              />
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  border: "2px solid black",
                }}
                src="/assets/images/logos/logo-white.png"
                alt="Logo"
                title="Logoss"
              />
            </a>
          </Link>
        </div>
        {/* Toggle Button */}
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          onClick={() => setNav(!nav)}
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      <div className={`navbar-collapse collapse clearfix ${nav ? "show" : ""}`}>
        <DaskTopMenu />
        <MobileMenu />
      </div>
    </nav>
  );
};

const DefaultHeader = () => {
  var items = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const [usertoken, setUserToken] = useState(false);
  const styles = {
    height: "fit-content",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    paddingTop: "20px",
    flexWrap: "wrap",
    backgroundColor: "#d4ddc1",

    "@media (min-width: 780px)": {
      display: "none",
    },
  };
  useEffect(() => {
    setUserToken(user.IsLogin);
  }, []);
  const [toggle, setToggle] = useState(false);
  // console.log(items.items.length);
  // var cartcount = typeof window !== "undefined" ? 0 : items.items.length;
  const [data, setData] = useState([]);
  useEffect(() => {
    // setIsLoaded(true);
    axios
      .get(`${baseUrl}/categories`)
      .then((response) => {
        // setIsLoaded(false);
        // setProducts(response.data.products);
        setData(response.data.categories);
      })
      .catch((error) => {
        // setError(true);
        console.log(error);
      });
  }, []);
  return (
    <header className="main-header">
      <div className="header-top-wrap bg-light-green text-white py-10">
        <div className="container-fluid">
          <div className="header-top">
            {/* <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="top-left">
                  <ul>
                    <li>
                      <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                      <a href="mailto:fitbuzz01@gmail.com">
                        fitbuzz01@gmail.com
                      </a>
                    </li>
                    <li>
                      <i className="far fa-clock" />{" "}
                      <b>
                        Get exciting offers and free shipping on all orders
                        above Rs 500/-
                      </b>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="top-right text-lg-right">
                  <ul>
                    <li>
                      <i className="far fa-phone" /> <b>Call :</b>{" "}
                      <a href="callto:7814699271">7814699271</a>
                    </li>
                    <li>
                      <div className="social-style-one">
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div
              style={{
                display: "grid",
                width: "95%",
                margin: "auto",
                gridTemplateColumns: "repeat(3,1fr)",
              }}
            >
              <div style={{ textAlign: "start" }} className="top-left">
                <li>
                  <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                  <a href="mailto:fitbuzz01@gmail.com">fitbuzz01@gmail.com</a>
                </li>
              </div>
              <div style={{ textAlign: "center" }} className="top-left">
                <li>
                  <i className="far fa-clock" />{" "}
                  <b>use code for 20% discount MITS20 </b>
                </li>
              </div>
              <div style={{ textAlign: "right" }} className="top-left">
                <li>
                  <div className="social-style-one">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container-fluid clearfix">
          <div className="header-inner d-flex align-items-center">
            <div className="logo-outer">
              <div style={{ marginLeft: "30px" }} className="logo">
                <Link href="/">
                  <a>
                    <img
                      style={{ width: "150px", height: "40px" }}
                      src="/assets/images/logos/logo.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              {/* Main Menu */}
              <Nav />
              {/* Main Menu End*/}
            </div>
            {/* Menu Button */}
            <div className="menu-icons">
              {/* Nav Search */}
              <div className="nav-search py-15">
                <SearchBtn />
              </div>
              <Link href="/cart">
                <button className="cart">
                  <i className="far fa-shopping-basket" />
                  {/* <span>{cartcount}</span> */}
                </button>
              </Link>
              {/* <Link href="/user/profile">
                <button className="user">
                  <i className="far fa-user-circle" />
                </button>
              </Link> */}
              {usertoken ? (
                <div
                  style={{ marginLeft: "35px" }}
                  className="nav-search py-15"
                >
                  <UserAccount />
                </div>
              ) : (
                <div
                  style={{ marginLeft: "35px" }}
                  className="nav-search py-15"
                >
                  <LoginLog />
                </div>
              )}

              <Link href="/shop">
                <a className="theme-btn">
                  Shop <i className="fas fa-angle-double-right" />
                </a>
              </Link>
              {/* menu sidbar */}
              {/* <div className="menu-sidebar" onClick={() => sidebarToggle()}>
                <button>
                  <i className="far fa-ellipsis-h" />
                  <i className="far fa-ellipsis-h" />
                  <i className="far fa-ellipsis-h" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="categories " style={styles}>
          <div
            style={{}}
            className="menu-sidebar"
            onClick={() => sidebarToggle()}
          >
            <a
              style={{ height: "100%", marginTop: "-10px" }}
              className="theme-btn"
            >
              Explore all <i className="fas fa-angle-double-right" />
            </a>
          </div>
          {data &&
            data.slice(0, 6).map((e) => (
              <div key={e._id}>
                <Link href={`/category/${e.category}`}>
                  <p key={e._id}>{e.category}</p>
                </Link>
              </div>
            ))}
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};

const Header1 = () => {
  var items = useSelector((state) => state.basket);
  const user = useSelector((state) => state.user);
  const [usertoken, setUserToken] = useState(false);
  const style = {
    height: "fit-content",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    paddingTop: "20px",
    flexWrap: "wrap",
    backgroundColor: "#d4ddc1",
    // border:'1px solid green',
    "@media (min-width: 780px)": {
      display: "none",
    },
  };
  useEffect(() => {
    setUserToken(user.IsLogin);
  }, []);
  const [data, setData] = useState([]);
  useEffect(() => {
    // setIsLoaded(true);
    axios
      .get(`${baseUrl}/categories`)
      .then((response) => {
        // setIsLoaded(false);
        // setProducts(response.data.products);
        setData(response.data.categories);
      })
      .catch((error) => {
        // setError(true);
        console.log(error);
      });
  }, []);
  // console.log(data);
  const logout = typeof window !== "undefined" ? false : user.IsLogin;
  var cartcount = typeof window !== "undefined" ? 0 : items.items.length;
  return (
    <>
      <header className="main-header menu-absolute">
        <div className="header-top-wrap bg-light-green text-white py-10">
          <div className="container-fluid">
            <div className="header-top">
              <div
                style={{
                  display: "grid",
                  width: "95%",
                  margin: "auto",
                  gridTemplateColumns: "repeat(3,1fr)",
                }}
              >
                <div style={{ textAlign: "start" }} className="top-left">
                  <li>
                    <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                    <a href="mailto:fitbuzz01@gmail.com">fitbuzz01@gmail.com</a>
                  </li>
                </div>
                <div style={{ textAlign: "center" }} className="top-left">
                  <li>
                    <i className="far fa-clock" />{" "}
                    <b>use code for 20% discount MITS20 </b>
                  </li>
                </div>
                <div style={{ textAlign: "right" }} className="top-left">
                  <li>
                    <div className="social-style-one">
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fab fa-youtube" />
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </li>
                </div>
              </div>
              {/* <div className="row">
                <div style={{border:'2px solid red'}} className="col-xl-7 col-lg-12">
                  <div className="top-left">
                    <ul>
                      <li>
                        <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                        <a href="mailto:fitbuzz01@gmail.com">
                          fitbuzz01@gmail.com
                        </a>
                      </li>
                      <li >
                        <i className="far fa-clock" /> <b>Get exciting offers and free shipping on all orders </b>{" "}
                      
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-6">
                  <div className="top-right text-lg-right">
                    <ul>
                     
                      <li>
                        <div className="social-style-one">
                          <a href="#">
                            <i className="fab fa-facebook-f" />
                          </a>
                          <a href="#">
                            <i className="fab fa-twitter" />
                          </a>
                          <a href="#">
                            <i className="fab fa-youtube" />
                          </a>
                          <a href="#">
                            <i className="fab fa-instagram" />
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/*Header-Upper*/}
        <div className="header-upper">
          <div className="container-fluid clearfix">
            <div className="header-inner d-flex align-items-center">
              <div className="logo-outer">
                <div style={{ marginLeft: "30px" }} className="logo">
                  <Link href="/">
                    <a>
                      <img
                        style={{ width: "150px", height: "40px" }}
                        src="/assets/images/logos/logo.png"
                        alt="Logo"
                        title="Logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="nav-outer clearfix">
                {/* Main Menu */}
                <Nav />
                {/* Main Menu End*/}
              </div>
              {/* Menu Button */}
              <div className="menu-icons">
                {/* Nav Search */}
                <div className="nav-search py-15">
                  <SearchBtn />
                </div>
                <Link href="/cart">
                  <button className="cart">
                    <i className="far fa-shopping-basket" />
                    {/* <span>{cartcount}</span> */}
                  </button>
                </Link>
                {/* <Link href="/user/profile">
                <button className="user">
                  <i className="far fa-user-circle" />
                </button>
              </Link> */}
                {usertoken ? (
                  <div
                    style={{ marginLeft: "35px" }}
                    className="nav-search py-15"
                  >
                    <UserAccount />
                  </div>
                ) : (
                  <div
                    style={{ marginLeft: "35px" }}
                    className="nav-search py-15"
                  >
                    <LoginLog />
                  </div>
                )}

                <Link href="/shop">
                  <a className="theme-btn">
                    Shop <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
                {/* menu sidbar */}
                {/* <div className="menu-sidebar" onClick={() => sidebarToggle()}>
                  <button>
                    <i className="far fa-ellipsis-h" />
                    <i className="far fa-ellipsis-h" />
                    <i className="far fa-ellipsis-h" />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="categories" style={style}>
            <div
              style={{}}
              className="menu-sidebar"
              onClick={() => sidebarToggle()}
            >
              <a
                style={{ height: "100%", marginTop: "-10px" }}
                className="theme-btn"
              >
                Explore all <i className="fas fa-angle-double-right" />
              </a>
            </div>
            {data &&
              data.slice(0, 5).map((e) => (
                <div key={e._id}>
                  <Link href={`/category/${e.category}`}>
                    <p key={e._id}>{e.category}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/*End Header Upper*/}
      </header>
    </>
  );
};
const Header2 = () => {
  var items = useSelector((state) => state.basket);
  var cartcount = typeof window !== "undefined" ? 0 : items.items.length;
  return (
    <header className="main-header header-two">
      <div className="header-top-wrap">
        <div className="container">
          <div className="header-top bg-light-green text-white py-10">
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="top-left">
                  <ul>
                    <li>
                      <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                      <a href="mailto:fitbuzz01@gmail.com">
                        fitbuzz01@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="top-right text-lg-right">
                  <ul>
                    <li>
                      <i className="far fa-phone" /> <b>Call :</b>{" "}
                      <a href="callto:7814699271">7814699271</a>
                    </li>
                    <li>
                      <div className="social-style-one">
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container rel clearfix">
          <div className="header-inner d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link href="/">
                  <a>
                    <img
                      src="/assets/images/logos/logo.png"
                      alt="Logo"
                      title="Logo"
                    />
                    <img
                      src="/assets/images/logos/logo-white.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              {/* Main Menu */}
              <Nav />
              {/* Main Menu End*/}
            </div>
            {/* Menu Button */}
            <div className="menu-icons">
              {/* Nav Search */}
              <div className="nav-search py-15">
                <button className="far fa-search" />
                <form
                  onSubmit={(e) => e.preventDefault()}
                  action="#"
                  className="hide"
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className="searchbox"
                    required=""
                  />
                  <button
                    type="submit"
                    className="searchbutton far fa-search"
                  />
                </form>
              </div>
              <button className="cart">
                <i className="far fa-shopping-basket" />
              </button>
              {/* menu sidbar */}
              <div className="menu-sidebar" onClick={() => sidebarToggle()}>
                <button>
                  <i className="far fa-ellipsis-h" />
                  <i className="far fa-ellipsis-h" />
                  <i className="far fa-ellipsis-h" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};
const Header3 = () => {
  var items = useSelector((state) => state.basket);
  var cartcount = typeof window !== "undefined" ? 0 : items.items.length;
  return (
    <header className="main-header header-three menu-absolute">
      <div className="header-top-wrap bgc-primary py-10">
        <div className="container-fluid">
          <div className="header-top px-0">
            <ul>
              <li>25% OFF Upcoming Product</li>
              <li>100% Fresh &amp; natural foods</li>
              <li>free shipping over $99</li>
              <li>money back guarantee</li>
              <li>cash on delivery</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-middle py-15">
        <div className="container-fluid">
          <div className="header-middle-inner">
            <div className="menu-middle-left">
              <select name="currentcy" id="currentcy">
                <option value="USD">USD</option>
                <option value="BDT">BDT</option>
                <option value="EURO">EURO</option>
              </select>

              <select name="language" id="language">
                <option value="English">English</option>
                <option value="Bengali">Bengali</option>
                <option value="Arabic">Arabic</option>
              </select>

              <div className="follower">
                <i className="fab fa-facebook" />
                <a href="#">250k+ Followers</a>
              </div>
            </div>
            <div className="logo-outer">
              <div className="logo">
                <Link href="/">
                  <a>
                    <img
                      src="assets/images/logos/logo-two.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            {/* Menu Button */}
            <div className="menu-icons">
              {/* Nav Search */}
              <form
                onSubmit={(e) => e.preventDefault()}
                action="#"
                className="nav-search"
              >
                <input
                  type="text"
                  placeholder="Search here"
                  className="searchbox"
                  required=""
                />
                <button type="submit" className="searchbutton far fa-search" />
              </form>
              <button className="cart">
                <i className="far fa-shopping-basket" />
                {/* <span>{cartcount}</span> */}
              </button>
              <Link href="/user/profile">
                <button className="user">
                  <i className="far fa-user-circle" />
                </button>
              </Link>
              <button className="heart">
                <i className="far fa-heart" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
      <div className="header-upper px-0">
        <div className="container-fluid clearfix">
          <div className="header-inner d-flex align-items-center">
            <div className="nav-outer clearfix">
              {/* Main Menu */}
              <Nav />
              {/* Main Menu End*/}
            </div>
            {/* menu sidbar */}
            <div className="menu-sidebar" onClick={() => sidebarToggle()}>
              <button>
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
                <i className="far fa-ellipsis-h" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};
