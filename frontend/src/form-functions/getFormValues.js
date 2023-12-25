
const getFormValues = (form) => {
    const formData = new FormData(form);
    const values = [...formData.values()];
    const isEmpty = values.includes('');
    const data = Object.fromEntries(formData);
    data.email = data.email.toLowerCase()
    return {isEmpty,data}
}

export default getFormValues;