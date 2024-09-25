import "./ItemModal.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import { useContext } from "react";
import close from "../../images/Close.svg";

function ItemModal({ activeModal, card, handleModalClose, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser;


  const itemDeleteButtonClassName = (
    `modal__delete-button ${isOwn ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'}`
  );
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
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
            className={itemDeleteButtonClassName}
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
