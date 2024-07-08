import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCamera } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import Footer from "../../Components/Footer";
import Nav from "../../Components/Nav";

const Update = () => {
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData, login } = useAuth();

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setImage(userData.image);
      setEmail(userData.email);
    }
  }, [userData]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem('user_token');

      setUploading(true);
      const { data } = await axios.post("http://localhost:3000/api/auth/upload-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload image. Please try again.");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('user_token');

      setLoading(true);
      const { data } = await axios.put("http://localhost:3000/api/auth/profile-update", {
        name,
        image,
        email,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      if (data) {
        login(token, data); // Memperbarui data pengguna di context atau state aplikasi
        toast.success("Profile Updated Successfully");
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="row d-flex align-items-center justify-content-center mb-4">
        <div className="col-md-8">
          <h1 className="p-3 text-3xl text-center">Profile Details</h1>
          <form onSubmit={handleSubmit}>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
         
            <div className="">
              <label htmlFor="image" className="ms-4 mt-2">
                {image && image.url ? (
                  <img src={image.url} height={300} width={300} className="m-2" alt="User Avatar" />
                ) : uploading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <BsCamera size={40} style={{ cursor: "pointer" }} />
                )}
                <input
                  type="file"
                  accept="images/*"
                  onChange={handleImage}
                  name="image"
                  id="image"
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword"
              />
            </div>
            <div className="d-flex flex-row">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Loading &nbsp;</span>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Update;
