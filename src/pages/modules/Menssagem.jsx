/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { service } from "../../services/firebase.ws";
import { Button, Card, Col, Divider, message, Modal, Row, Space } from "antd";
import "firebase/database";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Menssagem({ atualizar }) {
  const [menssagens, setMenssagens] = useState([]);
  const [actionMensagem, setActionMensagem] = useState(false);
  const db = getFirestore(service);
  const colletionRefMensagens = collection(db, "mensagens");

  useEffect(() => {
    getMensagen();
  }, [actionMensagem, atualizar]);
  const getMensagen = async () => {
    const messagenCollection = await getDocs(colletionRefMensagens);
    const messagen = messagenCollection.docs.map((doc) => ({
      ...doc.data(),
      key: doc.id,
    }));
    setMenssagens(messagen.sort((a, b) => b.id - a.id));
  };
  async function DeletarMensagem(record) {
    const docRef = doc(db, "mensagens", record);
    await deleteDoc(docRef);
    message.success("Mensagem deletada com sucesso!");
    setActionMensagem(!actionMensagem);
  }
  async function handleDelete(record) {
    Modal.confirm({
      title: "Deseja realmente deletar este item?",
      content: "Esta ação não poderá ser desfeita!",
      okText: "Sim",
      cancelText: "Não",
      onOk() {
        DeletarMensagem(record);
      },
    });
  }

  return (
    <>
      <Card>
        <Row justify="start" gutter={20}>
          <Col span={24}>
            <div
              className="site-card-border-less-wrapper"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {menssagens.map((item, index) => (
                <Space key={item.key}>
                  {index % 4 === 0 ? <Divider key={index} /> : null}
                  <Card
                    title={item.motivo}
                    bordered={true}
                    style={{
                      width: 400,
                      height: 300,
                      marginLeft: 20,
                      marginTop: 20,
                      backgroundColor:
                        item.motivo === "Sugestão"
                          ? "#f9fc65"
                          : item.motivo === "Reclamação"
                          ? "#ff8c8c"
                          : item.motivo === "Elogio"
                          ? "#83fc73"
                          : item.motivo === "Duvida"
                          ? "#ffbb7b"
                          : "#f5f5f5",
                    }}
                  >
                    <h3>{"By: " + item.name}</h3>
                    <p>{item.menssagem}</p>
                    <Button
                      style={{ backgroundColor: "red" }}
                      onClick={() => handleDelete(item.key)}
                    >
                      Deletar
                    </Button>
                  </Card>
                </Space>
              ))}
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}
