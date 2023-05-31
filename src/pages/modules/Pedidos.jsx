import { Badge, Descriptions } from "antd";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { service } from "../../services/firebase.ws";
import { getPedidosAdm } from "../../services/Pedidos.ws";
import { getCardapio } from "../../services/cardapio.ws";
import moment from "moment/moment";
export default function Pedidos(atualizar) {
  const data = new Date();
  const hora = data.getHours();
  const dataFormatada =
    hora + ":" + data.getMinutes() + ":" + data.getSeconds();

  const db = getFirestore(service);
  const [pedidos, setPedido] = useState([]);
  const colletionRefPedido = collection(db, "pedidos");
  const colletionRefListaPedido = collection(db, "listaPedidos");
  const [listapedidos, setListaPedido] = useState([]);
  const [count, setCount] = useState(0);
  const [cardapio, setCardapio] = useState([]);
  useEffect(() => {
    getPedido();

    getListaPedido();
    const interval = setInterval(() => {
      setCount(count + 1);
      getPedido();
      getListaPedido();
    }, 60000);

    return () => clearInterval(interval);
  }, [atualizar]);
  const getPedido = async () => {
    const pedidos = await getPedidosAdm();
    setPedido(pedidos);
  };

  useEffect(() => {
    getCardapios();
  }, []);
  const getCardapios = async () => {
    const cardapio = await getCardapio();
    setCardapio(cardapio);
  };
  const getListaPedido = async () => {
    const Collection = await getDocs(colletionRefListaPedido);
    const listapedido = Collection.docs.map((doc) => ({
      ...doc.data(),
      key: doc.id,
    }));
    setListaPedido(listapedido.sort((a, b) => b.id - a.id));
  };
  return (
    <>
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
              <Descriptions.Item label="Desconto">
                R$ {pedido.desconto},00
              </Descriptions.Item>
            ) : null}

            <Descriptions.Item label="Valor Total">
              R$ {Number(pedido.valor) - Number(pedido.desconto)},00
            </Descriptions.Item>
            <Descriptions.Item label="Pedido" span={3}>
              {cardapio.length > 0 ? (
                JSON.parse(pedido.pedidos).map((pedido) => (
                  <>
                    {pedido.id ==
                    cardapio.find((option) => option.id === Number(pedido.id))
                      .id ? (
                      <>
                        {pedido.quantidade > 0 ? (
                          <p>
                            x{pedido.quantidade}{" "}
                            {
                              cardapio.find(
                                (option) => option.id === Number(pedido.id)
                              ).name
                            }
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p>Item Excluido</p>
                    )}
                  </>
                ))
              ) : (
                <p>Item Excluido</p>
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
          </Descriptions>
        </div>
      ))}
    </>
  );
}
