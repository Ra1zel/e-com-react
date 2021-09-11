import { useHistory } from "react-router-dom";
import img from "../../azt_category1.jpeg";
import "./CategoryCard.css";
const CategoryCard = (props) => {
  const history = useHistory();
  const categoryClickHandler = () => {
    history.push(`/Browse/${props.categoryName.toLowerCase()}`);
  };
  return (
    <div className="category-card" onClick={categoryClickHandler}>
      <div className="category-card__img-container">
        <img
          src={props.categoryImg}
          alt=""
          className="category-card__img"
        ></img>
      </div>
      <div className="category-card__copy">
        <h4>{props.categoryName}</h4>
      </div>
    </div>
  );
};
export default CategoryCard;
