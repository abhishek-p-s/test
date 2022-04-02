import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
//import ToolkitProvider, { CSVExport,Search } from "react-bootstrap-table2-toolkit";
import ToolkitProvider, {
  CSVExport,
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, itemDelete } from "../actions/productAction";
import LoadingBox from "./LoadingBox";
import Navbar from "./Navbar";
import ItemScreen from "./ItemScreen";
import swal from "sweetalert";

const { ExportCSVButton } = CSVExport;

function Home() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.itemList);
  const user = useSelector((state) => state.userSignin);

  const { loading, itemList } = list;

  console.log("user data", user);

  // const { loading, error, items } = itemList;

  React.useEffect(() => {
    dispatch(listProducts());
    if (user.user.isAdmin == true) {
      console.log("column pushing");
      columns.push({
        dataField: "name",
        text: "Name",
        filter: textFilter(),
        sort: true,
        headerAlign: "center",
      });
    }
    console.log("colum", columns);
  }, []);

  const columns = [
    // {
    //   dataField: "SlNo",
    //   text: "#",
    //   headerAlign: "center",
    // },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      hidden: user.user.isAdmin === true ? false : true,
      headerAlign: "center",
    },

    {
      dataField: "projectName",
      text: "Project Name",
      filter: textFilter(),
      sort: true,
      headerAlign: "center",
    },
    {
      dataField: "hour",
      text: "Hour",
      filter: textFilter({}),
      sort: true,
      headerAlign: "center",
    },

    {
      dataField: "date",
      text: "Date",
      filter: textFilter({}),
      formatter: (cell, row, rowIndex) => {
        return <p>{moment(row.date).format("MMM Do YYYY")}</p>;
      },
    },

    // {
    //   dataField: "createdAt",
    //   text: "Created At",
    //   formatter: (cell, row, rowIndex) => {
    //     return <p>{moment(row.createdAt).format("MM/DD/YYYY h:mm:ss")}</p>;
    //   },

    //   headerAlign: "center",
    // },
    // {
    //   dataField: "updatedAt",
    //   text: "Updated At",
    //   formatter: (cell, row, rowIndex) => {
    //     return <p>{moment(row.updatedAt).format("MM/DD/YYYY h:mm:ss")}</p>;
    //   },
    //   headerAlign: "center",
    // },
    {
      dataField: "#",
      text: "Action",
      headerAlign: "center",
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="text-center">
            <Link to={`/item/${row._id}`} style={{ textDecoration: "none" }}>
              <i class="fas fa-edit"></i>
            </Link>

            <i
              class="fa fa-trash mx-3 text-danger"
              onClick={(e) => {
                e.preventDefault();
                swal({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover this imaginary file!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    dispatch(itemDelete(row._id));
                    swal("Poof! Your imaginary file has been deleted!", {
                      icon: "success",
                    });
                  } else {
                    swal("Your imaginary file is safe!");
                  }
                });
              }}
              aria-hidden="true"
            ></i>
          </div>
        );
      },
    },
  ];

  const noData = <div className="text-muted py-3 text-center"> No Data..</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        {user ? user.user.isAdmin == true ? "" : <ItemScreen /> : ""}

        <div className="row">
          <div className="col-md-12 p-5">
            {loading ? (
              <LoadingBox />
            ) : (
              <div>
                {/* <div>
                  <Link className="btn btn-success mb-3" to={`/item`}>
                    <i class="fa fa-plus" aria-hidden="true"></i> Add New
                  </Link>
                </div> */}

                <ToolkitProvider
                  keyField="id"
                  data={itemList}
                  columns={columns}
                  exportCSV={{
                    fileName: "workDetails.csv",
                  }}
                >
                  {(props) => (
                    <div>
                      <ExportCSVButton
                        style={{ float: "right" }}
                        className="btn btn-secondary mb-3"
                        {...props.csvProps}
                      >
                        Export
                      </ExportCSVButton>

                      <BootstrapTable
                        {...props.baseProps}
                        keyField="id"
                        data={itemList}
                        columns={columns}
                        noDataIndication={noData}
                        filter={filterFactory()}
                        pagination={paginationFactory()}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
