import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../api/apiClient";

export const fetchProducts = createAsyncThunk(
  "catalog/fetchProducts",
  async () => {
    return await request.products.list();
  }
);

export const fetchProductById = createAsyncThunk(
  "catalog/fetchProductById",
  async (productId) => {
    return await request.products.detais(productId);
  }
);

const productAdapter = createEntityAdapter();

const initialState = productAdapter.getInitialState({
  status: "idle",
  isLoaded: false,
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      productAdapter.setAll(state, action.payload);
      state.isLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchProductById.pending, (state) => {
      state.status = "pendingFetchProductById";
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      productAdapter.setOne(state, action.payload);
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  selectById: selectProductById,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productAdapter.getSelectors((state) => state.catalog);

export const selectIsLoaded = (state) => state.catalog.isLoaded;
export const selectStatus = (state) => state.catalog.status;

export default catalogSlice.reducer;
