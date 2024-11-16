import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice";
import AdminOrdersSlice from "./admin/order-slice";
import shoppingProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import shoppingAddressSlice from "./shop/address-slice";
import commonFeatureSlice from "./common-slice";
import shopOrderSlice from "./shop/order-slice";
import shopReviewSlice from "./review-slice";
import shopSearchSlice from "./search-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminOrders: AdminOrdersSlice,
    shopProduts: shoppingProductSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shoppingAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,

    commonFeature: commonFeatureSlice,
  },
});

export default store;
