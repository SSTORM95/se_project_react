import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  handleAddClick,
  clothingItems,
  handleEditProfileModal,
  onCardLike,
  handleLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileModal={handleEditProfileModal}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
