import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHanler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchOrdersArray = [];
        for (let key in res.data) {
          fetchOrdersArray.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchOrdersArray });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
      console.log(this.state.orders)
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            ingredients={order.ingredients}
            price={+order.price}
            key={order.id}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
