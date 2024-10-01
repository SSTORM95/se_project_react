import { CurrentUserContext } from "../../Contexts/CurrentUserContext ";
import { useContext } from "react";
import "./ItemCard.css";
import liked from "../../images/liked.svg"
import disliked from "../../images/disliked.svg"

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some(id => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = (evt) => {
    evt.preventDefault();
    onCardLike({ id: item._id, isLiked });
  };
  //made use of the IsLiked constant above for a different approach on the like button
  // const itemLikeButtonClassName = (
  //     `modal__delete-button ${isOwn ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'}`
  //   )
  return (
    <li className="card">
      <div className="card__header">
      <h2 className="card__name">{item.name}</h2> {currentUser && 
      <img
      className="card__like-btn" src={isLiked ? liked : disliked}
      alt={isLiked ? "liked" : "disliked"}
      onClick={handleLike}></img>} 
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      ></img>
    </li>
  );
}

export default ItemCard;
