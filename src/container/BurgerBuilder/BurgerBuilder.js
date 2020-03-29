import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 4,
    isPurchaseable: false,
    purchasing: false
  };
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseContinueHandler = () => {
    alert("You continue!");
  };

  updatedPurchaseHandler = ingredients => {
    const sum = Object.values(ingredients).reduce((arr, el) => {
      return arr + el;
    });

    this.setState({
      isPurchaseable: sum > 0
    });
  };

  addIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIng = { ...this.state.ingredients };
    updatedIng[type] = updateCount;

    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newTotalPrice = priceAddition + oldPrice;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIng
    });
    this.updatedPurchaseHandler(updatedIng);
  };

  removeIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const removeCount = oldCount - 1;
    const updatedIng = { ...this.state.ingredients };
    updatedIng[type] = removeCount;

    const priceSubtraction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newTotalPrice = oldPrice - priceSubtraction;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIng
    });
    this.updatedPurchaseHandler(updatedIng);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true, cheese: false, ....}

    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          <OrderSummary
            purchaseContinued={this.purchaseContinueHandler}
            purchaseCanceled={this.purchaseCancelHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientsHandler}
          removeIng={this.removeIngredientsHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.isPurchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
