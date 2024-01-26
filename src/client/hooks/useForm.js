"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useForm = (initialValues) => {
    const [values, setValues] = (0, react_1.useState)(initialValues);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleSubmit = (callback) => (event) => {
        event.preventDefault();
        callback();
    };
    return {
        values,
        handleChange,
        handleSubmit,
    };
};
exports.default = useForm;
//# sourceMappingURL=useForm.js.map