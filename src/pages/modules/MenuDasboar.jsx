import React, { useEffect, useState, useMemo } from "react";
import {
  BookOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MessageOutlined,
  PieChartOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Input,
  Divider,
  Modal,
  Typography,
} from "antd";
import Relatorios from "./Realatorios";
import Menssagem from "./Menssagem";
import Dashboard from "./Dasboard";
import { getUser } from "../../services/user.ws";
import Pedidos from "./Pedidos";
import Users from "./Users";
const { Header, Sider, Content } = Layout;

const MenuDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [tela, setTela] = useState(1);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [dateUser, setDateUser] = useState();
  const [acessable, setAcessable] = React.useState(false);
  const [userNome, setUserNome] = useState("");
  const [UserCategoria, setUserCategoria] = useState("");
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    getCachedDateUser();
  }, []);

  const cachedContent = useMemo(
    () => ({
      1: <Dashboard atualizar={null} user={dateUser} />,
      2: <Relatorios />,
      3: <Menssagem atualizar={true} user={dateUser} />,
      4: <Pedidos atualizar={true} user={dateUser} />,
      5: <Users atualizar={true} user={dateUser} />,
    }),
    [dateUser]
  );

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
      if (UserCollection[0].active === false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        UserCollection[0].categoria === "ADM" ||
        UserCollection[0].categoria === "Gerência"
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
  const getCachedDateUser = () => {
    const cachedData = localStorage.getItem("dateUser");
    if (cachedData) {
      setDateUser(JSON.parse(cachedData));
      setUserNome(JSON.parse(cachedData)[0].name);
      setUserCategoria(JSON.parse(cachedData)[0].categoria);
      if (JSON.parse(cachedData)[0].active === false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        JSON.parse(cachedData)[0].categoria === "ADM" ||
        JSON.parse(cachedData)[0].categoria === "Gerência"
      ) {
        setAcessable(true);
      } else {
        alert("Usuário não tem permissão");
        setAcessable(false);
      }
    }
    return cachedData ? JSON.parse(cachedData) : null;
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
  return !acessable ? (
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
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
        <Divider />
        <Button onClick={acessar}>Acessar</Button>
      </div>
    </Modal>
  ) : (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#FFF", margin: 10, fontWeight: "bold" }}>
            {userNome} - {UserCategoria}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: "1",
              icon: <BookOutlined />,
              disabled: false,
              label: "Cardápio",
              // eslint-disable-next-line no-dupe-keys
              disabled:
                UserCategoria === "Gerente"
                  ? false
                  : UserCategoria === "ADM"
                  ? false
                  : true,
              onClick: () => {
                setTela(1);
                setCollapsed(true);
              },
            },
            {
              key: "2",
              icon: <PieChartOutlined />,
              label: "Relatorios",
              disabled: UserCategoria === "ADM" ? false : true,
              onClick: () => {
                setTela(2);
                setCollapsed(true);
              },
            },
            {
              key: "3",
              icon: <MessageOutlined />,
              label: "Mensagens",
              onClick: () => {
                setTela(3);
                setCollapsed(true);
              },
            },
            {
              key: "4",
              icon: <TagOutlined />,
              label: "Pedidos",
              onClick: () => {
                setTela(4);
                setCollapsed(true);
              },
            },
            {
              key: "5",
              icon: <UserOutlined />,
              disabled: UserCategoria === "ADM" ? false : true,
              label: "Usuários",
              onClick: () => {
                setTela(5);
                setCollapsed(true);
              },
            },
            {
              key: "6",
              icon: <LogoutOutlined />,
              label: "Sair",
              onClick: () => {
                logout();
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <Button
            icon={collapsed ? <MenuOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              border: "none",
              width: 64,
              height: 64,
            }}
          />

          <Typography.Title
            level={3}
            style={{
              color: "#000",
              margin: 10,
              fontWeight: "bold",
            }}
          >
            {tela === 1
              ? "Cardápio"
              : tela === 2
              ? "Relatórios"
              : tela === 3
              ? "Mensagens"
              : tela === 4
              ? "Pedidos"
              : "Usuários"}
          </Typography.Title>
        </Header>
        <Content
          style={{
            margin: "0px",
            padding: 10,
            background: colorBgContainer,
          }}
        >
          {cachedContent[tela]}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MenuDashboard;
