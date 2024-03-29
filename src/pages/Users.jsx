import "../styles/users.css";
import { DataGrid } from "@material-ui/data-grid";
import { Edit, DeleteOutline } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import Helmet from "../components/Helmet/Helmet";

export default function Users() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users");
        setData(res.data);
      } catch (err) {}
    };
    getUsers();
  }, []);

  const handleDelete = (id) => {
    try {
      userRequest
        .delete("users/" + id)
        .then(() => userRequest.get("users").then((res) => setData(res.data)));
    } catch (err) {}
  };

  const columns = [
    {
      field: "username",
      headerName: "Utilisateur",
      width: 200,
      //   renderCell: (params) => {
      //     return (
      //       <div className="userListUser">
      //         <img className="userListImg" src={params.row.avatar} alt="" />
      //         {params.row.username}
      //       </div>
      //     );
      //   },
    },
    { field: "email", headerName: "Email", width: 400 },
    {
      field: "isAdmin",
      headerName: "Status",
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
              onClick={() => navigate(`/user/${params.row._id}`)}
              className="userListEdit"
            />
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Helmet title="Users List">
      <div className="Container">
        <div className="userList bac">
          <div className="userTitleContainer">
            <h1 className="userTitle">liste des utilisateurs</h1>
            <Link to="/newUser">
              <button className="userAddButton">Ajouter</button>
            </Link>
          </div>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            autoHeight
          />
        </div>
      </div>
    </Helmet>
  );
}
