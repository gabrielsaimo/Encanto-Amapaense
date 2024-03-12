import {
  Button,
  Card,
  DatePicker,
  Select,
  ConfigProvider,
  Table,
  Tooltip,
  Tag,
} from "antd";
import "../../css/Relatorio.css";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import locale from "antd/locale/pt_BR";
import React, { useEffect, useState } from "react";
import { TweenOneGroup } from "rc-tween-one";
import Chart from "chart.js/auto";
import {
  getRelatorioGraficoMensal,
  getRelatorios_pedidos,
  getRelatorios_vendas,
} from "../../services/relatorios.ws";

import { getUsers } from "../../services/user.ws";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { currency_BRL } from "../Components/Currency";
export default function Relatorios(atualizar) {
  const [data, setData] = useState([]);
  const [dataGrafico, setDataGrafico] = useState([]);
  const [tpRelatorio, setTpRelatorio] = useState("");
  const [tpPag, setTpPag] = useState("PIX,Crédito,Débito,Dinheiro,Cortesia");
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setdataFim] = useState(null);
  const [dataMesAno, setdataMesAno] = useState([]);
  const [user, setUser] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [typeGrafico, setTypeGrafico] = useState("doughnut");
  const [menu, setMenu] = useState(false);
  const handleClose = (removedTag) => {
    const newTags = dataMesAno.filter((tag) => tag !== removedTag);
    setdataMesAno(newTags);
  };
  async function getRelatorio() {
    setMenu(false);
    let bobydate = {
      data_inicial: dataInicio + " 00:00:00.001",
      data_final: dataFim + " 23:59:59.999",
      tipo: tpPag,
    };

    let bobydateGrafico = {
      messes: dataMesAno.toString(),
    };

    if (tpRelatorio === "Vendas") {
      const data = await getRelatorios_vendas(bobydate);
      setData(data);
    } else if (tpRelatorio === "Pedidos") {
      const data = await getRelatorios_pedidos(bobydate);
      setData(data);
    } else if (tpRelatorio === "Grafico") {
      const data = await getRelatorioGraficoMensal(bobydateGrafico);
      setDataGrafico(data);
    }
  }

  useEffect(() => {
    getUsers().then((users) => {
      setUser(users);
    });
  }, [atualizar]);

  async function changeTypeGrafico(value) {
    setTypeGrafico(value);
  }

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (tpRelatorio === "Grafico" && dataGrafico.length > 0) {
      const ctx = document.getElementById("meuGrafico").getContext("2d");
      const newChartInstance = new Chart(ctx, {
        type: typeGrafico,
        data: {
          labels: dataGrafico.map((item) => `${item.numero_mes}/${item.ano}`),
          datasets: [
            {
              label: "R$",
              data: dataGrafico.map((item) => parseFloat(item.soma_total)),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#68ff16",
                "#ff16e6",
                "#16ffdd",
                "#ff9d16",
                "#ff1616",
                "#1616ff",
                "#16ff16",
                "#ff16ff",
                "#16ffff",
              ],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: "bottom",

              labels: {
                color: "rgb(255, 99, 132)",
              },
            },

            title: {
              display: true,
              text: "Relatório Mensal",
              color: "rgb(255, 99, 132)",
              font: {
                size: 20,
              },
            },
            tooltip: {
              enabled: true,
              intersect: false,
              mode: "index",
              callbacks: {
                label: function (tooltipItem, data) {
                  var valor = tooltipItem.formattedValue;
                  return "R$ " + valor;
                },
              },
            },
          },

          responsive: true,
        },
      });
      setChartInstance(newChartInstance);
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tpRelatorio, dataGrafico, typeGrafico]);

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
            return <div key={i}>{"R$ " + currency_BRL(Number(item))}</div>;
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
            <div>{"R$ " + currency_BRL(Number(text))}</div>
          ) : (
            <div style={{ color: "red" }}>
              {"R$ " + currency_BRL(Number(text))}
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
      render: (text) => <span>R$ {currency_BRL(Number(text))}</span>,
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

  async function datasMeseAno(e) {
    if (e) {
      const originalDate1 = new Date(e);
      const formattedDate1 = `${originalDate1.getFullYear()}-${(
        originalDate1.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;

      setdataMesAno([...dataMesAno, formattedDate1]);
    }
  }

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };

  const tagChild = dataMesAno.map(forMap);

  return (
    <Card style={{ minHeight: "90vh" }}>
      {!menu ? (
        <MenuOutlined
          style={{ fontSize: 30, color: "#1890ff" }}
          onClick={() => setMenu(!menu)}
        />
      ) : (
        <CloseOutlined
          style={{ fontSize: 30, color: "#1890ff" }}
          onClick={() => setMenu(!menu)}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <br />
          {menu && (
            <>
              <h3>Selecione o relatório</h3>
              <Select
                style={{ width: 120 }}
                defaultValue="Selecione"
                onChange={(e) => [
                  setTpRelatorio(e),
                  setData([]),
                  setDataInicio(null),
                  setdataFim(null),
                  setdataMesAno([]),
                  setTpPag("PIX,Crédito,Débito,Dinheiro,Cortesia"),
                ]}
              >
                <Select.Option value=""></Select.Option>
                <Select.Option value="Vendas">Vendas</Select.Option>
                <Select.Option value="Pedidos">Pedidos</Select.Option>
                <Select.Option value="Grafico">Grafico</Select.Option>
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
                      style={{ width: 130 }}
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
              {tpRelatorio === "Grafico" && (
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: 10 }}>
                    <h3>Selecione o período</h3>
                    <ConfigProvider locale={locale}>
                      <DatePicker
                        onChange={(e) => datasMeseAno(e)}
                        picker="month"
                      />
                    </ConfigProvider>
                  </div>
                  <div>
                    <div style={{ alignItems: "center" }}>
                      <h3>Tipo Gráfico</h3>
                      <Select
                        style={{ width: 120 }}
                        defaultValue="doughnut"
                        onChange={(e) => changeTypeGrafico(e)}
                      >
                        <Select.Option value="bar">Barra</Select.Option>
                        <Select.Option value="line">Linha</Select.Option>
                        <Select.Option value="pie">Pizza</Select.Option>
                        <Select.Option value="doughnut">Rosca</Select.Option>
                        <Select.Option value="polarArea">Polar</Select.Option>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="primary"
                disabled={dataMesAno.length === 0 && !dataInicio && !dataFim}
                style={{ marginTop: 10 }}
                onClick={() => getRelatorio()}
              >
                Gerar relatório
              </Button>
            </>
          )}
        </div>
        {tpRelatorio === "Grafico" && (
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              width: 100,
            }}
          >
            <TweenOneGroup
              enter={{
                scale: 0.8,
                opacity: 0,
                type: "from",
                duration: 100,
              }}
              onEnd={(e) => {
                if (e.type === "appear" || e.type === "enter") {
                  e.target.style = "display: inline-block ";
                }
              }}
              leave={{
                opacity: 0,
                width: 0,
                scale: 0,
                duration: 200,
              }}
              appear={false}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
        )}

        <div style={{ width: menu ? "65vw" : "100%" }}>
          {data.length > 0 && (
            <div>
              <br />
              <br />
              <Table
                columns={
                  tpRelatorio === "Vendas"
                    ? columnsVendas
                    : tpRelatorio === "Pedidos"
                    ? columnsPedidos
                    : []
                }
                dataSource={data}
                pagination={{ pageSize: 30 }}
                scroll={{
                  x: 1500,
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
                        <Table.Summary.Row
                          fixed
                          style={{
                            position: "sticky",
                            bottom: 0,
                            background: "#f0f0f0",
                            zIndex: 1,
                          }}
                        >
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell></Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Tooltip title="Cortesia" color={"red"}>
                              <span
                                style={{ fontWeight: "bold", color: "red" }}
                              >
                                R$ -{currency_BRL(descontoCortesia)}
                              </span>
                            </Tooltip>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Tooltip title="10%" color={"green"}>
                              <span
                                style={{ fontWeight: "bold", color: "green" }}
                              >
                                R$ {taxaTotal.toFixed(2)}
                              </span>
                            </Tooltip>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Tooltip title="Soma Total" color={"green"}>
                              <span
                                style={{ fontWeight: "bold", color: "green" }}
                              >
                                R${" "}
                                {currency_BRL(
                                  Number(
                                    Number(valorTotal).toFixed(2) -
                                      Number(descontoCortesia).toFixed(2)
                                  )
                                )}
                              </span>
                            </Tooltip>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      )}
                    </>
                  );
                }}
              />
            </div>
          )}

          {tpRelatorio === "Grafico" && dataGrafico.length > 0 && (
            <div style={{ width: "50%" }}>
              <br />
              <br />
              <canvas id="meuGrafico"></canvas>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
