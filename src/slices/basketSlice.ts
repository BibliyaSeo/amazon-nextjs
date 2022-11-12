import { createSlice } from "@reduxjs/toolkit";

interface initialStateProps {
  items: any[];
}

const initialState: initialStateProps = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketItem: any) => basketItem.id === action.payload.id);
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        // console.warn(`Cant remove product (id: ${action.payload.id}) as its not in your basket.`);
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: any) => state.basket.items;
export const selectTotal = (state: any) =>
  state.basket.items.reduce((total: number, item: any) => total + item.price, 0);

export default basketSlice.reducer;
