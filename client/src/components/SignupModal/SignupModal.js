import React, { useState } from "react";
import "./SignupModal.scss";
import SignupButton from "./SignupButton.js";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "../Modal/index.js";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth.js";
function SignupModal({ showModal, setShowModal }) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("Signup successful:", data);
      Auth.login(data.addUser.token);
      setShowModal(false); // Close the modal after successful signup
    } catch (e) {
      console.error("Signup error:", e);
    }
  };

  console.log(handleFormSubmit);

  return (
    <Modal show={showModal} setShow={setShowModal}>
      <ModalHeader>
        <h2>Sign Up</h2>
      </ModalHeader>
      <ModalBody>
        <div className="input-group">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={formState.username}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formState.email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formState.password}
                required
              />
            </div>
            {error && <p className="error-message">{error.message}</p>}
            <div className="modal-footer">
              <button type="submit">Sign Up</button>
              <SignupButton type="submit" onClick={() => setShowModal(false)}>
                Close
              </SignupButton>
            </div>
          </form>
        </div>
        <div className="login-prompt">
          <p>
            {" "}
            Already have an account? <a>Log in!</a>
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default SignupModal;
