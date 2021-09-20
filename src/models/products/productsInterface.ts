
export interface ProductInterface {
    name: string,
    description: string,
    code: string,
    photo: string,
    price: number,
    stock: number,
    timestamps: string
}
export interface ProductI extends ProductInterface {
    id: number
}
export interface ProductQuery {
    nombre?: string;
    precio?: number; 
}

export interface ProductsClassDAOs {
    get(): Promise <ProductInterface[]>;
    getById(id:number): Promise<ProductInterface | undefined>;
    add(data: ProductInterface): Promise<ProductInterface>; 
    delete(id: number) : Promise<void>;
    update(id:number, newData: ProductInterface) : Promise<ProductInterface>;
}