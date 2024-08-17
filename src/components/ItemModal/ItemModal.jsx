import "./ItemModal.css";
import close from "../../images/Close.svg";

function ItemModal({ activeModal, card, handleModalClose, handleDeleteItem }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`} >
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
          <button className="modal__delete-button" onClick={() => {
            handleDeleteItem(card._id);
          }}>Delete Item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
