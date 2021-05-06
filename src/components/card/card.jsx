import React, { useCallback, useState } from "react";
import "./card.scss";
import { useDispatch } from "react-redux";
import { Button, Card, Icon, Image } from "semantic-ui-react";

const CardItem = ({ onAddItem, product }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const addItemToList = useCallback(() =>
    dispatch({ type: "ADD_ITEM_TO_LIST", listCard: product }),
    dispatch({ type: "TOTAL_PRICE", price: totalPrice })
  );
  const countTotal = (product) => {
    setTotalPrice(totalPrice + parseFloat(product.price));
  }
  const addToCart = () => {
    onAddItem();
    addItemToList();
    countTotal(product.price);
  };
  const _showPrice = (item) => {
    const price = item.price.toString();
    if (price.includes(".")) {
      return <p>{price}00 VNĐ</p>;
    } else {
      return <p>{price}.000 VNĐ</p>;
    }
  };
  return (
    <div className="card-container" title={product.name}>
      <img className="image" src={product.img} />
      <h4 className="name">{product.name}</h4>
      <p className="email d-flex">Giá: <span className="ml-1 text-success font-weight-bold">{_showPrice(product)}</span></p>
      <Button onClick={() => {addToCart(); countTotal(product)}} color="green">
        <Icon name="cart" />
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
};

export default CardItem;
