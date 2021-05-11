import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Segment, Button, Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/card/card";
import "./special.scss";
import barbeque from "../../assets/imgs/barbeque.png";
import hotpot from "../../assets/imgs/hot-pot.png";
import another from "../../assets/imgs/salad.png";

export const SpecialPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [valueFilter, setValueFilter] = useState(1);
  const [colorId, setColorId] = useState(1);
  const [search, setSearch] = useState('');
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
      .get("https://hml-project.herokuapp.com/api/foods/menu")
      .then(function (response) {
        setLoading(false);
        setDataSource(response.data?.data.filter((x) => x.isSpecial == true));
        setDataFilter(
          response.data?.data.filter(
            (x) =>
              x.isSpecial == true && x.kindOf.toString().includes(valueFilter)
          )
        );
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(async () => {
    await fetchData();
    await listDataFilter();
  }, []);

  const listDataFilter = () => {
    var listData = dataSource.filter((item) =>
      item?.kindOf.toString().includes(1)
    );
    setDataFilter(listData);
  };

  const chooseType = async (id, value) => {
    await setColorId(id);
    await setValueFilter(value);
    console.log(value, search);
    var listData = dataSource.filter(
      (item) =>
        item?.kindOf.toString().includes(value) &&
        item?.name?.toLowerCase()?.includes(search?.toLowerCase())
    );
    setDataFilter(listData);
  };

  const onSearch = (search) => {
    setSearch(search);
    var listData = dataSource.filter(
      (item) =>
        item?.kindOf.toString().includes(valueFilter) &&
        item?.name?.toLowerCase()?.includes(search.toLowerCase())
    );
    setDataFilter(listData);
  };

  return (
    <Segment className="container customSegment">
      <Segment className="filter customSegment">
        <Segment className="mb-3 customSegment">
          <Button
            color={colorId === 1 ? "green" : "gray"}
            onClick={() => chooseType(1, 1)}
          >
            <img src={hotpot} className="iconFood" />
            <span className="ml-2" /> Lẫu
          </Button>
          <Button
            color={colorId === 2 ? "green" : "gray"}
            onClick={() => chooseType(2, 2)}
          >
            <img src={barbeque} className="iconFood" />
            <span className="ml-2" /> Đồ nướng
          </Button>
          <Button
            color={colorId === 3 ? "green" : "gray"}
            onClick={() => chooseType(3, 3)}
          >
            <img src={another} className="iconFood" />
            <span className="ml-2" /> Khác
          </Button>
        </Segment>
        <Segment className="customSegment">
          <Input
            icon="search"
            placeholder="Search..."
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </Segment>
      </Segment>
      <Segment loading={isLoading} className="listItem customSegment">
        {dataFilter.length > 0 ? (
          dataFilter.map((item) => (
            <CardItem
              key={item.key}
              product={item}
              onAddItem={() => addToCart()}
              detail={true}
            />
          ))
        ) : (
          <p className="text-success font-weight-bold">
            Chưa có món ăn tên {search} trong danh sách món
            {colorId == 1 ? " Lẫu" : colorId == 2 ? " Đồ nướng" : " Món khác"}
          </p>
        )}
      </Segment>
    </Segment>
  );
};
