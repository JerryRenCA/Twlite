
export const URLBasic="http://localhost:3000"
// export const URLBasic="http://20.127.64.50"

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

