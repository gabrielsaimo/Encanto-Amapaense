/* eslint-disable  */
import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Carousel,
  Tag,
  Typography,
  Switch,
} from "antd";
import "firebase/database";
import ImgCrop from "antd-img-crop";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import Category from "./Category";
import LazyLoad from "react-lazyload";
import {
  deleteCardapio,
  DeleteImg,
  getCardapio,
  getImgCardapio,
  imgCardapio,
  InsertImg,
  postCardapio,
  putCardapio,
} from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";
import { currency_BRL } from "../Components/Currency";

const { Option } = Select;
export default function Dashboard({ atualizar, user }) {
  const userDate = user;
  const [fileList, setFileList] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [modalNewAction, setModalNewAction] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [uptela, setUptela] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sub, setSub] = useState("");
  const [meia, setMeia] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [imgByte, setImgByte] = useState("");
  const [active, setActive] = useState(true);
  const [category, setCategory] = useState(null);
  const [actionCardapio, setActionCardapio] = useState(true);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [type, setType] = useState("");
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [modalCategory, setModalCategory] = useState(false);
  const [modalImgVisible, setModalImgVisible] = useState(false);
  const [imgModal, setImgModal] = useState(null);
  const random = Math.floor(Math.random() * 100000000);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const [totalImg, setTotalImg] = useState(0);
  const [coint, setCoint] = useState(0);
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setCoint(coint + 1);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // Defina aqui o ponto de quebra para dispositivos móveis (768 é um exemplo)
    }

    handleResize(); // Verifica o tamanho da tela inicialmente
    window.addEventListener("resize", handleResize); // Adiciona um listener para redimensionamento

    return () => {
      window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar o componente
    };
  }, []);
  useEffect(() => {
    console.log(coint);
    if (fileList.length > 0 && coint == 1) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        insertImg(reader.result);
      });
      reader.readAsDataURL(fileList[0].originFileObj);
    }
  }, [fileList[0]]);

  const insertImg = async (code) => {
    let body = {
      imagem: code,
      idreq: selectedTaskId,
      tipo: "cardapio",
      id: random,
    };
    if (code) await InsertImg(body);
    setUptela(!uptela);
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
  }, [actionCardapio, atualizar, uptela]);
  useEffect(() => {
    filterTable();
  }, [search, cardapio, filteredStatus, uptela]);

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

  async function confirmDeleteImg(record) {
    await DeleteImg(record);
    message.success("Imagem deletada com sucesso!");
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
    setMeia(task.meia);
    setHighlight(task.highlight);
    setType(task.type);
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
        meia,
        type,
        active,
        imagem: imgByte,
        highlight,
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
        meia,
        type,
        active,
        imagem: imgByte,
        highlight,
        category,
        update_at: new Date(),
        update_by: userDate.name,
      });
      message.success("Item salvo com sucesso!");
    }
    setActionCardapio(!actionCardapio);
    closeModal();
    getCardapio();
  }

  function disableSave() {
    return (
      !name ||
      !price ||
      active === "" ||
      active === null ||
      !category ||
      type.length === 0
    );
  }
  function clearSelecteds() {
    setSelectedTaskId(null);
    setId("");
    setName("");
    setPrice("");
    setDescription("");
    setTotalImg(0);
    setSub("");
    setMeia(false);
    setHighlight(false);
    setType("");
    setActive(true);
    setCategory(null);
    setImgModal(null);
    setImgByte("");
    setFileList([]);
    setCoint(0);
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
  const memoizedImgSrc = useMemo(() => {
    if (cardapio.length > 0 && imgSrc.length === 0) {
      const images = [];
      cardapio.forEach(async (item) => {
        if (!item.ids) return;
        const img = await getImgCardapio(item.id, item.ids);
        setImgSrc((prevImgSrc) => [...prevImgSrc, img]);
        images.push(img);
      });
      return images;
    }
    return imgSrc;
  }, [cardapio, imgSrc]);

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
      render: (_, text) => {
        return <p>{currency_BRL(Number(text.price))}</p>;
      },
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
      sorter: { compare: (a, b) => a.active - b.active },
      render: (_, text) => {
        return (
          <Tag color={text.active ? "green" : "red"}>
            {text.active ? "Ativo" : "Desativado"}
          </Tag>
        );
      },
    },
    {
      title: "Imagem",
      dataIndex: "img",
      key: "img",
      width: 160,
      render: (_, text) => {
        return memoizedImgSrc.map((img1, index) => (
          <div className="img" key={index}>
            {img1.map((img, index) => renderImageCarousel(img, index, text.id))}
          </div>
        ));
      },
    },
    {
      title: "Destaque",
      dataIndex: "highlight",
      key: "highlight",
      sorter: { compare: (a, b) => a.highlight - b.highlight },
      render: (_, text) => {
        return (
          <Tag color={text.highlight ? "gold" : "grey"}>
            {text.highlight ? <StarFilled /> : <StarOutlined />}
          </Tag>
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

  const renderImageCarousel = (img, index, id) => {
    if (img.idreq && index === 0 && img.idreq === id) {
      return (
        <LazyLoad key={index} height={200} offset={100}>
          <Carousel
            autoplay={true}
            showArrows={true}
            dotPosition="bottom"
            style={{
              width: 100,
              minWidth: "100px",
              color: "#fff",
            }}
          >
            <div key={index}>
              <Image
                src={atob(img.imagem)}
                style={{
                  borderRadius: 10,
                  color: "#fff",
                  objectFit: "fill",
                  minWidth: "100px",
                }}
                alt="img"
                width={100}
              />
            </div>
          </Carousel>
        </LazyLoad>
      );
    }
    // Se img não for uma matriz válida, retorne algo apropriado, como uma mensagem de erro ou componente vazio
    return null;
  };

  const DeleteImage = async (id) => {
    await DeleteImg(id);
    message.success("Imagem deletada com sucesso!");
    setUptela(!uptela);
    setActionCardapio(!actionCardapio);
  };

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
    <div style={{ minHeight: "90vh" }}>
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
      {!isMobile && (
        <Table
          dataSource={searchData}
          columns={columns}
          footer={() => "Total de itens: " + searchData.length}
          size="small"
          sticky={{
            offsetHeader: 0,
          }}
        />
      )}
      {isMobile && (
        <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
          {searchData.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card className="card-mobile" title={item.name} bordered={true}>
                <Tag
                  color={item.active ? "green" : "red"}
                  key={item.id}
                  size="large"
                  style={{ fontSize: 20 }}
                >
                  {item.active ? "Ativo" : "Desativado"}
                </Tag>
                <p>Preço: R$ {currency_BRL(Number(item.price))}</p>
                <p>Descrição: </p>
                {item.description}
                <p>Sub Descrição: {item.sub}</p>

                <p>Categoria: {item.category}</p>
                <div>
                  {memoizedImgSrc.map((img1, index) => (
                    <div className="img" key={index}>
                      {img1.map(
                        (img, index) =>
                          item.id === img.idreq &&
                          (totalImg === 0 ? setTotalImg(img1.length) : null,
                          (
                            <>
                              <img
                                src={atob(img.imagem)}
                                alt="img"
                                style={{
                                  width: 100,
                                  marginRight: 5,
                                  borderRadius: 10,
                                }}
                              />

                              <Popconfirm
                                title="Tem certeza que deseja excluir essa imagem?"
                                onConfirm={() => confirmDeleteImg(img.id)}
                                okText="Excluir"
                                okButtonProps={{ danger: true }}
                                cancelText="Cancelar"
                              >
                                <Button
                                  ref={ref5}
                                  style={{
                                    backgroundColor: "#fc5f5f",
                                    width: 20,
                                    position: "absolute",
                                    marginLeft: -35,
                                  }}
                                >
                                  <DeleteOutlined
                                    size={24}
                                    style={{
                                      color: "#fff",
                                      marginLeft: -7,
                                    }}
                                  />
                                </Button>
                              </Popconfirm>
                            </>
                          ))
                      )}
                    </div>
                  ))}
                </div>
                <Space>
                  <Button
                    ref={ref4}
                    style={{ backgroundColor: "yellow" }}
                    onClick={() => handleClickEdit(item)}
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
                    onConfirm={() => confirmDelete(item)}
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
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal
        open={modalNewAction}
        okButtonProps={{ disabled: disableSave() }}
        okText={"Salvar"}
        onOk={handleSave}
        onCancel={closeModal}
        title={selectedTaskId ? "Atualizar Item" : "Novo Item"}
      >
        <Row justify="center">
          <Col span={20}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography.Title level={5} style={{ width: 150 }}>
                Nome
              </Typography.Title>

              <Input
                style={{ width: "100%", margin: "10px 0" }}
                size="large"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography.Title level={5} style={{ width: 150 }}>
                Descrição
              </Typography.Title>
              <Input
                style={{ width: "100%", margin: "10px 0" }}
                size="large"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography.Title level={5} style={{ width: 150 }}>
                Sub Descrição
              </Typography.Title>
              <Input
                style={{ width: "100%", margin: "10px 0" }}
                size="large"
                placeholder="Sub Descrição"
                value={sub}
                onChange={(e) => setSub(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography.Title level={5} style={{ width: 100 }}>
                  Preço
                </Typography.Title>
                <Input
                  style={{ width: 100, margin: "10px 0" }}
                  size="large"
                  placeholder="Preço"
                  type="number"
                  value={price !== "" ? price : undefined}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography.Title level={5} style={{ width: 100 }}>
                  Ativo?
                </Typography.Title>
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
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography.Title level={5} style={{ width: 100 }}>
                  Meia Porção
                </Typography.Title>
                <Switch
                  value={meia}
                  checkedChildren="Sim"
                  unCheckedChildren="Não"
                  onChange={(value) => setMeia(value)}
                />
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Typography.Title level={5} style={{ width: 100 }}>
                  Destaque
                </Typography.Title>
                <Switch
                  value={highlight}
                  checkedChildren="Sim"
                  unCheckedChildren="Não"
                  onChange={(value) => setHighlight(value)}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography.Title level={5} style={{ width: 108 }}>
                Systema
              </Typography.Title>
              <Select
                mode="multiple"
                style={{ width: "100%", margin: "10px 0" }}
                placeholder="Selecione"
                value={type.split(",") || ""}
                showSearch
                onChange={(e) => setType(e.join(","))}
              >
                <Select.Option value="Delivery">Delivery</Select.Option>
                <Select.Option value="Cardapio">Cardapio</Select.Option>
                <Select.Option value="Estoque">Estoque</Select.Option>
              </Select>
            </div>

            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography.Title level={5} style={{ width: 170 }}>
                Categoria
              </Typography.Title>
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
              {memoizedImgSrc.map((img1, index) => (
                <div className="img" key={index}>
                  {img1.map(
                    (img, index) =>
                      selectedTaskId === img.idreq &&
                      (totalImg === 0 ? setTotalImg(img1.length) : null,
                      (
                        <>
                          <img
                            src={atob(img.imagem)}
                            alt="img"
                            style={{
                              width: 100,
                              marginRight: 5,
                              borderRadius: 10,
                            }}
                          />
                          <Popconfirm
                            title="Tem certeza que deseja excluir essa imagem?"
                            onConfirm={() => confirmDeleteImg(img.id)}
                            okText="Excluir"
                            okButtonProps={{ danger: true }}
                            cancelText="Cancelar"
                          >
                            <Button
                              ref={ref5}
                              style={{
                                backgroundColor: "#fc5f5f",
                                width: 20,
                                position: "absolute",
                                marginLeft: -35,
                              }}
                            >
                              <DeleteOutlined
                                size={24}
                                style={{
                                  color: "#fff",
                                  marginLeft: -7,
                                }}
                              />
                            </Button>
                          </Popconfirm>
                        </>
                      ))
                  )}
                </div>
              ))}
            </div>
            <div>
              {totalImg < 3 && selectedTaskId && (
                <ImgCrop>
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={(e) => onChange(e)}
                    onPreview={onPreview}
                    accept="image/*"
                  >
                    {fileList.length < 1 && "+add Imagem"}
                  </Upload>
                </ImgCrop>
              )}
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
    </div>
  );
}
