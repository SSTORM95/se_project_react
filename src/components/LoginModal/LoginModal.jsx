import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({handleModalClose, isOpen, setActiveModal }) => {

    const [data, setData] = useState({
        email: "",
        password: "",
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
        handleLogin(data);
      };

      const handleModalChange = (e) => {
        e.preventDefault();
        handleModalClose();
        setActiveModal("register");
      };
      
      return(
        <ModalWithForm
      title="Log in"
      buttonText="Next"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      redirectText={"or Register"}
      redirectTextClick={handleModalChange}
    >
     <label htmlFor="email" className="modal__label">Email
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
        <label htmlFor="password" className="modal__label">Password
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
          className="modal__input"
        />
        </label>
    </ModalWithForm>
      )
}

export default LoginModal;