import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleModalClose,
  isOpen,
  handleRegistration,
  setActiveModal,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  const handleModalChange = (e) => {
    e.preventDefault();
    handleModalClose();
    setActiveModal("login");
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      redirectText={"or Log in"}
      redirectTextClick={handleModalChange}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
          className="modal__input"
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
          className="modal__input"
          autoComplete="true"
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          id="name"
          name="name"
          type="name"
          value={data.name}
          required
          placeholder="Name"
          onChange={handleChange}
          className="modal__input"
        />
      </label>
      <label htmlFor="avatar-URL" className="modal__label">
        Avatar URL*
        <input
          id="avatar-URL"
          name="avatar"
          type="avatar-URL"
          value={data.avatar}
          onChange={handleChange}
          required
          placeholder="Avatar URL"
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
