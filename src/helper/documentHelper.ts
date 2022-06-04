
export const shouldHaveHtmlNodeClass = (selector: string, className: string, isApplied: boolean) => {
    const htmlTag = document.querySelector(selector);
    if (htmlTag != null) {
        const hasTag = htmlTag?.classList?.contains?.(className) ?? false;
        if (hasTag === isApplied) return;

        if (isApplied) {
            htmlTag.classList.add(className);
        } else {
            htmlTag.classList.remove(className);
        }
    }
};