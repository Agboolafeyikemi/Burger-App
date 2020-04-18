import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHanler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-order";
import * as actions from "../../store/actions/index";

 export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true
      });
    } else {      
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
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

    let burger = this.props.error ? (
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
            isAuth={this.props.isAuthenticated}
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
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredients: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onRemoveIngredients: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => 
    dispatch(actions.setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
