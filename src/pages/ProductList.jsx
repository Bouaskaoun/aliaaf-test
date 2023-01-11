import "../styles/productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import Helmet from "../components/Helmet/Helmet";

export default function ProductList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("products");
        setData(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const handleDelete = (id) => {
    try {
      userRequest.delete("products/" + id)
      .then(() => publicRequest.get("products").then(res => setData(res.data)));
    } catch (err) {}
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Book Title",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="productListItem">
      //       <img className="productListImg" src={params.row.img} alt="" />
      //       {params.row.name}
      //     </div>
      //   );
      // },
    },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "author",
      headerName: "Author",
      width: 120,
    },
    {
      field: "pdf",
      headerName: "Pdf",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Helmet title='Books List'>
      <div className="Container">
        <div className="productList">
          <div className="userTitleContainer">
            <h1 className="userTitle">Books List</h1>
            <Link to="/addBooks">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            disableColumnSelector = {true}
            // disable sorting
            disableColumnMenu
            // disable selection

            
            disableSelectionOnClick
            pageSize={8}
            autoHeight
          />
        </div>
      </div>
    </Helmet>  
  );
}
