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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getPedidos } from "../../services/Pedidos.ws";
import { getCardapio } from "../../services/cardapio.ws";
import moment from "moment";

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

  const StatusPedido = async (data, status, pedido) => {
    const dataPedido = {
      id: data.id,
      status: status,
      acepted_by: JSON.parse(localStorage.getItem("dateUser"))[0].name,
      acepted_at: new Date(),
      update_at: new Date(),
      update_by: JSON.parse(localStorage.getItem("dateUser"))[0].name,
    };
    console.log(
      "🚀 ~ file: Gerenciamento.jsx:184 ~ StatusPedido ~ dataPedido:",
      dataPedido
    );

    /*  await postPedidostatus(dataPedido);

    const returnVerify = await veryfyStatusPedidos(pedido.pedidos);
    if (returnVerify.length === 1) {
      StatusPedidoFinal(pedido.id, status);
    }
    getPedido();*/
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
                </Descriptions.Item>
                {pedido.info !== null ? (
                  <>
                    <Descriptions.Item
                      label={"Tipo " + JSON.parse(pedido.info).retirada}
                      span={1}
                    >
                      <div>{"Nome: " + JSON.parse(pedido.info).nome} </div>
                      <div>
                        {"Telefone: " + JSON.parse(pedido.info).telefone}{" "}
                      </div>
                      <div>
                        {"Endereço: " + JSON.parse(pedido.info).endereco}{" "}
                      </div>
                      <div>{"Numero: " + JSON.parse(pedido.info).numero} </div>
                      <div>{"Bairro: " + JSON.parse(pedido.info).bairro} </div>
                      <div>
                        {"Complemento: " + JSON.parse(pedido.info).complemento}{" "}
                      </div>
                      <div>
                        {"Referencia: " + JSON.parse(pedido.info).referencia}
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Pagamentos" span={1}>
                      <div>
                        {"Pagamento: " + JSON.parse(pedido.info).pagamento}
                      </div>
                      <div> {"Frete: " + JSON.parse(pedido.info).frete}</div>
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
                                x{pedidos_Delivery.qdt} {pedidos_Delivery.item}
                                {pedidos_Delivery.categoria !== "Bebidas" &&
                                pedidos_Delivery.categoria !==
                                  "Sucos exóticos" &&
                                pedidos_Delivery.categoria !== "Drinks" &&
                                pedidos_Delivery.categoria !== "Cerveja" ? (
                                  pedidos_Delivery.status !== "Cancelado" &&
                                  pedidos_Delivery.status !== "Finalizado" &&
                                  pedidos_Delivery.status !==
                                    "Em Cancelamento" &&
                                  pedidos_Delivery.status !== "Pronto" ? (
                                    <Button
                                      onClick={() => {
                                        StatusPedido(
                                          pedidos_Delivery,
                                          pedidos_Delivery.status ===
                                            "Em Analize"
                                            ? "Em Preparo"
                                            : pedido.status === "Em Preparo"
                                            ? "Pronto"
                                            : "Finalizado",
                                          pedido
                                        );
                                      }}
                                      type="primary"
                                      style={{
                                        marginLeft: 10,
                                        backgroundColor:
                                          pedidos_Delivery.status ===
                                          "Em Analize"
                                            ? "orange"
                                            : pedidos_Delivery.status ===
                                              "Em Preparo"
                                            ? "green"
                                            : "purple",
                                      }}
                                    >
                                      {pedidos_Delivery.status === "Em Analize"
                                        ? "Em Preparo"
                                        : pedidos_Delivery.status ===
                                          "Em Preparo"
                                        ? "Pronto"
                                        : null}
                                    </Button>
                                  ) : null
                                ) : null}
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
              </Descriptions>
            </div>
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
