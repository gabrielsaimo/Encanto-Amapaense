/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../../css/Collapse.css";
import {
  deleteCategoty,
  getCategoty,
  postCategoty,
  putCategoty,
} from "../../services/category.ws";

const { Option } = Select;

export default function Category() {
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [action, setAction] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [modalNewAction, setModalNewAction] = useState(false);

  useEffect(() => {
    filterTable();
  }, [search, cardapioCategory]);

  function filterTable() {
    const filteredData = cardapioCategory.filter(
      (record) =>
        !search ||
        record["name"].toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setSearchData(filteredData);
  }

  useEffect(() => {
    if (!action) {
      fetchData();
    }
  }, [action]);
  async function fetchData() {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection);
  }

  async function handleSave() {
    try {
      if (selectedTaskId) {
        await postCategoty({ id, name, active });
        message.success("Item atualizado com sucesso!");
      } else {
        await putCategoty({ id: cardapioCategory.length + 1, name, active });
        message.success("Item salvo com sucesso!");
      }
      setAction(!action);
      closeModal();
    } catch (error) {
      console.error(error);
      message.error("Erro ao salvar categoria.");
    }
  }

  function handleClickEdit(task) {
    setSelectedTaskId(task.id);
    setId(task.id);
    setName(task.name);
    setActive(task.active);
    handleShowModalNewAction();
  }

  async function confirmDelete(record) {
    try {
      await deleteCategoty(record);
      message.success("Item deletado com sucesso!");
      setAction(!action);
    } catch (error) {
      console.error(error);
      message.error("Erro ao excluir categoria.");
    }
  }

  function handleShowModalNewAction() {
    setModalNewAction(true);
  }

  function disableSave() {
    return !name || active === "" || active === null;
  }

  function clearSelecteds() {
    setSelectedTaskId(null);
    setId("");
    setName("");
    setActive("");
  }

  function closeModal() {
    setModalNewAction(false);
    clearSelecteds();
  }

  const columns = [
    {
      title: "Ordem",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Categoria",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Ativo",
      dataIndex: "active",
      key: "active",
      render: (text) => (text ? "Sim" : "Não"),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      align: "center",
      render: (_, record) => (
        <div>
          <Button
            style={{ backgroundColor: "yellow" }}
            onClick={() => handleClickEdit(record)}
          >
            <EditOutlined size={24} color="#00CC66" />
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir essa tarefa?"
            onConfirm={() => confirmDelete(record)}
            okText="Excluir"
            okButtonProps={{ danger: true }}
            cancelText="Cancelar"
          >
            <Button style={{ backgroundColor: "red" }}>
              <DeleteOutlined size={24} style={{ color: "#fff" }} />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={8}>
        <Col span={24}>
          <Card bordered={false}>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ width: "100%", display: "flex" }}>
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={handleShowModalNewAction}
                  >
                    Novo
                  </Button>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Input
                    allowClear
                    value={search}
                    placeholder="Pesquisar"
                    prefix={<SearchOutlined color="#00CC66" />}
                    suffix={<FilterOutlined color="#00CC66" />}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Table dataSource={searchData} columns={columns} />
      <Modal
        open={modalNewAction}
        okButtonProps={{ disabled: disableSave() }}
        okText="Salvar"
        onOk={handleSave}
        onCancel={closeModal}
        title={selectedTaskId ? "Atualizar Categoria" : "Nova Categoria"}
      >
        <Row justify="center" gutter={20}>
          <Col span={12}>
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Nome"
              value={name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              dropdownMatchSelectWidth={false}
              showSearch
              placeholder="Ativo"
              optionFilterProp="children"
              onChange={(value) => setActive(value)}
              value={active !== "" ? active : undefined}
            >
              <Option value={true}>Sim</Option>
              <Option value={false}>Não</Option>
            </Select>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
