const RECEIVED_JSX = "RECEIVED_JSX";
import React from "react";
import { Text } from "react-native";
const defaultState = {
  body: [<Text key={0} />],
  sum: 0,
  loader: true
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVED_JSX:
      return action;
    default:
      return state;
  }
};
export const createReceivedJSX = (body, sum) => {
  return {
    type: RECEIVED_JSX,
    body,
    sum
  };
};
