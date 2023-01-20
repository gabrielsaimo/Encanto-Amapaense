import React, { useState } from "react";
import { Tabs } from "antd";
import "firebase/database";
import Dashboard from "./modules/Dasboard";
import Menssagem from "./modules/Menssagem";
import Pedidos from "./modules/Pedidos";

export default function Config() {
  const [actionCardapio, setActionCardapio] = useState(true);
  const [actionMensagem, setActionMensagem] = useState(true);
  const [actionPeido, setActionPedido] = useState(true);

  const onChange = (key) => {
    console.log(key);
    if (key == 1) {
      setActionCardapio(!actionCardapio);
    } else if (key == 2) {
      setActionMensagem(!actionMensagem);
    } else {
      setActionPedido(!actionPeido);
    }
  };

  const items = [
    {
      key: "1",
      label: "Cardápio",
      children: <Dashboard atualizar={actionCardapio} />,
    },
    {
      key: "2",
      label: "Messagens",
      children: <Menssagem atualizar={actionMensagem} />,
    },
    {
      key: "3",
      label: "Pedidos",
      children: <Pedidos atualizar={actionPeido} />,
    },
  ];

  return (
    <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
      <Tabs onChange={onChange} type="card" items={items} />
    </div>
  );
}
