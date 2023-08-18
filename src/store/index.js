import { configureStore, createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "sliders",
  initialState: {
    principal: 100000,
    payment: 500,
    interest: 5,
    int_tens: 0,
    int_hund: 0,
    int_thou: 0,
    years: 30,
    start_month: 6,
    start_year: 2023,
    yearlyMortgage: [],
    monthlyMortgage: [],
  },
  reducers: {
    setPrincipal(state, action) {
      state.principal = action.payload;
    },
    setPayment(state, action) {
      state.payment = action.payload;
    },
    setInterest(state, action) {
      state.interest = action.payload;
    },
    setTens(state, action) {
      state.int_tens = action.payload;
    },
    setHund(state, action) {
      state.int_hund = action.payload;
    },
    setThou(state, action) {
      state.int_thou = action.payload;
    },
    setYears(state, action) {
      state.years = action.payload;
    },
    setStartMonth(state, action) {
      state.start_month = action.payload;
    },
    setStartYear(state, action) {
      state.start_year = action.payload;
    },
    setYearlyMortgage(state, action) {
      state.yearlyMortgage = action.payload;
    },
    setMonthlyMortgage(state, action) {
      state.monthlyMortgage = action.payload;
    },
  },
});

export const actions = sliderSlice.actions;

const store = configureStore({
  reducer: sliderSlice.reducer,
});

export default store;
