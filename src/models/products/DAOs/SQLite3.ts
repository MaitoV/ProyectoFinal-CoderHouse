import knex from "knex";

export class productsSQLite3 {
    constructor() {
        knex({
            client: 'sqlite3',
            connection: {filename: './src/models/products/DAOs'}
        })
    }
}