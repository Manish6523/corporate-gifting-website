import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// ------------------------------ Utility Functions ------------------------------
function calculateTotal(state) {
  const subtotal = state.cart.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const gst = subtotal * 0.08;
  const total = subtotal + gst;

  state.priceData.subtotal = +subtotal.toFixed(2);
  state.priceData.gst = +gst.toFixed(2);
  state.priceData.total = +total.toFixed(2);
}

// ------------------------------ Initial State ------------------------------
const initialState = {
  cart: [],
  wishList: [],
  session: JSON.parse(localStorage.getItem("session")) || null,
  priceData: { subtotal: 0, gst: 0, total: 0 },
  isshown: false,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ------------------------------ Cart Management ------------------------------
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
    calculate_total: (state) => {
      calculateTotal(state);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      calculateTotal(state);
    },
    setWishlist: (state, action) => {
      state.wishList = action.payload;
    },

    // ------------------------------ Authenticaton ------------------------------
    setSession: (state, action) => {
      localStorage.setItem("session", JSON.stringify(action.payload));
      state.session = action.payload;
    },
    addProductToWishList: (state, action) => {
      const existingIndex = state.wishList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        state.wishList.splice(existingIndex, 1);
        toast.error(`${action.payload.title} removed from wishlist!`);
      } else {
        state.wishList.push(action.payload);
        toast.success(`${action.payload.title} added to wishlist!`);
      }
    }
  },
});

export const {
  toggleCart,
  addToCart,
  addQuantityFromCartMenu,
  calculate_total,
  setCart,
  setWishlist,
  addProductToWishList,
  setSession,
} = cartSlice.actions;
export default cartSlice.reducer;
