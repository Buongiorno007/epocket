const SPENT_JSX = "SPENT_JSX";
import React from "react";
import { Text } from "react-native";
const defaultState = {
  body: [<Text key={0} />],
  sum: 0,
  loader: true
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SPENT_JSX:
      return action;
    default:
      return state;
  }
};
export const createSpentJSX = (body, sum) => {
  return {
    type: SPENT_JSX,
    body,
    status,
    sum
  };
};
