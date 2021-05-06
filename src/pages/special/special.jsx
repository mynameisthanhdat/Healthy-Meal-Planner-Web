import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Segment, Button, Icon, Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/card/card";
import "./special.scss";
import barbeque from "../../assets/imgs/barbeque.png";
import hotpot from "../../assets/imgs/hot-pot.png";
import another from "../../assets/imgs/salad.png";

function SpecialPage() {
  const [dataSource, setDataSource] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [valueFilter, setValueFilter] = useState(1);
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
    await setSearch();
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
    var listData = dataSource.filter(
      (item) =>
        item?.kindOf.toString().includes(value) &&
        item?.name?.toLowerCase()?.includes(search.toLowerCase())
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
    <div>
      {!isLoading ? (
        <Segment>
          <div className="container">
            <div className="filter">
              <div className="mb-3">
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
              </div>
              <div>
                <Input
                  icon="search"
                  placeholder="Search..."
                  onChange={(e) => {
                    onSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="listItem">
              {dataFilter.length > 0 ? (
                dataFilter.map((item) => (
                  <CardItem
                    key={item.key}
                    product={item}
                    onAddItem={() => addToCart()}
                  />
                ))
              ) : (
                <p className="text-success font-weight-bold">
                  Chưa có món ăn tên {search} trong danh sách món 
                  {colorId == 1
                    ? " Lẫu"
                    : colorId == 2
                    ? " Đồ nướng"
                    : " Món khác"}
                </p>
              )}
            </div>
          </div>
        </Segment>
      ) : (
        <div>
          <Segment loading={isLoading} className="p-5"></Segment>
        </div>
      )}
    </div>
  );
}

export default SpecialPage;
