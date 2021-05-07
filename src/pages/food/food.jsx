import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Segment, Button, Icon, Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/card/card";
import "./food.scss";
import protein from "../../assets/imgs/protein.png";
import starch from "../../assets/imgs/starch.png";
import vegetable from "../../assets/imgs/vegetable.png";

export const FoodPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [valueFilter, setValueFilter] = useState("protein");
  const [colorId, setColorId] = useState(1);
  const [search, setSearch] = useState("");
  const count = useSelector((state) => state.homeReducer?.count);
  const isLoading = useSelector((state) => state.homeReducer?.isLoading);
  const dispatch = useDispatch();
  const addToCart = useCallback(() =>
    dispatch({ type: "ADD_ITEM_TO_CART", count: count + 1 })
  );
  const setLoading = useCallback((status) =>
    dispatch({ type: "SET_LOADING", isLoading: status })
  );

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://hml-project.herokuapp.com/api/foods?&type=${valueFilter}`)
      .then(function (response) {
        setLoading(false);
        setDataSource(response.data?.data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  const chooseType = async (id, value) => {
    await setColorId(id);
    await setValueFilter(value);
    setLoading(true);
    console.log("search: ", search, "value: ", value);
    axios
      .get(`https://hml-project.herokuapp.com/api/foods?&type=${value}`)
      .then(function (response) {
        setLoading(false);
        setDataSource(
          response.data?.data.filter((item) =>
            item?.name?.toLowerCase()?.includes(search.toLowerCase())
          )
        );
        console.log(
          response.data?.data.filter((item) =>
            item?.name?.toLowerCase()?.includes(search.toLowerCase())
          )
        );
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const onSearch = (search) => {
    setSearch(search);
  };

  const onSubmitSearch = () => {
    axios
      .get(`https://hml-project.herokuapp.com/api/foods?&type=${valueFilter}`)
      .then(function (response) {
        setLoading(false);
        setDataSource(
          response.data?.data.filter((item) =>
            item?.name?.toLowerCase()?.includes(search.toLowerCase())
          )
        );
        console.log(
          response.data?.data.filter((item) =>
            item?.name?.toLowerCase()?.includes(search.toLowerCase())
          )
        );
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  return (
        <Segment className="container customSegment">
          <Segment className="filter customSegment">
            <Segment className="customSegment">
              <Button
                color={colorId === 1 ? "green" : "gray"}
                onClick={() => chooseType(1, "protein")}
              >
                <img src={protein} className="iconFood" />
                <span className="ml-2" /> Chất đạm
              </Button>
              <Button
                color={colorId === 2 ? "green" : "gray"}
                onClick={() => chooseType(2, "glucid")}
              >
                <img src={starch} className="iconFood" />
                <span className="ml-2" /> Tinh bột
              </Button>
              <Button
                color={colorId === 3 ? "green" : "gray"}
                onClick={() => chooseType(3, "mineral")}
              >
                <img src={vegetable} className="iconFood" />
                <span className="ml-2" /> Rau quả
              </Button>
            </Segment>
            <Segment className='customSegment'>
              <Input
                icon={
                  <Icon
                    name="search"
                    inverted
                    circular
                    link
                    onClick={() => onSubmitSearch()}
                  />
                }
                placeholder="Search..."
                onChange={(e) => {
                  onSearch(e.target.value);
                }}
              />
            </Segment>
          </Segment>
          <Segment loading={isLoading} className="listItem customSegment">
            {dataSource.length > 0 ? (
              dataSource.map((item) => (
                <CardItem
                  key={item.key}
                  product={item}
                  onAddItem={() => addToCart()}
                  detail={true}
                />
              ))
            ) : (
              <p className="text-success font-weight-bold">
                Chưa có món ăn tên {search} trong danh sách thực phẩm
                {colorId == 1
                  ? " Chất đạm"
                  : colorId == 2
                  ? " Tinh bột"
                  : " Rau quả"}
              </p>
            )}
          </Segment>
        </Segment>
  );
}