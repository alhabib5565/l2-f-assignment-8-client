import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

type TProductPayload = {
  productId: string;
  thumbnail: string;
  productName: string;
  price: number;
};

type TProduct = TProductPayload & {
  quantity: number;
};

type TInitialSate = {
  products: TProduct[];
  selectedProducts: number;
  priceOfTotalSelectedProducts: number;
};

const initialState: TInitialSate = {
  products: [],
  selectedProducts: 0,
  priceOfTotalSelectedProducts: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TProductPayload>) => {
      const isExist = state.products.find(
        (item) => item.productId === action.payload.productId
      );
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.selectedProducts = totalQuantity(state);
      state.priceOfTotalSelectedProducts = totalPrice(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        type: "increment" | "decrement";
      }>
    ) => {
      const { productId, type } = action.payload;
      const product = state.products.find(
        (item) => item.productId === productId
      );
      state.products.map((item) => {
        if (item.productId === productId) {
          if (type === "increment") {
            product!.quantity += 1;
          } else if (type === "decrement") {
            if (product?.quantity === 1) {
              const { productId } = action.payload;
              state.products = state.products.filter(
                (item) => item.productId !== productId
              );
            } else {
              product!.quantity -= 1;
            }
          }
        }
      });
      state.selectedProducts = totalQuantity(state);
      state.priceOfTotalSelectedProducts = totalPrice(state);
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      state.products = state.products.filter(
        (item) => item.productId !== productId
      );
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedProducts = 0;
      state.priceOfTotalSelectedProducts = 0;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
};

export const cartPersistedReducer = persistReducer(
  persistConfig,
  cartSlice.reducer
);

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

const totalQuantity = (state: TInitialSate) => {
  const quantity = state.products.reduce((prev, current) => {
    return Number((prev += current.quantity));
  }, 0);
  return quantity;
};
const totalPrice = (state: TInitialSate) => {
  const price = state.products.reduce((prev, current) => {
    return Number((prev += current.price * current.quantity));
  }, 0);
  return Number(price.toFixed(2));
};

/**
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.1,
    grandTotal: 0,
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: any, action: any) => {
            const isExist = state.products.find(
                (product: any) => product.id === action.payload.id
            );
            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 });
            }


            state.selectedItems = selectSelectedItems(state)
            state.totalPrice = selectTotalPrice(state)
            state.tax = selectTax(state)
            state.grandTotal = selectGrandTotal(state)
        },
        updateQuantity: (state: any, action) => {
            const products = state.products.map((product: any) => {
                if (product.id === action.payload.id) {
                    if (action.payload.type === "increment") {
                        product.quantity += 1;
                    } else if (action.payload.type === "decrement") {
                        product.quantity -= 1;
                    }
                }
                return product;
            });
            state.products = products.filter((product: any) => product.quantity > 0);

            state.selectedItems = selectSelectedItems(state)
            state.totalPrice = selectTotalPrice(state)
            state.tax = selectTax(state)
            state.grandTotal = selectGrandTotal(state)
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload.id
            );
            state.selectedItems = selectSelectedItems(state)
            state.totalPrice = selectTotalPrice(state)
            state.tax = selectTax(state)
            state.grandTotal = selectGrandTotal(state)
        },
        clearCart: (state) => {
            state.products = []
            state.selectedItems = 0
            state.totalPrice = 0
            state.tax = 0
            state.grandTotal = 0
        }

    },
});










export const selectSelectedItems = (state: any) =>
    state.products.reduce((total: number, product: any) => {
        return Number(total + product.quantity);
    }, 0);




export const selectTotalPrice = (state: any) =>
    state.products.reduce((total: number, product: any) => {
        return Number(total + product.quantity * product.price);
    }, 0);



export const selectTax = (state: any) => selectTotalPrice(state) * state.taxRate


export const selectGrandTotal = (state: any) => {
    return selectTotalPrice(state) + selectTotalPrice(state) * state.taxRate
}

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

 */
