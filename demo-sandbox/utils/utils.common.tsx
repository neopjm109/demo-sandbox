const clone = (src: object): any => JSON.parse(JSON.stringify(src));
const clean = (src: object): any => Object.entries({ ...src })
    .filter(([key, value]) => value !== undefined)
    .reduce((obj: any, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {}
);

export const ObjectUtils = {
    clone, clean
}


const isNotEmpty = (src: any): boolean => (src !== null && src !== undefined);
const isEmpty = (src: any): boolean => !isNotEmpty(src);
const isNotBlank = (src: any): boolean => {
    switch(typeof src) {
        case "string":
            return isNotEmpty(src) && src.trim() !== "";
        case "object":
            return isNotEmpty(src) && Object.keys(src).length > 0;
        default:
            return isNotEmpty(src);
    }
}
const isBlank = (src: any): boolean => !isNotBlank(src);

export const BooleanUtils = {
    isNotEmpty, isEmpty,
    isNotBlank, isBlank
}


const generate = (length: number, value: any) => Array.from({length}, () => value);
const asc = (arr: any[], key?: string): any[] => {
    let result = [ ...arr ];
    if (result.length > 0 && typeof arr[0] === "object") {
        if (key) result.sort((a, b) => a[key] > b[key] ? 1 : -1);
        else return result;
    }
    return result.sort((a, b) => a > b ? 1 : -1);
}
const desc = (arr: any[], key?: string): any[] => {
    let result = [ ...arr ];
    if (result.length > 0 && typeof arr[0] === "object") {
        if (key) result.sort((a, b) => a[key] > b[key] ? -1 : 1);
        else return result;
    }
    return result.sort((a, b) => a > b ? -1 : 1);
}
const min = (arr: any[], key?: string): any => asc(arr, key)[0] ?? null;
const max = (arr: any[], key?: string): any => desc(arr, key)[0] ?? null;

export const ArrayUtils = {
    generate, asc, desc, min, max
}


const random = (digit?: number) => Math.random().toString().padStart(digit ?? 1, "0");
const format = (num?: number) => num?.toLocaleString("ko-KR") ?? "0";

export const NumberUtils = {
    random, format
}


export const ValidateUtils = {
    
}