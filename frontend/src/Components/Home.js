import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
//import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import LoadingBox from "./LoadingBox";

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
      dataField: "name",
      text: "Name",
      filter: textFilter(),
      sort: true,
      headerAlign: "center",
    },
    {
      dataField: "email",
      text: "Email",
      filter: textFilter({}),
      sort: true,
      headerAlign: "center",
    },
    {
      dataField: "createdAt",
      text: "Created At",
      formatter: (cell, row, rowIndex) => {
        return <p>{moment(row.createdAt).format("MM/DD/YYYY h:mm:ss")}</p>;
      },

      headerAlign: "center",
    },
    {
      dataField: "updatedAt",
      text: "Updated At",
      formatter: (cell, row, rowIndex) => {
        return <p>{moment(row.updatedAt).format("MM/DD/YYYY h:mm:ss")}</p>;
      },
      headerAlign: "center",
    },
    {
      dataField: "#",
      text: "Action",
      headerAlign: "center",
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="text-center">
            <Link to={`/item/${row._id}`} className="btn btn-outline-secondary">
              View
            </Link>
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
            <Card>
              <BootstrapTable
                keyField="id"
                data={itemList}
                columns={columns}
                noDataIndication={noData}
                filter={filterFactory()}
                pagination={paginationFactory()}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
