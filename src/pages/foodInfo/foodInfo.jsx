import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./foodInfo.scss";
import { Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const FoodInfo = (props) => {
  const { product } = props.location;
  const { menuId } = props.location;
  const history = useHistory();
  const [dataIngredient, setDataIngredient] = useState([]);
  const [menu, setMenu] = useState([]);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.homeReducer?.isLoading);
  const setLoading = useCallback((status) =>
    dispatch({ type: "SET_LOADING", isLoading: status })
  );

  const getListIngredient = () => {
    const ingredient = product.ingredient;
    const result = ingredient.endsWith(".")
      ? ingredient.slice(0, -1)
      : ingredient;
    const data = result.split(", ");
    setDataIngredient(data);
  };

  const getListMenu = () => {
    setLoading(true);
    axios
      .get(`https://hml-project.herokuapp.com/api/foods/menu/${menuId}`)
      .then(function (response) {
        setLoading(false);
        setMenu(response.data?.data);
        console.log(response.data?.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getListIngredient();
    getListMenu();
  }, []);

  const Ingredients = () => {
    const result = dataIngredient?.map((ingredient, index) => (
      <li className="food-ingredient mb-2" key={index}>
        {ingredient}
      </li>
    ));
    return <ul>{result}</ul>;
  };

  const ListMenu = () => {
    return menu?.map((item) => (
      <Segment className="d-flex my-2" onClick={() => moveToDetail(item)}>
        <img src={item.img} className="img-menu" />
        <p className="mt-3 text-success font-weight-bold">{item.name}</p>
      </Segment>
    ));
  };

  const moveToDetail = (item) => {
    console.log(item._id);
    console.log(item);
    history.push({
      pathname: `/cook/${item._id}`,
      product: item,
      menuId: menuId,
    });
  };

  return (
    <Segment className="customSegment foodInfo">
      <Segment className="container-img">
        <img src={product.img} className="detail-img" />
      </Segment>
      <Segment className="container-content customSegment">
        <h2 className="text-success font-weight-bold">{product.name}</h2>
        <h3>Thành phần chính: </h3>
        <ul>
          <li>{product.main_ingredient}</li>
        </ul>
        <h3>Thành phần: </h3>
        <Ingredients />
      </Segment>
      <Segment className="container-left customSegment">
        <h2 className="text-success font-weight-bold">
          Những món trong thực đơn
        </h2>
        <Segment loading={isLoading} className="customSegment"> 
          <ListMenu />
        </Segment>
      </Segment>
    </Segment>
  );
};
