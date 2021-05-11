import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Segment } from "semantic-ui-react";
import CardItem from "../../components/card/card";

export const MenuDetail = (props) => {
  const [menu, setMenu] = useState([]);
  const { menuList } = props.location;
  const location = useLocation();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.homeReducer?.count);
  const isLoading = useSelector((state) => state.homeReducer?.isLoading);
  const getListItems = useSelector((state) => state.foodReducer?.listItem);
  const id = location.pathname?.split("menu/")[1];
  const setLoading = useCallback((status) =>
    dispatch({ type: "SET_LOADING", isLoading: status })
  );
  const addToCart = useCallback(() =>
    dispatch({ type: "ADD_ITEM_TO_CART", count: count + 1 })
  );

  const fetchDataMenu = () => {
    setLoading(true);
    axios
      .get(`https://hml-project.herokuapp.com/api/foods/menu/${id}`)
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

  const fetchDataListFood = () => {
    const list = getListItems.join(",");
    console.log(list);
    setLoading(true);
    axios
      .get(`https://hml-project.herokuapp.com/api/foods/ingredient?select=${list}`)
      .then(function (response) {
        setLoading(false);
        console.log(response);
        setMenu(response.data?.data);
        console.log(response.data?.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(menuList);
    if(menuList == false) {
      !menuList && fetchDataListFood();
    } if(menuList == undefined) {
      menuList === undefined && fetchDataMenu();
    }
  }, []);

  return (
    <Segment loading={isLoading} className="customSegment">
      <Segment className="container customSegment">
        <Segment className="listItem customSegment">
          {menu.map((item) => (
            <CardItem
              key={item._id}
              product={item}
              onAddItem={() => addToCart()}
              detail={false}
              menuId={id}
            />
          ))}
        </Segment>
      </Segment>
    </Segment>
  );
};
