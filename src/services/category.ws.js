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
exports.deleteCategoty = exports.putCategoty = exports.postCategoty = exports.getCategoty = void 0;
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: "https://encanto-backend.vercel.app/",
});
const getCategoty = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get("/categoria-cardapio");
    return response.data;
});
exports.getCategoty = getCategoty;
const postCategoty = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post("/categoria-cardapio", data);
    return response.data;
});
exports.postCategoty = postCategoty;
const putCategoty = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.put("/categoria-cardapio", data);
    return response.data;
});
exports.putCategoty = putCategoty;
const deleteCategoty = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield api.delete(`/categoria-cardapio/${data.id}`);
});
exports.deleteCategoty = deleteCategoty;
