import { useState, useContext, useEffect } from "react";

import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ handleModalClose, isOpen, handleEditProfile }) => {
  const [value, setValue] = useState({});
  const currentUser = useContext(CurrentUserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(value);
  };

  useEffect(() => {
    if (isOpen) {
      setValue({ name: currentUser?.name, avatar: currentUser?.avatar });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      handleModalClose={handleModalClose}
      onSubmit={handleSubmit}
      handleEditProfile={handleEditProfile}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          id="edit-name"
          name="name"
          type="text"
          placeholder="Name"
          value={value.name || ""}
          onChange={handleChange}
          required
          className="modal__input"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*
        <input
          id="edit-avatar"
          name="avatar"
          type="url"
          placeholder="Avatar-Url"
          value={value.avatar || ""}
          onChange={handleChange}
          required
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
