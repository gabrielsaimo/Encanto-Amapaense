/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Select,
  Space,
  Collapse,
} from "antd";
import "firebase/database";
import { getUser } from "../../services/user.ws";
import { getCardapio } from "../../services/cardapio.ws";
import {
  deletePedidos,
  getMesas,
  getPedidos,
  getStatusPedido,
  postPedidosStatus,
  postTransferir,
  putPedidos,
  veryfyMesa,
  putMesas,
  valorTotal,
  FinalizarPedido,
  verifyFinalizar,
  deleteMesa,
  postNotification,
} from "../../services/Pedidos.ws";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { postEmail } from "../../services/email.ws";

const { Option } = Select;
const { Panel } = Collapse;
export default function Garçom() {
  // const [dateUser, setDateUser] = useState();
  const [visible, setVisible] = React.useState(true);
  const [showModall, setShowModall] = React.useState(false);
  const [acessable, setAcessable] = React.useState(false);
  const [userNome, setUserNome] = useState("");
  /// const [UserCategoria, setUserCategoria] = useState("");
  const [name, setName] = useState("");
  const [mesa, setMesa] = useState("");
  const [dateMesa, setDateMesa] = useState([]);
  const [obs, setObs] = useState("");
  const [password, setPassword] = useState("");
  const [pedidos, setPedido] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [active, setActive] = useState(false);
  const [dadosFinalizar, setDadosFinalizar] = useState([]);
  const [modalTransferir, setModalTransferir] = useState(false);
  const [dataTransferir, setDataTransferir] = useState([]);
  const [modalCancelamento, setModalCancelamento] = useState(false);
  const [obsCancelamento, setObsCancelamento] = useState("");
  const [modalFinalizar, setModalFinalizar] = useState(false);
  const [valorMesa, setValorMesa] = useState(0);
  const [pedidosTotais, setPedidosTotais] = useState([
    { id: "", quantidade: "1" },
  ]);
  const [idPedido, setIdPedido] = useState();
  const [status, setStatus] = useState();
  const [total, setTotal] = useState(0);
  const [tipoPagamento, setTipoPagamento] = useState(null);
  const [obsFinalizar, setObsFinalizar] = useState(null);
  useEffect(() => {
    getCachedDateUser();
    getCardapios();
    getMesa();
    getPedido();
  }, [active, showModall]);

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

  const DeletarPedido = async (id) => {
    await deletePedidos({
      id: id,
    });
    await postNotification({
      title: "Pedido N°" + id + " " + "Cancelado",
      notification: `Pedido Exluido`,
    });
    setActive(!active);
    window.location.reload();
  };

  const confimerDelete = async (id) => {
    setActive(!active);
    const verify = await getStatusPedido(id);
    if (verify[0].status === "Em Analize") {
      Modal.confirm({
        title: "Deseja excluir o pedido?",
        content: "Ao excluir o pedido não será possivel recupera-lo",
        okText: "Excluir",
        cancelText: "Cancelar",
        okButtonProps: {
          danger: true,
        },
        cancelButtonProps: {
          type: "primary",
        },

        onOk: () => DeletarPedido(id),
      });
    } else {
      Modal.error({
        title: "Pedido não pode ser excluido",
        content: "Pedido diferente de Em analize não pode ser excluido",
      });
    }
  };

  const GetUsuario = async () => {
    const data = { name: name, password: password };

    const UserCollection = await getUser(data);

    if (UserCollection.length > 0) {
      setUserNome(UserCollection[0].name);
      //  setUserCategoria(UserCollection[0].categoria);
      // Armazenar o valor no localStorage
      localStorage.setItem("dateUser", JSON.stringify(UserCollection));

      //  setDateUser(UserCollection);
      if (UserCollection[0].active === false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        UserCollection[0].categoria === "ADM" ||
        UserCollection[0].categoria === "Gerência" ||
        UserCollection[0].categoria === "Garçom"
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
      // setDateUser(JSON.parse(cachedData));
      setUserNome(JSON.parse(cachedData)[0].name);
      //  setUserCategoria(JSON.parse(cachedData)[0].categoria);
      if (JSON.parse(cachedData)[0].active === false) {
        alert("Usuário desativado");
        setAcessable(false);
      } else if (
        JSON.parse(cachedData)[0].categoria === "ADM" ||
        JSON.parse(cachedData)[0].categoria === "Gerência" ||
        JSON.parse(cachedData)[0].categoria === "Garçom"
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
    Modal.destroyAll();
    setShowModall(false);
    clear();
  };
  const open = () => {
    setVisible(true);
  };

  const logout = () => {
    localStorage.removeItem("dateUser");
    setAcessable(false);
    //   setDateUser(null);
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
    setPedidosTotais([...pedidosTotais, { id: "", quantidade: "1" }]);
  };

  const removerPedido = (index) => {
    const newPedidos = [...pedidosTotais];
    newPedidos.splice(index, 1);
    setPedidosTotais(newPedidos);
  };

  const cancelarPedido = async (id) => {
    const data = {
      id: id,
      status: "Em Cancelamento",
      update_at: new Date(),
      update_by: userNome,
      obs_cancel: ` 
      ${obsCancelamento} 
      Status : ${status} 
      by : ${userNome}
      `,
    };

    await postNotification({
      title: "Pedido N°" + id + " " + "Em Cancelamento",
      notification: `por: ${userNome}`,
    });
    postPedidosStatus(data);
    setObsCancelamento("");
    setActive(!active);
  };

  const statusPedido = (id, status) => {
    const data = {
      id: id,
      status: status,
      finished_by: status === "Finalizado" ? userNome : null,
      finished_at: status === "Finalizado" ? new Date() : null,
      update_at: new Date(),
      update_by: userNome,
    };
    postPedidosStatus(data);
    setActive(!active);
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

  async function tranferirPedido() {
    const verifyMessa = await veryfyMesa(mesa);
    if (verifyMessa.length > 0) {
      await postTransferir({
        id: dataTransferir.id,
        id_mesa: verifyMessa[0].id,
        mesa: mesa,
        update_at: new Date(),
        update_by: userNome,
      });
      setModalCancelamento(false);
      clear();
      setActive(!active);
    } else {
      const idMesa = Math.floor(Math.random() * 100000000);

      await putMesas({
        created_at: new Date(),
        created_by: userNome,
        nm_mesa: mesa,
        id: idMesa,
        status: "Aberto",
        update_at: new Date(),
        update_by: userNome,
      });

      await postTransferir({
        id: dataTransferir.id,
        id_mesa: idMesa,
        mesa: mesa,
        update_at: new Date(),
        update_by: userNome,
      });
      setModalCancelamento(false);
      clear();
      setActive(!active);
    }
    window.location.reload();
  }

  async function enviarPedido() {
    const verifyMessa = await veryfyMesa(mesa);
    const random = Math.floor(Math.random() * 100000000);

    if (verifyMessa.length > 0) {
      await putPedidos({
        id: random,
        created_at: new Date(),
        created_by: userNome,
        mesa,
        pedidos: JSON.stringify(pedidosTotais),
        obs,
        id_mesa: verifyMessa[0].id,
        status: "Em Analize",
        valor: total,
        update_at: new Date(),
        update_by: userNome,
      });
      setShowModall(false);
      setActive(!active);
      clear();
    } else {
      const idMesa = random;

      await putMesas({
        created_at: new Date(),
        created_by: userNome,
        nm_mesa: mesa,
        id: idMesa,
        status: "Aberto",
        update_at: new Date(),
        update_by: userNome,
      });

      await putPedidos({
        id: random,
        created_at: new Date(),
        created_by: userNome,
        mesa,
        pedidos: JSON.stringify(pedidosTotais),
        obs,
        id_mesa: idMesa,
        status: "Em Analize",
        valor: total,
        update_at: new Date(),
        update_by: userNome,
      });
      setShowModall(false);
      setActive(!active);
      clear();
    }
    await postNotification({
      title: "Novo Pedido N°" + random,
      notification: `Novo pedido na mesa ${mesa}`,
    });
  }
  function clear() {
    setMesa("");
    setPedidosTotais([{ id: "", quantidade: "1" }]);
    setObs("");
    setTipoPagamento(null);
    setObsFinalizar(null);
    setObsCancelamento("");
  }

  const finalmesa = async (itemMesa) => {
    setTipoPagamento(null);
    setObsFinalizar(null);
    const valor = await valorTotal(itemMesa.id);
    setValorMesa(valor[0].valor);
    setModalFinalizar(true);
    setDadosFinalizar(itemMesa);
    clear();
  };

  const finalizarMesa = async () => {
    const verify = await verifyFinalizar(dadosFinalizar.id);
    if (verify.length > 0) {
      Modal.error({
        title: "Mesa não pode ser finalizada",
        content: "Mesa com pedidos em aberto",
      });
    } else if (valorMesa > 0) {
      const destinararios = [
        "gabrielsaimo68@gmail.com",
        "Josemaria023182@gmail.com",
        "sraebarbossa@gmail.com",
      ];
      const email = {
        destinatario: destinararios,
        assunto: "Pedido Cancelado",
        corpo: `
        O pedido ${dadosFinalizar.id} foi Finalizado por ${userNome}.

        Observações: ${obsFinalizar}

        Tipo de Pagamento: ${tipoPagamento}
        Valor: R$ ${valorMesa}

        Atenciosamente,
        Encando Amapaense`,
      };
      await postEmail(email);
      await FinalizarPedido({
        id: dadosFinalizar.id,
        closed_by: userNome,
        closed_at: new Date(),
        obs: obsFinalizar,
        tipo_pagamento: tipoPagamento,
        valor: valorMesa,
        taxa: parseInt(valorMesa) * 0.1,
        valorTotal: parseInt(valorMesa) + parseInt(valorMesa) * 0.1,
      });
      setModalFinalizar(false);
      setActive(!active);
      clear();
    } else {
      Modal.error({
        title: "Mesa não pode ser finalizada",
        content: "Mesa sem pedidos",
      });
    }
  };

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
                title={"Mesa " + itemMesa.nm_mesa}
                extra={<h4>Por: {itemMesa.created_by}</h4>}
                style={{ width: "100%", marginTop: 16, marginBottom: 16 }}
                key={index}
              >
                {pedidos.map((item, index) => (
                  <>
                    {itemMesa.id === item.id_mesa ? (
                      <Collapse>
                        <Panel
                          onClick={() => setActive(!active)}
                          header={item.status}
                          key={index}
                          style={{
                            marginBottom: 10,
                            backgroundColor:
                              item.status === "Em Analize"
                                ? "#ff8800"
                                : item.status === "Em Preparo"
                                ? "#0a4bff"
                                : item.status === "Pronto"
                                ? "#00ff00"
                                : item.status === "Em Cancelamento"
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
                                  {pedido.id ===
                                  cardapio.find(
                                    (option) => option.id === Number(pedido.id)
                                  ).id ? (
                                    <>
                                      {pedido.quantidade > 0 ? (
                                        <p>
                                          x{pedido.quantidade}
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
                          <p>Observações: {item.obs}</p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {item.status !== "Em Cancelamento" ? (
                              <Button
                                type="primary"
                                style={{ marginRight: 10 }}
                                onClick={() => [
                                  setDataTransferir(item),
                                  setModalTransferir(!modalTransferir),
                                ]}
                              >
                                Trasferir
                              </Button>
                            ) : null}
                            {item.status === "Pronto" ? (
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
                            ) : null}
                            <>
                              {item.status !== "Em Cancelamento" &&
                              item.status !== "Em Analize" ? (
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

                              {item.status === "Em Analize" ? (
                                <Button
                                  type="primary"
                                  onClick={() => confimerDelete(item.id)}
                                  style={{
                                    marginRight: 10,
                                    backgroundColor: "#FF0000",
                                    color: "#FFFFFF",
                                  }}
                                  icon={<DeleteOutlined />}
                                />
                              ) : null}
                            </>
                          </div>
                        </Panel>
                      </Collapse>
                    ) : null}
                  </>
                ))}
                <div style={{ float: "right" }}>
                  <Button type="primary" onClick={() => finalmesa(itemMesa)}>
                    Finalizar Messa
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <Modal
            open={showModall}
            onCancel={() => close()}
            okText="Enviar Pedido"
            cancelText="Cancelar"
            okButtonProps={{
              disabled: total === 0 || mesa === "",
            }}
            onOk={() => enviarPedido()}
          >
            <div className="container">
              <h2 className="title">Adicionar Pedidos</h2>
              <h3>Mesa</h3>
              <div>
                <Input
                  type="number"
                  value={mesa}
                  style={{ width: 100 }}
                  min={1}
                  onChange={(event) => setMesa(event.target.value)}
                />
              </div>

              {pedidosTotais.map((pedido, index) => (
                <div
                  key={index}
                  className="pedido-container"
                  style={{ marginBottom: 10 }}
                >
                  <h3>
                    Pedido {index + 1}
                    <Button
                      style={{ backgroundColor: "#FF0000", color: "#FFF" }}
                      onClick={() => removerPedido(index)}
                      icon={<DeleteOutlined />}
                    />
                  </h3>

                  <Space>
                    <Select
                      showSearch
                      style={{ width: 250 }}
                      placeholder="Selecione um item"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={(value) =>
                        handlePedidoChange(index, "id", value)
                      }
                      value={pedido.id}
                    >
                      <Option value="">Selecione um item</Option>
                      {cardapio.map((option) => (
                        <Option key={option.id} value={option.id}>
                          {option.id} - {option.name}
                        </Option>
                      ))}
                    </Select>
                    <Input
                      style={{ width: 62 }}
                      type="number"
                      value={pedido.quantidade}
                      prefix="x"
                      min={1}
                      max={99}
                      onChange={(event) =>
                        handlePedidoChange(
                          index,
                          "quantidade",
                          event.target.value
                        )
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
                <label>Valor</label>
                <Input prefix="R$" value={total} readOnly />
              </div>
              <div>
                <label>Taxa de serviço</label>
                <Input
                  prefix="R$"
                  value={(parseInt(total) * 0.1).toFixed(2)}
                  readOnly
                />
              </div>
              <Divider />
              <div style={{ marginBottom: 10 }}>
                <lavel>Valor Total</lavel>
                <Input
                  prefix="R$"
                  value={(parseInt(total) + parseInt(total) * 0.1).toFixed(2)}
                  readOnly
                />
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
          <Modal
            open={modalTransferir}
            okText="Tranferir"
            onCancel={() => setModalTransferir(!modalTransferir)}
            okButtonProps={{
              disabled: mesa === "" || mesa === dataTransferir.mesa,
            }}
            onOk={() => [
              tranferirPedido(),
              setActive(!active),
              setModalTransferir(false),
              clear(),
            ]}
          >
            <div className="container">
              <h2 className="title">Transferir Pedido</h2>
              <div style={{ marginBottom: 10 }}>
                <label>Mesa {dataTransferir.mesa} para :</label>
                <Input
                  style={{ width: 100 }}
                  type="number"
                  min={1}
                  onChange={(event) => setMesa(event.target.value)}
                />
              </div>
            </div>
          </Modal>
          <Modal
            open={modalFinalizar}
            onCancel={() => setModalFinalizar(false)}
            cancelText="Voltar"
            okText={valorMesa > 0 ? "Finalizar" : "Excluir"}
            okType={valorMesa > 0 ? "primary" : "danger"}
            okButtonProps={{
              disabled: tipoPagamento === null && valorMesa > 0,
            }}
            onOk={() =>
              valorMesa > 0
                ? finalizarMesa()
                : [deleteMesa(dadosFinalizar.id), window.location.reload()]
            }
          >
            <div className="container">
              <h2 className="title">Finalizar Pedido</h2>
              <div style={{ marginBottom: 10 }}>
                <label>Valor</label>
                <Input
                  prefix="R$"
                  value={valorMesa > 0 ? valorMesa : 0}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Taxa de serviço</label>
                <Input
                  prefix="R$"
                  value={valorMesa > 0 ? parseInt(valorMesa) * 0.1 : 0}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <lavel>Valor Total</lavel>
                <Input
                  prefix="R$"
                  value={
                    valorMesa > 0
                      ? (
                          parseInt(valorMesa) +
                          parseInt(valorMesa) * 0.1
                        ).toFixed(2)
                      : 0
                  }
                  readOnly
                />
              </div>
              <Space direction="vertical">
                <Select
                  style={{ width: 250 }}
                  value={tipoPagamento}
                  placeholder="Tipo de Pagamento"
                  onChange={(event) => setTipoPagamento(event)}
                >
                  <Option value="PIX">Pix</Option>
                  <Option value="Dinheiro">Dinheiro</Option>
                  <Option value="Crédito">Crédito</Option>
                  <Option value="Débito">Débito</Option>
                  <Option value="Cortesia">Cortesia</Option>
                </Select>
                <TextArea
                  rows={3}
                  placeholder="Observações"
                  value={obsFinalizar}
                  onChange={(event) => setObsFinalizar(event.target.value)}
                />
              </Space>
            </div>
          </Modal>
        </div>
      )}
    </Card>
  );
}
