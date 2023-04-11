
export const URLBasic="http://localhost:3000" //for local
// export const URLBasic="http://20.127.64.50" //For azure

export type T_fetch_meta={
    hasNextPage:boolean,
    hasPreviousPage:boolean,
    itemCount:number,
    page:number,
    pageCount:number,
    take:number,
}
export const default_fetch_meta={
    hasNextPage:false,
    hasPreviousPage:false,
    itemCount:1,
    page:1,
    pageCount:1,
    take:10,
}

export const TopTopicId="1e5082d7-fc97-4f9e-bf5c-0a08ce7ed5c8"; // for local
// export const TopTopicId="90502c3c-7879-406b-a6c0-6482ce6d18d2"; // for Azure
// Modify it in ServerEnd.!!!