import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Segment } from "semantic-ui-react";
import CardItem from "../../components/card/card";

export const MenuDetail = () => {
  const [menu, setMenu] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.homeReducer?.count);
  const isLoading = useSelector((state) => state.homeReducer?.isLoading);
  const id = location.pathname?.split("menu/")[1];
  const setLoading = useCallback((status) =>
    dispatch({ type: "SET_LOADING", isLoading: status })
  );
  const addToCart = useCallback(() =>
    dispatch({ type: "ADD_ITEM_TO_CART", count: count + 1 })
  );

  const fetchData = () => {
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

  useEffect(() => {
    fetchData();
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
