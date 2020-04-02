import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Aux/Aux";

class OrderSummary extends Component {
  componentWillUpdate(){
    console.log('[]')
  }
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: #{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}
export default OrderSummary;
