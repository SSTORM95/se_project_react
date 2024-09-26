import "./SideBar.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import { useContext } from "react";

function SideBar({ handleEditProfileModal}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser.avatar}
          alt={currentUser.avatar}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__menu">
        <button 
        className="edit__profile-btn" 
        onClick={ handleEditProfileModal }>
          Change profile data
        </button>
      </div>
    </div>
  );
}

export default SideBar;
