/* eslint-disable react-hooks/exhaustive-deps */
import {
    Badge,
    Button,
    Card,
    Descriptions,
    Divider,
    Input,
    Modal,
    notification,
  } from "antd";
  import React, { useEffect, useRef, useState } from "react";
  import {
    getPedidoId,
    getPedidos,
    postPedidosStatus,
    postPedidostatus,
  } from "../../services/Pedidos.ws";
  import { getCardapio } from "../../services/cardapio.ws";
  import { getUser } from "../../services/user.ws";
  import { postEmail } from "../../services/email.ws";
  import io from "socket.io-client";
  import moment from "moment/moment";
  import { initializeApp } from "firebase/app";
  import firebase from "firebase/compat/app";
  import "firebase/compat/database";
  import "firebase/compat/storage";
  import { get, getDatabase, onValue, ref, set } from "firebase/database";
  import sound from "../../assets/notification.wav";
  import soundError from "../../assets/error.wav";
  
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
  
  export default function Bar() {
    const data = new Date();
  
    const hora = data.getHours();
    const dataFormatada =
      hora + ":" + data.getMinutes() + ":" + data.getSeconds();
  
    const [pedidos, setPedido] = useState([]);
    const [cardapio, setCardapio] = useState([]);
    const [acessable, setAcessable] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [dateUser, setDateUser] = React.useState();
    const [userNome, setUserNome] = React.useState("");
    const [modalCancelamento, setModalCancelamento] = React.useState(false);
    const [idPedido, setIdPedido] = React.useState("");
    const [obsCancelamento, setObsCancelamento] = React.useState("");
    const text = obsCancelamento;
    const statusIndex = text.indexOf("Status");
    const beforeStatus = text.slice(0, statusIndex).trim();
    const afterStatus = text.slice(statusIndex).trim();
    const [api, contextHolder] = notification.useNotification();
    const [pedidoss, setPedidos] = useState([]);
    const openNotification = (placement, title, notifi, type) => {
      if (type === "success") {
        api.success({
          message: `${title}`,
          description: `${notifi}`,
          placement,
        });
      } else {
        api.error({
          message: `${title}`,
          description: `${notifi}`,
          placement,
        });
      }
    };
    useEffect(() => {
      onValue(mensagensRef, (snapshot) => {
        const mensagens = snapshot.val();
        openNotification(
          "topRight",
          mensagens.title,
          mensagens.notification,
          mensagens.type
        );
        getPedido();
        if (mensagens.type === "success") {
          new Audio(sound).play();
        } else {
          new Audio(soundError).play();
        }
      });
    }, []);
  
    function atualizarMensagens(title, notification) {
      const mensagens = {
        title,
        notification,
      };
  
      set(mensagensRef, mensagens)
        .then(() => {
          console.log("Mensagens atualizadas com sucesso.");
        })
        .catch((error) => {
          console.error("Erro ao atualizar as mensagens:", error);
        });
    }
  
    useEffect(() => {
      const socket = io("http://192.168.12.11:3020"); // Substitua 'http://localhost:3000' pela URL correta do seu servidor
  
      socket.on("notification", (data) => {
        openNotification("topRight", data.title, data.notification);
        getPedido();
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    useEffect(() => {
      getPedidoss();
    }, [pedidos]);
    useEffect(() => {
      getPedido();
    }, [modalCancelamento, dateUser]);
    const getPedido = async () => {
      const pedidos = await getPedidos();
      setPedido(pedidos);
    };
  
    useEffect(() => {
      getCardapios();
    }, []);
    const getCardapios = async () => {
      const cardapio = await getCardapio();
      setCardapio(cardapio);
    };
    async function getPedidoss() {
      const pedidos = await getPedidoId();
      setPedidos(pedidos);
    }
    const open = () => {
      setVisible(true);
    };
    const acessar = () => {
      GetUsuario();
    };
  
    const StatusPedido = async (data, status) => {
      const dataPedido = {
        id: data.id,
        status: status,
        acepted_by: userNome,
        acepted_at: new Date(),
        update_at: new Date(),
        update_by: userNome,
      };
  
      await postPedidostatus(dataPedido);
      getPedido();
    };
  
    const StatusPedidoFinal = async (id, status) => {
      if (status === "Cancelado") {
        const destinararios = [
          "gabrielsaimo68@gmail.com",
          "Josemaria023182@gmail.com",
          "sraebarbossa@gmail.com",
        ];
        const email = {
          destinatario: destinararios,
          assunto: "Pedido Cancelado",
          corpo: `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Email de Cancelamento</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;background-color:#f5f5f5;}.container{max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1);}h1{color:#333;margin-top:0;}p{margin-bottom:20px;}.signature{margin-top:40px;font-style:italic;color:#888;}</style></head><body><div class='container'><h1>Pedido Cancelado</h1><p>Cancelado por: ${userNome},</p><p>Pedido N° ${id} foi cancelado.</p><p>Motivo do cancelamento:</p><p>${obsCancelamento}</p><br><br/><p>Atenciosamente,</p><p><em>Encando Amapaense</em></p></div></body></html>`,
        };
        await postEmail(email).catch((err) => {
          console.log(err);
          return;
        });
      }
      if (status === "Em Preparo") {
        const data = {
          id: id,
          status: status,
          acepted_by: userNome,
          acepted_at: new Date(),
          update_at: new Date(),
          update_by: userNome,
        };
        await postPedidosStatus(data);
      } else {
        const data = {
          id: id,
          status: status,
          finished_by:
            status === "Pronto" || status === "Cancelado" ? userNome : null,
          finished_at:
            status === "Pronto" || status === "Cancelado" ? new Date() : null,
          update_at: new Date(),
        };
        await postPedidosStatus(data);
      }
      getPedido();
    };
  
    const GetUsuario = async () => {
      const data = { name: name, password: password };
  
      const UserCollection = await getUser(data);
  
      if (UserCollection.length > 0) {
        setUserNome(UserCollection[0].name);
        // Armazenar o valor no localStorage
        localStorage.setItem("dateUser", JSON.stringify(UserCollection));
  
        setDateUser(UserCollection);
        if (UserCollection[0].active === false) {
          alert("Usuário desativado");
          setAcessable(false);
        } else if (
          UserCollection[0].categoria === "ADM" ||
          UserCollection[0].categoria === "BarMan"
        ) {
          setAcessable(true);
        } else {
          alert("Usuário não tem permissão");
          setAcessable(false);
        }
      } else {
        alert("Senha incorreta");
      }
    };
    const logout = () => {
      localStorage.removeItem("dateUser");
      setAcessable(false);
      setDateUser(null);
    };
  
    const confirmarCancelamento = () => {
      setModalCancelamento(false);
      StatusPedidoFinal(idPedido, "Cancelado");
      setObsCancelamento("");
    };
  
    return (
      <Card>
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
          <Card>
            {userNome}
            {contextHolder}
            <div style={{ float: "right" }}>
              <Button onClick={() => logout()}>Sair</Button>
            </div>
  
            <h1>Atualizado as {dataFormatada}</h1>
            {pedidos.map((pedido) => (
              <div style={{ marginBottom: 10 }}>
                <Descriptions
                  bordered
                  column={{
                    xxl: 4,
                    xl: 3,
                    lg: 3,
                    md: 3,
                    sm: 2,
                    xs: 1,
                  }}
                >
                  <Descriptions.Item label="N° Pedido">
                    {pedido.id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mesa">
                    {pedido.mesa}
                  </Descriptions.Item>
                  <Descriptions.Item label="Hora do pedido">
                    {moment(pedido.created_at).format("HH:mm:ss")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Badge
                      status={
                        pedido.status === "Em Analize"
                          ? "warning"
                          : pedido.status === "Cancelado"
                          ? "error"
                          : pedido.status === "Em Cancelamento"
                          ? "error"
                          : pedido.status === "Pronto"
                          ? "success"
                          : pedido.status === "Em Preparo"
                          ? "processing"
                          : "default"
                      }
                      text={pedido.status}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Pedido" span={2}>
                    {cardapio.length > 0 && pedidoss.length > 0 ? (
                      pedidoss.map((pedidoss) => (
                        <>
                          {pedido.pedidos === pedidoss.idpedido ? (
                            <>
                              {pedidoss.qdt > 0 ? (
                                <p>
                                  x{pedidoss.qdt} {pedidoss.item}
                                  {pedidoss.categoria === "Bebidas" ||
                                  pedidoss.categoria === "Sucos exóticos" ? (
                                    pedidoss.status !== "Cancelado" &&
                                    pedidoss.status !== "Em Cancelamento" &&
                                    pedidoss.status !== "Pronto" ? (
                                      <Button
                                        onClick={() => {
                                          StatusPedido(
                                            pedidoss,
                                            pedidoss.status === "Em Analize"
                                              ? "Em Preparo"
                                              : pedido.status === "Em Preparo"
                                              ? "Pronto"
                                              : "Pronto"
                                          );
                                        }}
                                        type="primary"
                                        style={{
                                          marginLeft: 10,
                                          backgroundColor:
                                            pedidoss.status === "Em Analize"
                                              ? "orange"
                                              : pedidoss.status === "Em Preparo"
                                              ? "green"
                                              : "purple",
                                        }}
                                      >
                                        {pedidoss.status === "Em Analize"
                                          ? "Em Preparo"
                                          : pedidoss.status === "Em Preparo"
                                          ? "Pronto"
                                          : "Finalizar"}
                                      </Button>
                                    ) : null
                                  ) : null}
                                  {pedidoss.status === "Em Cancelamento" ? (
                                    <Button
                                      style={{
                                        marginLeft: 10,
                                        backgroundColor: "red",
                                      }}
                                      type="primary"
                                      onClick={() => {
                                        setIdPedido(pedido.id);
                                        setObsCancelamento(pedido.obs_cancel);
                                        setModalCancelamento(true);
                                        //  StatusPedidoFinal(pedido.id, "Cancelado");
                                      }}
                                    >
                                      Confimar?
                                    </Button>
                                  ) : null}
                                  {pedidoss.status === "Pronto" ? (
                                    <Button
                                      type="danger"
                                      onClick={() =>
                                        StatusPedidoFinal(pedido.id, "Pronto")
                                      }
                                    >
                                      Pronto!
                                    </Button>
                                  ) : null}
                                </p>
                              ) : null}
                            </>
                          ) : null}
                        </>
                      ))
                    ) : (
                      <p>Carregando...</p>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Oberservação" span={1}>
                    {pedido.obs}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            ))}
            <Modal
              title="Motivo do Cancelamento"
              open={modalCancelamento}
              okType="danger"
              okText="Cancelar Pedido"
              onOk={() => {
                confirmarCancelamento();
              }}
              cancelButtonProps={{ style: { display: "none" } }}
              onCancel={() => setModalCancelamento(false)}
            >
              <h2>{beforeStatus}</h2>
              <h3>{afterStatus}</h3>
            </Modal>
          </Card>
        )}
      </Card>
    );
  }
  