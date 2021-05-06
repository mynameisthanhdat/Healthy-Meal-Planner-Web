import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { useSelector } from "react-redux";
import "./cart.scss";

const CartList = () => {
  const getListCard = useSelector((state) => state.homeReducer?.listItem);
  const totalPrice = useSelector((state) => state.homeReducer?.totalPrice);
  const _showPrice = (item) => {
    const price = item.price.toString();
    if (price.includes(".")) {
      return <p>{price}00 VNĐ</p>;
    } else {
      return <p>{price}.000 VNĐ</p>;
    }
  };

  const _showTotalPrice = (item) => {
    const price = item.toString();
    if (price.includes(".")) {
      return <p>{parseFloat(price).toFixed(1)}00 VNĐ</p>;
    } else {
      return <p>{parseFloat(price).toFixed(1)}.000 VNĐ</p>;
    }
  };

  useEffect(() => {
  });

  return (
    <div className="container-fluid pb-5 px-5">
      <h2 className='text-success'>Danh sách món ăn đã chọn</h2>
      <Table color={"green"} key={"green"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tên món ăn</Table.HeaderCell>
            <Table.HeaderCell>Hình ảnh</Table.HeaderCell>
            <Table.HeaderCell>Giá</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {getListCard.map((item) => (
            <>
              <Table.Row key={item.key}>
                <Table.Cell className="font-weight-bold pt-4">
                  {item.name}
                </Table.Cell>
                <Table.Cell>
                  <img className="imageCart" src={item.img} />
                </Table.Cell>
                <Table.Cell className="text-success font-weight-bold pt-4">
                  {_showPrice(item)}
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell className='font-weight-bold'>Thành tiền</Table.HeaderCell>
            <Table.HeaderCell><span className="text-danger font-weight-bold">{_showTotalPrice(totalPrice)}</span></Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default CartList;
