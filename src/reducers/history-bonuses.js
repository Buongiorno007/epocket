const GET_BONUSES = "GET_BONUSES";
import { httpGet } from "../services/http";
import { urls } from "../constants/urls";
//reducers
import createReceivedJSX from "./history-received-success";
import createSpentJSX from "./history-sent-success";
//react
import React from "react";
import HistoryCard from "../view/containers/history-card/history-card";

export const getBonuses = (token, limitReceived, limitSpent) => {
  return dispatch => {
    let received_promise = httpGet(
      urls.get_received_bonuses + "?page=1&limit=" + limitReceived,
      token
    );
    received_promise.then(
      result => {
        let i = 1;
        const jsx_received_data = result.body.history.map(data => {
          i++;
          return <HistoryCard key={i} info={data} type="received" />;
        });
        dispatch({
          type: "RECEIVED_JSX",
          body: jsx_received_data,
          sum: result.body.received_bonuses,
          loader: false
        });
      },
      error => {
        let i = 1;
        error.body = [
          {
            error: error.code
          }
        ];
        const error_jsx_received_data = error.body.map(data => {
          i++;
          return <HistoryCard key={i} info={data} type="received" />;
        });
        dispatch({
          type: "RECEIVED_JSX",
          body: error_jsx_received_data,
          sum: 0,
          loader: false
        });
      }
    );
    let spent_promise = httpGet(
      urls.get_spent_bonuses + "?page=1&limit=" + limitSpent,
      token
    );
    spent_promise.then(
      result => {
        let i = 1;
        const jsx_spent_data = result.body.history.map(data => {
          i++;
          return <HistoryCard key={i} info={data} />;
        });
        dispatch({
          type: "SPENT_JSX",
          body: jsx_spent_data,
          sum: result.body.spent_bonuses,
          loader: false
        });
      },
      error => {
        let i = 1;
        error.body = [
          {
            error: error.code
          }
        ];
        const error_jsx_received_data = error.body.map(data => {
          i++;
          return <HistoryCard key={i} info={data} />;
        });
        dispatch({
          type: "SPENT_JSX",
          body: error_jsx_received_data,
          sum: 0,
          loader: false
        });
      }
    );
  };
};
