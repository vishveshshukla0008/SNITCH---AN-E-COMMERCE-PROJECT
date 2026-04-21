import { useDispatch } from 'react-redux';
import { createProduct, getAllPublicProducts, getAllSellerProducts, getSellersSingleProduct, getSinglePublicProduct } from '../services/product.api';
import { setAllProducts, setProductLoading, setSellerProducts } from '../state/product.slice';
import toast from 'react-hot-toast';


const useProduct = () => {

    const dispatch = useDispatch();

    const handleCreateProductHandler = async (formData) => {
        try {
            dispatch(setProductLoading(true));
            const response = await createProduct(formData);
            toast.success(response.message);
            return response.data;
        } catch (error) {
            toast.error(error.message);
            return error;
        } finally {
            dispatch(setProductLoading(false));
        }
    }

    const handleGetAllSellerProducts = async () => {
        try {
            dispatch(setProductLoading(true));
            const response = await getAllSellerProducts();
            dispatch(setSellerProducts(response.data));
            return response.data;
        } catch (error) {
            toast.error(error.message);
            return error;
        } finally {
            dispatch(setProductLoading(false));
        }
    }


    const handleGetSellersSingleProduct = async (id) => {
        try {
            dispatch(setProductLoading(true));
            const response = await getSellersSingleProduct(id);
            return response.data;
        } catch (error) {
            toast.error(error.message);
            return error;
        } finally {
            dispatch(setProductLoading(false));
        }
    }

    const handleGetAllPublicProducts = async () => {
        try {
            dispatch(setProductLoading(true));
            const response = await getAllPublicProducts();
            dispatch(setAllProducts(response.data));
            return response.data;
        } catch (error) {
            toast.error(error.message);
            return error;
        } finally {
            dispatch(setProductLoading(false));
        }
    }

    const handleGetSinglePublicProduct = async (id) => {
        try {
            dispatch(setProductLoading(true));
            const response = await getSinglePublicProduct(id);
            return response.data;
        } catch (error) {
            toast.error(error.message);
            return error;
        } finally {
            dispatch(setProductLoading(false));
        }
    }

    return { 
        handleCreateProductHandler, 
        handleGetAllSellerProducts, 
        handleGetSellersSingleProduct,
        handleGetAllPublicProducts,
        handleGetSinglePublicProduct
    }
}

export default useProduct