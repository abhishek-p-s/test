import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
//import ToolkitProvider, { CSVExport,Search } from "react-bootstrap-table2-toolkit";
import ToolkitProvider, {
  CSVExport,
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, itemDelete } from "../actions/productAction";
import LoadingBox from "./LoadingBox";

const { ExportCSVButton } = CSVExport;

function Home() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.itemList);

  const { loading, itemList } = list;

  console.log("table data", itemList);

  // const { loading, error, items } = itemList;

  React.useEffect(() => {
    dispatch(listProducts());
  }, []);

  const columns = [
    // {
    //   dataField: "SlNo",
    //   text: "#",
    //   headerAlign: "center",
    // },
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
            <Link to={`/item/${row._id}`} className="btn btn-outline-secondary">
              Edit
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(itemDelete(row._id));
              }}
              className="mx-3 btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const noData = <div className="text-muted py-3 text-center"> No Data..</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 p-5">
          {loading ? (
            <LoadingBox />
          ) : (
            <div>
              <div>
                <Link className="btn btn-success mb-3" to={`/item`}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Create New
                </Link>
              </div>

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
  );
}

export default Home;
