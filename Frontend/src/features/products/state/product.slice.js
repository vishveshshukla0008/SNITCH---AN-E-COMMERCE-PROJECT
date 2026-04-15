import { createSlice } from "@reduxjs/toolkit"


const productSlice = createSlice({
    name: "product",
    initialState: {
        productLoading: false,
        sellerAllProducts: [],
    },

    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerAllProducts = action.payload
        },
        setProductLoading: (state, action) => {
            state.productLoading = action.payload
        }
    }
});


export const { setSellerProducts, setProductLoading } = productSlice.actions;
export default productSlice.reducer;