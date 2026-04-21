import { createSlice } from "@reduxjs/toolkit"


const productSlice = createSlice({
    name: "product",
    initialState: {
        productLoading: false,
        sellerAllProducts: [],
        allProducts: [],
    },

    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerAllProducts = action.payload
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        },
        setProductLoading: (state, action) => {
            state.productLoading = action.payload
        }
    }
});


export const { setSellerProducts, setProductLoading, setAllProducts } = productSlice.actions;
export default productSlice.reducer;