import { useDispatch } from "react-redux";
import { setModalMassgae, setOpenModal } from "../redux/modal/modalSlice";


export const useFieldCheck = () => {
    const dispatch = useDispatch();

    const fieldCheck = (formData, ignoreFields = []) => {

        console.log(formData,ignoreFields)

        // Ensure formData is always an object to prevent runtime errors
        const safeFormData = formData || {};

        // Get all keys from the form data, excluding fields that should be ignored
        const fieldsToCheck = Object.keys(safeFormData).filter(
            (key) => !ignoreFields.includes(key)
        );

        // Check if at least one required field is empty (null, undefined, or only spaces)
        const isEmpty = fieldsToCheck.some(
            (key) => !safeFormData[key]?.trim()
        );

        // If any required field is empty, show modal with error message
        if (isEmpty) {
            dispatch(setModalMassgae("Please fill all required fields"));
            dispatch(setOpenModal());

            // Return true to indicate validation failed
            return true;
        }

        // Return false to indicate all fields are valid
        return false;
    };

    return { fieldCheck };
};