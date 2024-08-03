import "./ModalWithForm.css"
import close from "../../images/Close.svg"

function ModalWithForm({ children, buttonText, title, activeModal, handleCloseClick }) {
    return (
      <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
        <div className="modal__content">
            <p className="modal__title">{title}</p>
            <button type="button" className="modal__close" onClick={handleCloseClick}>
                <img src={close} alt="" />
            </button>
                <form className="modal__form">
                    {children}
                    <button className="modal__submit" type="submit">{buttonText}</button>
                </form>
        </div>
      </div>
    )
}

export default ModalWithForm;