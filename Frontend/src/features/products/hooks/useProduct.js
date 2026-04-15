import { useDispatch } from 'react-redux';
import { createProduct } from '../services/product.api';
import { setProductLoading } from '../state/product.slice';
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



    return { handleCreateProductHandler }
}

export default useProduct