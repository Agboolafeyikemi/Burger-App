import React from "react";
import classes from "./input.module.css";

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.inValid && props.shouldValidate && props.touched) {
    console.log("object", inputClasses.join(" "));
    inputClasses.push(classes.Invalid);
  }
  let validatorError = null;
  if (props.inValid && props.touched) {
    validatorError = (
      <p className={classes.ValidationError}>
        Please Enter a valid {props.valueType}
      </p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validatorError}
    </div>
  );
};

export default input;
