import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "./ContactData.module.css";
import axios from "../../../axios-order";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  orderHandler = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customerData: {
        name: "feyikemi",
        address: {
          street: "GRA Estate",
          zipCode: "404040",
          country: "Nigeria"
        },

        email: "agboolafeyikemi93.gmail.com"
      },

      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err =>
        this.setState({
          loading: false
        })
      );
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Your Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;