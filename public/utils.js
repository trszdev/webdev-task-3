'use strict';

const clearChildren = node => {
    while (node.firstChild) 
        node.removeChild(node.firstChild)
}

const queryToString = obj => Object.entries(obj)
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&');

const jetch = (url, method = 'GET', body = null, query = null) => {
    if (query !== null)
        url += '?' + queryToString(query);
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (body !== null)
        options.body = JSON.stringify(body);
    return fetch(url, options);
}


const ofClass = classname => {
    const elements = document.getElementsByClassName(classname);
    const result = [];
    for (let i = 0; i < elements.length; i++)
        result.push(elements.item(i))
    return result;
}

const nop = () => {};

const createElement = ({ name, classes = [], title = null, text = null, cls = null, attrs = {}, children = [] }) => {
    const result = document.createElement(name);
    if (cls !== null)
        result.classList.add(cls);
    else
        classes.forEach(cls => result.classList.add(cls));
    if (title !== null) 
        result.setAttribute('title', title);
    if (text !== null)
        if (name === 'input')
            result.value = text;
        else
            result.innerText = text;
    for (let [attrName, attrValue] of Object.entries(attrs))
        if (attrValue !== false)
            result.setAttribute(attrName, attrValue);
    children.forEach(child => result.appendChild(child));

    return result;
}

const setSubmitButton = (node, btnOk, btnCancel) => {
    node.onkeydown = e => {
        if (btnOk && e.keyCode === 13)
            btnOk.click();
        else if (btnCancel && e.keyCode === 27)
            btnCancel.click()
    }
}