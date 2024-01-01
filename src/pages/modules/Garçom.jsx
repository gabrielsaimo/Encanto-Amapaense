/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Select,
  Space,
  Collapse,
  Spin,
  List,
  Typography,
  Switch,
} from "antd";
import "firebase/database";
import { getUser } from "../../services/user.ws";
import { getCardapio } from "../../services/cardapio.ws";
import {
  deletePedidos,
  getMesas,
  getPedidos,
  getStatusPedido,
  postPedidosStatus,
  postTransferir,
  putPedidos,
  veryfyMesa,
  putMesas,
  valorTotal,
  FinalizarPedido,
  verifyFinalizar,
  deleteMesa,
  putPedido,
  getPedidoId,
} from "../../services/Pedidos.ws";
import { getPagametos, putPagamentos } from "../../services/pagamentos.ws";
import {
  PlusOutlined,
  DeleteOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { postEmail } from "../../services/email.ws";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHuslm5iZZGtOk3ChXKXoIGpQQQI4UaUQ",
  authDomain: "encanto-amapaense.firebaseapp.com",
  projectId: "encanto-amapaense",
  storageBucket: "encanto-amapaense.appspot.com",
  messagingSenderId: "66845466662",
  appId: "1:66845466662:web:6d45a230c3b2ccf49fc6e7",
  measurementId: "G-T9LP3T7QBB",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const service = initializeApp(firebaseConfig);
const database = getDatabase(service);
const mensagensRef = ref(database, "data");

const { Option } = Select;
const { Panel } = Collapse;
export default function Garçom() {
  // const [dateUser, setDateUser] = useState();
  const [visible, setVisible] = React.useState(true);
  const [showModall, setShowModall] = React.useState(false);
  const [acessable, setAcessable] = React.useState(false);
  const [userNome, setUserNome] = useState("");
  /// const [UserCategoria, setUserCategoria] = useState("");
  const [name, setName] = useState("");
  const [mesa, setMesa] = useState(null);
  const [dateMesa, setDateMesa] = useState([]);
  const [obs, setObs] = useState("");
  const [password, setPassword] = useState("");
  const [pedidos, setPedido] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [active, setActive] = useState(false);
  const [dadosFinalizar, setDadosFinalizar] = useState([]);
  const [modalTransferir, setModalTransferir] = useState(false);
  const [dataTransferir, setDataTransferir] = useState([]);
  const [modalCancelamento, setModalCancelamento] = useState(false);
  const [obsCancelamento, setObsCancelamento] = useState("");
  const [modalFinalizar, setModalFinalizar] = useState(false);
  const [valorMesa, setValorMesa] = useState(0);
  const [valorPagamentos, setValorPagamentos] = useState(0);
  const [valoresPagos, setValoresPagos] = useState([]);
  const [pedidosTotais, setPedidosTotais] = useState([
    { iditem: "", qdt: "1" },
  ]);
  const [idpedido, setIdpedido] = useState();
  const [status, setStatus] = useState();
  const [total, setTotal] = useState(0);
  const [tipoPagamento, setTipoPagamento] = useState(null);
  const [obsFinalizar, setObsFinalizar] = useState("");
  const [loading, setLoading] = useState(false);
  const [taxa, setTaxa] = useState(true);
  const [itensMesa, setItensMesa] = useState([]);
  const [pedidos_uni, setPedidos] = useState([]);
  const random = Math.floor(Math.random() * 100000000);
  useEffect(() => {
    getCachedDateUser();
    getCardapios();
  }, []);
  useEffect(() => {
    getMesa();
    getPedido();
  }, [active, showModall]);

  useEffect(() => {
    calcularTotal();
  }, [pedidosTotais]);
  const acessar = () => {
    GetUsuario();
  };
  const getPedido = async () => {
    setLoading(true);
    const pedidos = await getPedidos();
    setPedido(pedidos);
    await setLoading(false);
  };
  const getCardapios = async () => {
    const cardapio = await getCardapio();
    setCardapio(cardapio);
  };

  const getMesa = async () => {
    const mesas = await getMesas();
    setDateMesa(mesas);
  };

  const DeletarPedido = async (id) => {
    await deletePedidos({
      id: id,
    });
    /* await postNotification({
      title: "Pedido N°" + id + " " + "Cancelado",
      notification: `Pedido Exluido`,
    });*/

    const titulo = "Pedido N°" + id + " " + "Cancelado";
    const notificacao = `Pedido Exluido por: ${userNome}`;
    const type = "danger";
    atualizarMensagens(titulo, notificacao, type, "Encanto Amapaense", "Local");
    setActive(!active);
    window.location.reload();
  };

  const DeletarPedidoUni = async (id) => {
    await deletePedidos({
      id: id,
    });
    const titulo = "Item N°" + id + " " + "Cancelado";
    const notificacao = `Pedido Exluido por: ${userNome}`;
    const type = "danger";
    atualizarMensagens(titulo, notificacao, type, "Encanto Amapaense", "Local");
    setActive(!active);
    window.location.reload();
  };
  async function atualizarMensagens(
    title,
    notification,
    type,
    company,
    metodo
  ) {
    const mensagens = {
      title,
      notification,
      type,
      company,
      metodo,
    };

    await set(mensagensRef, mensagens)
      .then(() => {
        console.log("Mensagens atualizadas com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao atualizar as mensagens:", error);
      });
  }

  const confimerDelete = async (id) => {
    setActive(!active);
    const verify = await getStatusPedido(id);
    if (verify[0].status === "Em Analize") {
      Modal.confirm({
        title: "Deseja excluir o pedido?",
        content: "Ao excluir o pedido não será possivel recupera-lo",
        okText: "Excluir",
        cancelText: "Cancelar",
        okButtonProps: {
          danger: true,
        },
        cancelButtonProps: {
          type: "primary",
        },

        onOk: () => DeletarPedido(id),
      });
    } else {
      Modal.error({
        title: "Pedido não pode ser excluido",
        content: "Pedido diferente de Em analize não pode ser excluido",
      });
    }
  };

  const confimerDeleteItem = async (id) => {
    setActive(!active);
    const verify = await getStatusPedido(id);
    if (verify[0].status === "Em Analize") {
      Modal.confirm({
        title: "Deseja excluir esse Item?",
        content: "Ao excluir o pedido não será possivel recupera-lo",
        okText: "Excluir",
        cancelText: "Cancelar",
        okButtonProps: {
          danger: true,
        },
        cancelButtonProps: {
          type: "primary",
        },

        onOk: () => DeletarPedidoUni(id),
      });
    } else {
      Modal.error({
        title: "Pedido não pode ser excluido",
        content: "Pedido diferente de Em analize não pode ser excluido",
      });
    }
  };

  const GetUsuario = async () => {
    const data = { name: name, password: password };

    const UserCollection = await getUser(data);

    if (UserCollection.length > 0) {
      setUserNome(UserCollection[0].name);
      localStorage.setItem("dateUser", JSON.stringify(UserCollection));
      if (UserCollection[0].active === false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        UserCollection[0].categoria === "ADM" ||
        UserCollection[0].categoria === "Gerência" ||
        UserCollection[0].categoria === "Garçom"
      ) {
        setAcessable(true);
      } else {
        alert("Usuário não tem permissão");
        setAcessable(false);
      }

      close();
    } else {
      alert("Senha incorreta");
    }
  };

  // Recuperar o valor armazenado no localStorage
  const getCachedDateUser = () => {
    const cachedData = localStorage.getItem("dateUser");
    if (cachedData) {
      // setDateUser(JSON.parse(cachedData)[0]);
      setUserNome(JSON.parse(cachedData)[0].name);
      //  setUserCategoria(JSON.parse(cachedData)[0].categoria);
      if (JSON.parse(cachedData)[0].active === false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        JSON.parse(cachedData)[0].categoria === "ADM" ||
        JSON.parse(cachedData)[0].categoria === "Gerência" ||
        JSON.parse(cachedData)[0].categoria === "Garçom"
      ) {
        setAcessable(true);
      } else {
        alert("Usuário não tem permissão");
        setAcessable(false);
      }
    }
    return cachedData ? JSON.parse(cachedData)[0] : null;
  };

  const close = () => {
    Modal.destroyAll();
    setShowModall(false);
    clear();
  };
  const open = () => {
    setVisible(true);
  };

  const logout = () => {
    localStorage.removeItem("dateUser");
    setAcessable(false);
    //   setDateUser(null);
  };

  const showModal = () => {
    setShowModall(true);
  };

  const handlePedidoChange = (index, name, value) => {
    const newPedidos = [...pedidosTotais];
    newPedidos[index][name] = value;

    for (let i = 0; i < cardapio.length; i++) {
      if (cardapio[i].id === Number(value)) {
        if (name === "iditem") {
          newPedidos[index]["categoria"] = cardapio[i].category;
          newPedidos[index]["valor"] = cardapio[i].price;
          newPedidos[index]["item"] = cardapio[i].name;
        } else {
          newPedidos[index]["qdt"] = value;
        }

        newPedidos[index]["idmesa"] = mesa;
        newPedidos[index]["id"] = random;
        newPedidos[index]["created_at"] = new Date();
        newPedidos[index]["created_by"] = userNome;
        newPedidos[index]["update_at"] = new Date();
        newPedidos[index]["update_by"] = userNome;
        newPedidos[index]["status"] = "Em Analize";
        if (idpedido === undefined) {
          newPedidos[index]["idpedido"] = random;
          setIdpedido(random);
        } else {
          newPedidos[index]["idpedido"] = idpedido;
          setIdpedido(idpedido);
        }
      }
    }
    setPedidosTotais(newPedidos);
  };

  const adicionarNovoPedido = () => {
    setPedidosTotais([
      ...pedidosTotais,
      { iditem: "", qdt: "1", categoria: "" },
    ]);
  };

  const removerPedido = (index) => {
    const newPedidos = [...pedidosTotais];
    newPedidos.splice(index, 1);
    setPedidosTotais(newPedidos);
  };

  const cancelarPedido = async (id) => {
    const data = {
      id: id,
      status: "Em Cancelamento",
      update_at: new Date(),
      update_by: userNome,
      obs_cancel: ` 
      ${obsCancelamento} 
      Status : ${status}
      `,
    };

    /*await postNotification({
      title: "Pedido N°" + id + " " + "Em Cancelamento",
      notification: `por: ${userNome}`,
    });*/
    const titulo = " Pedido de Cancelamento";
    const notificacao = `por: ${userNome}`;
    const type = "danger";
    atualizarMensagens(titulo, notificacao, type, "Encanto Amapaense", "Local");
    await postPedidosStatus(data);
    setObsCancelamento("");
    setActive(!active);
  };

  const statusPedido = async (id, taxa, status) => {
    const data = {
      id: id,
      status: status,
      finished_by: status === "Finalizado" ? userNome : null,
      finished_at: status === "Finalizado" ? new Date() : null,
      taxa: taxa === true ? parseInt(valorMesa) * 0.1 : 0,
      update_at: new Date(),
      update_by: userNome,
    };
    await postPedidosStatus(data);
    setActive(!active);
    if (status === "Finalizado") {
      window.location.reload();
    }
  };

  const calcularTotal = () => {
    let newTotal = 0;
    pedidosTotais.forEach((pedido) => {
      const { iditem, qdt } = pedido;
      const item = cardapio.find((option) => option.id === Number(iditem));
      if (item) {
        newTotal += item.price * Number(qdt);
      }
    });

    setTotal(newTotal);
  };

  async function tranferirPedido() {
    const verifyMessa = await veryfyMesa(mesa);
    if (verifyMessa.length > 0) {
      await postTransferir({
        id: dataTransferir.id,
        id_mesa: verifyMessa[0].id,
        mesa: mesa,
        update_at: new Date(),
        update_by: userNome,
      });
      setModalCancelamento(false);
      clear();
      setActive(!active);
    } else {
      const idMesa = Math.floor(Math.random() * 100000000);

      await putMesas({
        created_at: new Date(),
        created_by: userNome,
        nm_mesa: mesa,
        id: idMesa,
        status: "Aberto",
        update_at: new Date(),
        update_by: userNome,
      });

      await postTransferir({
        id: dataTransferir.id,
        id_mesa: idMesa,
        mesa: mesa,
        update_at: new Date(),
        update_by: userNome,
      });
      setModalCancelamento(false);
      clear();
      setActive(!active);
    }
    window.location.reload();
  }

  async function putPedi() {
    for (let i = 0; i < pedidosTotais.length; i++) {
      await putPedido(pedidosTotais[i]);
    }
    clear();
  }
  useEffect(() => {
    getPedidoss();
  }, [active]);

  async function getPedidoss() {
    const pedidos = await getPedidoId();
    setPedidos(pedidos);
  }
  async function enviarPedido() {
    setLoading(true);
    const verifyMessa = await veryfyMesa(mesa);

    if (verifyMessa.length > 0) {
      await putPedidos({
        id: random,
        created_at: new Date(),
        created_by: userNome,
        mesa,
        pedidos: idpedido,
        obs,
        id_mesa: verifyMessa[0].id,
        status: "Em Analize",
        valor: total,
        update_at: new Date(),
        update_by: userNome,
      });
      putPedi();
      setShowModall(false);
      setActive(!active);
      clear();
      setLoading(false);
    } else {
      const idMesa = random;

      await putMesas({
        created_at: new Date(),
        created_by: userNome,
        nm_mesa: mesa,
        id: idMesa,
        status: "Aberto",
        update_at: new Date(),
        update_by: userNome,
      });

      await putPedidos({
        id: random,
        created_at: new Date(),
        created_by: userNome,
        mesa,
        pedidos: idpedido,
        obs,
        id_mesa: idMesa,
        status: "Em Analize",
        valor: total,
        update_at: new Date(),
        update_by: userNome,
      });
      putPedi();
      setShowModall(false);
      setActive(!active);
      clear();
      setLoading(false);
    }
    const titulo = "Novo Pedido N°" + idpedido;
    const notificacao = `Novo pedido na mesa ${mesa}`;
    const type = "success";
    const company = "Encanto Amapaense";
    const metodo = "Local";
    await atualizarMensagens(titulo, notificacao, type, company, metodo);
    /* await postNotification({
      title: "Novo Pedido N°" + random,
      notification: `Novo pedido na mesa ${mesa}`,
    });*/
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  function clear() {
    setMesa("");
    setPedidosTotais([{ id: "", qdt: "1" }]);
    setObs("");
    setTipoPagamento(null);
    setObsFinalizar("");
    setObsCancelamento("");
  }

  const finalmesa = async (itemMesa, taxa) => {
    setTipoPagamento(null);
    setObsFinalizar("");
    setItensMesa(itemMesa);
    const valor = await valorTotal(itemMesa.id);
    const pagamentos = await getPagametos(itemMesa.id);
    setValoresPagos(pagamentos);
    setValorMesa(valor[0].valor);
    setModalFinalizar(true);
    setDadosFinalizar(itemMesa);
    setValorPagamentos(
      taxa
        ? (
            parseInt(valor[0].valor) +
            parseInt(valor[0].valor) * 0.1 -
            pagamentos.reduce((total, item) => total + item.valor, 0)
          ).toFixed(2)
        : (
            parseInt(valor[0].valor) -
            pagamentos.reduce((total, item) => total + item.valor, 0)
          ).toFixed(2)
    );

    clear();
  };

  const finalizarMesa = async () => {
    setLoading(true);

    const verify = await verifyFinalizar(dadosFinalizar.id);
    if (verify.length > 0) {
      Modal.error({
        title: "Mesa não pode ser finalizada",
        content: "Mesa com pedidos em aberto",
      });
      setLoading(false);
    } else if (valorMesa > 0) {
      if (
        valoresPagos[0]?.valor_pgt.toFixed(2) ===
        Number(parseInt(valorMesa) + parseInt(valorMesa) * 0.1).toFixed(2)
      ) {
      } else {
        setModalFinalizar(false);
        if (
          Number(Number(valorPagamentos).toFixed(2)) +
            Number(valoresPagos[0]?.valor_pgt.toFixed(2)) ===
            Number(
              taxa === true
                ? Number(
                    parseInt(valorMesa) + parseInt(valorMesa) * 0.1
                  ).toFixed(2)
                : Number(parseInt(valorMesa)).toFixed(2)
            ) ||
          Number(Number(valorPagamentos).toFixed(2)) ===
            Number(
              taxa === true
                ? Number(
                    parseInt(valorMesa) + parseInt(valorMesa) * 0.1
                  ).toFixed(2)
                : Number(parseInt(valorMesa)).toFixed(2)
            )
        ) {
          if (
            Number(Number(valorPagamentos).toFixed(2)) >
              Number(parseInt(valorMesa) + parseInt(valorMesa) * 0.1) ||
            Number(Number(valorPagamentos).toFixed(2)) +
              Number(valoresPagos[0]?.valor_pgt.toFixed(2)) >
              Number(
                Number(parseInt(valorMesa) + parseInt(valorMesa) * 0.1).toFixed(
                  2
                )
              )
          ) {
            alert("Valor pago maior que o valor da mesa");
            setLoading(false);
            return;
          }
          await putPagamentos({
            id: random,
            tipo: tipoPagamento,
            idpedido: dadosFinalizar.id,
            created_at: new Date(),
            created_by: userNome,
            valor: valorPagamentos,
          });
          const pagamentos = await getPagametos(dadosFinalizar.id);

          var vlvl = pagamentos
            .map(
              (transacao) =>
                `<br></br> ${transacao.tipo}: \n R$ ${transacao.valor.toFixed(
                  2
                )}\n\n`
            )
            .join("");

          var lavorTotal =
            taxa === true
              ? (parseInt(valorMesa) + parseInt(valorMesa) * 0.1).toFixed(2)
              : parseInt(valorMesa).toFixed(2);
          const destinararios = [
            "gabrielsaimo68@gmail.com",
            "Josemaria023182@gmail.com",
            "sraebarbossa@gmail.com",
          ];

          var taxaPaga = taxa === true ? "10%" : "0%";
          const email = {
            destinatario: destinararios,
            assunto: "Pedido Finalizado",
            corpo: `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Email de Finalização de Pedido</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;background-color:#f5f5f5;}.container{max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1);}h1{color:#333;margin-top:0;}p{margin-bottom:20px;}.signature{margin-top:40px;font-style:italic;color:#888;}</style></head><body><div class='container'><h1>Pedido Finalizado</h1><p>Finalizado por: ${userNome},</p><p>O pedido N° ${
              dadosFinalizar.id
            } foi Finalizado.</p><p>Observação:</p><p>${obsFinalizar}</p><p>Metodos de Pagamento:${vlvl}</p><br><br/><br><br/><p>Valor Mesa: R$ ${valorMesa}</p><p>Taxa de serviço + 10%: R$ ${(
              parseInt(valorMesa) * 0.1
            ).toFixed(
              2
            )}<br><br/><p>Taxa paga:${taxaPaga}</p><br><br/></p><p>Valor Total Pago: R$ ${lavorTotal}</p><br><br/><p>Atenciosamente,</p><p><em>Encando Amapaense</em></p></div></body></html>`,
          };
          setModalFinalizar(false);
          await postEmail(email);
          await FinalizarPedido({
            id: dadosFinalizar.id,
            closed_by: userNome,
            closed_at: new Date(),
            obs: obsFinalizar,
            tipo_pagamento: tipoPagamento,
            valor: valorMesa,
            taxa: taxa === true ? parseInt(valorMesa) * 0.1 : 0,
            valorTotal: parseInt(valorMesa) + parseInt(valorMesa) * 0.1,
          });
          statusPedido(dadosFinalizar.id, taxa, "Concluido");
          setActive(!active);
          clear();
          setLoading(false);
          getPagametos(dadosFinalizar.id);
        } else {
          console.log(taxa);
          if (
            Number(
              taxa === true
                ? Number(valorPagamentos).toFixed(2) >
                    Number(parseInt(valorMesa) + parseInt(valorMesa) * 0.1)
                : Number(valorPagamentos).toFixed(2)
            ) > Number(parseInt(valorMesa)) ||
            Number(Number(valorPagamentos).toFixed(2)) + taxa
              ? Number(valoresPagos[0]?.valor_pgt.toFixed(2)) >
                Number(
                  Number(
                    parseInt(valorMesa) + parseInt(valorMesa) * 0.1
                  ).toFixed(2)
                )
              : Number(valoresPagos[0]?.valor_pgt.toFixed(2)) >
                Number(Number(parseInt(valorMesa)).toFixed(2))
          ) {
            alert("Valor pago maior que o valor da mesa");
            setLoading(false);
            return;
          }
          await putPagamentos({
            id: random,
            tipo: tipoPagamento,
            idpedido: dadosFinalizar.id,
            created_at: new Date(),
            created_by: userNome,
            valor: valorPagamentos,
          });
          setActive(!active);
          clear();
          setLoading(false);
        }
      }
    } else {
      Modal.error({
        title: "Mesa não pode ser finalizada",
        content: "Mesa sem pedidos",
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const excluiMesa = async (id) => {
    setLoading(true);
    const verify = await verifyFinalizar(id);
    if (verify.length > 0) {
      Modal.error({
        title: "Mesa não pode ser excluida",
        content: "Mesa com pedidos em aberto",
      });
      setLoading(false);
      setModalFinalizar(false);
    } else {
      await deleteMesa(id);
      setActive(!active);
      setLoading(false);
      setModalFinalizar(false);
    }
  };

  return (
    <Card
      style={{ backgroundColor: "#707070", height: "100%", minHeight: "99vh" }}
    >
      <Spin spinning={loading}>
        {!acessable ? (
          <Modal
            title="Acesso Restrito para Administradores"
            open={visible}
            footer={null}
            onCancel={() => open()}
          >
            <div
              style={{
                width: "95%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "grid",
                gridGap: "10px",
              }}
            >
              <label>Nome</label>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
              <label>Senha</label>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Divider />
              <Button onClick={acessar}>Acessar</Button>
            </div>
          </Modal>
        ) : (
          <div
            style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Card style={{ margin: 10, fontSize: 20 }}>
              {userNome}
              <div style={{ float: "right" }}>
                <Button onClick={() => logout()}>Sair</Button>
              </div>
            </Card>
            <div>
              <Button type="primary" onClick={() => showModal()}>
                Novo Pedido
              </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {dateMesa.map((itemMesa, index) => (
                <Card
                  title={"Mesa " + itemMesa.nm_mesa}
                  extra={<h4>Por: {itemMesa.created_by}</h4>}
                  style={{ width: "100%", marginTop: 16, marginBottom: 16 }}
                  key={index}
                >
                  {pedidos.map((item, index) => (
                    <>
                      {itemMesa.id === item.id_mesa ? (
                        <Collapse
                          key={item}
                          destroyInactivePanel
                          expandIcon={({ isActive }) => (
                            <CaretRightOutlined
                              style={{ color: "#FFF" }}
                              rotate={isActive ? 90 : 0}
                            />
                          )}
                          onChange={() => [setActive(!active)]}
                        >
                          <Panel
                            header={item.status}
                            key={index}
                            style={{
                              marginBottom: 10,
                              borderRadius: 8,
                              backgroundImage:
                                item.status === "Em Analize"
                                  ? "linear-gradient(to right,#ff8800, #ff0000)"
                                  : item.status === "Em Preparo"
                                  ? "linear-gradient(to right,#0a4bff , #00ff00)"
                                  : item.status === "Pronto"
                                  ? "linear-gradient(to right,#00ff00 , #0a4bff)"
                                  : item.status === "Em Cancelamento"
                                  ? "linear-gradient(to right,#ff0000 , #9b0000)"
                                  : "linear-gradient(to right,#00ff00, #0a4bff, #ff8800)",
                              color: "#FFFFFF",
                            }}
                          >
                            <p> Status: {item.status}</p>
                            {}
                            <Card key={item.id}>
                              {cardapio.length > 0 && pedidos_uni.length > 0 ? (
                                pedidos_uni.map((pedido_uni) => (
                                  <>
                                    {item.pedidos === pedido_uni.idpedido ? (
                                      <>
                                        {pedido_uni.qdt > 0 ? (
                                          <p>
                                            x{pedido_uni.qdt} {pedido_uni.item}{" "}
                                          </p>
                                        ) : null}
                                      </>
                                    ) : null}
                                  </>
                                ))
                              ) : (
                                <p>Carregando...</p>
                              )}
                            </Card>

                            <p>Valor: R$ {item.valor}</p>
                            <p>Observações: {item.obs}</p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              {item.status !== "Em Cancelamento" ? (
                                <Button
                                  type="primary"
                                  style={{ marginRight: 10 }}
                                  onClick={() => [
                                    setDataTransferir(item),
                                    setModalTransferir(!modalTransferir),
                                  ]}
                                >
                                  Trasferir
                                </Button>
                              ) : null}
                              {item.status === "Pronto" ? (
                                <Button
                                  type="primary"
                                  onClick={() =>
                                    statusPedido(item.id, taxa, "Finalizado")
                                  }
                                  style={{
                                    marginRight: 10,
                                    backgroundColor: "#00FF00",
                                    color: "#FFFFFF",
                                  }}
                                >
                                  Finalizar
                                </Button>
                              ) : null}
                              <>
                                {item.status !== "Em Cancelamento" &&
                                item.status !== "Em Analize" ? (
                                  <Button
                                    type="primary"
                                    onClick={() => [
                                      setIdpedido(item.id),
                                      setStatus(item.status),
                                      setModalCancelamento(true),
                                    ]}
                                    style={{
                                      marginRight: 10,
                                      backgroundColor: "#FF0000",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    Cancelar
                                  </Button>
                                ) : null}

                                {item.status === "Em Analize" ? (
                                  <Button
                                    type="primary"
                                    onClick={() => confimerDelete(item.id)}
                                    style={{
                                      marginRight: 10,
                                      backgroundColor: "#FF0000",
                                      color: "#FFFFFF",
                                    }}
                                    icon={<DeleteOutlined />}
                                  />
                                ) : null}
                              </>
                            </div>
                          </Panel>
                        </Collapse>
                      ) : null}
                    </>
                  ))}
                  <div style={{ float: "right" }}>
                    <Button
                      type="primary"
                      onClick={() => finalmesa(itemMesa, taxa)}
                    >
                      Finalizar Messa
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <Modal
              open={showModall}
              onCancel={() => close()}
              okText="Enviar Pedido"
              cancelText="Cancelar"
              okButtonProps={{
                disabled: total === 0 || mesa === "",
                loading: loading,
              }}
              onOk={() => enviarPedido()}
            >
              <div className="container">
                <h2 className="title">Adicionar Pedidos</h2>
                <h3>Mesa</h3>
                <div>
                  <Input
                    type="number"
                    value={mesa}
                    style={{ width: 100 }}
                    min={1}
                    onChange={(event) => setMesa(event.target.value)}
                  />
                </div>

                {pedidosTotais.map((pedido, index) => (
                  <div
                    key={index}
                    className="pedido-container"
                    style={{ marginBottom: 10 }}
                  >
                    <h3>
                      Pedido {index + 1}
                      <Button
                        style={{ backgroundColor: "#FF0000", color: "#FFF" }}
                        onClick={() => removerPedido(index)}
                        icon={<DeleteOutlined />}
                      />
                    </h3>

                    <Space>
                      <Select
                        showSearch
                        style={{ width: 250 }}
                        placeholder="Selecione um item"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(value) =>
                          handlePedidoChange(index, "iditem", value)
                        }
                        value={pedido.iditem}
                      >
                        <Option value="">Selecione um item</Option>
                        {cardapio.map((option) => (
                          <Option key={option.id} value={option.id}>
                            {option.id} - {option.name}
                          </Option>
                        ))}
                      </Select>
                      <Input
                        style={{ width: 62 }}
                        type="number"
                        value={pedido.qdt}
                        prefix="x"
                        min={1}
                        max={99}
                        onChange={(event) =>
                          handlePedidoChange(index, "qdt", event.target.value)
                        }
                      />
                    </Space>
                  </div>
                ))}
                <Button
                  type="primary"
                  style={{ marginBottom: 10 }}
                  icon={<PlusOutlined />}
                  onClick={adicionarNovoPedido}
                />
                <div style={{ marginBottom: 10 }}>
                  <label>Valor</label>
                  <Input prefix="R$" value={total} readOnly />
                </div>
                <div>
                  <label>Taxa de serviço</label>
                  <Input
                    prefix="R$"
                    value={(parseInt(total) * 0.1).toFixed(2)}
                    readOnly
                  />
                </div>
                <Divider />
                <div style={{ marginBottom: 10 }}>
                  <lavel>Valor Total</lavel>
                  <Input
                    prefix="R$"
                    value={(parseInt(total) + parseInt(total) * 0.1).toFixed(2)}
                    readOnly
                  />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Observações</label>
                  <TextArea
                    value={obs}
                    rows={3}
                    onChange={(event) => setObs(event.target.value)}
                  />
                </div>
              </div>
            </Modal>
            <Modal
              open={modalCancelamento}
              onCancel={() => [
                setModalCancelamento(false),
                setObsCancelamento(""),
              ]}
              okText="Pedir Cancelamento"
              okType="danger"
              cancelButtonProps={{ style: { display: "none" } }}
              cancelText="Voltar"
              okButtonProps={{
                disabled: obsCancelamento.length < 3,
                loading: loading,
              }}
              onOk={() => {
                cancelarPedido(idpedido);
                setModalCancelamento(false);
              }}
            >
              <div className="container">
                <h2 className="title">Cancelar Pedido</h2>
                <div style={{ marginBottom: 10 }}>
                  <label>Motivo</label>
                  <TextArea
                    value={obsCancelamento}
                    rows={4}
                    onChange={(event) => setObsCancelamento(event.target.value)}
                  />
                </div>
              </div>
            </Modal>
            <Modal
              open={modalTransferir}
              okText="Tranferir"
              onCancel={() => setModalTransferir(!modalTransferir)}
              okButtonProps={{
                disabled: mesa === "" || mesa === dataTransferir.mesa,
                loading: loading,
              }}
              onOk={() => [
                tranferirPedido(),
                setActive(!active),
                setModalTransferir(false),
                clear(),
              ]}
            >
              <div className="container">
                <h2 className="title">Transferir Pedido</h2>
                <div style={{ marginBottom: 10 }}>
                  <label>Mesa {dataTransferir.mesa} para :</label>
                  <Input
                    style={{ width: 100 }}
                    type="number"
                    min={1}
                    onChange={(event) => setMesa(event.target.value)}
                  />
                </div>
              </div>
            </Modal>
            <Modal
              open={modalFinalizar}
              onCancel={() => setModalFinalizar(false)}
              cancelText="Voltar"
              okText={valorMesa > 0 ? "Finalizar" : "Excluir"}
              okType={valorMesa > 0 ? "primary" : "danger"}
              okButtonProps={{
                disabled: tipoPagamento === null && valorMesa > 0,
                loading: loading,
              }}
              onOk={() =>
                valorMesa > 0
                  ? finalizarMesa()
                  : [excluiMesa(dadosFinalizar.id)]
              }
            >
              <div className="container">
                <h2 className="title">Finalizar Pedido</h2>
                <div style={{ marginBottom: 10 }}>
                  <label>Valor</label>
                  <Input
                    prefix="R$"
                    value={valorMesa > 0 ? valorMesa : 0}
                    readOnly
                  />
                </div>

                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div></div>
                  <div>
                    <label>Taxa de serviço</label>
                    <Switch
                      size="large"
                      style={{ marginLeft: 10, marginBottom: 1 }}
                      checkedChildren="10%"
                      unCheckedChildren="0%"
                      defaultChecked={taxa}
                      onChange={() => [
                        setTaxa(!taxa),
                        finalmesa(itensMesa, !taxa),
                      ]}
                    />
                    <Input
                      prefix="R$"
                      value={
                        valorMesa > 0
                          ? (parseInt(valorMesa) * 0.1).toFixed(2)
                          : 0
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <lavel>Valor Total</lavel>
                  <Input
                    prefix="R$"
                    value={
                      valorMesa > 0 && taxa
                        ? (
                            parseInt(valorMesa) +
                            parseInt(valorMesa) * 0.1
                          ).toFixed(2)
                        : valorMesa > 0 && !taxa
                        ? parseInt(valorMesa)
                        : 0
                    }
                    readOnly
                  />
                </div>
                <Space direction="vertical">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {valoresPagos.length > 0 ? (
                        <>
                          <label>Valores Pagos</label>
                          <List
                            style={{ width: 200 }}
                            bordered
                            dataSource={valoresPagos}
                            renderItem={(item) => (
                              <List.Item>
                                <Typography.Text mark>
                                  R$ {item.valor.toFixed(2)} {item.tipo}
                                </Typography.Text>
                              </List.Item>
                            )}
                          />
                        </>
                      ) : null}
                    </div>

                    <div>
                      {valoresPagos.length > 0 ? (
                        <>
                          <label>Total Pago</label>
                          <div style={{ marginBottom: 10 }}>
                            <Input
                              prefix="R$"
                              value={valoresPagos[0]?.valor_pgt}
                              readOnly
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <label>Valor a Pagar</label>
                  <div style={{ marginBottom: 10 }}>
                    <Input
                      prefix="R$"
                      style={{ width: "80vw", maxWidth: 470 }}
                      value={
                        valorMesa > 0 && taxa
                          ? (
                              parseInt(valorMesa) +
                              parseInt(valorMesa) * 0.1 -
                              valoresPagos.reduce(
                                (total, item) => total + item.valor,
                                0
                              )
                            ).toFixed(2)
                          : valorMesa > 0 && !taxa
                          ? (
                              parseInt(valorMesa) -
                              valoresPagos.reduce(
                                (total, item) => total + item.valor,
                                0
                              )
                            ).toFixed(2)
                          : 0
                      }
                      readOnly
                    />
                  </div>

                  <Space>
                    <Select
                      style={{ width: 100 }}
                      value={tipoPagamento}
                      placeholder="Tipo de Pagamento"
                      onChange={(event) => setTipoPagamento(event)}
                    >
                      <Option value="PIX">Pix</Option>
                      <Option value="Dinheiro">Dinheiro</Option>
                      <Option value="Crédito">Crédito</Option>
                      <Option value="Débito">Débito</Option>
                      <Option value="Cortesia">Cortesia</Option>
                    </Select>
                    <Input
                      style={{ width: 115 }}
                      placeholder="Valor"
                      value={valorPagamentos}
                      prefix="R$"
                      type="number"
                      disabled={tipoPagamento === "Cortesia"}
                      min={0}
                      onChange={(event) =>
                        setValorPagamentos(event.target.value)
                      }
                    />
                  </Space>

                  <TextArea
                    rows={3}
                    placeholder="Observações"
                    value={obsFinalizar}
                    onChange={(event) => setObsFinalizar(event.target.value)}
                  />
                </Space>
              </div>
            </Modal>
          </div>
        )}
      </Spin>
    </Card>
  );
}
