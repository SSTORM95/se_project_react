import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { getToken, setToken } from "../../utils/token";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import { registerUser, signInUser, isValidToken, updateUser } from "../../utils/auth";
import { addNewItem, deleteItem, getItems } from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [protectedDestination, setProtectedDestination] = useState("/profile");

  const [weatherData, setWeatherData] = useState(0);
  const [activeModal, setActiveModal] = useState("");
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

  const handleLoginUser = () => {
    setActiveModal("login");
  };

  const handleEditProfilePopup = () => {
    setActiveModal("edit");
  }

  const handleRegisterUser = () => {
    setActiveModal("register");
  };

  const onAddItem = (values) => {
    addNewItem(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleModalClose();
      })
      .catch((err) => {
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

  const handleRegistration = ({ email, password, name, avatar }) => {
    registerUser({ email, password, name, avatar })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.data);
       
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
    signInUser({ email, password })
      .then((res) => {
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

  const handleEditProfile = ({ name, avatar}) => {
    updateUser({name, avatar})
    .then((res) => {
      console.log(res)
      setCurrentUser(res)
      handleModalClose()
    }).catch((res) => {
      console.error(res);
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
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header 
            handleAddClick={handleAddClick} 
            weatherData={weatherData} 
            handleRegisterUser={handleRegisterUser}
            handleLoginUser={handleLoginUser}
            isLoggedIn={isLoggedIn}/>
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
                      handleEditProfileModal={handleEditProfilePopup}
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
          <EditProfileModal
            isOpen={activeModal === "edit"}
            handleModalClose={handleModalClose}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
