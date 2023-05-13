import axios from "axios";
import React, { useState } from "react";
import baseUrl from '.././api/hello.js'
const addsliders = () => {
  const [image, setImage] = useState([]);
  const addslider = (e) => {
    e.preventDefault();
    let formData = new FormData();
    Array.from(image).forEach((item) => {
      formData.append("products", item);
    });
    console.log(image);
    axios
      .post(`${baseUrl}/add-slider`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {Array.from(image).map((item) => {
        return (
          <span>
            <img
              style={{ padding: "10px" }}
              width={150}
              height={100}
              src={item ? URL.createObjectURL(item) : null}
            />
          </span>
        );
      })}
      <div className="col-md-12">
        <div className="form-group">
          <input
            onChange={(e) => {
              setImage(e.target.files);
              // console.log(e.target.files)
            }}
            multiple
            type="file"
            id="photo"
            name="photo"
            // onChange={(e) => onUploadImage(e.target.files[0])}
            // onChange={handleChange}
            // value={password_confirmation}
            className="form-control"
            defaultValue=""
            placeholder="Profile Photo"
            required=""
            data-error="Please select a photo"
          />
          <div className="help-block with-errors" />
        </div>
      </div>
      <button onClick={addslider}>Add</button>
    </div>
  );
};

export default addsliders;
