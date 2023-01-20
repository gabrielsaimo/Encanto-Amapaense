import React, { useState, useEffect } from "react";
import firebase, { initializeApp } from "firebase/app";
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import "firebase/database";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDHuslm5iZZGtOk3ChXKXoIGpQQQI4UaUQ",
  authDomain: "encanto-amapaense.firebaseapp.com",
  projectId: "encanto-amapaense",
  storageBucket: "encanto-amapaense.appspot.com",
  messagingSenderId: "66845466662",
  appId: "1:66845466662:web:6d45a230c3b2ccf49fc6e7",
  measurementId: "G-T9LP3T7QBB",
});
const { Option } = Select;
export default function Dashboard() {
  const [cardapio, setCardapio] = useState([]);
  const [modalNewAction, setModalNewAction] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sub, setSub] = useState("");
  const [active, setActive] = useState("");
  const [category, setCategory] = useState("");
  const [action, setAction] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [searchData, setSearchData] = useState([]);

  const db = getFirestore(firebaseConfig);
  const colletionRef = collection(db, "cardapio");
  useEffect(() => {
    const getCardapio = async () => {
      const cardapioCollection = await getDocs(colletionRef);
      const cardapios = cardapioCollection.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setCardapio(cardapios.sort((a, b) => a.id - b.id));
    };
    getCardapio();
  }, [action]);
  useEffect(() => {
    filterTable();

    function filterTable() {
      if (!search && !filteredStatus) {
        setSearchData(cardapio);
      } else {
        const array = cardapio.filter(
          (record) =>
            (!filteredStatus ||
              (record["category"] &&
                record["category"]
                  ?.toUpperCase()
                  .indexOf(filteredStatus.toUpperCase()) > -1)) &&
            (!search ||
              record["name"].toLowerCase().indexOf(search.toLowerCase()) > -1)
        );
        setSearchData(array);
      }
    }
  }, [search, cardapio, filteredStatus]);

  function handleClickEdit(task) {
    setSelectedTaskId(task.key);
    setId(task.id);
    setName(task.name);
    setPrice(task.price);
    setDescription(task.description);
    setSub(task.sub);
    setActive(task.active);
    setCategory(task.category);
    handleShowModalNewAction();
  }
  async function confirmDelete(record) {
    const docRef = doc(db, "cardapio", record);
    await deleteDoc(docRef);
    message.success("Item deletado com sucesso!");
    setAction(!action);
  }
  function handleShowModalNewAction() {
    setModalNewAction(true);
  }
  async function handleSave() {
    if (selectedTaskId) {
      const docRef = doc(db, "cardapio", selectedTaskId);
      await updateDoc(docRef, {
        id,
        name,
        price,
        description,
        sub,
        active,
        category,
      });
      message.success("Item atualizado com sucesso!");
    } else {
      const novo = await addDoc(colletionRef, {
        id,
        name,
        price,
        description,
        sub,
        active,
        category,
      });
      message.success("Item salvo com sucesso!");
    }
    setAction(!action);
    closeModal();
  }

  function disableSave() {
    return !id || !name || !price || active === "" || active === null;
  }
  function clearSelecteds() {
    setSelectedTaskId(null);
    setId("");
    setName("");
    setPrice("");
    setDescription("");
    setSub("");
    setActive("");
    setCategory("");
  }
  function closeModal() {
    setModalNewAction(false);
    clearSelecteds();
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Sub Descrição",
      dataIndex: "sub",
      key: "sub",
    },
    {
      title: "Ativo",
      dataIndex: "active",
      key: "active",
      sorter: {
        compare: (a, b) => a.active - b.active,
      },
      render: (_, text) => {
        return <p>{text.active ? "Sim" : "Não"}</p>;
      },
    },
    {
      title: "Categoria",
      dataIndex: "category",
      key: "category",
      sorter: {
        compare: (a, b) => a.category - b.category,
      },
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      width: 150,
      align: "center",
      render: (_, record) => {
        return (
          <div>
            <EditOutlined
              size={24}
              color="#00CC66"
              style={{ marginRight: 15 }}
              onClick={() => handleClickEdit(record)}
            />
            <Popconfirm
              title="Tem certeza que deseja excluir essa tarefa?"
              onConfirm={() => confirmDelete(record.key)}
              okText="Excluir"
              okButtonProps={{ danger: true }}
              cancelText="Cancelar"
            >
              <DeleteOutlined size={24} color="#00CC66" />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  function handleChangeStatus(e) {
    const { value } = e.target;
    if (value === filteredStatus) {
      setFilteredStatus(null);
    } else {
      setFilteredStatus(value);
    }
  }
  function handleRemoveStatus() {
    setFilteredStatus(null);
  }

  return (
    <div style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}>
      <Row gutter={8}>
        <Col span={24}>
          <Card bordered={false}>
            <Row justify="space-between" gutter={[16, 16]}>
              <Col span={12}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                  }}
                >
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
              <Col span={2} />
              <Col>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Radio.Group buttonStyle="solid" value={filteredStatus}>
                    <Radio.Button onClick={handleChangeStatus} value="Entrada">
                      Entrada
                    </Radio.Button>
                    <Radio.Button
                      onClick={handleChangeStatus}
                      value="Mujicas e caldos"
                    >
                      Mujicas e caldos
                    </Radio.Button>
                    <Radio.Button
                      onClick={handleChangeStatus}
                      value="Peixe ao molho"
                    >
                      Peixe ao molho
                    </Radio.Button>
                    <Radio.Button
                      onClick={handleChangeStatus}
                      value="Peixe Frito"
                    >
                      Peixe Frito
                    </Radio.Button>
                    <Radio.Button
                      onClick={handleChangeStatus}
                      value="Peixe na chapa"
                    >
                      Peixe na chapa
                    </Radio.Button>
                    <Radio.Button onClick={handleChangeStatus} value="Camarão">
                      Camarão
                    </Radio.Button>
                    <Radio.Button onClick={handleChangeStatus} value="Carnes">
                      Carnes
                    </Radio.Button>
                    <Radio.Button onClick={handleChangeStatus} value="Frango">
                      Frango
                    </Radio.Button>
                    <Radio.Button onClick={handleChangeStatus} value="Moquecas">
                      Moquecas
                    </Radio.Button>
                    <Radio.Button
                      onClick={handleChangeStatus}
                      value="Caldeiradas"
                    >
                      Caldeiradas
                    </Radio.Button>
                    <Radio.Button
                      onClick={handleChangeStatus}
                      value="Porções Extras"
                    >
                      Porções Extras
                    </Radio.Button>
                    <Radio.Button
                      onClick={handleChangeStatus}
                      value="Sobremesas"
                    >
                      Sobremesas
                    </Radio.Button>
                    <Radio.Button onClick={handleChangeStatus} value="Bebidas">
                      Bebidas
                    </Radio.Button>

                    {filteredStatus !== null ? (
                      <Button
                        style={{
                          backgroundColor: "#fc5f5f",
                          color: "#000",
                        }}
                        onClick={handleRemoveStatus}
                      >
                        X
                      </Button>
                    ) : (
                      ""
                    )}
                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Table dataSource={searchData} columns={columns} />
      <Modal
        visible={modalNewAction}
        okButtonProps={{ disabled: disableSave() }}
        okText={"Salvar"}
        onOk={handleSave}
        onCancel={closeModal}
        title={selectedTaskId ? "Atualizar Ação" : "Nova Ação"}
      >
        <Row justify="center" gutter={20}>
          <Col span={12}>
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Id"
              type="number"
              value={id != "" ? id : undefined}
              onChange={(e) => setId(e.target.value)}
            />
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Nome"
              value={
                name != ""
                  ? name[0].toUpperCase() + name.slice(1).toLowerCase()
                  : undefined
              }
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Preço"
              type="number"
              value={price != "" ? price : undefined}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Descrição"
              value={
                description != ""
                  ? description[0].toUpperCase() +
                    description.slice(1).toLowerCase()
                  : undefined
              }
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Sub Descrição"
              value={
                sub != ""
                  ? sub[0].toUpperCase() + sub.slice(1).toLowerCase()
                  : undefined
              }
              onChange={(e) => setSub(e.target.value)}
            />

            <Select
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              dropdownMatchSelectWidth={false}
              showSearch
              placeholder="Ativo"
              optionFilterProp="children"
              onChange={(value) => setActive(value)}
              value={active != "" ? active : undefined}
            >
              <Option value={true}>sim</Option>
              <Option value={false}>não</Option>
            </Select>
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Categoria"
              value={
                category != ""
                  ? category[0].toUpperCase() + category.slice(1)
                  : undefined
              }
              onChange={(e) => setCategory(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
