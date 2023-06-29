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
exports.deleteMesa = exports.deletePedidos = exports.putMesas = exports.FinalizarPedido = exports.verifyFinalizar = exports.valorTotal = exports.veryfyMesa = exports.putPedidos = exports.getStatusPedido = exports.postPedidosStatus = exports.postNotification = exports.postPedidos = exports.postTransferir = exports.getMesasbyId = exports.getMesas = exports.getPedidosAdm = exports.getPedidos = void 0;
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: "https://encanto-backend.vercel.app/",
    // baseURL: "http://localhost:3000/",
});
const api2 = axios_1.default.create({
    baseURL: "http://192.168.12.11:3020/",
});
const getPedidos = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get("/pedido");
    return response.data;
});
exports.getPedidos = getPedidos;
const getPedidosAdm = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get("/pedido/adm");
    return response.data;
});
exports.getPedidosAdm = getPedidosAdm;
const getMesas = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get("/pedido/mesa");
    return response.data;
});
exports.getMesas = getMesas;
const getMesasbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get(`/pedido/mesa/${id}`);
    return response.data;
});
exports.getMesasbyId = getMesasbyId;
const postTransferir = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post("/pedido/transferir", data);
    return response.data;
});
exports.postTransferir = postTransferir;
const postPedidos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post("/pedido", data);
    return response.data;
});
exports.postPedidos = postPedidos;
const postNotification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api2.post("/notifications/send", data);
    return response.data;
});
exports.postNotification = postNotification;
const postPedidosStatus = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post("/pedido/status", data);
    console.log("teste", response.data[1]);
    if (response.data[1] === 1) {
        return response.data;
    }
    else {
        alert("Erro ao Mudar Status , Pedido Possivelmente Excluido");
        return response.data;
    }
});
exports.postPedidosStatus = postPedidosStatus;
const getStatusPedido = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get(`/pedido/status/${id}`);
    return response.data;
});
exports.getStatusPedido = getStatusPedido;
const putPedidos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.put("/pedido", data);
    return response.data;
});
exports.putPedidos = putPedidos;
const veryfyMesa = (messa) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get(`/pedido/verif/${messa}`);
    return response.data;
});
exports.veryfyMesa = veryfyMesa;
const valorTotal = (id_mesa) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get(`/pedido/valor/${id_mesa}`);
    return response.data;
});
exports.valorTotal = valorTotal;
const verifyFinalizar = (id_mesa) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get(`/pedido/verif/finalizar/${id_mesa}`);
    return response.data;
});
exports.verifyFinalizar = verifyFinalizar;
const FinalizarPedido = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post(`/pedido/finalizar`, data);
    return response.data;
});
exports.FinalizarPedido = FinalizarPedido;
const putMesas = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.put("/pedido/mesa", data);
    return response.data;
});
exports.putMesas = putMesas;
const deletePedidos = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield api.delete(`/pedido/${data.id}`);
});
exports.deletePedidos = deletePedidos;
const deleteMesa = (id_mesa) => __awaiter(void 0, void 0, void 0, function* () {
    yield api.delete(`/pedido/mesa/${id_mesa}`);
});
exports.deleteMesa = deleteMesa;
