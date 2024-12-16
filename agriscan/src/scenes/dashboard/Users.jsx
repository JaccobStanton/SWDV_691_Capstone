import React, { useState } from "react";
import { Modal, Button, Input } from "antd"; // For the modal and inputs
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/users.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../components/Login/auth/Firebase"; // Update the path to match your project structure
import EditUser from "../../components/Users/EditUser";

function Users() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Open the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEmail("");
    setPassword("");
  };

  // Handle user creation
  const handleCreateUser = async () => {
    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);
    const currentUser = auth.currentUser; // Save the current user session
    let currentUserCredentials = null;

    try {
      if (currentUser) {
        // Save current user's credentials
        currentUserCredentials = {
          email: currentUser.email,
          password: prompt(
            "Enter your current password to keep your session intact: "
          ),
        };
      }

      // Create the new user
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success(
        "User Created! They can now sign in with their new credentials."
      );

      // Re-authenticate the original user if there was one
      if (currentUserCredentials) {
        await signInWithEmailAndPassword(
          auth,
          currentUserCredentials.email,
          currentUserCredentials.password
        );
        toast.info("You are signed back into your original account.");
      }

      handleCancel(); // Close the modal after success
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-title-box">
        <h3>Users</h3>
      </div>
      <div className="button-container">
        <button className="choice-button" onClick={showModal}>
          Create User
        </button>
        <EditUser />
      </div>

      {/* Modal for creating a new user */}
      <Modal
        title="Create User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="create"
            type="primary"
            loading={loading}
            onClick={handleCreateUser}
          >
            Create
          </Button>,
        ]}
      >
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-left" autoClose={3000} />
    </>
  );
}

export default Users;
