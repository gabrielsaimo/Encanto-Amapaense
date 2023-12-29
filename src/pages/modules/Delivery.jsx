/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  useMemo,
  lazy,
  Suspense,
  useCallback,
} from "react";
import {
  Collapse,
  Carousel,
  Spin,
  Input,
  Button,
  Flex,
  Affix,
  Badge,
  Avatar,
  Drawer,
  Modal,
  Card,
  Select,
  message,
} from "antd";
import { CaretRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import LazyLoad from "react-lazyload";
import "../../css/Collapse.css";
import SlidesPrincipal from "./SlidePrincipal";
import SlidesSobemesas from "./SlideSobremesas";
import SlidesBebidas from "./SlideBebidas";
import { getCardapio, getImgCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";
import TextArea from "antd/es/input/TextArea";
import { postEmail } from "../../services/email.ws";

const { Panel } = Collapse;
const LazyLoadedImage = lazy(() =>
  import("antd").then((module) => ({ default: module.Image }))
);

function formatarTelefone(valor) {
  const apenasDigitos = valor.replace(/[^\d]/g, "");
  if (apenasDigitos.length === 11) {
    return apenasDigitos.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return apenasDigitos;
}

const bairros = [
  { value: "Alvorada", label: "Alvorada", price: 18 },
  { value: "Açaí", label: "Açaí", price: 20 },
  { value: "Araxá", label: "Araxá", price: 12 },
  { value: "Beirol", label: "Beirol", price: 12 },
  { value: "Boné Azul", label: "Boné Azul", price: 20 },
  { value: "Brasil Novo", label: "Brasil Novo", price: 25 },
  { value: "Buritizal", label: "Buritizal", price: 12 },
  { value: "Cabralzinho", label: "Cabralzinho", price: 20 },
  { value: "Central", label: "Central", price: 12 },
  { value: "Cidade Nova", label: "Cidade Nova", price: 15 },
  { value: "Congós", label: "Congós", price: 15 },
  { value: "Infraero I e II", label: "Infraero I e II", price: 20 },
  { value: "Ipê", label: "Ipê", price: 20 },
  { value: "Jardim Equatorial", label: "Jardim Equatorial", price: 12 },
  { value: "Jardim Felicidade", label: "Jardim Felicidade", price: 20 },
  { value: "Jardim Felicidade II", label: "Jardim Felicidade II", price: 20 },
  { value: "Jardim Marco Zero", label: "Jardim Marco Zero", price: 12 },
  { value: "Jesus de Nazaré", label: "Jesus de Nazaré", price: 15 },
  { value: "Marabaixo", label: "Marabaixo", price: 20 },
  { value: "Fazendinha", label: "Fazendinha", price: 22 },
  { value: "Morada das Palmeiras", label: "Morada das Palmeiras", price: 25 },
  { value: "Muca", label: "Muca", price: 12 },
  { value: "Novo Buritizal", label: "Novo Buritizal", price: 12 },
  { value: "Novo Horizonte", label: "Novo Horizonte", price: 20 },
  { value: "Nova Esperança", label: "Nova Esperança", price: 15 },
  { value: "Pacoval", label: "Pacoval", price: 15 },
  { value: "Perpétuo Socorro", label: "Perpétuo Socorro", price: 15 },
  { value: "Pedrinhas", label: "Pedrinhas", price: 12 },
  { value: "Renascer", label: "Renascer", price: 18 },
  { value: "Santa Inês", label: "Santa Inês", price: 10 },
  { value: "Santa Rita", label: "Santa Rita", price: 15 },
  { value: "Sao Lázaro", label: "São Lázaro", price: 15 },
  { value: "Trem", label: "Trem", price: 12 },
  { value: "Universidade", label: "Universidade", price: 15 },
  { value: "Outro", label: "Outro", price: 0 },
];

const DeliveryMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [meiaporcao, setMeiaporcao] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [referencia, setReferencia] = useState("");
  const [observacao, setObservacao] = useState("");
  const [pagamento, setPagamento] = useState(["Pix"]);
  const [troco, setTroco] = useState("");
  const [bairro, setBairro] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [loading, setLoading] = useState(false);
  const [retirada, setRetirada] = useState("");
  const [visibleMetodoEntrega, setVisibleMetodoEntrega] = useState(true);
  const destinararios = [
    "gabrielsaimo68@gmail.com",
    "Josemaria023182@gmail.com",
    "sraebarbossa@gmail.com",
    "eu251213@mail.com",
  ];
  const options = [
    {
      value: "Pix",
      label: "Pix",
    },
    {
      value: "Dinheiro",
      label: "Dinheiro",
    },
    {
      value: "Credito",
      label: "Credito",
    },
    {
      value: "Debito",
      label: "Debito",
    },
  ];

  const handleTelefoneChange = useCallback((event) => {
    const valor = event.target.value;
    const telefoneFormatado = formatarTelefone(valor);
    setTelefone(telefoneFormatado);
  }, []);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinalizar = () => {
    setOpen(false);
    setVisible(true);
  };
  const handleChange = (value) => {
    setPagamento(value);
  };
  const handleChangeBairro = (value, all) => {
    setBairro(all.label);
    setValorFrete(all.price);
  };

  useEffect(() => {
    if (cardapio.length === 0) {
      getCardapios();
    }
    if (cardapioCategory.length === 0) {
      getCardapioCategory();
    }
  }, [cardapio]);

  const sendMsm = async () => {
    setLoading(true);

    if (retirada === "Delivery") {
      if (endereco.length < 4 || numero.length < 1 || bairro === "") {
        message.error("Preencha corretamente os campos obrigatórios");
        setLoading(false);
        return;
      }
    } else if (retirada === "Local") {
      if (nome.length < 4) {
        message.error("Preencha corretamente os campos obrigatórios");
        setLoading(false);
        return;
      }
    }
    const email = {
      destinatario: destinararios,
      assunto: "Pedido Delivery",
      corpo: `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Email de Finalização de Pedido</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;background-color:#f5f5f5;}.container{max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.1);}h1{color:#333;margin-top:0;}p{margin-bottom:20px;}.signature{margin-top:40px;font-style:italic;color:#888;}</style></head><body><div class='container'><h1>Pedido Recebido</h1>
      Nome: ${nome}<br/>Telefone: ${telefone}<br/>Endereço: ${endereco}<br/>Numero: ${numero}<br/>Bairro: ${bairro}<br/>Complemento: ${complemento}<br/>Referencia: ${referencia}
      <br><br/>Pedido: ${pedido
        .map(
          (item) =>
            `<h3 style="font-weight:bold">x${item.qtd} ${item.name}</h3/>`
        )
        .join("")} ${meiaporcao
        .map(
          (item) =>
            `<h3 style="font-weight:bold">x${item.qtd} ${item.name}</h3/>`
        )
        .join("")}
        
      Troco: ${troco}<br/>
      Observação:<p>${observacao}</p>Metodos de Pagamento:<p> ${pagamento}</p><br/><br/>Valor Pedidos:<p> R$ ${
        pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) % 1 !== 0
          ? pedido
              .reduce((acc, item) => acc + item.price * item.qtd, 0)
              .toFixed(2)
              .replace(".", ",") +
            meiaporcao
              .reduce((acc, item) => acc + item.price * item.qtd, 0)
              .toFixed(2)
              .replace(".", ",")
          : (
              pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) +
              meiaporcao.reduce((acc, item) => acc + item.price * item.qtd, 0)
            )
              .toFixed(2)
              .replace(".", ",")
      }</p>Frete:<p> R$ ${valorFrete} </p><br/>Valor Total Pago:<p> R$ ${
        Number(valorFrete) +
        Number(pedido.reduce((acc, item) => acc + item.price * item.qtd, 0))
      },00</p><br><br/><p>Atenciosamente,</p><p><em>Encando Amapaense</em></p></div></body></html>`,
    };

    const msgDelivey = `Nome: ${nome}%0ATelefone: ${telefone}%0AEndereço: ${endereco}%0ANumero: ${numero}%0ABairro: ${bairro}%0AComplemento: ${complemento}%0AReferencia: ${referencia}%0AObservação: *${observacao}*%0APagamento: *${pagamento}*%0ATroco: ${troco}%0A%0A%0A *Pedido:* %0A ${pedido
      .map((item) => `x${item.qtd} *${item.name}* %0A`)
      .join(", ")} ${meiaporcao
      .map((item) => `x${item.qtd} *${item.name}* %0A`)
      .join(", ")}
      %0ATotal: R$ ${
        pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) % 1 !== 0
          ? pedido
              .reduce((acc, item) => acc + item.price * item.qtd, 0)
              .toFixed(2)
              .replace(".", ",") +
            meiaporcao
              .reduce((acc, item) => acc + item.price * item.qtd, 0)
              .toFixed(2)
              .replace(".", ",")
          : (
              pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) +
              meiaporcao.reduce((acc, item) => acc + item.price * item.qtd, 0)
            ).toFixed(2)
      }%0AFrete: *R$ ${valorFrete},00*%0ATotal Geral: *R$ ${(
      Number(valorFrete) +
      Number(
        pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) +
          meiaporcao.reduce((acc, item) => acc + item.price * item.qtd, 0)
      )
    ).toFixed(2)}*${
      bairro === "Outro" ? "%0A%0A%0A*Vamos Verificar  o valor do Frete*" : ""
    }`;

    const msgLocal = `Nome: ${nome}%0ATelefone: ${telefone}%0A%0A%*O Pedido Sera Retirado No Local*%0A*Pedido:* %0A*Pedido:* %0A ${pedido
      .map((item) => `x${item.qtd} *${item.name}* %0A`)
      .join(", ")}%0A${meiaporcao
      .map((item) => `x${item.qtd} *${item.name}* %0A`)
      .join(", ")}
      %0ATotal: R$ ${
        pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) % 1 !== 0
          ? (
              pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) +
              meiaporcao.reduce((acc, item) => acc + item.price * item.qtd, 0)
            )
              .toFixed(2)
              .replace(".", ",")
          : (
              pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) +
              meiaporcao.reduce((acc, item) => acc + item.price * item.qtd, 0)
            ).toFixed(2)
      }%0AFrete: *R$ ${valorFrete},00*%0ATotal Geral: *R$ ${(
      Number(valorFrete) +
      Number(
        pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) +
          meiaporcao.reduce((acc, item) => acc + item.price * item.qtd, 0)
      )
    ).toFixed(2)}*${
      bairro === "Outro" ? "%0A%0A%0A*Vamos Verificar o valor do Frete*" : ""
    }`;

    const msg = retirada === "Delivery" ? msgDelivey : msgLocal;
    window.open(
      `https://api.whatsapp.com/send?phone=5596984030350&text=${msg}`,
      "_blank"
    );
    setOpen(false);
    setVisible(false);
    setLoading(false);
    await postEmail(email);
    setPedido([]);
    setNome("");
    setTelefone("");
    setEndereco("");
    setNumero("");
    setComplemento("");
    setReferencia("");
    setObservacao("");
    setPagamento(["Pix"]);
    setTroco("");
    setBairro("");
    setValorFrete(0);
    window.location.reload();
  };

  const addPedido = (item, type) => {
    const meiapor = {
      id: item.id,
      name: item.name + "***Meia***",
      price: Number(item.price * 0.65),
      category: item.category,
      description: item.description,
      meia: false,
      sub: item.sub,
      active: item.active,
      ids: item.ids,
    };
    const pedidoItem = pedido.find((item1) => item1.id === item.id);
    const meiaItem = meiaporcao.find((item1) => item1.id === meiapor.id);
    if (type === "meia") {
      if (meiaItem) {
        meiaItem.qtd += 1;
        setMeiaporcao([...meiaporcao]);
      }
    }
    if (pedidoItem) {
      pedidoItem.qtd += 1;
      setPedido([...pedido]);
    }

    if (type === "meia") {
      if (!meiaItem) {
        setMeiaporcao([...meiaporcao, { ...meiapor, qtd: 1 }]);
      }
    } else {
      setPedido([...pedido, { ...item, qtd: 1 }]);
    }
  };

  const removePedido = (item, type) => {
    const pedidoItem = pedido.find((item1) => item1.id === item.id);
    const meiaItem = meiaporcao.find((item1) => item1.id === item.id);
    if (type === "meia") {
      if (meiaItem) {
        if (meiaItem.qtd <= 0) {
          meiaItem.qtd = 0;
          meiaporcao.splice(meiaporcao.indexOf(meiaItem), 1);
          setMeiaporcao([...meiaporcao]);
          return;
        }

        meiaItem.qtd -= 1;
        if (meiaItem.qtd === 0) {
          meiaporcao.splice(meiaporcao.indexOf(meiaItem), 1);
        }

        setMeiaporcao([...meiaporcao]);
      } else {
        setMeiaporcao([...meiaporcao, { ...item, qtd: 1 }]);
      }
    } else {
      if (pedidoItem) {
        if (pedidoItem.qtd <= 0) {
          pedidoItem.qtd = 0;
          pedido.splice(pedido.indexOf(pedidoItem), 1);
          setPedido([...pedido]);
          return;
        }

        pedidoItem.qtd -= 1;
        if (pedidoItem.qtd === 0) {
          pedido.splice(pedido.indexOf(pedidoItem), 1);
        }

        setPedido([...pedido]);
      } else {
        setPedido([...pedido, { ...item, qtd: 1 }]);
      }
    }
  };

  const getCardapios = async () => {
    const cardapioCollection = await getCardapio();
    setCardapio(cardapioCollection);
  };

  const getCardapioCategory = async () => {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection);
  };

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

  const renderImageCarousel = (img, index, id) =>
    img[0].idreq === id && (
      <div className="img" key={index} style={{ zIndex: 5 }}>
        <LazyLoad key={index} height={200} offset={100}>
          <Carousel
            autoplay={true}
            autoplaySpeed={2000}
            showArrows={true}
            Swiping={true}
            draggable={true}
            effect="fade"
            dotPosition="bottom"
            style={{
              width: "45vw",
              maxWidth: 300,
              minWidth: "100px",
              color: "#fff",
            }}
          >
            {img
              .filter((img1) => img1.idreq && img1.idreq === id)
              .map((img1, index) => (
                <Suspense key={index} fallback={<Spin />}>
                  <div style={{ width: "45vw", maxWidth: 300 }}>
                    <LazyLoadedImage
                      src={atob(img1.imagem)}
                      key={index}
                      style={{
                        borderRadius: 10,
                        color: "#fff",
                        minWidth: "100px",
                        minHeight: 300,
                      }}
                      alt="img"
                      objectFit="cover"
                      width={"100%"}
                      loading="lazy"
                    />
                  </div>
                </Suspense>
              ))}
          </Carousel>
        </LazyLoad>
      </div>
    );

  const renderSlides = useMemo(() => {
    return (index) => {
      if (index === 0) {
        return (
          <Suspense fallback={<Spin />}>
            <SlidesPrincipal />
          </Suspense>
        );
      } else if (index === 11) {
        return (
          <Suspense fallback={<Spin />}>
            <SlidesSobemesas />
          </Suspense>
        );
      } else if (index === 15) {
        return (
          <Suspense fallback={<Spin />}>
            <SlidesBebidas />
          </Suspense>
        );
      }
      return null;
    };
  }, []);

  const renderCardapioItems = () => {
    return cardapioCategory.map((item1, index) => {
      const key = item1.name;
      return (
        <div key={key}>
          {retirada === "Local" ? null : (
            <Affix
              style={{
                position: "fixed",
                top: 0,
                zIndex: 6,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  padding: 5,
                  width: "95vw",
                  maxWidth: 450,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <div className="p_1 name georgia-font">
                    Selecione seu Bairro
                  </div>
                  <Select
                    defaultValue="Selecione"
                    className="georgia-font"
                    style={{ width: "100%", marginRight: 60 }}
                    showSearch
                    onChange={handleChangeBairro}
                    options={bairros}
                  />
                </div>
                {bairro === "Outro" ? (
                  <div
                    className="p_1 name georgia-font"
                    style={{ textAlign: "center" }}
                  >
                    {`Frete: Valor a Confirmar`}
                  </div>
                ) : bairro !== "" ? (
                  <div
                    className="p_1 name georgia-font"
                    style={{ textAlign: "center" }}
                  >
                    {`Frete: R$ ${valorFrete},00`}
                  </div>
                ) : null}
              </div>
            </Affix>
          )}

          {(pedido.length > 0) | (meiaporcao.length > 0) ? (
            <Affix
              offsetTop={10}
              style={{
                position: "fixed",
                right: 10,
                bottom: 130,
                zIndex: 9,
              }}
            >
              <Badge count={pedido.length + meiaporcao.length}>
                <Avatar
                  shape="square"
                  size={70}
                  style={{
                    backgroundColor: "green",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={showDrawer}
                >
                  <ShoppingCartOutlined
                    style={{ fontSize: 50, width: 60, paddingTop: 10 }}
                  />
                </Avatar>
              </Badge>
            </Affix>
          ) : null}
          {renderSlides(index)}
          <Suspense fallback={<Spin />}>
            <Collapse
              bordered={false}
              header={item1.name}
              easing="ease-in-out"
              waitForAnimate={true}
              defaultActiveKey={Array.from({ length: 1 }, (_, i) => String(i))}
              destroyInactivePanel={false}
              expandIconPosition="end"
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{
                background: "transparent",
              }}
            >
              <Panel
                id={key}
                style={{
                  color: "#7a4827",
                  fontWeight: "bold",
                  backgroundImage: `url(${require("../../assets/tinta.webp")}) `,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: 150,
                  backgroundPositionX: "50%",
                  backgroundPositionY: -8,
                }}
                header={item1.name}
              >
                {cardapio
                  .filter(
                    (categoria) =>
                      categoria.category === item1.name && categoria.active
                  )
                  .map((categoria, idx) =>
                    categoria.meia === true ? (
                      <>
                        <div key={idx} className="border">
                          <div style={{ display: "flex" }}>
                            {categoria.ids &&
                              memoizedImgSrc.map((img1, index) =>
                                renderImageCarousel(img1, index, categoria.id)
                              )}

                            <div className="flex">
                              <div
                                style={{ width: "100%", display: "contents" }}
                              >
                                <div>
                                  <p className="p_1 name georgia-font">
                                    {categoria.name}
                                  </p>
                                </div>
                                <div className="flex">
                                  <div className="sub">
                                    {categoria.sub} {categoria.description}
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "end",
                                  minWidth: "100%",
                                  alignItems: "flex-end",
                                }}
                              >
                                <div>
                                  <p className="p_1 price georgia-bold-font">
                                    {`R$ ${
                                      categoria.price % 1 !== 0
                                        ? (categoria.price * 0.65)
                                            .toFixed(2)
                                            .replace(".", ",")
                                        : (categoria.price * 0.65)
                                            .toFixed(2)
                                            .replace(".", ",")
                                    }`}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: Flex,
                                  }}
                                >
                                  <Button
                                    className="btn"
                                    style={{
                                      width: 45,
                                      textAlign: "center",
                                      backgroundColor: "red",
                                      color: "#fff",
                                    }}
                                    onClick={() =>
                                      removePedido(categoria, "meia")
                                    }
                                  >
                                    -
                                  </Button>

                                  <Input
                                    className="input"
                                    style={{
                                      width: 35,
                                      textAlign: "center",
                                      color: "#000",
                                    }}
                                    placeholder="Quantidade"
                                    value={
                                      meiaporcao.find(
                                        (item) => item.id === categoria.id
                                      )?.qtd || 0
                                    }
                                    disabled
                                  />

                                  <Button
                                    className="btn"
                                    style={{
                                      width: 45,
                                      textAlign: "center",
                                      backgroundColor: "green",
                                      color: "#fff",
                                    }}
                                    onClick={() => addPedido(categoria, "meia")}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div key={idx} className="border">
                          <div style={{ display: "flex" }}>
                            {categoria.ids &&
                              memoizedImgSrc.map((img1, index) =>
                                renderImageCarousel(img1, index, categoria.id)
                              )}

                            <div className="flex">
                              <div
                                style={{ width: "100%", display: "contents" }}
                              >
                                <div>
                                  <p className="p_1 name georgia-font">
                                    {categoria.name}
                                  </p>
                                </div>
                                <div className="flex">
                                  <div className="sub">
                                    {categoria.sub} {categoria.description}
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "end",
                                  minWidth: "100%",
                                  alignItems: "flex-end",
                                }}
                              >
                                <div>
                                  <p className="p_1 price georgia-bold-font">
                                    {`R$ ${
                                      categoria.price % 1 !== 0
                                        ? categoria.price.replace(".", ",")
                                        : categoria.price + ",00"
                                    }`}
                                  </p>
                                </div>

                                <div
                                  style={{
                                    display: Flex,
                                  }}
                                >
                                  <Button
                                    className="btn"
                                    style={{
                                      width: 45,
                                      textAlign: "center",
                                      backgroundColor: "red",
                                      color: "#fff",
                                    }}
                                    onClick={() =>
                                      removePedido(categoria, "inteira")
                                    }
                                  >
                                    -
                                  </Button>

                                  <Input
                                    className="input"
                                    style={{
                                      width: 35,
                                      textAlign: "center",
                                      color: "#000",
                                    }}
                                    placeholder="Quantidade"
                                    value={
                                      pedido.find(
                                        (item) => item.id === categoria.id
                                      )?.qtd || 0
                                    }
                                    disabled
                                  />

                                  <Button
                                    className="btn"
                                    style={{
                                      width: 45,
                                      textAlign: "center",
                                      backgroundColor: "green",
                                      color: "#fff",
                                    }}
                                    onClick={() =>
                                      addPedido(categoria, "inteira")
                                    }
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div key={idx} className="border">
                        <div style={{ display: "flex" }}>
                          {categoria.ids &&
                            memoizedImgSrc.map((img1, index) =>
                              renderImageCarousel(img1, index, categoria.id)
                            )}

                          <div className="flex">
                            <div style={{ width: "100%", display: "contents" }}>
                              <div>
                                <p className="p_1 name georgia-font">
                                  {categoria.name}
                                </p>
                              </div>
                              <div className="flex">
                                <div className="sub">
                                  {categoria.sub} {categoria.description}
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "end",
                                minWidth: "100%",
                                alignItems: "flex-end",
                              }}
                            >
                              <div>
                                <p className="p_1 price georgia-bold-font">
                                  {`R$ ${
                                    categoria.price % 1 !== 0
                                      ? categoria.price.replace(".", ",")
                                      : categoria.price + ",00"
                                  }`}
                                </p>
                              </div>

                              <div
                                style={{
                                  display: Flex,
                                }}
                              >
                                <Button
                                  className="btn"
                                  style={{
                                    width: 45,
                                    textAlign: "center",
                                    backgroundColor: "red",
                                    color: "#fff",
                                  }}
                                  onClick={() =>
                                    removePedido(categoria, "inteira")
                                  }
                                >
                                  -
                                </Button>

                                <Input
                                  className="input"
                                  style={{
                                    width: 35,
                                    textAlign: "center",
                                    color: "#000",
                                  }}
                                  placeholder="Quantidade"
                                  value={
                                    pedido.find(
                                      (item) => item.id === categoria.id
                                    )?.qtd || 0
                                  }
                                  disabled
                                />

                                <Button
                                  className="btn"
                                  style={{
                                    width: 45,
                                    textAlign: "center",
                                    backgroundColor: "green",
                                    color: "#fff",
                                  }}
                                  onClick={() =>
                                    addPedido(categoria, "inteira")
                                  }
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </Panel>
            </Collapse>
          </Suspense>
        </div>
      );
    });
  };

  return (
    <div style={{ margin: 5 }}>
      {renderCardapioItems()}
      <Drawer
        title="Carrinho"
        placement={"left"}
        width={"100%"}
        onClose={onClose}
        open={open}
      >
        <div style={{ overflow: "auto", height: "65vh" }}>
          {pedido.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                  marginRight: 10,
                }}
              >
                <div>
                  <p className="p_1 name georgia-font">{item.name}</p>
                </div>
                <div>
                  <p className="p_1 price georgia-bold-font">
                    {`${item.qtd}x R$ ${
                      item.price % 1 !== 0 ? item.price : item.price + ",00"
                    } = R$ ${
                      (item.price * item.qtd) % 1 !== 0
                        ? (item.price * item.qtd).toFixed(2).replace(".", ",")
                        : item.price * item.qtd + ",00"
                    }`}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ overflow: "auto" }}>
            {meiaporcao.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px solid #ccc",
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 10,
                    marginRight: 10,
                  }}
                >
                  <div>
                    <p className="p_1 name georgia-font">{item.name}</p>
                  </div>
                  <div>
                    <p className="p_1 price georgia-bold-font">
                      {`${item.qtd}x R$ ${item.price
                        .toFixed(2)
                        .replace(".", ",")} = R$ ${
                        (item.price * item.qtd) % 1 !== 0
                          ? (item.price * item.qtd).toFixed(2).replace(".", ",")
                          : item.price * item.qtd + ",00"
                      }`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="p_1 price georgia-bold-font">Total</p>

          <p className="p_1 price georgia-bold-font">
            {`R$ ${
              pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) %
                1 !==
                0 &&
              meiaporcao.reduce((acc, item) => acc + item.price * item.qtd, 0) %
                1 !==
                0
                ? pedido
                    .reduce((acc, item) => acc + item.price * item.qtd, 0)
                    .toFixed(2)
                    .replace(".", ",")
                : (
                    pedido.reduce(
                      (acc, item) => acc + item.price * item.qtd,
                      0
                    ) +
                    meiaporcao.reduce(
                      (acc, item) => acc + item.price * item.qtd,
                      0
                    )
                  ).toFixed(2)
            }  ${
              bairro === "Outro"
                ? "+ Frete"
                : bairro !== ""
                ? "Frete R$ " + valorFrete + ",00"
                : retirada === "Local"
                ? "+ Frete Grátis"
                : "+ Frete"
            }
            `}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="p_1 price georgia-bold-font">Sub Total</p>
          <p className="p_1 price georgia-bold-font">
            {`R$ ${
              bairro !== "Outro"
                ? (
                    Number(valorFrete) +
                    Number(
                      pedido.reduce(
                        (acc, item) => acc + item.price * item.qtd,
                        0
                      )
                    ) +
                    meiaporcao.reduce(
                      (acc, item) => acc + item.price * item.qtd,
                      0
                    )
                  ).toFixed(2)
                : (
                    Number(
                      pedido.reduce(
                        (acc, item) => acc + item.price * item.qtd,
                        0
                      )
                    ) +
                      (meiaporcao.reduce(
                        (acc, item) => acc + item.price * item.qtd,
                        0
                      ) %
                        1) !==
                    0
                  ).toFixed(2) + " + Frete"
            }`}
          </p>
        </div>

        <div>
          <Button
            type="primary"
            onClick={onFinalizar}
            disabled={pedido.length <= 0 && meiaporcao.length <= 0}
            style={{
              minWidth: 300,
              width: "88vw",
              marginTop: 20,
              backgroundColor: "green",
              borderColor: "green",
              position: "fixed",
              bottom: 10,
            }}
          >
            Finalizar Pedido
          </Button>
        </div>
      </Drawer>
      <Modal
        open={visible}
        closable={true}
        onCancel={() => setVisible(false)}
        disabled={pedido.length === 0}
        confirmLoading={false}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => sendMsm()}
            disabled={pagamento.length <= 0}
            loading={loading}
          >
            Enviar
          </Button>,
        ]}
      >
        <Card title="Finalização de Pedido">
          <div style={{ marginBottom: 10 }}>
            <label>Nome* </label>
            <Input
              placeholder="Nome Completo"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Telefone Aletenativo </label>
            <Input
              placeholder="Telefone"
              value={telefone}
              type="tel"
              maxLength={15}
              onChange={handleTelefoneChange}
            />
          </div>
          {retirada === "Delivery" ? (
            <>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label>Endereço*</label>
                <label style={{ paddingRight: 25 }}>Numero* </label>
              </div>
              <div style={{ marginBottom: 10, display: "flex" }}>
                <Input
                  placeholder="Endereço"
                  onChange={(e) => setEndereco(e.target.value)}
                />
                <Input
                  placeholder="Numero"
                  style={{ width: 100 }}
                  type="number"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label>Bairro* </label>
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Select
                  defaultValue="Selecione"
                  style={{ width: "100%" }}
                  showSearch
                  onChange={handleChangeBairro}
                  value={bairro}
                  options={bairros}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Complemento </label>
                <Input
                  placeholder="Complemento"
                  onBlur={(e) => setComplemento(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Referencia </label>
                <Input
                  placeholder="Referencia"
                  onBlur={(e) => setReferencia(e.target.value)}
                />
              </div>
            </>
          ) : retirada === "Local" ? null : (
            <>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label>Endereço*</label>
                <label style={{ paddingRight: 25 }}>Numero* </label>
              </div>
              <div style={{ marginBottom: 10, display: "flex" }}>
                <Input
                  placeholder="Endereço"
                  onChange={(e) => setEndereco(e.target.value)}
                />
                <Input
                  placeholder="Numero"
                  style={{ width: 100 }}
                  type="number"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <label>Bairro* </label>
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Select
                  defaultValue="Selecione"
                  style={{ width: "100%" }}
                  showSearch
                  onChange={handleChangeBairro}
                  value={bairro}
                  options={bairros}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Complemento </label>
                <Input
                  placeholder="Complemento"
                  onBlur={(e) => setComplemento(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Referencia </label>
                <Input
                  placeholder="Referencia"
                  onBlur={(e) => setReferencia(e.target.value)}
                />
              </div>
            </>
          )}
          <div
            style={{
              marginBottom: 10,
            }}
          >
            <label>Observação </label>
            <TextArea
              placeholder="Observação"
              onBlur={(e) => setObservacao(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Formas de Pagamento* </label>
            <Select
              mode="multiple"
              size={"large"}
              defaultValue="Pix"
              onChange={handleChange}
              style={{
                width: 200,
              }}
              options={options}
            />
          </div>
          <div>
            <label>Troco </label>
            <Input
              placeholder="Troco"
              style={{ width: 100 }}
              onBlur={(e) => setTroco(e.target.value)}
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <p className="p_1 price georgia-bold-font">
              {`Total: R$ ${Number(
                pedido.reduce((acc, item) => acc + item.price * item.qtd, 0) +
                  meiaporcao.reduce(
                    (acc, item) => acc + item.price * item.qtd,
                    0
                  )
              )
                .toFixed(2)
                .replace(".", ",")}`}
            </p>
          </div>
          {bairro === "Outro" ? (
            <div style={{ marginTop: 10 }}>
              <p className="p_1 price georgia-bold-font">
                {`Frete: Valor a Confirmar`}
              </p>
            </div>
          ) : (
            <div style={{ marginTop: 10 }}>
              <p className="p_1 price georgia-bold-font">
                {`Frete: R$ ${valorFrete},00`}
              </p>
            </div>
          )}

          <div style={{ marginTop: 10 }}>
            <p className="p_1 price georgia-bold-font">
              {`Total Geral: R$ ${(
                Number(valorFrete) +
                Number(
                  pedido.reduce((acc, item) => acc + item.price * item.qtd, 0)
                ) +
                Number(
                  meiaporcao.reduce(
                    (acc, item) => acc + item.price * item.qtd,
                    0
                  )
                )
              )
                .toFixed(2)
                .replace(".", ",")}`}
            </p>
          </div>
        </Card>
      </Modal>
      <Modal
        open={visibleMetodoEntrega}
        closable={false}
        footer={[
          <div style={{ textAlign: "center" }}>
            <Button
              key="back"
              type="dashed"
              onClick={() => [
                setVisibleMetodoEntrega(false),
                setRetirada("Local"),
              ]}
            >
              Pegar no Local
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={() => [
                setVisibleMetodoEntrega(false),
                setRetirada("Delivery"),
              ]}
            >
              Delivery
            </Button>
          </div>,
        ]}
        disabled={pedido.length === 0}
        confirmLoading={false}
      >
        <div>
          <div style={{ marginBottom: 10, textAlign: "center" }}>
            <h1>Forma de Entrega* </h1>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeliveryMenu;
