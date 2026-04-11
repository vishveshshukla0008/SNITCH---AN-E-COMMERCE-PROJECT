import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../theme.slice";

export const useTheme = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);
    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return {
        theme,
        toggleTheme: handleToggle
    };
};
