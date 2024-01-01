import {
  Badge,
  Button,
  Descriptions,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tabs,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getBairros,
  postBairros,
  putBairros,
  deleteBairros,
  getEmail,
  postEmail,
  putEmail,
  deleteEmail,
  getPedidosDelivery,
} from "../../services/gerenciamento.ws";
import {
  DeleteOutlined,
  EditOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { getPedidos, postPedidosStatus } from "../../services/Pedidos.ws";
import { getCardapio } from "../../services/cardapio.ws";
import moment from "moment";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase, onValue, ref } from "firebase/database";
import sound from "../../assets/notification.wav";
import soundError from "../../assets/error.wav";

const firebaseConfig = {
  apiKey: "AIzaSyDHuslm5iZZGtOk3ChXKXoIGpQQQI4UaUQ",
  authDomain: "encanto-amapaense.firebaseapp.com",
  projectId: "encanto-amapaense",
  storageBucket: "encanto-amapaense.appspot.com",
  messagingSenderId: "66845466662",
  appId: "1:66845466662:web:6d45a230c3b2ccf49fc6e7",
  measurementId: "G-T9LP3T7QBB",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const service = initializeApp(firebaseConfig);
const database = getDatabase(service);
const mensagensRef = ref(database, "data");
const Gerenciamento = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [idset, setIdset] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [nameEmail, setNameEmail] = useState("");
  const [mail, setMail] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emails, setEmails] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [pedidos_Delivery, setPedidos_Delivery] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const [permissao, setPermissao] = useState(Notification.permission);

  const pedirPermissaoNotificacao = async () => {
    if (!("Notification" in window)) {
      console.error("Este browser não suporta notificações de Desktop");
      return;
    }
    if (permissao === "granted") {
      return;
    } else {
      try {
        const permissaoResult = await Notification.requestPermission();
        setPermissao(permissaoResult);
      } catch (error) {
        console.error("Erro ao solicitar permissão de notificação:", error);
      }
    }
  };

  const enviarNotificacao = (msg) => {
    if (permissao !== "granted") {
      pedirPermissaoNotificacao();
      return;
    } else {
      new Notification(msg);
    }
  };

  const openNotification = (placement, title, notifi, type) => {
    enviarNotificacao(`${title} - ${notifi}`);
    if (type === "success") {
      api.success({
        message: `${title}`,
        description: `${notifi}`,
        placement,
      });
    } else {
      api.error({
        message: `${title}`,
        description: `${notifi}`,
        placement,
      });
    }
  };

  useEffect(() => {
    pedirPermissaoNotificacao();
    onValue(mensagensRef, (snapshot) => {
      const mensagens = snapshot.val();
      let dataMensagem = moment(mensagens.date);
      let agora = moment();
      let diferenca = agora.diff(dataMensagem, "minutes");

      if (
        mensagens.company === "Encanto Amapaense Delivery" &&
        diferenca <= 5
      ) {
        openNotification(
          "topRight",
          mensagens.title,
          mensagens.notification,
          mensagens.type
        );
        getPedido();
        getPedidos_Delivery();
        if (mensagens.type === "success") {
          new Audio(sound).play();
        } else {
          new Audio(soundError).play();
        }
      }
    });
  }, []);

  useEffect(() => {
    getPedido();
    getCardapios();
    getPedidos_Delivery();
  }, []);

  const getPedido = async () => {
    const pedidos = await getPedidos();
    setPedido(pedidos);
  };
  const getCardapios = async () => {
    const cardapio = await getCardapio();
    setCardapio(cardapio);
  };

  useEffect(() => {
    getBairro();
  }, [loading === false]);

  useEffect(() => {
    getEmails();
  }, [loadingEmail === false]);

  async function getPedidos_Delivery() {
    const pedidos = await getPedidosDelivery();
    setPedidos_Delivery(pedidos);
  }
  const getEmails = async () => {
    const response = await getEmail();
    if (response.length === 0) {
    } else {
      setEmails(response);
    }
  };

  const confirmDeleteBairro = async (text) => {
    setLoading(true);
    await deleteBairro(text.id);
    setLoading(false);
    setVisible(false);
  };

  const confirmDeleteEmail = async (text) => {
    setLoadingEmail(true);
    await deleteEmail(text.id);
    setLoadingEmail(false);
    setVisible(false);
  };

  const postEmails = async (type, id) => {
    setLoadingEmail(true);
    const body = {
      id: id,
      type: type.join(","),
    };
    await postEmail(body);
    setLoadingEmail(false);
    message.success("Atualizado com sucesso");
  };

  const putEmails = async () => {
    setLoadingEmail(true);
    const body = {
      id: emails.length + 1,
      type: type.join(","),
      name: nameEmail,
      mail: mail,
      active: true,
    };
    await putEmail(body);
    setLoadingEmail(false);
    clean();
    message.success("Atualizado com sucesso");
  };

  const getBairro = async () => {
    const response = await getBairros();
    setData(response);
  };
  const putBairro = async () => {
    setLoading(true);
    const body = {
      id: data.length + 1,
      name,
      price,
    };
    await putBairros(body);
    setLoading(false);
    clean();
  };

  const postBairro = async () => {
    setLoading(true);
    const body = {
      id: idset,
      name,
      price,
    };
    await postBairros(body);
    setLoading(false);
    clean();
  };

  const deleteBairro = async (id) => {
    setLoading(true);
    await deleteBairros(id);
    setLoading(false);
    setVisible(false);
  };

  const edite = async (text) => {
    setIdset(text.id);
    setName(text.name);
    setPrice(text.price);
    setVisible(true);
  };

  const clean = () => {
    setName("");
    setPrice(0);
    setNameEmail("");
    setMail("");
    setType("");
    setVisibleEmail(false);
    setVisible(false);
    setIdset(null);
  };

  const StatusPedidoFinal = async (id, status) => {
    if (status === "Cancelado") {
      const destinararios = [
        "gabrielsaimo68@gmail.com",
        "Josemaria023182@gmail.com",
        "sraebarbossa@gmail.com",
      ];
      const email = {
        destinatario: destinararios,
        assunto: "Pedido Cancelado",
        corpo: `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Email de Cancelamento</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;background-color:#f5f5f5;}.container{max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1);}h1{color:#333;margin-top:0;}p{margin-bottom:20px;}.signature{margin-top:40px;font-style:italic;color:#888;}</style></head><body><div class='container'><h1>Pedido Cancelado</h1><p>Cancelado por: ${
          JSON.parse(localStorage.getItem("dateUser"))[0].name
        },</p><p>Pedido N° ${id} foi cancelado.</p><p>Motivo do cancelamento:</p><p>${"a"}</p><br><br/><p>Atenciosamente,</p><p><em>Encando Amapaense</em></p></div></body></html>`,
      };
      await postEmail(email).catch((err) => {
        console.log(err);
        return;
      });
    }
    if (status === "Em Preparo") {
      const data = {
        id: id,
        status: status,
        acepted_by: JSON.parse(localStorage.getItem("dateUser"))[0].name,
        acepted_at: new Date(),
        update_at: new Date(),
        update_by: JSON.parse(localStorage.getItem("dateUser"))[0].name,
      };
      await postPedidosStatus(data);
    } else {
      const data = {
        id: id,
        status: status,
        finished_by:
          status === "Pronto" || status === "Cancelado"
            ? JSON.parse(localStorage.getItem("dateUser"))[0].name
            : null,
        finished_at:
          status === "Pronto" || status === "Cancelado" ? new Date() : null,
        update_at: new Date(),
        update_by: JSON.parse(localStorage.getItem("dateUser"))[0].name,
        taxa: 0,
      };
      await postPedidosStatus(data);
    }
    getPedido();
  };

  const StatusPedido = async (data, status, pedido) => {
    StatusPedidoFinal(pedido.id, status);

    getPedido();
    getPedidos_Delivery();
  };

  const columnsBairro = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ações",
      dataIndex: "acoes",
      key: "acoes",
      render: (text, record) => (
        <Space>
          <Button
            style={{ backgroundColor: "yellow" }}
            onClick={() => edite(record)}
          >
            <EditOutlined
              size={24}
              style={{
                borderRadius: 5,
                padding: 5,
                color: "#000",
              }}
            />
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir essa tarefa?"
            onConfirm={() => confirmDeleteBairro(record)}
            okText="Excluir"
            okButtonProps={{ danger: true }}
            cancelText="Cancelar"
          >
            <Button style={{ backgroundColor: "red" }}>
              <DeleteOutlined
                size={24}
                style={{
                  borderRadius: 5,
                  padding: 5,
                  color: "#fff",
                }}
              />
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 200,
    },
  ];

  const columnsEmail = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "Systema",
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <Select
          mode="multiple"
          placeholder="Selecione"
          defaultValue={record.type.split(",") || []}
          onChange={(e) => postEmails(e, record.id)}
        >
          <Select.Option value="Delivery">Delivery</Select.Option>
          <Select.Option value="Venda">Venda</Select.Option>
        </Select>
      ),
    },
    {
      title: "Ações",
      dataIndex: "acoes",
      key: "acoes",
      render: (text, record) => (
        <div>
          <Popconfirm
            title="Tem certeza que deseja excluir esse Email?"
            onConfirm={() => confirmDeleteEmail(record)}
            okText="Excluir"
            okButtonProps={{ danger: true }}
            cancelText="Cancelar"
          >
            <Button style={{ backgroundColor: "red" }}>
              <DeleteOutlined
                size={24}
                style={{
                  borderRadius: 5,
                  padding: 5,
                  color: "#fff",
                }}
              />
            </Button>
          </Popconfirm>
        </div>
      ),
      width: 200,
    },
  ];

  const items = [
    {
      key: "1",
      label: "Delivery",
      children: (
        <div>
          {pedido.map((pedido) => (
            <>
              {pedido.type === "Delivery" ? (
                <div style={{ marginBottom: 10 }}>
                  <Descriptions
                    bordered
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      borderRadius: 10,
                    }}
                    column={{
                      xxl: 2,
                      xl: 3,
                      lg: 2,
                      md: 2,
                      sm: 1,
                      xs: 1,
                    }}
                  >
                    <Descriptions.Item label="N° Pedido">
                      {pedido.id}
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
                      <Button
                        style={{
                          marginLeft: 10,
                          color: "#fff",
                          backgroundColor:
                            pedido.status === "Em Cancelamento"
                              ? "red"
                              : pedido.status === "Cancelado"
                              ? "red"
                              : pedido.status === "Pronto"
                              ? "green"
                              : pedido.status === "Em Preparo"
                              ? "blue"
                              : pedido.status === "Finalizado"
                              ? "grey"
                              : pedido.status === "Em Analize"
                              ? "orange"
                              : "grey",
                        }}
                        disabled={
                          pedido.status === "Finalizado" ||
                          pedido.status === "Recusado"
                            ? true
                            : false
                        }
                        onClick={() =>
                          StatusPedido(
                            pedidos_Delivery,
                            JSON.parse(pedido.info).retirada === "Delivery"
                              ? pedido.status === "Em Analize"
                                ? "Em Preparo"
                                : pedido.status === "Em Preparo"
                                ? "Pronto"
                                : pedido.status === "Pronto"
                                ? "Aguardando Entregador"
                                : pedido.status === "Aguardando Entregador"
                                ? "A Caminho"
                                : pedido.status === "A Caminho"
                                ? "Finalizado"
                                : pedido.status === "Em Cancelamento"
                                ? "Cancelado"
                                : "Recusado"
                              : JSON.parse(pedido.info).retirada === "Local"
                              ? pedido.status === "Em Analize"
                                ? "Em Preparo"
                                : pedido.status === "Em Preparo"
                                ? "Pronto"
                                : pedido.status === "Pronto"
                                ? "Finalizado"
                                : pedido.status === "Finalizado"
                                ? "Finalizado"
                                : pedido.status === "Cancelado"
                                ? "Cancelado"
                                : pedido.status === "Em Cancelamento"
                                ? "Cancelado"
                                : "Recusado"
                              : "Recusado",
                            pedido
                          )
                        }
                      >
                        {JSON.parse(pedido.info).retirada === "Delivery"
                          ? pedido.status === "Em Analize"
                            ? "Aceitar"
                            : pedido.status === "Em Preparo"
                            ? "Pronto"
                            : pedido.status === "Pronto"
                            ? "Aguardando Entregador"
                            : pedido.status === "Aguardando Entregador"
                            ? "A Caminho"
                            : pedido.status === "A Caminho"
                            ? "Finalizado"
                            : pedido.status === "Finalizado"
                            ? "Finalizado"
                            : "Recusado"
                          : JSON.parse(pedido.info).retirada === "Local"
                          ? pedido.status === "Em Analize"
                            ? "Aceitar"
                            : pedido.status === "Em Preparo"
                            ? "Pronto"
                            : pedido.status === "Pronto"
                            ? "Finalizado"
                            : pedido.status === "Finalizado"
                            ? "Finalizado"
                            : pedido.status === "Cancelado"
                            ? "Cancelado"
                            : pedido.status === "Em Cancelamento"
                            ? "Cancelado"
                            : "Recusado"
                          : "Recusado"}
                      </Button>
                      {pedido.status === "Em Analize" ? (
                        <Button
                          style={{
                            marginLeft: 10,
                            color: "#fff",
                            backgroundColor:
                              pedido.status === "Em Analize" ? "red" : "red",
                          }}
                          disabled={
                            pedido.status === "Finalizado" ? true : false
                          }
                          onClick={() =>
                            StatusPedido(pedidos_Delivery, "Recusado", pedido)
                          }
                        >
                          Recusar
                        </Button>
                      ) : null}
                    </Descriptions.Item>
                    {pedido.info !== null ? (
                      <>
                        <Descriptions.Item
                          label={"Tipo " + JSON.parse(pedido.info).retirada}
                          span={1}
                        >
                          <div>{"Nome: " + JSON.parse(pedido.info).nome} </div>
                          <div>
                            {"Telefone: " + JSON.parse(pedido.info).telefone}
                          </div>
                          {JSON.parse(pedido.info).retirada === "Delivery" ? (
                            <>
                              <div>
                                {"Endereço: " +
                                  JSON.parse(pedido.info).endereco}
                              </div>
                              <div>
                                {"Numero: " + JSON.parse(pedido.info).numero}
                              </div>
                              <div>
                                {"Bairro: " + JSON.parse(pedido.info).bairro}
                              </div>
                              <div>
                                {"Complemento: " +
                                  JSON.parse(pedido.info).complemento}
                              </div>
                              <div>
                                {"Referencia: " +
                                  JSON.parse(pedido.info).referencia}
                              </div>
                            </>
                          ) : null}
                        </Descriptions.Item>
                        <Descriptions.Item label="Pagamentos" span={1}>
                          <div>
                            {"Pagamento: " + JSON.parse(pedido.info).pagamento}
                          </div>
                          <div>
                            {" "}
                            {"Frete: " + JSON.parse(pedido.info).frete}
                          </div>
                          <div>{"Total: " + JSON.parse(pedido.info).total}</div>
                          <div>{"Troco: " + JSON.parse(pedido.info).troco}</div>
                        </Descriptions.Item>
                      </>
                    ) : null}
                    <Descriptions.Item label="Pedido" span={2}>
                      {cardapio.length > 0 && pedidos_Delivery.length > 0 ? (
                        pedidos_Delivery.map((pedidos_Delivery) => (
                          <>
                            {pedido.pedidos === pedidos_Delivery.idpedido ? (
                              <>
                                {pedidos_Delivery.qdt > 0 ? (
                                  <p>
                                    x{pedidos_Delivery.qdt}{" "}
                                    {pedidos_Delivery.item}
                                    {pedidos_Delivery.status ===
                                    "Em Cancelamento" ? (
                                      <Button
                                        style={{
                                          marginLeft: 10,
                                          backgroundColor: "red",
                                        }}
                                        type="primary"
                                        onClick={() => {
                                          // setIdPedido(pedido.id);
                                          // setObsCancelamento(pedido.obs_cancel);
                                          //  setModalCancelamento(true);
                                        }}
                                      >
                                        Confimar?
                                      </Button>
                                    ) : null}
                                  </p>
                                ) : null}
                              </>
                            ) : null}
                          </>
                        ))
                      ) : (
                        <p>Carregando...</p>
                      )}
                    </Descriptions.Item>

                    <Descriptions.Item label="Oberservação" span={1}>
                      {pedido.obs}
                    </Descriptions.Item>

                    <Descriptions.Item label="Ações" span={1}>
                      <Button
                        icon={<WhatsAppOutlined />}
                        style={{ backgroundColor: "green", color: "#fff" }}
                        onClick={() => [
                          window.open(
                            `https://api.whatsapp.com/send?phone=55${JSON.parse(
                              pedido.info
                            )
                              .telefone.split(/[^0-9]/g)
                              .join("")}&text=Olá, ${
                              JSON.parse(pedido.info).nome
                            }. Seu pedido N° ${pedido.id} está ${pedido.status}`
                          ),
                          pedido.status === "Recusado"
                            ? StatusPedido(
                                pedidos_Delivery,
                                "Cancelado",
                                pedido
                              )
                            : null,
                        ]}
                      >
                        Cliente
                      </Button>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              ) : null}
            </>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Configurações",
      children: (
        <div>
          <h2>Preços por bairro</h2>
          <Button type="primary" onClick={() => setVisible(true)}>
            Novo
          </Button>
          <Table columns={columnsBairro} dataSource={data} />
          <h2>Emails</h2>
          <Button type="primary" onClick={() => setVisibleEmail(true)}>
            Novo
          </Button>
          <Table columns={columnsEmail} dataSource={emails} />
        </div>
      ),
    },
  ];
  return (
    <div>
      {contextHolder}
      <Tabs defaultActiveKey="1" type="card" items={items} />

      <Modal
        title={idset ? "Editar Bairro" : "Novo Bairro"}
        open={visible}
        okText="Salvar"
        footer={null}
        onCancel={() => clean()}
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
          <Input
            type="text"
            placeholder="Bairro"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Preço</label>
          <Input
            type="number"
            placeholder="R$ 0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            type="primary"
            disabled={name === "" || price === 0}
            onClick={() => (idset === null ? putBairro() : postBairro())}
          >
            Salvar
          </Button>
        </div>
      </Modal>
      <Modal
        title="Novo Email"
        footer={false}
        open={visibleEmail}
        onCancel={() => clean()}
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
          <Input type="text" onChange={(e) => setNameEmail(e.target.value)} />
          <label>Email</label>
          <Input type="email" onChange={(e) => setMail(e.target.value)} />
          <label>Systema</label>
          <Select
            mode="multiple"
            placeholder="Selecione"
            onChange={(e) => setType(e)}
          >
            <Select.Option value="Delivery">Delivery</Select.Option>
            <Select.Option value="Venda">Venda</Select.Option>
          </Select>

          <Button
            type="primary"
            onClick={() => putEmails()}
            disabled={nameEmail === "" || mail === "" || type.length === 0}
          >
            Salvar
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default Gerenciamento;
