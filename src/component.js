export default (text = "Hello Steve") => {
    const element = document.createElement("div");
    element.innerHTML = text;
    return element;
};

// End of component.js
