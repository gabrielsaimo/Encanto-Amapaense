import { Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getUsers, postUserAdm } from "../../services/user.ws";
export default function Users() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    getUsers().then((users) => {
      setData(users);
    });
  }, [active]);

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
  return <Table columns={columns} dataSource={data} />;
}
