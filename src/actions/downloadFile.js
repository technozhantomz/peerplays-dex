export const downloadFile = (name, data, extension) => {
    const a = document.createElement("a");
    const file = new Blob([data], {type: extension});

    a.href = URL.createObjectURL(file);
    a.download = name;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}