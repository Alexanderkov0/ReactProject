import { createSlice } from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTransactions(state, action) {
      state.items = action.payload;
    },
    addTransaction(state, action) {
      state.items.unshift(action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    deleteTransaction(state, action) {
      state.items = state.items.filter(tx => tx._id !== action.payload);
    },
  },
});

export const { setTransactions, addTransaction, setLoading, setError, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;