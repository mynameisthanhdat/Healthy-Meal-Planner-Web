import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "../../components/card/card";
import "./home.scss";

function HomePage() {
  const [dataSource, setDataSource] = useState([]);
  const count = useSelector((state) => state.homeReducer?.count);
  const isLoading = useSelector((state) => state.homeReducer?.isLoading);
  const dispatch = useDispatch();
  const addToCart = useCallback(() =>
    dispatch({ type: "ADD_ITEM_TO_CART", count: count + 1 })
  );
  const setLoading = useCallback((status) =>
    dispatch({ type: "SET_LOADING", isLoading: status })
  );

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get("https://hml-project.herokuapp.com/api/foods/menu")
      .then(function (response) {
        setLoading(false);
        setDataSource(response.data?.data.filter(x => x.isSpecial == false));
        console.log(response.data?.data.filter(x => x.isSpecial == false));
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
        <Segment className="customSegment">
          <Segment className="container customSegment">
            <Segment className="listItem customSegment">
              {dataSource.map((item) => (
                <CardItem
                  key={item.key}
                  product={item}
                  onAddItem={() => addToCart()}
                  detail={true}
                />
              ))}
            </Segment>
          </Segment>
        </Segment>
    </Segment>
  );
}

export default HomePage;
