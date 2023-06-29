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
exports.deleteUser = exports.postUserAdm = exports.postUser = exports.putUser = exports.getUsers = exports.getUser = void 0;
const axios_1 = __importDefault(require("axios"));
//! Inativo
const api = axios_1.default.create({
    baseURL: "https://encanto-backend.vercel.app/",
});
const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield api.post("/user", data);
        return response.data;
    }
    catch (error) {
        console.error("Erro ao obter usuário:", error);
        throw error;
    }
});
exports.getUser = getUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield api.get("/user/adm");
        return response.data;
    }
    catch (error) {
        console.error("Erro ao obter usuários:", error);
        throw error;
    }
});
exports.getUsers = getUsers;
const putUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.put("/user", data);
    return response.data;
});
exports.putUser = putUser;
const postUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post("/user", data);
    return response.data;
});
exports.postUser = postUser;
const postUserAdm = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post("/user/adm", data);
    return response.data;
});
exports.postUserAdm = postUserAdm;
const deleteUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield api.delete(`/user/${data.id}`);
});
exports.deleteUser = deleteUser;
