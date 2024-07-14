import { createSlice } from "@reduxjs/toolkit";
import { RowsData, headerData } from "../../mockData";
const initialState = {
  headersData: headerData,
  rowsData: RowsData,
  sortCriteria: { column: "name", desc: false },
  isOpenForm: false,
  formType: "",
  formData: {},
  formFields: [],
  isRequired: false,
  filterCriteria: {
    name: '',
    email: '',
    address: '',
    age: '',
    date: '',
  },
};
const tableReducer = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateHeadersData: (state, { payload }) => {
      return {
        ...state,
        headersData: payload,
      };
    },
    updateRowsData: (state, { payload }) => {
      return {
        ...state,
        rowsData: payload,
      };
    },
    addRowsData: (state, { payload }) => {
      return {
        ...state,
        rowsData: [...state.rowsData, payload],
      };
    },
    updateSortCriteria: (state, { payload }) => {
      return {
        ...state,
        sortCriteria: payload,
      };
    },
    updateFilterCriteria: (state, { payload }) => {
      return {
        ...state,
        filterCriteria: payload,
      };
    },
    setOpenForm: (state, { payload }) => {
      return {
        ...state,
        isOpenForm: payload,
      };
    },
    setFormCriteria: (state, { payload }) => {
      return {
        ...state,
        formType: payload.formType,
        formData: payload.formData,
        isRequired: payload.isRequired,
        formFields: payload.formFields,
      };
    },
    setCloseForm: (state, { payload }) => {
      return {
        ...state,
        isOpenForm: false,
        formType: "",
        formData: {},
        formFields: [],
        isRequired: false,
      };
    }
  },
});

export default tableReducer.reducer;

export const { updateHeadersData, updateRowsData, addRowsData , updateSortCriteria, updateFilterCriteria, setOpenForm, setFormCriteria , setCloseForm } = tableReducer.actions;
