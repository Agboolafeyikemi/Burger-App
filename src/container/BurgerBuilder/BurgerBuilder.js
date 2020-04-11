import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHanler/withErrorHandler";
import * as actionType from "../../store/action";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    // axios
    //   .get("https://burger-app-78d24.firebaseio.com/ingredients.json")
    //   .then(response =>
    //     this.setState({
    //       ingredients: response.data
    //     })
    //   )
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
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
    this.props.history.push("/checkout");
  };

  updatedPurchaseHandler = ingredients => {
    const sum = Object.values(ingredients).reduce((arr, el) => {
      return arr + el;
    });

    return sum > 0;
  };

  render() {
    const disabledInfo = {
      ...this.props.ing
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
    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredients}
            removeIng={this.props.onRemoveIngredients}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatedPurchaseHandler(this.props.ing)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCanceled={this.purchaseCancelHandler}
          ingredients={this.props.ing}
          price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ing: state.ingredients,
    price: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingName =>
      dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
    onRemoveIngredients: ingName =>
      dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
