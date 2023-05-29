import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
} from "antd";
import "firebase/database";
import Dashboard from "../modules/Dasboard";
import Menssagem from "../modules/Menssagem";
import Pedidos from "../modules/Pedidos";
import { getUser } from "../../services/user.ws";
import { getCardapio } from "../../services/cardapio.ws";
import { getPedidos, putPedidos } from "../../services/Pedidos.ws";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

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
  const [price, setPrice] = useState("");
  const [mesa, setMesa] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [obs, setObs] = useState("");
  const [password, setPassword] = useState("");
  const [pedidos, setPedido] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [valor, setValor] = useState(0);
  const [pedidosTotais, setPedidosTotais] = useState([
    { id: "", quantidade: "" },
  ]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getCachedDateUser();
    getPedido();
    getCardapios();
  }, [showModall]);

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
    if (key == 1) {
      setActionCardapio(!actionCardapio);
    } else if (key == 2) {
      setActionMensagem(!actionMensagem);
    } else {
      setActionPedido(!actionPeido);
    }
  };

  const close = () => {
    setShowModall(false);
    clear();
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

  async function enviarPedido() {
    await putPedidos({
      id: pedidos.length + 1,
      created_at: new Date(),
      created_by: userNome,
      desconto,
      mesa,
      pedidos: JSON.stringify(pedidosTotais),
      obs,
      status: "Em Analize",
      valor: total,
      update_at: new Date(),
      update_by: userNome,
    });
    setShowModall(false);
    clear();
  }
  function clear() {
    setMesa("");
    setPedidosTotais([{ id: "", quantidade: "" }]);
    setDesconto(0);
    setObs("");
  }

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
          <div style={{ margin: 10 }}>
            {userNome}
            <div style={{ float: "right" }}>
              <Button onClick={() => logout()}>Sair</Button>
            </div>
          </div>
          <div>
            <Button type="primary" onClick={() => showModal()}>
              Novo Pedido
            </Button>
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

                {JSON.parse(item.pedidos).map((pedido) => (
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
                ))}
                <p>Valor: R$ {item.valor}</p>
                <p>Desconto: R$ {item.desconto}</p>
                <p>Observações: {item.obs}</p>
              </Card>
            ))}
          </div>
          <Modal
            open={showModall}
            onCancel={() => close()}
            okText="Enviar Pedido"
            cancelText="Cancelar"
            okButtonProps={{ disabled: total - desconto === 0 || mesa === '' }}
            onOk={() => enviarPedido()}
          >
            <div className="container">
              <h2 className="title">Adicionar Pedidos</h2>
              <h3>Mesa</h3>
              <div>
                <InputNumber
                  value={mesa}
                  style={{ width: 100 }}
                  min={1}
                  onChange={(event) => setMesa(event)}
                />
              </div>

              {pedidosTotais.map((pedido, index) => (
                <div
                  key={index}
                  className="pedido-container"
                  style={{ marginBottom: 10 }}
                >
                  <h3>Pedido {index + 1}</h3>

                  <Space>
                    <Select
                      value={pedido.id}
                      showSearch
                      style={{ width: 200 }}
                      onChange={(value) =>
                        handlePedidoChange(index, "id", value)
                      }
                    >
                      <Option value="">Selecione um item</Option>
                      {cardapio.map((option) => (
                        <Option key={option.id} value={option.id}>
                          {option.id} - {option.name}
                        </Option>
                      ))}
                    </Select>
                    <InputNumber
                      value={pedido.quantidade}
                      style={{ width: 100 }}
                      prefix="x"
                      min={1}
                      defaultValue={0}
                      onChange={(event) =>
                        handlePedidoChange(index, "quantidade", event)
                      }
                    />
                    <Button onClick={() => removerPedido(index)}>
                      Excluir
                    </Button>
                  </Space>
                </div>
              ))}
              <Button
                type="primary"
                style={{ marginBottom: 10 }}
                icon={<PlusOutlined />}
                onClick={adicionarNovoPedido}
              />
              <div style={{ marginBottom: 10 }}>
                <label>Desconto</label>
                <Input
                  type="number"
                  value={desconto}
                  min={0}
                  max={total}
                  defaultValue={0}
                  prefix="R$"
                  onChange={(event) => setDesconto(event.target.value)}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Valor Total</label>
                <Input prefix="R$" value={total - desconto} readOnly />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Observações</label>
                <TextArea
                  value={obs}
                  rows={3}
                  onChange={(event) => setObs(event.target.value)}
                />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}
