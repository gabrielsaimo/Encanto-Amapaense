import {
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Select,
  ConfigProvider,
  Space,
  Table,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import locale from "antd/locale/pt_BR";
import React, { useEffect, useState } from "react";
import {
  getRelatorios_pedidos,
  getRelatorios_vendas,
} from "../../services/relatorios.ws";
export default function Relatorios(atualizar) {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tpRelatorio, setTpRelatorio] = useState("");
  const [tpPag, setTpPag] = useState("PIX,Crédito,Débito,Dinheiro,Cortezia");

  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setdataFim] = useState(null);

  async function getRelatorio() {
    let bobydate = {
      data_inicial: dataInicio + " 00:00:00.001",
      data_final: dataFim + " 23:59:59.999",
      tipo: tpPag,
    };
    if (tpRelatorio === "Vendas") {
      const data = await getRelatorios_vendas(bobydate);
      setData(data);
    } else if (tpRelatorio === "Pedidos") {
      const data = await getRelatorios_pedidos(bobydate);
      setData(data);
    }
  }

  const columnsVendas = [
    {
      title: "Data",
      dataIndex: "acepted_at",
      key: "acepted_at",
      render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Tipo Pagamento",
      dataIndex: "tppg",
      key: "tppg",
      render: (text) => (
        <span>
          {text.split(",").map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </span>
      ),
      sorter: (a, b) => a.tppg.length - b.tppg.length,
    },
    {
      title: "Valores Pagos",
      dataIndex: "valorpg",
      key: "valorpg",
      render: (text) => (
        <span>
          {text.split(",").map((item, i) => {
            return <div key={i}>{"R$ " + Number(item).toFixed(2)}</div>;
          })}
        </span>
      ),
    },
    {
      title: "Garçom",
      dataIndex: "garcom",
      key: "garcom",
      sorter: (a, b) => a.garcom.length - b.garcom.length,
    },
    {
      title: "Recebido por",
      dataIndex: "recebido_por",
      key: "recebido_por",
    },
    {
      title: "Valor Pago",
      dataIndex: "total_pago",
      key: "total_pago",
      render: (text) => <span>R$ {Number(text).toFixed(2)}</span>,
    },
  ];

  const columnsPedidos = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Quantidade",
      dataIndex: "qdt_vendido",
      key: "qdt_vendido",
    },
    {
      title: "Valor Unitário",
      dataIndex: "valor_total_uni",
      key: "valor_total_uni",
      render: (text) => <span>R$ {text}</span>,
    },
  ];

  async function datas(e) {
    setDataInicio(null);
    setdataFim(null);
    if (e) {
      const originalDate1 = new Date(e[0]);
      const originalDate2 = new Date(e[1]);

      const formattedDate1 = `${originalDate1.getFullYear()}-${(
        originalDate1.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${originalDate1
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const formattedDate2 = `${originalDate2.getFullYear()}-${(
        originalDate2.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${originalDate2
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      setDataInicio(formattedDate1);
      setdataFim(formattedDate2);
    }
  }

  return (
    <Card>
      <h1>Relatórios</h1>
      <br />
      <h3>Selecione o relatório</h3>
      <Select
        style={{ width: 120 }}
        defaultValue="Selecione"
        onChange={(e) => [
          setTpRelatorio(e),
          setData([]),
          setTpPag("PIX,Crédito,Débito,Dinheiro,Cortezia"),
        ]}
      >
        <Select.Option value=""></Select.Option>
        <Select.Option value="Vendas">Vendas</Select.Option>
        <Select.Option value="Pedidos">Pedidos</Select.Option>
      </Select>

      <br />

      {(tpRelatorio === "Vendas" || tpRelatorio === "Pedidos") && (
        <div style={{ display: "flex", marginBottom: 10 }}>
          <div style={{ marginRight: 10 }}>
            <h3>Selecione o período</h3>
            <ConfigProvider locale={locale}>
              <DatePicker.RangePicker onChange={(e) => datas(e)} />
            </ConfigProvider>
          </div>
          <div style={{ display: tpRelatorio === "Pedidos" && "none" }}>
            <h3>Tipo Pagamento</h3>
            <Select
              style={{ width: 120 }}
              defaultValue="Todos"
              onChange={(e) => [setTpPag(e)]}
            >
              <Select.Option value="PIX,Crédito,Débito,Dinheiro,Cortesia">
                Todos
              </Select.Option>
              <Select.Option value="PIX">Pix</Select.Option>
              <Select.Option value="Crédito">Crédito</Select.Option>
              <Select.Option value="Débito">Débito</Select.Option>
              <Select.Option value="Dinheiro">Dinheiro</Select.Option>
              <Select.Option value="Cortesia">Cortesia</Select.Option>
            </Select>
          </div>
        </div>
      )}
      <Button
        type="primary"
        disabled={!dataInicio && !dataFim}
        onClick={() => getRelatorio()}
      >
        Gerar relatório
      </Button>

      {data.length > 0 && (
        <div>
          <br />
          <br />
          <Table
            columns={tpRelatorio === "Vendas" ? columnsVendas : columnsPedidos}
            dataSource={data}
            footer={() =>
              data.length > 0 &&
              "Valor Total Somado: " +
                "R$ " +
                Number(data[0]?.soma_total).toFixed(2)
            }
            pagination={{ pageSize: 30 }}
          />
        </div>
      )}
    </Card>
  );
}
