/* eslint-disable  */
import React, { useState, useEffect, useRef } from "react";
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
  Divider,
  Space,
  Tour,
  Upload,
  Image,
} from "antd";
import "firebase/database";
import ImgCrop from "antd-img-crop";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { service } from "../../services/firebase.ws";
import Category from "./Category";
import {
  deleteCardapio,
  getCardapio,
  imgCardapio,
  InsertImg,
  postCardapio,
  putCardapio,
} from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";

const { Option } = Select;
export default function Dashboard({ atualizar, user }) {
  const userDate = user[0];
  const [fileList, setFileList] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [modalNewAction, setModalNewAction] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sub, setSub] = useState("");
  const [imgByte, setImgByte] = useState("");
  const [active, setActive] = useState(true);
  const [category, setCategory] = useState(null);
  const [actionCardapio, setActionCardapio] = useState(true);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [modalCategory, setModalCategory] = useState(false);
  const [modalImgVisible, setModalImgVisible] = useState(false);
  const [imgModal, setImgModal] = useState(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const [open, setOpen] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (imgByte.length > 0) {
          console.log(
            "🚀 ~ file: Dasboard.jsx:80 ~ reader.addEventListener ~ imgByte:",
            imgByte
          );
          upimg(reader.result);
        } else {
          console.log(
            "🚀 ~ file: Dasboard.jsx:83 ~ reader.addEventListener ~ imgByte:",
            imgByte
          );
          insertImg(reader.result);
        }
      });
      reader.readAsDataURL(fileList[0].originFileObj);
    }
  }, [fileList]);

  const upimg = async (code) => {
    let body = {
      imagem: code,
      idreq: selectedTaskId,
      tipo: "cardapio",
    };
    if (code) await imgCardapio(body);
  };

  const insertImg = async (code) => {
    let body = {
      imagem: code,
      idreq: selectedTaskId,
      tipo: "cardapio",
    };
    if (code) await InsertImg(body);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const steps = [
    {
      title: "Bem vindo",
      description: "Bem vindo ao Dashboard do Encanto Amapaense.",
    },
    {
      title: "Adicionar Item",
      description: "Clique para adicionar um novo item.",
      target: () => ref1.current,
    },
    {
      title: "Pesquisar",
      description: "Pesquise por um item do cardápio.",
      target: () => ref2.current,
    },
    {
      title: "Categorias",
      description: "Filtre por categoria.",
      target: () => ref3.current,
    },
    {
      title: "Editar Item ",
      description: "Clique para Editar.",
      target: () => ref4.current,
    },
    {
      title: "Deletar Item",
      description: "Clique para Deletar um item.",
      target: () => ref5.current,
    },
  ];
  useEffect(() => {
    getCardapiocategory();
    gtCardapio();
  }, [actionCardapio, atualizar]);
  useEffect(() => {
    filterTable();
  }, [search, cardapio, filteredStatus]);
  //! Cardapio

  const gtCardapio = async () => {
    const cardapioCollection = await getCardapio();
    const cardapios = cardapioCollection;
    setCardapio(cardapios.sort((a, b) => a.id - b.id));
  };

  const getCardapiocategory = async () => {
    const cardapioCollection = await getCategoty();
    const categoty = cardapioCollection;

    setCardapioCategory(categoty.sort((a, b) => a.id - b.id));
  };
  async function confirmDelete(record) {
    await deleteCardapio(record);
    message.success("Item deletado com sucesso!");
    setActionCardapio(!actionCardapio);
  }

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
  function handleClickEdit(task) {
    setSelectedTaskId(task.id);
    setId(task.id);
    setName(task.name);
    setPrice(task.price);
    setDescription(task.description);
    setSub(task.sub);
    setActive(task.active);
    setImgByte(task.img);
    setCategory(task.category);
    handleShowModalNewAction();
  }

  function handleShowModalNewAction() {
    setModalNewAction(true);
  }
  async function handleSave() {
    if (selectedTaskId) {
      await postCardapio({
        id,
        name,
        price,
        description,
        sub,
        active,
        imagem: imgByte,
        category,
        update_at: new Date(),
        update_by: userDate.name,
      });
      message.success("Item atualizado com sucesso!");
    } else {
      await putCardapio({
        id: cardapio.length + 1,
        name,
        price,
        description,
        sub,
        active,
        imagem: imgByte,
        category,
        update_at: new Date(),
        update_by: userDate.name,
      });
      message.success("Item salvo com sucesso!");
    }
    setActionCardapio(!actionCardapio);
    closeModal();
  }

  function disableSave() {
    return !name || !price || active === "" || active === null || !category;
  }
  function clearSelecteds() {
    setSelectedTaskId(null);
    setId("");
    setName("");
    setPrice("");
    setDescription("");
    setSub("");
    setActive(true);
    setCategory(null);
    setImgModal(null);
    setImgByte("");
    setFileList([]);
  }
  function closeModal() {
    if (modalCategory) {
      setModalCategory(false);
      setModalImgVisible(false);
    } else {
      setModalNewAction(false);
      setModalImgVisible(false);
      clearSelecteds();
    }
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
      render: (_, text) => {
        return <p>{text.active ? "Sim" : "Não"}</p>;
      },
    },
    {
      title: "Imagem",
      dataIndex: "img",
      key: "img",
      render: (_, text) => {
        return (
          <Image
            src={atob(text.img)}
            style={{ borderRadius: 5 }}
            alt="img"
            width={100}
          />
        );
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
          <Space>
            <Button
              ref={ref4}
              style={{ backgroundColor: "yellow" }}
              onClick={() => handleClickEdit(record)}
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
              onConfirm={() => confirmDelete(record)}
              okText="Excluir"
              okButtonProps={{ danger: true }}
              cancelText="Cancelar"
            >
              <Button ref={ref5} style={{ backgroundColor: "red" }}>
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
    <>
      <Row gutter={8}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Tour
        </Button>
        <Divider />
        <Col span={24}>
          <Card bordered={false}>
            <>
              <Tour
                open={open}
                onClose={() => setOpen(false)}
                steps={steps}
                animated
              />
            </>
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
                    ref={ref1}
                  >
                    Novo
                  </Button>
                </div>
              </Col>
              <Col ref={ref2} span={12}>
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
              <Col ref={ref3}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Radio.Group buttonStyle="solid" value={filteredStatus}>
                    {cardapioCategory.map((category, index) => (
                      <Radio.Button
                        key={index}
                        onClick={handleChangeStatus}
                        value={category.name}
                      >
                        {category.name}
                      </Radio.Button>
                    ))}

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
      <Table dataSource={searchData} columns={columns} size="small" />
      <Modal
        open={modalNewAction}
        okButtonProps={{ disabled: disableSave() }}
        okText={"Salvar"}
        onOk={handleSave}
        onCancel={closeModal}
        title={selectedTaskId ? "Atualizar Item" : "Novo Item"}
      >
        <Row justify="center" gutter={20}>
          <Col span={12}>
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Preço"
              type="number"
              value={price !== "" ? price : undefined}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              style={{ width: "100%", margin: "10px 0" }}
              size="large"
              placeholder="Sub Descrição"
              value={sub}
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
              value={active}
            >
              <Option key={1} value={true}>
                Sim
              </Option>
              <Option key={2} value={false}>
                Não
              </Option>
            </Select>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                style={{ width: "100%", margin: "10px 0" }}
                size="large"
                dropdownMatchSelectWidth={false}
                showSearch
                placeholder="Categoria"
                optionFilterProp="children"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {cardapioCategory.map((category, index) => (
                  <Option key={index} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              <Button
                ref={ref4}
                style={{ backgroundColor: "yellow", width: 20 }}
                onClick={() => setModalCategory(!modalCategory)}
              >
                <EditOutlined
                  size={24}
                  style={{
                    color: "#000",
                    marginLeft: -7,
                  }}
                />
              </Button>
            </div>
            <div>
              <ImgCrop rotationSlider>
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  quality={0.5}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "+Up Imagem"}
                </Upload>
              </ImgCrop>
            </div>
          </Col>
        </Row>
      </Modal>
      <Modal
        open={modalCategory}
        okText={"Ok"}
        onOk={closeModal}
        onCancel={closeModal}
        title={"Categoria"}
      >
        <Category />
      </Modal>
      <Modal
        open={modalImgVisible}
        onCancel={closeModal}
        footer={null}
        width={"90vw"}
      >
        <img src={imgModal} alt="img" style={{ width: "100%" }} />
      </Modal>
    </>
  );
}
