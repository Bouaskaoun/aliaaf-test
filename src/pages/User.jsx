import { MailOutline, PermIdentity, Publish } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { userRequest } from "../requestMethods";

import userIcon from "../assets/images/user-icon.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/user.css";
import Helmet from "../components/Helmet/Helmet";

export default function User() {
  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  //const [password, setPassword] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get(`users/find/${id}`);
        //setData(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await userRequest
      .put(`users/${id}`, {
        username: username,
        email: email,
        isAdmin: isAdmin,
      })
      .then(() => {
        toast.success("User has been updated");
      })
      .catch((err) => {
        toast.error("User has not been updated");
      });
  };

  return (
    <Helmet title="User">
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src={userIcon} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{username}</span>
                <span className="userShowUserTitle">
                  {isAdmin ? "Admin" : "User"}
                </span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{username}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleUpdate}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="userUpdateInput"
                  />
                </div>
                {/* <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder='Password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    className="userUpdateInput"
                  />
                </div> */}
                <div className="userUpdateItem">
                  <label>Status</label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value={true}
                      checked={isAdmin}
                      onChange={(e) =>
                        setIsAdmin(e.target.value === "true" ? true : false)
                      }
                      //className="form-check-input"
                    />
                    Admin
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value={false}
                      checked={!isAdmin}
                      onChange={(e) =>
                        setIsAdmin(e.target.value === "true" ? true : false)
                      }
                      //className="form-check-input"
                    />
                    Not Admin
                  </label>
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img className="userUpdateImg" src={userIcon} alt="" />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
}
