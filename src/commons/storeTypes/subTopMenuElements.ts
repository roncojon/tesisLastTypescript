export type SubTopMenuElements = {
    title:string,
    elements: MenuElement[] | null,
}

export type MenuElement = {elementString:string,elementUrl:string} | null