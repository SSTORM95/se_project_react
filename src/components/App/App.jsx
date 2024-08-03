import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main'
import ModalWithForm from '../ModalWithForm/ModalWithForm';

import { useState } from 'react';

function App () {
    const [weatherData, setWeatherData] = useState({ type : "cold" });
    const [activeModal, setActiveModal] = useState("")

    const handleAddClick = ( ) => {
        setActiveModal("add-garment");
    }

    const handleCloseClick = () => {
        setActiveModal("");
    }

    return (
    <div className="page">
        <div className='page__content'>
            <Header handleAddClick={handleAddClick} />
            <Main weatherData={weatherData}  />
            <Footer />
        </div>
        <ModalWithForm title="New garment" buttonText="Add garment" activeModal={activeModal} handleCloseClick={handleCloseClick}>
                    <label htmlFor="name" className="modal__label">
                        Name{" "}
                        <input type="text" className="modal__input" id="name" placeholder="Name"/>
                    </label>
                    <label htmlFor="imageUrl" className="modal__label">
                        Image{" "} 
                        <input type="url" className="modal__input" id="imageUrl" placeholder="Image Url"/>
                    </label>
                    <fieldset className="modal__radio-buttons">
                        <legend className="modal__legend">Select the weather type:</legend>
                        <label htmlFor="hot" className="modal__label modal__label_type_radio">
                            <input type="radio" className="modal__radio-input" id="hot" />Hot
                        </label>
                        <label htmlFor="warm" className="modal__label modal__label_type_radio">
                            <input type="radio" className="modal__radio-input" id="warm" />Warm
                        </label>
                        <label htmlFor="cold" className="modal__label modal__label_type_radio">
                            <input type="radio" className="modal__radio-input" id="cold" />Cold
                        </label>
                    </fieldset>
        </ModalWithForm>
    </div>
    );
}

export default App