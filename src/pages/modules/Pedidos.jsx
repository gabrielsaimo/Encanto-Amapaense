/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  ConfigProvider,
  DatePicker,
  Descriptions,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getPedidoId,
  getPedidosAdm,
  getPedidosData,
} from "../../services/Pedidos.ws";
import { getCardapio } from "../../services/cardapio.ws";
import "dayjs/locale/pt-br";
import locale from "antd/locale/pt_BR";
import moment from "moment/moment";
import { io } from "socket.io-client";
export default function Pedidos(atualizar) {
  const data = new Date();
  const hora = data.getHours();
  const dataFormatada =
    hora + ":" + data.getMinutes() + ":" + data.getSeconds();

  const [pedidos, setPedido] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [pedidoss, setPedidos] = useState([]);
  const openNotification = (placement, title, notifi) => {
    api.info({
      message: `${title}`,
      description: `${notifi}`,
      placement,
    });
  };

  useEffect(() => {
    getPedidoss();
  }, [pedidos]);

  const getPedido_data = async (init, fin) => {
    const body = {
      data_inicial: init + " 00:00:00.000",
      data_final: fin + " 23:59:59.000",
    };
    const pedidos = await getPedidosData(body);
    setPedido(pedidos);
  };

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
    getPedido();
  }, [atualizar]);
  const getPedido = async () => {
    const pedidos = await getPedidosAdm();
    setPedido(pedidos);
  };

  async function getPedidoss() {
    const pedidos = await getPedidoId();
    setPedidos(pedidos);
  }

  useEffect(() => {
    getCardapios();
  }, []);
  const getCardapios = async () => {
    const cardapio = await getCardapio();
    setCardapio(cardapio);
  };

  async function datas(e) {
    if (e) {
      const originalDate1 = new Date(e[0]);
      const originalDate2 = new Date(e[1]);

      const formattedDate1 = `${originalDate1.getFullYear()}-${(
        originalDate1.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${originalDate1
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const formattedDate2 = `${originalDate2.getFullYear()}-${(
        originalDate2.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${originalDate2
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      getPedido_data(formattedDate1, formattedDate2);
    }
  }

  return (
    <div style={{ minHeight: "90vh" }}>
      <h1>Atualizado as {dataFormatada}</h1>
      {contextHolder}
      <ConfigProvider locale={locale}>
        <DatePicker.RangePicker onChange={(e) => datas(e)} />
      </ConfigProvider>
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
            <Descriptions.Item label="N° Pedido">{pedido.id}</Descriptions.Item>
            <Descriptions.Item label="Mesa">{pedido.mesa}</Descriptions.Item>
            <Descriptions.Item label="Hora do pedido">
              {moment(pedido.data).format("DD/MM/YYYY HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  pedido.status === "Em Analize"
                    ? "warning"
                    : pedido.status === "Cancelado"
                    ? "error"
                    : pedido.status === "Finalizado"
                    ? "success"
                    : pedido.status === "Em Preparo"
                    ? "processing"
                    : "default"
                }
                text={pedido.status}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Valor do Pedido">
              R$ {pedido.valor},00
            </Descriptions.Item>
            {pedido.desconto > 0 ? (
              <Descriptions.Item label="Desconto" style={{ color: "red" }}>
                R$ {pedido.desconto},00
              </Descriptions.Item>
            ) : null}

            <Descriptions.Item label="Valor Total">
              R$ {Number(pedido.valor) - Number(pedido.desconto)},00
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
            {pedido.status !== "Em Analize" &&
            pedido.status !== "Em Cancelamento" ? (
              <>
                <Descriptions.Item label="Aceito por">
                  {pedido.acepted_by}
                </Descriptions.Item>
                <Descriptions.Item label="Aceito em">
                  {moment(pedido.acepted_at).format("DD/MM/YYYY HH:mm:ss")}
                </Descriptions.Item>
                {pedido.status === "Finalizado" ||
                pedido.status === "Pronto" ||
                pedido.status === "Cancelado" ? (
                  <>
                    <Descriptions.Item
                      label={
                        pedido.status === "Cancelado"
                          ? "Cancelado por"
                          : "Finalizado por"
                      }
                    >
                      {pedido.finished_by}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        pedido.status === "Cancelado"
                          ? "Cancelado em"
                          : "Finalizado em"
                      }
                    >
                      {moment(pedido.finished_at).format("DD/MM/YYYY HH:mm:ss")}
                    </Descriptions.Item>
                  </>
                ) : null}
              </>
            ) : null}
            {pedido.status === "Cancelado" ||
            pedido.status === "Em Cancelamento" ? (
              <>
                <Descriptions.Item
                  label="Motivo"
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  {pedido.obs_cancel}
                </Descriptions.Item>
              </>
            ) : null}
          </Descriptions>
        </div>
      ))}
    </div>
  );
}
