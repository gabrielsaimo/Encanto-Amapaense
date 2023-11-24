import { Button, Card, Input, Modal, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getUsers, postUserAdm, putUser } from "../../services/user.ws";
export default function Users(atualizar) {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getUsers().then((users) => {
      setData(users);
    });
  }, [active, atualizar]);

  const onChange = (value, data) => {
    const body = {
      id: data.id,
      categoria: data.categoria,
      active: value,
    };
    postUserAdm(body);
    setActive(!active);
  };
  const onChangeCategory = (value, data) => {
    const body = {
      id: data.id,
      active: data.active,
      categoria: value,
    };
    postUserAdm(body);
    setActive(!active);
  };

  const Novo = () => {
    setShowModal(false);
    const body = {
      id: data.length + 1,
      name: name,
      password: "encanto@" + name,
      categoria: categoria,
      active: true,
    };
    putUser(body);
    setName("");
    setCategoria(null);
    setActive(!active);
  };
  const cancelar = () => {
    setName("");
    setCategoria(null);
    setShowModal(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
      render: (_, categoria) => (
        <>
          <Select
            defaultValue={_}
            style={{ width: 120 }}
            onChange={(value) => onChangeCategory(value, categoria)}
          >
            <Select.Option value={"ADM"}>ADM</Select.Option>
            <Select.Option value={"Gerência"}>Gerente</Select.Option>
            <Select.Option value={"Garçom"}>Garçom</Select.Option>
            <Select.Option value={"Cozinha"}>Cozinherio</Select.Option>
          </Select>
        </>
      ),
    },
    {
      title: "Ativo/Inativo",
      dataIndex: "active",
      key: "active",
      render: (_, active) => (
        <>
          <Select
            defaultValue={_}
            onChange={(value) => onChange(value, active)}
          >
            <Select.Option value={true}>Ativo</Select.Option>
            <Select.Option value={false}>Inativo</Select.Option>
          </Select>
        </>
      ),
    },
  ];
  return (
    <Card style={{ minHeight: "90vh" }}>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Novo
      </Button>
      <Table columns={columns} dataSource={data} />
      <Modal
        open={showModal}
        onCancel={() => cancelar()}
        okText="Salvar"
        cancelText="Cancelar"
        onOk={() => Novo()}
      >
        <Space direction="vertical">
          <h2>Novo Usuário</h2>
          <Input
            type="text"
            value={name}
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            style={{ width: 120 }}
            showSearch
            value={categoria}
            placeholder="Categoria"
            onChange={(value) => setCategoria(value)}
          >
            <Select.Option value={"ADM"}>ADM</Select.Option>
            <Select.Option value={"Gerência"}>Gerente</Select.Option>
            <Select.Option value={"Garçom"}>Garçom</Select.Option>
            <Select.Option value={"Cozinha"}>Cozinherio</Select.Option>
          </Select>
        </Space>
      </Modal>
    </Card>
  );
}
