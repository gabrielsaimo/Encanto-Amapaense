import { Badge, Button, Card, Descriptions, Divider, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { service } from "../../services/firebase.ws";
import { getPedidos, postPedidosStatus } from "../../services/Pedidos.ws";
import { getCardapio } from "../../services/cardapio.ws";
import { getUser } from "../../services/user.ws";
import { postEmail } from "../../services/email.ws";
import moment from "moment/moment";
export default function Cozinha() {
  const data = new Date();

  const hora = data.getHours();
  const dataFormatada =
    hora + ":" + data.getMinutes() + ":" + data.getSeconds();

  const [pedidos, setPedido] = useState([]);
  const [count, setCount] = useState(0);
  const [cardapio, setCardapio] = useState([]);
  const [acessable, setAcessable] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dateUser, setDateUser] = React.useState();
  const [userNome, setUserNome] = React.useState("");
  const [UserCategoria, setUserCategoria] = React.useState("");
  const [modalCancelamento, setModalCancelamento] = React.useState(false);
  const [idPedido, setIdPedido] = React.useState("");
  const [obsCancelamento, setObsCancelamento] = React.useState("");
  useEffect(() => {
    getPedido();
    const interval = setInterval(() => {
      setCount(count + 1);
      getPedido();
    }, 60000);

    return () => clearInterval(interval);
  }, [modalCancelamento]);
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

  const open = () => {
    setVisible(true);
  };
  const acessar = () => {
    GetUsuario();
  };

  const StatusPedido = async (id, status) => {
    const data = {
      id: id,
      status: status,
      acepted_by: status == "Em Preparo" ? userNome : null,
      acepted_at: status == "Em Preparo" ? new Date() : null,
      finished_by:
        status == "Pronto" || status == "Cancelado" ? userNome : null,
      finished_at:
        status == "Pronto" || status == "Cancelado" ? new Date() : null,
      update_at: new Date(),
    };
    if (status == "Cancelado") {
      const destinararios = [
        "gabrielsaimo68@gmail.com",
        "Josemaria023182@gmail.com",
      ];
      const email = {
        destinatario: destinararios,
        assunto: "Pedido Cancelado",
        corpo: `Olá,

        O pedido ${id} foi cancelado por ${userNome}.

        motivo do cancelamento: 
        ${obsCancelamento}.
        
        Atenciosamente,
        Encando Amapaense`,
      };
      await postEmail(email);
    }
    await postPedidosStatus(data);
    getPedido();
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
        UserCollection[0].categoria == "Cozinha"
      ) {
        setAcessable(true);
      } else {
        alert("Usuário não tem permissão");
        setAcessable(false);
      }
    } else {
      alert("Senha incorreta");
    }
  };
  const logout = () => {
    localStorage.removeItem("dateUser");
    setAcessable(false);
    setDateUser(null);
  };

  const confirmarCancelamento = () => {
    setModalCancelamento(false);
    StatusPedido(idPedido, "Cancelado");
    setObsCancelamento("");
  };

  return (
    <Card>
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
        <Card>
          {userNome}
          <div style={{ float: "right" }}>
            <Button onClick={() => logout()}>Sair</Button>
          </div>

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
                  {pedido.id}
                </Descriptions.Item>
                <Descriptions.Item label="Mesa">
                  {pedido.mesa}
                </Descriptions.Item>
                <Descriptions.Item label="Hora do pedido">
                  {moment(pedido.created_at).format("HH:mm:ss")}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Badge
                    status={
                      pedido.status === "Em Analize"
                        ? "warning"
                        : pedido.status === "Cancelado"
                        ? "error"
                        : pedido.status === "Em Cancelamento"
                        ? "error"
                        : pedido.status === "Pronto"
                        ? "success"
                        : pedido.status === "Em Preparo"
                        ? "processing"
                        : "default"
                    }
                    text={pedido.status}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Pedido" span={2}>
                  {cardapio.length > 0
                    ? JSON.parse(pedido.pedidos).map((pedido) => (
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
                          ) : null}
                        </>
                      ))
                    : null}
                </Descriptions.Item>
                <Descriptions.Item label="Oberservação" span={1}>
                  {pedido.obs}
                </Descriptions.Item>

                <Descriptions.Item label="Ações">
                  {pedido.status !== "Cancelado" &&
                  pedido.status !== "Em Cancelamento" &&
                  pedido.status !== "Pronto" ? (
                    <Button
                      onClick={() => {
                        StatusPedido(
                          pedido.id,
                          pedido.status === "Em Analize"
                            ? "Em Preparo"
                            : pedido.status === "Em Preparo"
                            ? "Pronto"
                            : "Finalizado"
                        );
                      }}
                      type="primary"
                      style={{
                        marginLeft: 10,
                        backgroundColor:
                          pedido.status === "Em Analize"
                            ? "orange"
                            : pedido.status === "Em Preparo"
                            ? "green"
                            : "purple",
                      }}
                    >
                      {pedido.status === "Em Analize"
                        ? "Em Preparo"
                        : pedido.status === "Em Preparo"
                        ? "Finalizar"
                        : "Finalizar"}
                    </Button>
                  ) : null}
                  {pedido.status === "Em Cancelamento" ? (
                    <Button
                      style={{ marginLeft: 10, backgroundColor: "red" }}
                      type="primary"
                      onClick={() => {
                        setIdPedido(pedido.id);
                        setObsCancelamento(pedido.obs_cancel);
                        setModalCancelamento(true);
                        //  StatusPedido(pedido.id, "Cancelado");
                      }}
                    >
                      Confimar Cancelamento
                    </Button>
                  ) : null}
                  {pedido.status === "Pronto" ? (
                    <Button type="danger">Pronto!</Button>
                  ) : null}
                </Descriptions.Item>
              </Descriptions>
            </div>
          ))}
          <Modal
            title="Motivo do Cancelamento"
            open={modalCancelamento}
            okType="danger"
            okText="Cancelar Pedido"
            onOk={() => {
              confirmarCancelamento();
            }}
            cancelButtonProps={{ style: { display: "none" } }}
            onCancel={() => setModalCancelamento(false)}
          >
            <h3>{obsCancelamento}</h3>
          </Modal>
        </Card>
      )}
    </Card>
  );
}
