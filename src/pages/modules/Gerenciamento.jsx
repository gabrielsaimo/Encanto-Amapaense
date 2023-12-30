import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
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
} from "../../services/gerenciamento.ws";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
  useEffect(() => {
    getBairro();
  }, [loading === false]);

  useEffect(() => {
    getEmails();
  }, [loadingEmail === false]);

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
    console.log(
      "🚀 ~ file: Gerenciamento.jsx:59 ~ confirmDeleteEmail ~ text:",
      text
    );
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
    setVisibleEmail(false);
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
    setVisible(false);
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
    setVisible(false);
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
    setVisible(false);
    setIdset(null);
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
  return (
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
      <Modal title="Novo Email" footer={false} open={visibleEmail}>
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
