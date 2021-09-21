
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

export interface ProductII extends ProductInterface {
    _id: string
}
export interface ProductQuery {
    nombre?: string;
    precio?: number; 
}

export interface ProductsClassDAOs {
    get(): Promise <ProductInterface[]>;
    getById(productId: string): Promise<ProductInterface | undefined>;
    add(data: ProductInterface): Promise<ProductInterface>; 
    delete(productId: string) : Promise<void>;
    update(productId: string, newData: ProductInterface) : Promise<ProductInterface>;
}
