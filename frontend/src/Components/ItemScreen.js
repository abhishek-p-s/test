import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { itemAdd, itemDetails, itemUpdate } from "../actions/productAction";
import moment from "moment";
import Navbar from "./Navbar";

function ItemScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [date, setdate] = useState(moment(new Date()).format("DD/MM/YYYY"));
  const [name, setname] = useState(
    JSON.parse(localStorage.getItem("userInfo")).name
  );
  const [fromTime, setfromTime] = useState("10:00");
  const [toTime, settoTime] = useState("");
  const [projectName, setprojectName] = useState("");

  const listDetails = useSelector((state) => state.itemDetails);

  // console.log(listDetails);

  console.log(moment(new Date()).format("DD/MM/YYYY"), "moment()");

  React.useEffect(() => {
    console.log("hai");
    if (listDetails.item) {
      setdate(listDetails.item.date);
      setname(listDetails.item.name);
      setprojectName(listDetails.item.projectName);
    } else {
      setdate("");
    }
  }, [listDetails]);

  React.useEffect(() => {
    if (id) {
      dispatch(itemDetails(id));
    }
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    var startTime = moment(fromTime, "hh:mm");
    var endTime = moment(toTime, "hh:mm");
    var mins = moment
      .utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss")))
      .format("mm");

    // console.log(
    //   "time diff",
    //   endTime.diff(startTime, "hours") + " Hrs and " + mins + " Mns"
    // );

    var data = {
      name: JSON.parse(localStorage.getItem("userInfo")).name,
      date: date,
      projectName: projectName,
      hour: endTime.diff(startTime, "hours") + " Hrs and " + mins + " Mns",
      id: id ? id : 0,
    };
    // console.log("inside function");
    if (id) {
      dispatch(itemUpdate(data));
    } else {
      dispatch(itemAdd(data));
    }
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row p-5 item-border mt-5">
          <div className="col-md-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mt-3">
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
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group mt-3">
                    <label
                      for="exampleInputEmail1 "
                      className="col-form-label control-label"
                    >
                      Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      value={date}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(e) => {
                        setdate(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mt-2">
                  <div class="form-group">
                    <label for="exampleInputPassword1">
                      project <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      autoFocus
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="name"
                      value={projectName}
                      onChange={(e) => {
                        setprojectName(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-3 mt-2">
                  <label for="fromtime">From</label>
                  <input
                    type="time"
                    class="form-control"
                    defaultValue="10:00"
                    onChange={(e) => {
                      setfromTime(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-3 mt-2">
                  <label for="fromtime">To</label>
                  <input
                    type="time"
                    class="form-control"
                    onChange={(e) => {
                      settoTime(e.target.value);
                    }}
                  />
                </div>
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
    </>
  );
}

export default ItemScreen;
