import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { Button, Card, Col, Divider, message, Modal, Row } from "antd";
import "firebase/database";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
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
export default function Menssagem({ atualizar }) {
  const [menssagens, setMenssagens] = useState([]);
  const [actionMensagem, setActionMensagem] = useState(false);
  const db = getFirestore(firebaseConfig);
  const colletionRefMensagens = collection(db, "mensagens");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getMensagen = async () => {
      const messagenCollection = await getDocs(colletionRefMensagens);
      const messagen = messagenCollection.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setMenssagens(messagen.sort((a, b) => b.id - a.id));
    };
    getMensagen();
  }, [actionMensagem, atualizar]);

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
                <>
                  {index % 4 === 0 ? <Divider /> : null}
                  <Card
                    title={item.motivo}
                    bordered={true}
                    style={{ width: 400, height: 300, marginLeft: 20 }}
                  >
                    <h3>{"by: " + item.name}</h3>
                    <p>{item.menssagem}</p>
                    <Button onClick={() => handleDelete(item.key)}>
                      Deletar
                    </Button>
                  </Card>
                </>
              ))}
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}
