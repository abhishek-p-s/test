import React from "react";
import Myprojects from "./Myprojects";
import Mytasks from "./Mytasks";
import Navbar from "./Navbar";

function Task() {
  const [task, setTask] = React.useState(true);

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row ">
          <div className="col-md-6">
            <button
              style={{ width: "100%" }}
              className="btn btn-primary"
              onClick={() => {
                setTask(true);
              }}
              disabled={task}
            >
              Task
            </button>
          </div>
          <div className="col-md-6">
            <button
              style={{ width: "100%" }}
              className="btn btn-secondary"
              onClick={() => {
                setTask(false);
              }}
              disabled={!task}
            >
              MY Project
            </button>
          </div>
        </div>

        <div className="row mt-5">{task ? <Mytasks /> : <Myprojects />}</div>
      </div>
    </>
  );
}

export default Task;
