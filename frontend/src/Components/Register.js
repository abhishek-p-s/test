import React, { useState } from "react";
import axios from "axios";
import { userAction } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postData } from "../function";
import MessageBox from "./MessageBox";

import cogoToast from "cogo-toast";

function Register() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [name, setname] = React.useState("");
  const [confirmpassword, setconfirmpassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password != confirmpassword) {
      cogoToast.error("Password mismatch");
    } else {
      const data = {
        name: name,
        email: email,
        password: password,
        isAdmin: false,
      };
      postData(data, "/user/register", "Registered Successfully", "register");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="login-section p-5">
            <form onSubmit={handleSubmit}>
              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">
                  Name
                </label>
                <input
                  type="Text"
                  id="form2Example3"
                  class="form-control"
                  autoFocus
                  placeholder="Enter name..."
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example1">
                  Email address
                </label>
                <input
                  type="email"
                  id="form2Example1"
                  class="form-control"
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">
                  Password
                </label>
                <input
                  type="password"
                  id="form2Example2"
                  class="form-control"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </div>

              <div class="form-outline mb-4">
                <label class="form-label" for="form2Example2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="form2Example2"
                  class="form-control"
                  placeholder="Enter password..."
                  value={confirmpassword}
                  onChange={(e) => {
                    setconfirmpassword(e.target.value);
                  }}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  class="btn btn-outline-primary  btn-block mb-4"
                >
                  Sign in
                </button>
                <Link
                  type="button"
                  class="btn btn-outline-danger mx-3  btn-block mb-4"
                  to="/login"
                >
                  Cancel
                </Link>
              </div>
            </form>
            <div className="register">
              <Link to="/login">Already a user?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
