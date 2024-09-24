import "./ModalWithForm.css";
import close from "../../images/Close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleModalClose,
  onSubmit,
  redirectText,
  redirectTextClick,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <p className="modal__title">{title}</p>
        <button
          type="button"
          className="modal__close"
          onClick={handleModalClose}
        >
          <img src={close} alt="close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__buttons">
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
          <button
            type="button"
            className="modal__btn-redirect"
            onClick={redirectTextClick}
          >
            {redirectText}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
