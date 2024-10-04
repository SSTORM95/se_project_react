import "./ClothesSection.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  handleAddClick,
  clothingItems,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes__section">
      <div className="clothes__section-title">
        <p className="clothes__title">Your Items</p>
        <button className="clothes__section-button" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
