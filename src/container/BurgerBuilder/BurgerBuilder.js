import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHanler/withErrorHandler";

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("https://burger-app-78d24.firebaseio.com/ingredients.json")
      .then(response =>
        this.setState({
          ingredients: response.data
        })
      )
      .catch(error => {
        this.setState({ error: true });
      });
  }

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
    this.setState({
      loading: true
    });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customerData: {
    //     name: "feyikemi",
    //     address: {
    //       street: "GRA Estate",
    //       zipCode: "404040",
    //       country: "Nigeria"
    //     },

    //     email: "agboolafeyikemi93.gmail.com"
    //   },

    //   deliveryMethod: "fastest"
    // };

    // axios
    //   .post("/orders.json", order)
    //   .then(res =>
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     })
    //   )

    //   .catch(err =>
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     })
    //   );
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
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

    let orderSummary = null;

    let burger = this.state.error ? (
      "INGREDIENTS CAN NOT BE LOADED"
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCanceled={this.purchaseCancelHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
export default BurgerBuilder;
