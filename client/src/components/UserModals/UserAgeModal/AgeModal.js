import React, { useState } from "react";
import "./AgeModal.scss";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../Modal/index.js";
import { useMutation } from "@apollo/client";
import { ADD_AGE } from "../../../utils/mutations.js";
import Auth from "../../../utils/auth.js";

const AgeModal = ({ showModal, setShowModal }) => {
  const [age, setAge] = useState("");
  const [addAge, { error }] = useMutation(ADD_AGE);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addAge({
        variables: { age: parseInt(age) },
      });
      console.log("Age added successfully:", data);
      Auth.login(data.addAge.token);
      setShowModal(false);
      alert("Age Added!"); // Close the modal after successful age addition
    } catch (e) {
      console.error("Error adding age:", e);
    }
  };

  return (
    <div className="add-age-modal">
      <Modal show={showModal} setShow={setShowModal}>
        <ModalHeader>
          <h1 className="age-modal-h2">Add Age</h1>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error-message">{error.message}</p>}
            <div className="modal-footer">
              <button type="submit">Add Age</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AgeModal;
