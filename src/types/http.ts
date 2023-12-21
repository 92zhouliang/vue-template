
export enum IResType {
    json = "json",
    text = "text",
    blob = "blob",
    arrayBuffer = "arrayBuffer",
    formData = "formData"
}
export interface IFetchParams {
    url: string;
    method?: string;
    joinTime?:boolean;
    resType?:keyof typeof IResType;
    data?: any;
    headers?: any;
}