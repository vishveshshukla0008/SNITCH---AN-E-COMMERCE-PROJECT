import { useDispatch } from 'react-redux';
import { createProduct, getAllSellerProducts } from '../services/product.api';
import { setProductLoading, setSellerProducts } from '../state/product.slice';
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



    return { handleCreateProductHandler, handleGetAllSellerProducts }
}

export default useProduct