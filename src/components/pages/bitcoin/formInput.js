import { useState } from "react";

export const useFormInput = (initVal) => {
    const [value, setVal] = useState(initVal);
    const handleChange = (e) => {
        setVal(e);
    }

    return {
        value,
        onChange: handleChange
    };
}