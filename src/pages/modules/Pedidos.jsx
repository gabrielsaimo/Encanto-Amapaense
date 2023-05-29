import { Badge, Descriptions } from "antd";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { service } from "../../services/firebase.ws";
import { getPedidos } from "../../services/Pedidos.ws";
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
                    ? "processing"
                    : pedido.status === "Cancelado"
                    ? "error"
                    : pedido.status === "Finalizado"
                    ? "success"
                    : pedido.status === "Atrazado"
                    ? "warning"
                    : "default"
                }
                text={pedido.status}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Valor do Pedido">
              R$ {pedido.valor},00
            </Descriptions.Item>
            <Descriptions.Item label="Desconto">
              R$ {pedido.desconto},00
            </Descriptions.Item>

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
                      <p>
                        x{pedido.quantidade}{" "}
                        {
                          cardapio.find(
                            (option) => option.id === Number(pedido.id)
                          ).name
                        }
                      </p>
                    ) : (
                      <p>Item Excluido</p>
                    )}
                  </>
                ))
              ) : (
                <p>Item Excluido</p>
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ))}
    </>
  );
}
