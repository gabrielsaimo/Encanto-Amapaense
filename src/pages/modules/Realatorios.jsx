import { Button, Card, DatePicker, Select, ConfigProvider, Table } from "antd";
import "../../css/Relatorio.css";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import locale from "antd/locale/pt_BR";
import React, { useEffect, useState } from "react";
import {
  getRelatorios_pedidos,
  getRelatorios_vendas,
} from "../../services/relatorios.ws";
import { getUsers } from "../../services/user.ws";
export default function Relatorios(atualizar) {
  const [data, setData] = useState([]);
  const [tpRelatorio, setTpRelatorio] = useState("");
  const [tpPag, setTpPag] = useState("PIX,Crédito,Débito,Dinheiro,Cortesia");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setdataFim] = useState(null);
  const [user, setUser] = useState([]);

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

  useEffect(() => {
    getUsers().then((users) => {
      setUser(users);
    });
  }, [atualizar]);

  const columnsVendas = [
    {
      title: "Data",
      dataIndex: "acepted_at",
      key: "acepted_at",
      fixed: "left",
      width: 110,
      render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
    },

    {
      title: "Garçom",
      dataIndex: "garcom",
      key: "garcom",
      filters: user.map((item) => {
        return {
          text: item.name,
          value: item.name,
        };
      }),

      onFilter: (value, record) => record.garcom.indexOf(value) === 0,
      sorter: (a, b) => a.garcom.length - b.garcom.length,
    },
    {
      title: "Recebido por",
      dataIndex: "recebido_por",
      key: "recebido_por",
      filters: user.map((item) => {
        return {
          text: item.name,
          value: item.name,
        };
      }),
      onFilter: (value, record) => record.recebido_por.indexOf(value) === 0,
      sorter: (a, b) => a.recebido_por.length - b.recebido_por.length,
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
      title: "Taxa 10%",
      dataIndex: "taxa",
      key: "taxa",
      render: (text) => (
        <span>
          {Number(text).toFixed(2) !== "0.00" ? (
            <div>{"R$ " + Number(text).toFixed(2)}</div>
          ) : (
            <div style={{ color: "red" }}>
              {"R$ " + Number(text).toFixed(2)}
            </div>
          )}
        </span>
      ),
    },
    {
      title: "Valor Pago",
      dataIndex: "total_pago",
      key: "total_pago",
      fixed: "right",
      width: 200,
      render: (text) => <span>R$ {Number(text).toFixed(2)}</span>,
    },
  ];

  const columnsPedidos = [
    {
      title: "Quantidade",
      dataIndex: "qdt_vendido",
      key: "qdt_vendido",
      fixed: "left",
      width: 110,
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Valor Unitário",
      dataIndex: "valor_total_uni",
      key: "valor_total_uni",
      fixed: "right",
      width: 200,
      render: (text) => <span>R$ {Number(text).toFixed(2)}</span>,
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
          setTpPag("PIX,Crédito,Débito,Dinheiro,Cortesia"),
        ]}
      >
        <Select.Option value=""></Select.Option>
        <Select.Option value="Vendas">Vendas</Select.Option>
        <Select.Option value="Pedidos">Pedidos</Select.Option>
      </Select>

      <br />

      {(tpRelatorio === "Vendas" || tpRelatorio === "Pedidos") && (
        <div style={{ display: "flex" }}>
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
        style={{ marginTop: 10 }}
        onClick={() => getRelatorio()}
      >
        Gerar relatório
      </Button>

      {data.length > 0 && (
        <div>
          <br />
          <br />
          <Table
            columns={tpRelatorio !== "Vendas" ? columnsPedidos : columnsVendas}
            dataSource={data}
            footer={() =>
              data.length > 0 &&
              "Total Pedirodo: " +
                "R$ " +
                Number(data[0]?.soma_total).toFixed(2)
            }
            pagination={{ pageSize: 30 }}
            scroll={{
              x: 1000,
              y: 500,
            }}
            style={{ marginBottom: 10 }}
            summary={(pageData) => {
              let valorTotal = 0;
              let taxaTotal = 0;
              let descontoCortesia = 0;

              pageData.forEach(({ total_pago, taxa, total_cortesia }) => {
                valorTotal += Number(total_pago);
                descontoCortesia += Number(total_cortesia);
                taxaTotal += Number(taxa);
              });
              return (
                <>
                  {tpRelatorio === "Vendas" && (
                    <Table.Summary.Row>
                      <Table.Summary.Cell></Table.Summary.Cell>
                      <Table.Summary.Cell></Table.Summary.Cell>
                      <Table.Summary.Cell></Table.Summary.Cell>
                      <Table.Summary.Cell></Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <span style={{ fontWeight: "bold", color: "red" }}>
                          R$ -{descontoCortesia.toFixed(2)}
                        </span>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          R$ {taxaTotal.toFixed(2)}
                        </span>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          R${" "}
                          {Number(
                            Number(valorTotal).toFixed(2) -
                              Number(descontoCortesia).toFixed(2)
                          ).toFixed(2)}
                        </span>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )}
                </>
              );
            }}
          />
        </div>
      )}
    </Card>
  );
}