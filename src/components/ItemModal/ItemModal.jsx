import "./ItemModal.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import { useContext } from "react";
import close from "../../images/Close.svg";

function ItemModal({ activeModal, card, handleModalClose, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  // handed function on the project 14 steps didnt work for my app, applied on the class name of the button made it worked
  // const isOwn = card.owner === currentUser._id;
  // const itemDeleteButtonClassName = (
  //   `modal__delete-button ${isOwn ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'}`
  // );
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content_type_image">
        <button
          onClick={handleModalClose}
          className="modal__close modal__close-preview"
        >
          <img src={close} alt="close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            className={`modal__delete-button ${
              card.owner === currentUser?._id
                ? ""
                : "modal__delete-button_hidden"
            }`}
            onClick={() => {
              handleDeleteItem(card._id);
            }}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
