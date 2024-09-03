/**
 * @param {String} nearElementId
 * @param {String} messageError
 * @param {String} tagName
 * @param {String} className
 * @return void
 * */
export function renderErrorFriendly(nearElementId: any, messageError: any, tagName="span", className="alert-error"){

    const tag = document.createElement(tagName);
    tag.className = className;
    tag.textContent = messageError;

    const nearElement = document.getElementById(nearElementId);

    if (nearElement) nearElement.insertAdjacentElement("afterend", tag);
}
