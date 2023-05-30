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
  Collapse,
} from "antd";
import "firebase/database";
import { getUser } from "../../services/user.ws";
import { getCardapio } from "../../services/cardapio.ws";
import {
  getMesas,
  getPedidos,
  postPedidosStatus,
  putPedidos,
} from "../../services/Pedidos.ws";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const { Panel } = Collapse;
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
  const [mesa, setMesa] = useState("");
  const [dateMesa, setDateMesa] = useState([]);
  const [desconto, setDesconto] = useState(0);
  const [obs, setObs] = useState("");
  const [password, setPassword] = useState("");
  const [pedidos, setPedido] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [active, setActive] = useState(false);
  const [modalCancelamento, setModalCancelamento] = useState(false);
  const [obsCancelamento, setObsCancelamento] = useState("");
  const [pedidosTotais, setPedidosTotais] = useState([
    { id: "", quantidade: "" },
  ]);
  const [idPedido, setIdPedido] = useState();
  const [status, setStatus] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getCachedDateUser();
    getCardapios();
    getMesa();
    getPedido();
  }, [showModall, active]);

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

  const getMesa = async () => {
    const mesas = await getMesas();
    setDateMesa(mesas);
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

  const cancelarPedido = (id) => {
    const data = {
      id: id,
      status: "Em Cancelamento",
      update_at: new Date(),
      update_by: userNome,
      obs_cancel: ` 
      ${obsCancelamento} by : ${userNome}
      Status : ${status} 
      `,
    };
    postPedidosStatus(data);
    setObsCancelamento("");
    setActive(!active);
  };

  const statusPedido = (id, status) => {
    const data = {
      id: id,
      status: status,
      update_at: new Date(),
      update_by: userNome,
    };
    setActive(!active);
    postPedidosStatus(data);
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
      id: Math.floor(Math.random() * 100000000),
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
    <Card
      style={{ backgroundColor: "#707070", height: "100%", minHeight: "99vh" }}
    >
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
          <Card style={{ margin: 10, fontSize: 20 }}>
            {userNome}
            <div style={{ float: "right" }}>
              <Button onClick={() => logout()}>Sair</Button>
            </div>
          </Card>
          <div>
            <Button type="primary" onClick={() => showModal()}>
              Novo Pedido
            </Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {dateMesa.map((itemMesa, index) => (
              <Card
                title={"Messa " + itemMesa.mesa}
                style={{ width: "100%", marginTop: 16, marginBottom: 16 }}
                key={index}
                hoverable={true}
              >
                {pedidos.map((item, index) => (
                  <>
                    {itemMesa.mesa == item.mesa ? (
                      <Collapse>
                        <Panel
                          onClick={() => setActive(!active)}
                          header={item.status}
                          key={index}
                          style={{
                            marginBottom: 10,
                            backgroundColor:
                              item.status == "Em Analize"
                                ? "#ff8800"
                                : item.status == "Em Preparo"
                                ? "#0a4bff"
                                : item.status == "Pronto"
                                ? "#00ff00"
                                : item.status == "Em Cancelamento"
                                ? "#ff0000"
                                : "#000000",
                            color: "#FFFFFF",
                          }}
                        >
                          <p> Status: {item.status}</p>
                          <Card>
                            {cardapio.length > 0 ? (
                              JSON.parse(item.pedidos).map((pedido) => (
                                <>
                                  {pedido.id ==
                                  cardapio.find(
                                    (option) => option.id === Number(pedido.id)
                                  ).id ? (
                                    <>
                                      {pedido.quantidade > 0 ? (
                                        <p>
                                          x{pedido.quantidade}{" "}
                                          {
                                            cardapio.find(
                                              (option) =>
                                                option.id === Number(pedido.id)
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
                          </Card>
                          <p>Valor: R$ {item.valor}</p>
                          <p>Desconto: R$ {item.desconto}</p>
                          <p>Observações: {item.obs}</p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {item.status == "Em Analize" ? (
                              <Button
                                type="primary"
                                onClick={() => console.log(item)}
                                style={{
                                  marginRight: 10,
                                  backgroundColor: "#ffa600",
                                  color: "#FFFFFF",
                                }}
                              >
                                Excluir
                              </Button>
                            ) : null}
                            {item.status == "Pronto" ? (
                              <Button
                                type="primary"
                                onClick={() =>
                                  statusPedido(item.id, "Finalizado")
                                }
                                style={{
                                  marginRight: 10,
                                  backgroundColor: "#00FF00",
                                  color: "#FFFFFF",
                                }}
                              >
                                Finalizar
                              </Button>
                            ) : (
                              <>
                                {item.status !== "Em Cancelamento" ? (
                                  <Button
                                    type="primary"
                                    onClick={() => [
                                      setIdPedido(item.id),
                                      setStatus(item.status),
                                      setModalCancelamento(true),
                                    ]}
                                    style={{
                                      marginRight: 10,
                                      backgroundColor: "#FF0000",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    Cancelar
                                  </Button>
                                ) : null}
                              </>
                            )}
                          </div>
                        </Panel>
                      </Collapse>
                    ) : null}
                  </>
                ))}
              </Card>
            ))}
          </div>
          <Modal
            open={showModall}
            onCancel={() => close()}
            okText="Enviar Pedido"
            cancelText="Cancelar"
            okButtonProps={{
              disabled:
                total - desconto === 0 || mesa === "" || total - desconto < 0,
            }}
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
                  <h3>
                    Pedido {index + 1}{" "}
                    <Button onClick={() => removerPedido(index)}>
                      Excluir
                    </Button>
                  </h3>

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
          <Modal
            open={modalCancelamento}
            onCancel={() => [
              setModalCancelamento(false),
              setObsCancelamento(""),
            ]}
            okText="Pedir Cancelamento"
            okType="danger"
            cancelButtonProps={{ style: { display: "none" } }}
            cancelText="Voltar"
            okButtonProps={{
              disabled: obsCancelamento.length < 3,
            }}
            onOk={() => {
              cancelarPedido(idPedido);
              setModalCancelamento(false);
            }}
          >
            <div className="container">
              <h2 className="title">Cancelar Pedido</h2>
              <div style={{ marginBottom: 10 }}>
                <label>Motivo</label>
                <TextArea
                  value={obsCancelamento}
                  rows={4}
                  onChange={(event) => setObsCancelamento(event.target.value)}
                />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Card>
  );
}
