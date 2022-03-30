import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { itemAdd, itemDetails, itemUpdate } from "../actions/productAction";

function ItemScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [email, setemail] = useState("");
  const [name, setname] = useState("");

  const listDetails = useSelector((state) => state.itemDetails);

  // console.log(listDetails);

  React.useEffect(() => {
    console.log("hai");
    if (listDetails.item) {
      setemail(listDetails.item.email);
      setname(listDetails.item.name);
    } else {
      setemail("");
    }
  }, [listDetails]);

  React.useEffect(() => {
    if (id) {
      dispatch(itemDetails(id));
    }
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      name: name,
      email: email,
      id: id ? id : 0,
    };
    //console.log("inside function");
    if (id) {
      dispatch(itemUpdate(data));
    } else {
      dispatch(itemAdd(data));
    }
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <div class="form-group mt-3">
              <label
                for="exampleInputEmail1 "
                className="col-form-label control-label"
              >
                Email address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                autoFocus
                class="form-control"
                value={email}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleInputPassword1">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                required
              />
            </div>

            <div className="">
              <button type="submit" class="btn btn-success mt-3 ">
                Submit
              </button>
              <Link class="btn btn-danger mt-3 mx-4 " to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemScreen;
