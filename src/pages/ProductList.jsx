import "../styles/productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import Helmet from "../components/Helmet/Helmet";

export default function ProductList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
      userRequest
        .delete("products/" + id)
        .then(() =>
          publicRequest.get("products").then((res) => setData(res.data))
        );
    } catch (err) {}
  };

  const columns = [
    {
      field: "title",
      headerName: "Titre du Document",
      width: 600,
      // renderCell: (params) => {
      //   return (
      //     <div className="productListItem">
      //       <img className="productListImg" src={params.row.img} alt="" />
      //       {params.row.name}
      //     </div>
      //   );
      // },
    },
    { field: "category", headerName: "Catégorie", width: 200 },
    {
      field: "author",
      headerName: "Auteur",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Edit
              className="productListEdit"
              onClick={() => navigate(`/product/${params.row._id}`)}
            />
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
    <Helmet title="Books List">
      <div className="Container">
        <div className="productList bac">
          <div className="userTitleContainer">
            <h1 className="userTitle">liste des documents</h1>
            <Link to="/addBooks">
              <button className="userAddButton">Ajouter</button>
            </Link>
          </div>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            disableColumnSelector={true}
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
