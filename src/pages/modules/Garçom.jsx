import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Input, Modal, Select, Space } from "antd";
import "firebase/database";
import Dashboard from "../modules/Dasboard";
import Menssagem from "../modules/Menssagem";
import Pedidos from "../modules/Pedidos";
import { getUser } from "../../services/user.ws";
import { getCardapio } from "../../services/cardapio.ws";
import { getPedidos } from "../../services/Pedidos.ws";

const { Option } = Select;

const pedidoOptions = [
  { id: 1, name: "agua", price: 5 },
  { id: 2, name: "suco", price: 10 },
];
export default function Garçom() {
  const [actionCardapio, setActionCardapio] = useState(true);
  const [actionMensagem, setActionMensagem] = useState(true);
  const [actionPeido, setActionPedido] = useState(true);
  const [dateUser, setDateUser] = useState();
  const [visible, setVisible] = React.useState(true);
  const [showModall, setShowModall] = React.useState(false);
  const [acessable, setAcessable] = React.useState(false);
  const [userNome, setUserNome] = useState("");
  const [UserCategoria, setUserCategoria] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [pedidos, setPedido] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  console.log("🚀 ~ file: Garçom.jsx:25 ~ Garçom ~ cardapio:", cardapio);
  const [valor, setValor] = useState(0);
  const [pedidosTotais, setPedidosTotais] = useState([
    { id: "", quantidade: "" },
  ]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getCachedDateUser();
    getPedido();
    getCardapios();
  }, []);

  useEffect(() => {
    calcularTotal();
  }, [pedidosTotais]);
  const acessar = () => {
    GetUsuario();
  };
  const getPedido = async () => {
    const pedidos = await getPedidos();
    setPedido(pedidos);
  };
  const getCardapios = async () => {
    const cardapio = await getCardapio();
    setCardapio(cardapio);
  };

  const handleChange = (selectedValues) => {
    let totalValor = 0;

    const selectedItem = cardapio.find((item) => item.id === selectedValues);
    if (selectedItem) {
      totalValor += parseFloat(selectedItem.price);
    }

    setValor(totalValor);
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
        UserCollection[0].categoria == "Gerência" ||
        UserCollection[0].categoria == "Garçom"
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
        JSON.parse(cachedData)[0].categoria == "Gerência" ||
        JSON.parse(cachedData)[0].categoria == "Garçom"
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

  const showModal = () => {
    setShowModall(true);
  };

  const handlePedidoChange = (index, name, value) => {
    const newPedidos = [...pedidosTotais];
    newPedidos[index][name] = value;
    setPedidosTotais(newPedidos);
  };

  const adicionarNovoPedido = () => {
    setPedidosTotais([...pedidosTotais, { id: "", quantidade: "" }]);
  };

  const removerPedido = (index) => {
    const newPedidos = [...pedidosTotais];
    newPedidos.splice(index, 1);
    setPedidosTotais(newPedidos);
  };

  const calcularTotal = () => {
    let newTotal = 0;
    pedidosTotais.forEach((pedido) => {
      const { id, quantidade } = pedido;
      const item = cardapio.find((option) => option.id === Number(id));
      if (item) {
        newTotal += item.price * Number(quantidade);
      }
    });
    setTotal(newTotal);
  };

  const enviarPedido = () => {
    // Lógica para enviar o pedido
    console.log(pedidosTotais);
    console.log(total);
  };

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
            {userNome}
            <div style={{ float: "right" }}>
              <Button onClick={() => logout()}>Sair</Button>
            </div>
          </div>
          <div>
            <Button onClick={() => showModal()}>Adicionar Messa</Button>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {pedidos.map((item) => (
              <Card
                title={"Messa " + item.mesa}
                style={{ width: "100%", marginTop: 16 }}
                key={item.id}
                onClick={() => console.log(item)}
              >
                <p>{item.status}</p>
                <p>Valor: {item.valor}</p>
              </Card>
            ))}
          </div>
          <Modal title="Messa" open={showModall} footer={null}>
            <div className="container">
              <h2 className="title">Adicionar Pedidos</h2>
              {pedidosTotais.map((pedido, index) => (
                <div key={index} className="pedido-container">
                  <Space>
                    <Select
                      value={pedido.id}
                      style={{ width: 200 }}
                      onChange={(value) =>
                        handlePedidoChange(index, "id", value)
                      }
                    >
                      <Option value="">Selecione um item</Option>
                      {cardapio.map((option) => (
                        <Option key={option.id} value={option.id}>
                          {option.name}
                        </Option>
                      ))}
                    </Select>
                    <Input
                      type="number"
                      value={pedido.quantidade}
                      style={{ width: 100 }}
                      onChange={(event) =>
                        handlePedidoChange(
                          index,
                          "quantidade",
                          event.target.value
                        )
                      }
                    />
                    <Button onClick={() => removerPedido(index)}>
                      Excluir
                    </Button>
                  </Space>
                </div>
              ))}
              <Button type="primary" onClick={adicionarNovoPedido}>
                Adicionar novo pedido
              </Button>
              <div className="total-container">
                <Input value={total} readOnly />
              </div>
              <Button type="primary" onClick={enviarPedido}>
                Enviar pedido
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}
