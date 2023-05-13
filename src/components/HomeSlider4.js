import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { Home } from "../sliderProps";
import axios from "axios";
import {baseUrl} from '../../pages/api/hello.js';
const ClientLogoSlider = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/sliders`)
      .then((res) => {
        setData(res.data.sliders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      {/* <Slider {...Home}>
        <a>
          <img
            style={{ width: "100%", margin: "auto" }}
            src="assets/images/Fitbuzz/Banner3.jpg"
            alt="Client Logo"
          />
        </a>

        <a>
          <img
            style={{ width: "100%", margin: "auto" }}
            src="assets/images/Fitbuzz/Banner2.jpg"
            alt="Client Logo"
          />
        </a>

        <a>
          <img
            style={{ width: "100%", margin: "auto" }}
            src="assets/images/Fitbuzz/Banner1.jpg"
            alt="Client Logo"
          />
        </a>
      </Slider> */}
      <Slider  {...Home}>
        {data.length > 0 &&
          data[0].images.map((e, i) => (
            // <a>
              <img
                style={{ width: "100%", margin: "auto", padding:'0px' }}
                src={`${baseUrl}/${e}`}
                alt="Slider"
              />
            // </a>
          ))}
      </Slider>
    </Fragment>
  );
};
export default ClientLogoSlider;
