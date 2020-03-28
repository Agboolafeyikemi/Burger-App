import React from "react";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Aux";

const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:  {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p><strong>Total Price: #{props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinued} btnType="Success">
        CONTINUE
      </Button>

    </Aux>
  );
};
export default orderSummary;
