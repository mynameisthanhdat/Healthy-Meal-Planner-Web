import React, { useCallback } from "react";
import "./cardPick.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
let picked = [];

const CardPick = ({ product }) => {
  const dispatch = useDispatch();
  const getListItems = useSelector((state) => state.foodReducer?.listItem);
  const addItemToList = useCallback(() =>
    dispatch({ type: "ADD_ITEM_TO_HANDLE", item: product._id })
  );
  const removeItemToList = useCallback(() =>
    dispatch({ type: "REMOVE_ITEM_TO_HANDLE", item: product._id })
  );

  const pickItem = (id) => {
    picked[id] = !picked[id];
  };

  const addItem = (id) => {
    if (getListItems.includes(id)) {
      removeItemToList();
    } else {
      addItemToList();
    }
  };

  return (
    <div
      className="card-container-pick"
      title={product.name}
      onClick={() => {
        addItem(product._id);
        pickItem(product._id);
      }}
    >
      <img className="image" src={product.img} />
      <h4 className="productName">{product.name}</h4>
      <Button color="green">
        <Icon name="eye" /> Chọn thực phẩm
      </Button>
      {picked[product._id] && (
        <div className="iconCheck">
          <Icon name="check" color="green" size="large" />
        </div>
      )}
    </div>
  );
};

export default CardPick;
