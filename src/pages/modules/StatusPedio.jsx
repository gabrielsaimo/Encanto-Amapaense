import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase, onValue, ref } from "firebase/database";

import { Divider, notification } from "antd";
import { useParams } from "react-router-dom";
import "../../css/StatusPedido.css";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getStatusPedido } from "../../services/Pedidos.ws";
import currency_BRL from "../Components/CurrencyBRL";
const firebaseConfig = {
  apiKey: "AIzaSyDHuslm5iZZGtOk3ChXKXoIGpQQQI4UaUQ",
  authDomain: "encanto-amapaense.firebaseapp.com",
  projectId: "encanto-amapaense",
  storageBucket: "encanto-amapaense.appspot.com",
  messagingSenderId: "66845466662",
  appId: "1:66845466662:web:6d45a230c3b2ccf49fc6e7",
  measurementId: "G-T9LP3T7QBB",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const service = initializeApp(firebaseConfig);
const database = getDatabase(service);
const mensagensRef = ref(database, "data");

const StatusPedido = () => {
  const { idpedido } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [permissao, setPermissao] = useState(Notification.permission);
  const [pedido, setPedido] = useState([]);

  const pedirPermissaoNotificacao = async () => {
    if (!("Notification" in window)) {
      console.error("Este browser não suporta notificações de Desktop");
      return;
    }
    if (permissao === "granted") {
      return;
    } else {
      try {
        const permissaoResult = await Notification.requestPermission();
        setPermissao(permissaoResult);
      } catch (error) {
        console.error("Erro ao solicitar permissão de notificação:", error);
      }
    }
  };

  const verificarStatusPedido = async () => {
    const resp = await getStatusPedido(idpedido);
    if (resp.length === 0) {
      setPedido([]);
    } else {
      setPedido(resp);
    }

    return resp;
  };

  const enviarNotificacao = (msg) => {
    if (permissao !== "granted") {
      pedirPermissaoNotificacao();
      return;
    } else {
      new Notification(msg);
    }
  };

  const openNotification = (placement, title, notifi, type) => {
    enviarNotificacao(`${title} - ${notifi}`);
    if (type === "success") {
      api.success({
        message: `${title}`,
        description: `Pedido N°${notifi}`,
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
    verificarStatusPedido();
    onValue(mensagensRef, (snapshot) => {
      const data = snapshot.val();
      let dataMensagem = moment(data.date);
      let agora = moment();
      let diferenca = agora.diff(dataMensagem, "minutes");

      if (
        data.company === "Encanto Amapaense Cliente" &&
        diferenca <= 5 &&
        data.notification === Number(idpedido)
      ) {
        openNotification(
          "topRight",
          data.title,
          data.notification,
          data.type,
          data.pedido
        );

        setTimeout(() => {
          verificarStatusPedido();
        }, 1000);
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {contextHolder}
      <LazyLoadImage
        src={require("../../assets/logo.webp")}
        className="logo"
        style={{ marginTop: 30, maxWidth: 300, maxHeight: 300 }}
        alt="logo"
        decoding="async"
        loading="eager"
      />
      <h1 style={{ textAlign: "center" }}>Meu Pedido</h1>
      {pedido.length > 0 ? (
        <div className="card">
          <div className="card-body" style={{ textAlign: "center" }}>
            <h5 className="card-title">Pedido N°{idpedido}</h5>
            <Divider />
            <b className="card-text" style={{ color: "Red" }}>
              Status: {pedido[0].status}
            </b>
            <Divider />
            {pedido.map((item, index) => (
              <div key={index}>
                <b className="card-text">
                  {item.qdt}x {item.item}
                </b>
              </div>
            ))}
            <Divider />
            <p className="card-text">
              Frete: R$
              {currency_BRL(Number(JSON.parse(pedido[0].info)?.frete))}
            </p>
            <p className="card-text">
              Valor Pedido: R$ {currency_BRL(pedido[0].valor)}
            </p>
            <b className="card-text" style={{ color: "green" }}>
              Valor Total: R$ {JSON.parse(pedido[0].info).total}
            </b>
            <Divider />
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body" style={{ textAlign: "center" }}>
            <h5 className="card-title">Pedido Não Encontrado</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPedido;
