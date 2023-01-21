import React, { useState } from "react";
import { Button, Divider, Input, Modal, Tabs } from "antd";
import "firebase/database";
import Dashboard from "./modules/Dasboard";
import Menssagem from "./modules/Menssagem";
import Pedidos from "./modules/Pedidos";
import Category from "./modules/Category";

export default function Config() {
  const [actionCardapio, setActionCardapio] = useState(true);
  const [actionMensagem, setActionMensagem] = useState(true);
  const [actionPeido, setActionPedido] = useState(true);
  const senha = "saimolindo";
  const [senhaDigitada, setSenhaDigitada] = React.useState("");
  const [visible, setVisible] = React.useState(true);
  const [acessable, setAcessable] = React.useState(false);
  const acessar = () => {
    if (senhaDigitada === senha) {
      setAcessable(true);
      close();
    } else {
      alert("Senha incorreta");
    }
  };

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

  const close = () => {
    setVisible(false);
  };
  const open = () => {
    setVisible(true);
  };

  const items = [
    {
      key: "1",
      label: "Cardápio",
      children: <Dashboard atualizar={actionCardapio} />,
    },
    {
      key: "2",
      label: "Categoria",
      children: <Category atualizar={actionMensagem} />,
    },
    {
      key: "3",
      label: "Messagens",
      children: <Menssagem atualizar={actionMensagem} />,
    },
    {
      key: "4",
      label: "Pedidos",
      children: <Pedidos atualizar={actionPeido} />,
    },
  ];

  return (
    <>
      {!acessable ? (
        <Modal
          title="Acesso Restrito para Administradores"
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
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
            <Input
              type="password"
              onChange={(e) => setSenhaDigitada(e.target.value)}
            />
            <Divider />
            <Button onClick={acessar}>Acessar</Button>
          </div>
        </Modal>
      ) : (
        <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
          <Tabs onChange={onChange} type="card" items={items} />
        </div>
      )}
    </>
  );
}
