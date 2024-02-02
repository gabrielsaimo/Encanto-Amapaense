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
import {
  CaretRightOutlined,
  ShoppingCartOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import LazyLoad from "react-lazyload";
import "../../css/Collapse.css";
import { getCardapio, getImgCardapio } from "../../services/cardapio.ws";
import {
  getBairros,
  getDados,
  getEmail,
  putPedidos_uniDelivery,
} from "../../services/gerenciamento.ws";
import { getCategoty } from "../../services/category.ws";
import TextArea from "antd/es/input/TextArea";
import { postEmail } from "../../services/email.ws";
import { putPedidos } from "../../services/Pedidos.ws";

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import { getDatabase, ref, set } from "firebase/database";
import currency_BRL from "../Components/CurrencyBRL";

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
  const [bairro, setBairro] = useState("Selecione");
  const [valorFrete, setValorFrete] = useState(0);
  const [loading, setLoading] = useState(false);
  const [retirada, setRetirada] = useState("");
  const [bairros, setBairros2] = useState([]);
  const [dados, setDados] = useState([]);
  const [visibleMetodoEntrega, setVisibleMetodoEntrega] = useState(true);
  const [destinararios, setDestinararios] = useState([]);
  const [random, setRandom] = useState(0);
  const OPTIONS = ["Pix", "Dinheiro", "Credito", "Debito"];
  const filteredOptions = OPTIONS.filter((o) => !pagamento.includes(o));

  async function atualizarMensagens(title, notification, type, company, date) {
    const mensagens = {
      title,
      notification,
      type,
      company,
      date,
    };

    await set(mensagensRef, mensagens)
      .then(() => {
        console.log("Mensagens atualizadas com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao atualizar as mensagens:", error);
      });
  }

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
    setValorFrete(Number(all.price));
  };

  useEffect(() => {
    if (cardapio.length === 0) {
      setRandom(Math.floor(Math.random() * 700070007));
      getCardapios();
      getBairro();

      getEmails();
    }
    if (cardapioCategory.length === 0) {
      getCardapioCategory();
    }
  }, [cardapio]);

  useEffect(() => {
    getDado();
  }, []);

  async function putPedi_UniDelivery() {
    for (let i = 0; i < pedido.length; i++) {
      const body = {
        iditem: pedido[i].id,
        id: Math.floor(Math.random() * 700070007),
        name: pedido[i].name,
        item: pedido[i].item,
        qdt: pedido[i].qdt,
        valor: pedido[i].valor,
        category: pedido[i].category,
        description: pedido[i].description,
        status: "Em Analize",
        created_at: new Date(),
        idpedido: random,
      };
      await putPedidos_uniDelivery(body);
    }
  }

  const sendMsm = async () => {
    await putPedidos({
      id: random,
      created_at: new Date(),
      mesa: 0,
      pedidos: random,
      obs: observacao,
      id_mesa: 0,
      status: "Em Analize",
      valor: Number(
        pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
          meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
      ),
      type: "Delivery",
      info: `{"retirada": "${retirada}","nome": "${nome}","telefone": "${telefone}","endereco": "${endereco}","numero": "${numero}","complemento": "${complemento}","referencia": "${referencia}","pagamento": "${pagamento}","troco": "${troco}","bairro": "${bairro}","frete": "${valorFrete}","total": "${currency_BRL(
        Number(valorFrete) +
          Number(
            pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
              meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
          )
      )}"}`,
    });
    await putPedi_UniDelivery();

    atualizarMensagens(
      `Novo Pedido N°${random}`,
      `${
        retirada === "Delivery"
          ? retirada + "- Bairro: " + bairro
          : "Local para " + nome
      } `,
      "success",
      "Encanto Amapaense Delivery",
      new Date().toLocaleString()
    );
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
      corpo: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset='UTF-8'>
        <title>Email de Finalização de Pedido</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333;
            margin-top: 0;
          }
          p {
            margin-bottom: 20px;
          }
          .signature {
            margin-top: 40px;
            font-style: italic;
            color: #888;
          }
          .info {
            font-weight: bold;
            color: #444;
          }
          .total {
            font-size: 1.2em;
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class='container'>
          <h1 style="color: #4CAF50;">Pedido Recebido</h1>
          <table>
            <tr>
              <th>Nome</th>
              <td>${nome}</td>
            </tr>
            <tr>
              <th>Telefone</th>
              <td>${telefone}</td>
            </tr>
            <tr>
              <th>Endereço</th>
              <td>${endereco}</td>
            </tr>
            <tr>
              <th>Numero</th>
              <td>${numero}</td>
            </tr>
            <tr>
              <th>Bairro</th>
              <td>${bairro !== "Selecione" ? bairro : ""}</td>
            </tr>
            <tr>
              <th>Complemento</th>
              <td>${complemento}</td>
            </tr>
            <tr>
              <th>Referencia</th>
              <td>${referencia}</td>
            </tr>
          </table>
          <h2 style="color: #4CAF50;">Pedido:</h2>
          <table>
            <tr>
              
              <th>Qtd</th>
              <th>Item</th>
            </tr>
            ${pedido
              .map(
                (item) => `<tr><td>x${item.qdt}</td><td>${item.name}</td></tr>`
              )
              .join("")}
            ${meiaporcao
              .map(
                (item) => `<tr><td>x${item.qdt}</td><td>${item.name}</td></tr>`
              )
              .join("")}
          </table>
          <p class="info">Troco: ${troco}</p>
          <p class="info">Observação: ${observacao}</p>
          <p class="info">Metodos de Pagamento: ${pagamento}</p>
          <p class="info">Valor Pedidos: R$ ${
            pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) % 1 !==
            0
              ? currency_BRL(
                  pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                    meiaporcao.reduce(
                      (acc, item) => acc + item.price * item.qdt,
                      0
                    )
                )
              : currency_BRL(
                  pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                    meiaporcao.reduce(
                      (acc, item) => acc + item.price * item.qdt,
                      0
                    )
                )
          }</p>
          <p class="info">Frete: R$ ${valorFrete}</p>
          <p class="total">Valor Total: R$ ${currency_BRL(
            Number(valorFrete) +
              Number(
                pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                  meiaporcao.reduce(
                    (acc, item) => acc + item.price * item.qdt,
                    0
                  )
              )
          )}</p>
          <p>Atenciosamente,</p>
          <p class="signature">Encando Amapaense</p>
        </div>
      </body>
      </html>`,
    };

    const msgDelivey = `Nome: ${nome}%0ATelefone: ${telefone}%0AEndereço: ${endereco}%0ANumero: ${numero}%0ABairro: ${bairro}%0AComplemento: ${complemento}%0AReferencia: ${referencia}%0AObservação: *${observacao}*%0APagamento: *${pagamento}*%0ATroco: ${troco}%0A%0A%0A *Pedido:* %0A ${pedido
      .map((item) => `x${item.qdt} *${item.name}* %0A`)
      .join(", ")} ${meiaporcao
      .map((item) => `x${item.qdt} *${item.name}* %0A`)
      .join(", ")}
      %0ATotal: R$ ${
        pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) % 1 !== 0
          ? currency_BRL(
              pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
            )
          : currency_BRL(
              pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
            )
      }%0AFrete: *R$ ${valorFrete},00*%0ATotal Geral: *R$ ${currency_BRL(
      Number(valorFrete) +
        Number(
          pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
            meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
        )
    )}*${
      bairro === "Outro" || bairro === "Selecione"
        ? "%0A%0A%0A*Vamos Verificar  o valor do Frete*"
        : ""
    }`;

    const msgLocal = `Nome: ${nome}%0ATelefone: ${telefone}%0A%0A%*O Pedido Sera Retirado No Local*%0A*Pedido:* %0A*Pedido:* %0A ${pedido
      .map((item) => `x${item.qdt} *${item.name}* %0A`)
      .join(", ")}%0A${meiaporcao
      .map((item) => `x${item.qdt} *${item.name}* %0A`)
      .join(", ")}
      %0ATotal: R$ ${
        pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) % 1 !== 0
          ? currency_BRL(
              pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
            )
          : currency_BRL(
              pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
            )
      }%0AFrete: *R$ ${valorFrete},00*%0ATotal Geral: *R$ ${currency_BRL(
      Number(valorFrete) +
        Number(
          pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
            meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0)
        )
    )}*${
      bairro === "Outro" || bairro === "Selecione"
        ? "%0A%0A%0A*Vamos Verificar o valor do Frete*"
        : ""
    }`;

    const msg = retirada === "Delivery" ? msgDelivey : msgLocal;
    window.open(
      `https://api.whatsapp.com/send?phone=55${Number(
        dados.phone
      )}&text=${msg}`,
      "_blank"
    );
    window.open(
      `https://encanto-amapaense.vercel.app/MeuPedido/${random}`,
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
      iditem: random,
      id: item.id,
      name: item.name + "***Meia***",
      item: item.item + "***Meia***",
      price: Number(item.price * 0.65),
      valor: Number(item.price * 0.65),
      category: item.category,
      description: item.description,
      status: "Em Analize",
      created_at: new Date(),
      meia: false,
      sub: item.sub,
      active: item.active,
      idpedido: random,
    };
    const Inteirapor = {
      iditem: random,
      id: item.id,
      name: item.name,
      item: item.name,
      price: item.price,
      valor: item.price,
      category: item.category,
      description: item.description,
      status: "Em Analize",
      created_at: new Date(),
      meia: false,
      sub: item.sub,
      active: item.active,
      idpedido: random,
    };
    const pedidoItem = pedido.find((item1) => item1.id === item.id);
    const meiaItem = meiaporcao.find((item1) => item1.id === meiapor.iditem);
    if (type === "meia") {
      if (meiaItem) {
        meiaItem.qdt += 1;
        setMeiaporcao([...meiaporcao]);
      }
    }
    if (pedidoItem) {
      pedidoItem.qdt += 1;
      setPedido([...pedido]);
    }

    if (type === "meia") {
      if (!meiaItem) {
        setMeiaporcao([...meiaporcao, { ...meiapor, qdt: 1 }]);
      }
    } else {
      if (!pedidoItem) {
        setPedido([...pedido, { ...Inteirapor, qdt: 1 }]);
      }
    }
  };

  const removePedido = (item, type) => {
    const pedidoItem = pedido.find((item1) => item1.id === item.id);
    const meiaItem = meiaporcao.find((item1) => item1.id === item.id);
    if (type === "meia") {
      if (meiaItem) {
        if (meiaItem.qdt <= 0) {
          meiaItem.qdt = 0;
          meiaporcao.splice(meiaporcao.indexOf(meiaItem), 1);
          setMeiaporcao([...meiaporcao]);
          return;
        }

        meiaItem.qdt -= 1;
        if (meiaItem.qdt === 0) {
          meiaporcao.splice(meiaporcao.indexOf(meiaItem), 1);
        }

        setMeiaporcao([...meiaporcao]);
      } else {
        setMeiaporcao([...meiaporcao, { ...item, qdt: 1 }]);
      }
    } else {
      if (pedidoItem) {
        if (pedidoItem.qdt <= 0) {
          pedidoItem.qdt = 0;
          pedido.splice(pedido.indexOf(pedidoItem), 1);
          setPedido([...pedido]);
          return;
        }

        pedidoItem.qdt -= 1;
        if (pedidoItem.qdt === 0) {
          pedido.splice(pedido.indexOf(pedidoItem), 1);
        }

        setPedido([...pedido]);
      } else {
        setPedido([...pedido, { ...item, qdt: 1 }]);
      }
    }
  };

  const getBairro = async () => {
    const bairrosCollection = await getBairros();
    setBairros2(bairrosCollection);
  };

  const getDado = async () => {
    const dados = await getDados();
    setDados(dados[0]);
  };

  const getEmails = async () => {
    const emails = await getEmail();
    try {
      emails.map((item) => {
        if (item.type.split(",").includes("Delivery")) {
          return setDestinararios((prev) => [...prev, item.mail]);
        }
      });
    } catch (e) {
      getEmails();
      console.log("Erro", e);
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
                    value={bairro}
                    onChange={handleChangeBairro}
                  >
                    {bairros.map((item, index) => (
                      <Select.Option
                        key={index}
                        value={item.name}
                        label={item.name}
                        price={item.price}
                      >
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
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
          <renderSlides index={index} />
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
                    categoria.meia === true &&
                    categoria.type.includes("Delivery") ? (
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
                                    {categoria.name + "**Meia**"}
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
                                        ? currency_BRL(categoria.price * 0.65)
                                        : currency_BRL(categoria.price * 0.65)
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
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "0px",
                                      }}
                                    >
                                      -
                                    </div>
                                  </Button>

                                  <Input
                                    className="input"
                                    style={{
                                      width: 45,
                                      textAlign: "center",
                                      color: "#000",
                                    }}
                                    placeholder="Quantidade"
                                    value={
                                      meiaporcao.find(
                                        (item) => item.id === categoria.id
                                      )?.qdt || 0
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
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "0px",
                                      }}
                                    >
                                      +
                                    </div>
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
                                    {`R$ ${currency_BRL(categoria.price)}`}
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
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "0px",
                                      }}
                                    >
                                      -
                                    </div>
                                  </Button>

                                  <Input
                                    className="input"
                                    style={{
                                      width: 45,
                                      textAlign: "center",
                                      color: "#000",
                                    }}
                                    placeholder="Quantidade"
                                    value={
                                      pedido.find(
                                        (item) => item.id === categoria.id
                                      )?.qdt || 0
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
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "0px",
                                      }}
                                    >
                                      +
                                    </div>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : categoria.type.includes("Delivery") ? (
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
                                  {`R$ ${currency_BRL(categoria.price)}`}
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
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      height: "0px",
                                    }}
                                  >
                                    -
                                  </div>
                                </Button>

                                <Input
                                  className="input"
                                  style={{
                                    width: 45,
                                    textAlign: "center",
                                    color: "#000",
                                  }}
                                  placeholder="Quantidade"
                                  value={
                                    pedido.find(
                                      (item) => item.id === categoria.id
                                    )?.qdt || 0
                                  }
                                  disabled
                                />

                                <Button
                                  className="btn"
                                  style={{
                                    width: 45,
                                    textAlign: "center",
                                    backgroundColor: "green",
                                    alignItems: "center",
                                    color: "#fff",
                                  }}
                                  onClick={() =>
                                    addPedido(categoria, "inteira")
                                  }
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      height: "0px",
                                    }}
                                  >
                                    +
                                  </div>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
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
        <div style={{ overflow: "auto", height: "60vh" }}>
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
                    {`${item.qdt}x R$ ${currency_BRL(
                      item.price
                    )} = R$ ${currency_BRL(item.price * item.qdt)}`}
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
                      {`${item.qdt}x R$ ${currency_BRL(
                        item.price
                      )} = R$ ${currency_BRL(item.price * item.qdt)}`}
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
              pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) %
                1 !==
                0 &&
              meiaporcao.reduce((acc, item) => acc + item.price * item.qdt, 0) %
                1 !==
                0
                ? currency_BRL(
                    pedido.reduce((acc, item) => acc + item.price * item.qdt, 0)
                  )
                : currency_BRL(
                    pedido.reduce(
                      (acc, item) => acc + item.price * item.qdt,
                      0
                    ) +
                      meiaporcao.reduce(
                        (acc, item) => acc + item.price * item.qdt,
                        0
                      )
                  )
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
          <p className="p_1 price georgia-bold-font">Frete</p>

          <p className="p_1 price georgia-bold-font">
            {valorFrete === 0
              ? "*A Calcular*"
              : `R$ ${currency_BRL(valorFrete)} 
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
                ? currency_BRL(
                    Number(valorFrete) +
                      Number(
                        pedido.reduce(
                          (acc, item) => acc + item.price * item.qdt,
                          0
                        )
                      ) +
                      meiaporcao.reduce(
                        (acc, item) => acc + item.price * item.qdt,
                        0
                      )
                  )
                : currency_BRL(
                    Number(
                      pedido.reduce(
                        (acc, item) => acc + item.price * item.qdt,
                        0
                      )
                    ) +
                      (meiaporcao.reduce(
                        (acc, item) => acc + item.price * item.qdt,
                        0
                      ) %
                        1)
                  ) + " + Frete*"
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
          <div style={{ display: "flex" }}>
            <Button
              key="back"
              onClick={() => setVisible(false)}
              style={{
                backgroundColor: "rgb(255 35 35)",
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: "20vw",
                minWidth: 150,
                fontSize: 20,
                height: 50,
                fontWeight: "bold",
              }}
            >
              Cancelar
            </Button>
            <Button
              key="submit"
              icon={[<WhatsAppOutlined style={{ fontSize: 30 }} />]}
              style={{
                backgroundColor: "#52c41a",
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                width: "20vw",
                minWidth: 150,
                fontSize: 20,
                height: 50,
                fontWeight: "bold",
              }}
              onClick={() => sendMsm()}
              disabled={pagamento.length <= 0}
              loading={loading}
            >
              Enviar
            </Button>
          </div>,
        ]}
      >
        <Card title="Finalização de Pedido">
          <div style={{ marginBottom: 10 }}>
            <label>Nome* </label>
            <Input
              type="text"
              placeholder="Nome Completo"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Telefone</label>
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
                >
                  {bairros.map((item, index) => (
                    <Select.Option
                      key={index}
                      value={item.name}
                      label={item.name}
                      price={item.price}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
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
                >
                  {bairros.map((item, index) => (
                    <Select.Option
                      key={index}
                      value={item.name}
                      label={item.name}
                      price={item.price}
                    >
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
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
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </div>
          {pagamento.includes("Dinheiro") && (
            <div>
              <label>Troco* </label>
              <div>
                <Input
                  placeholder="Troco"
                  type="number"
                  maxLength={3}
                  style={{ width: 100 }}
                  onBlur={(e) => setTroco(e.target.value)}
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: 10 }}>
            <p className="p_1 price georgia-bold-font">
              {`Total: R$ ${currency_BRL(
                Number(
                  pedido.reduce((acc, item) => acc + item.price * item.qdt, 0) +
                    meiaporcao.reduce(
                      (acc, item) => acc + item.price * item.qdt,
                      0
                    )
                )
              )}`}
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
              {`Total Geral: R$ ${currency_BRL(
                Number(valorFrete) +
                  Number(
                    pedido.reduce((acc, item) => acc + item.price * item.qdt, 0)
                  ) +
                  Number(
                    meiaporcao.reduce(
                      (acc, item) => acc + item.price * item.qdt,
                      0
                    )
                  )
              )}`}
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
              style={{ marginRight: 20 }}
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
