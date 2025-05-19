import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import "./category_card.css";
const CategoryCard = ({ title, imageSrc, href }) => {
  return (
      <Link to={`/${href}`} className="link-wrapper">
      <Card className="card-container">
        <Card.Img  src={imageSrc} className="image-div" />
        <Card.Body className="CardTitle">
         {title}
        </Card.Body>
      </Card>
    </Link>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default CategoryCard;
