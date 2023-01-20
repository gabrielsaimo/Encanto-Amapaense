import { Badge, Descriptions } from "antd";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function Pedidos(atualizar) {
  const data = new Date();
  const hora = data.getHours();
  const dataFormatada =
    hora + ":" + data.getMinutes() + ":" + data.getSeconds();
  const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDHuslm5iZZGtOk3ChXKXoIGpQQQI4UaUQ",
    authDomain: "encanto-amapaense.firebaseapp.com",
    projectId: "encanto-amapaense",
    storageBucket: "encanto-amapaense.appspot.com",
    messagingSenderId: "66845466662",
    appId: "1:66845466662:web:6d45a230c3b2ccf49fc6e7",
    measurementId: "G-T9LP3T7QBB",
  });
  const db = getFirestore(firebaseConfig);
  const [pedidos, setPedido] = useState([]);
  const colletionRefPedido = collection(db, "pedidos");
  const colletionRefListaPedido = collection(db, "listaPedidos");
  const [listapedidos, setListaPedido] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getPedido = async () => {
      const Collection = await getDocs(colletionRefPedido);
      const pedido = Collection.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setPedido(pedido.sort((a, b) => b.id - a.id));
    };
    getPedido();
    const getListaPedido = async () => {
      const Collection = await getDocs(colletionRefListaPedido);
      const listapedido = Collection.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setListaPedido(listapedido.sort((a, b) => b.id - a.id));
    };
    getListaPedido();
    const interval = setInterval(() => {
      setCount(count + 1);
      getPedido();
      getListaPedido();
    }, 10000);

    return () => clearInterval(interval);
  }, [atualizar]);

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
            <Descriptions.Item label="N° Pedido">
              {pedido.pedido}
            </Descriptions.Item>
            <Descriptions.Item label="Mesa">{pedido.mesa}</Descriptions.Item>
            <Descriptions.Item label="Hora do pedido">
              12:33:37
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge
                status={
                  pedido.status === "Pendente"
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
              {listapedidos.map((listapedido) => (
                <div>
                  {listapedido.n_pedido === pedido.pedido ? (
                    <div>
                      <p>
                        {listapedido.qdt}x {listapedido.pedido}
                      </p>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ))}
    </>
  );
}
