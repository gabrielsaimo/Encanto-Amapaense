import React, { useEffect, useState } from "react";
import { Button, Divider, Input, Modal, Tabs } from "antd";
import "firebase/database";
import Dashboard from "./modules/Dasboard";
import Menssagem from "./modules/Menssagem";
import Pedidos from "./modules/Pedidos";
import { getUser } from "../services/user.ws";

export default function Config() {
  const [actionCardapio, setActionCardapio] = useState(true);
  const [actionMensagem, setActionMensagem] = useState(true);
  const [actionPeido, setActionPedido] = useState(true);
  const [dateUser, setDateUser] = useState();
  const [visible, setVisible] = React.useState(true);
  const [acessable, setAcessable] = React.useState(false);
  const [userNome, setUserNome] = useState("");
  const [UserCategoria, setUserCategoria] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getCachedDateUser();
  }, []);

  const acessar = () => {
    GetUsuario();
  };

  const GetUsuario = async () => {
    const data = { name: name, password: password };

    const UserCollection = await getUser(data);

    if (UserCollection.length > 0) {
      setUserNome(UserCollection[0].name);
      setUserCategoria(UserCollection[0].categoria);
      // Armazenar o valor no localStorage
      localStorage.setItem("dateUser", JSON.stringify(UserCollection));

      setDateUser(UserCollection);
      if (UserCollection[0].active == false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        UserCollection[0].categoria == "ADM" ||
        UserCollection[0].categoria == "Gerência"
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
      setDateUser(JSON.parse(cachedData));
      setUserNome(JSON.parse(cachedData)[0].name);
      setUserCategoria(JSON.parse(cachedData)[0].categoria);
      if (JSON.parse(cachedData)[0].active == false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        JSON.parse(cachedData)[0].categoria == "ADM" ||
        JSON.parse(cachedData)[0].categoria == "Gerência"
      ) {
        setAcessable(true);
      } else {
        alert("Usuário não tem permissão");
        setAcessable(false);
      }
    }
    return cachedData ? JSON.parse(cachedData) : null;
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

  const logout = () => {
    localStorage.removeItem("dateUser");
    setAcessable(false);
    setDateUser(null);
  };

  const items = [
    {
      key: "1",
      label: "Cardápio",
      children: <Dashboard atualizar={actionCardapio} user={dateUser} />,
    },
    {
      key: "2",
      label: "Messagens",
      children: <Menssagem atualizar={actionMensagem} user={dateUser} />,
    },
    {
      key: "3",
      label: "Pedidos",
      disabled: false,
      children: <Pedidos atualizar={actionPeido} user={dateUser} />,
    },
  ];

  return (
    <>
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
        <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
          <div>
            {userNome} - {UserCategoria}
            <div style={{ float: "right" }}>
              <Button onClick={() => logout()}>Sair</Button>
            </div>
          </div>

          <Tabs onChange={onChange} key={items} type="card" items={items} />
        </div>
      )}
    </>
  );
}
