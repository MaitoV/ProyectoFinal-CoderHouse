import { ProductsClassDAOs } from "../productsInterface";
import { ProductInterface } from "../productsInterface";

export class productsMemory implements ProductsClassDAOs {
    private productos: ProductInterface[] = [];

    constructor() {
        const seeders = [
            {
                "id": 1,
                "name": "Cartuchera",
                "description": "Cartuchera holografica",
                "code": "2032A24",
                "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU",
                "price": 200,
                "stock": 10,
                "timestamps": "2021-08-25T17:31:54.070Z"
            },
            {
                "id": 2,
                "name": "Lapicera",
                "description": "Lapicera transparente de punta fina",
                "code": "2032A24",
                "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUrAkbBgYWrv0sLYQuC7XCIouhzjwPp_VFQ&usqp=CAU",
                "price": 200,
                "stock": 10,
                "timestamps": "2021-08-25T17:31:54.070Z"
            },
            {
                "id": 3,
                "name": "Mochila Matera",
                "description": "Mochila Matera para llevar tu mate a todas partes",
                "code": "2020A23",
                "photo": "http://www.mochimatera.com",
                "price": 1500,
                "stock": 400,
                "timestamps": "2021-08-26T17:31:54.070Z"
            }
        ]

        seeders.forEach((aSeed) => { this.productos.push(aSeed)} )
    }

    async get(): Promise<ProductInterface[]> {
        return this.productos;
    }
    
    async getById(id: number): Promise<ProductInterface | undefined > {
        return undefined;
    }

    async add(data: ProductInterface): Promise<ProductInterface> {
        return this.productos[0];
    }

    async delete(id: number): Promise<void> {
    }

    async update(id: number, newData:any) {
        return this.productos[0];
    }
}