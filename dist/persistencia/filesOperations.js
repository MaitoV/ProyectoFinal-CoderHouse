"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileOperations = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const moment_1 = __importDefault(require("moment"));
class FileOperations {
    pathFile(fileName) {
        return path_1.default.resolve(__dirname, `../../bd/${fileName}`);
    }
    readFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const path = this.pathFile(fileName);
                const db = yield promises_1.default.readFile(path, 'utf-8');
                const dbParse = JSON.parse(db);
                return dbParse;
            }
            catch (error) {
                return error;
            }
        });
    }
    writeFile(fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.pathFile(fileName);
            const dataToJSON = JSON.stringify(data, null, '\t');
            yield promises_1.default.writeFile(filePath, dataToJSON);
        });
    }
    addNewItem(fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.readFile(fileName);
            const newProduct = {
                id: db.length + 1,
                name: data.name,
                description: data.description,
                code: data.code,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                timestamps: `${moment_1.default().format('DD MM YYYY hh:mm')}`
            };
            db.push(newProduct);
            this.writeFile(fileName, db);
            return newProduct;
        });
    }
}
exports.fileOperations = new FileOperations();
