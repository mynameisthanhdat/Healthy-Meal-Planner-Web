import React, { useCallback, useState } from "react";
import "./card.scss";
import { useDispatch } from "react-redux";
import { Button, Card, Icon, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const CardItem = ({ onAddItem, product, detail, menuId }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const moveToDetail = () => {
    {detail ? 
      history.push(`/menu/${product.key}`) : 
      history.push({
        pathname: `/cook/${product._id}`,
        product: product,
        menuId: menuId
      })
    }
  }

  return (
    <div className="card-container" title={product.name} onClick={() => moveToDetail()}>
      <img className="image" src={product.img} />
      <h4 className="name">{product.name}</h4>
      {detail ? 
        <p className="email d-flex">Giá: <span className="ml-1 text-success font-weight-bold">{_showPrice(product)}</span></p> : 
        <>
        <p className="email d-flex">Thành phần chính: <span className="ml-1 text-success font-weight-bold">{product.main_ingredient}</span></p>
        <p className="email d-flex">Lượt nấu: <span className="ml-1 text-success font-weight-bold">{product.view}</span></p>
        </>
      }
      <Button onClick={() => {addToCart(); countTotal(product)}} color="green">
        {detail ? <><Icon name="eye" /> Xem thực đơn</> : <>Xem món ăn</>}
      </Button>
    </div>
  );
};

export default CardItem;
