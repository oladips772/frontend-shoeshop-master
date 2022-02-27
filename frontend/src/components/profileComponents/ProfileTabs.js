/** @format */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/UserActions";

const ProfileTabs = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = useRef(null);

  const toastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Passwords do not match", toastObjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      toastId.current = toast.success(
        "Profile updated succesfully",
        toastObjects
      );
    }
  };

  return (
    <>
      <form className="row  form-container" onSubmit={submitHandler}>
        <Toast />
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              placeholder={`${user.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
