import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToAdd._id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: (cartItem.quantity += 1) }
        : cartItems
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  // const item = cartItems.find((p) => p._id == cartItemToAdd._id);
  // if (item) {
  //   item.quantity++;
  //   // item.attributes.price = item.oneQuantityPrice * item.quantity;
  // } else {
  //   cartItems.push({ ...cartItemToAdd, quantity: 1 });
  // }
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  hydrate: (state, action) => {
    // do not do state = action.payload it will not update the store
    return action.payload;
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items = addItemToCart(state.items, action.payload);
      // const added = state.items.find((item) => item._id === action.payload._id);
      // if (added) state.items = [...state.items];
      // else state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    plusItem: (state, action) => {
      [...state.items, (state.items[action.payload].quantity += 1)];
    },
    minusItem: (state, action) => {
      [...state.items, (state.items[action.payload].quantity -= 1)];
    },
    deleteFromBasket: (state, action) => {
      state.items = [];
    },
    setGetTotals: (state, action) => {
      state.cartTotalAmount = action.payload;
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  plusItem,
  minusItem,
  deleteFromBasket,
  setGetTotals,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
