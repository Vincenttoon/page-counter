import React, { useState } from "react";
import "./LoginModal.scss";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "../Modal/index.js";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth.js";

function LoginModal({
  showModal,
  setShowModal,
  showLoginModal,
  setShowLoginModal,
}) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      setShowLoginModal(false); // Close the modal after successful login
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const handleSignupClick = () => {
    setShowLoginModal(false); // Close the login modal
    setShowModal(true); // Open the signup modal
  };

  return (
    <Modal show={showLoginModal} setShow={setShowLoginModal}>
      <ModalHeader>
        <h2>Log In</h2>
      </ModalHeader>
      <ModalBody>
        <div className="input-group">
          <form onSubmit={handleFormSubmit}>
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
              <button type="submit">Log In</button>
              <button type="button" onClick={() => setShowLoginModal(false)}>
                Close
              </button>
            </div>
          </form>
        </div>
        <div className="signup-prompt">
          <p>
            Don't have an account yet?{" "}
            <a onClick={handleSignupClick}>Sign up!</a>
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default LoginModal;
