import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { getToken } from "../../utils/token";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import { registerUser, signInUser } from "../../utils/auth";
import { useEffect, useState } from "react";
import { addNewItem, deleteItem, getItems } from "../../utils/api";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [protectedDestination, setProtectedDestination] = useState("/profile");

  const [weatherData, setWeatherData] = useState(0);
  const [activeModal, setActiveModal] = useState("register");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const navigate = useNavigate();


  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  const onAddItem = (values) => {
    addNewItem(values).then((data) => {
      setClothingItems([data, ...clothingItems]);
      handleModalClose();
    }).catch((err) => {
      console.error(`Unable to process request, Error: ${err}`);
    });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  function handleDeleteItem(card) {
    deleteItem(card)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== card));
        handleModalClose();
      })
      .catch(console.error);
  }

  const handleRegistration = ({
    email,
    password,
    name,
    avatar
  }) => {
    registerUser({email,
      password,
      name,
      avatar})
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        console.log(res);
        navigate("/profile");
        handleModalClose();
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }
  signInUser({email, password}).then((res) => {
    setToken(res.token);
    return isValidToken(res.token);
  })
  .then((user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    handleModalClose();
    navigate(protectedDestination || "/");
  })
  .catch((err) => {
    console.error("Invalid data entered", err);
  });
};

 

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    isValidToken(token)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setIsloggedIn(true);
      })
      .catch(console.error);
  }, []);


  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            handleModalClose={handleModalClose}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
        )}

         <RegisterModal
            isOpen={activeModal === "register"}
            handleModalClose={handleModalClose}
            handleRegistration={handleRegistration}
            setActiveModal={setActiveModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleModalClose={handleModalClose}
            handleLogin={handleLogin}
            setActiveModal={setActiveModal}
          />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleModalClose={handleModalClose}
          handleDeleteItem={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
