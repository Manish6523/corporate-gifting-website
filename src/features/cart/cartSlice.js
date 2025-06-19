import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: [],
  price: { subtotal: 0, gst: 0, total: 0 },
  isshown: false,
  quantity: 0,
};

function calculateTotal(state) {
  const subtotal = state.cart.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const gst = subtotal * 0.08;
  const total = subtotal + gst;

  state.price.subtotal = +subtotal.toFixed(2);
  state.price.gst = +gst.toFixed(2);
  state.price.total = +total.toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isshown = !state.isshown;
    },
    addToCart: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity = action.payload.quantity;
        existingItem.price = parseFloat(
          action.payload.price * action.payload.quantity
        ).toFixed(2);
        calculateTotal(state);
        toast.success(`${action.payload.title} has been added to the cart!`);
      } else {
        // If it doesn't exist, add a new item to the cart
        state.cart.push({
          id: action.payload.id,
          title: action.payload.title,
          brand: action.payload.brand,
          quantity: action.payload.quantity,
          price: parseFloat(
            action.payload.price * action.payload.quantity
          ).toFixed(2),
          thumbnail: action.payload.thumbnail,
          stock: action.payload.availabilityStatus,
        });
        calculateTotal(state);
        toast.success(`${action.payload.title} has been added to the cart!`);
      }
    },
    addQuantityFromCartMenu: (state, action) => {
      if (action.payload.control == "add") {
        const existingItem = state.cart.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.price = parseFloat(
            (existingItem.price / (existingItem.quantity - 1)) *
              existingItem.quantity
          ).toFixed(2);
          calculateTotal(state);
        }
      }
      if (action.payload.control == "remove") {
        const existingItem = state.cart.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.price = parseFloat(
            (existingItem.price / (existingItem.quantity + 1)) *
              existingItem.quantity
          ).toFixed(2);
          calculateTotal(state);
        }
      }
      if (action.payload.control == "delete") {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        toast.error(`${action.payload.title} has been removed from the cart!`);
        calculateTotal(state);
      }
    },
    calculate_total: (state) => calculateTotal(state),
  },
});

export const {
  toggleCart,
  addToCart,
  addQuantityFromCartMenu,
  calculate_total,
} = cartSlice.actions;
export default cartSlice.reducer;
