import React from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FavoritesSidebar = ({ show, handleClose }) => {
  const favorites = useSelector((state) => state.favorites);

  const navigate = useNavigate();

  const selectProducts = (favorites) => {
    handleClose();
    navigate(`/products/${favorites.id}`);
  };

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {favorites.map((favorite) => (
              <ListGroup.Item onClick={() => selectProducts(favorite)}>
                {favorite.news.headline}
                <img src={favorite.image} className="img-fluid" alt="" />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FavoritesSidebar;
