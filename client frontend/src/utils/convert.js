
export const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        reader.onload = () => {
            resolve(reader.result)
        };
        reader.onerror = error => reject(error);
    })
}

export const formatStringByThree = (str) => {
    return str.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}