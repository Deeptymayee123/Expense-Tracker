import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { axiosClient } from '../services/axiosClient';

//Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // action
  async function getTransactions() {
    try {
      const res = await axiosClient.get(`/api/v1/transactions`);

      console.log(res);

      dispatch({
        type: 'GET_TRANSACTION',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axiosClient.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    try {
      const res = await axiosClient.post(`/api/v1/transactions`, transaction);

      console.log('res after add: ', res);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
