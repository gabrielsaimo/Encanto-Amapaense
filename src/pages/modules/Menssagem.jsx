import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { Button, Card, Col, message, Modal, Row } from "antd";
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
  const [actionMensagem, setActionMensagem] = useState(true);
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
    const interval = setInterval(() => {
      setCount(count + 1);
      getMensagen();
    }, 5000);

    return () => clearInterval(interval);
  }, [actionMensagem, atualizar]);

  async function DeletarMensagem(record) {
    const docRef = doc(db, "mensagens", record);
    await deleteDoc(docRef);
    message.success("Mensagem deletada com sucesso!");
    setActionMensagem(!menssagens);
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
          <Col span={12}>
            <div className="site-card-border-less-wrapper">
              {menssagens.map((item) => (
                <>
                  <Card
                    title={"by: " + item.name}
                    bordered={true}
                    style={{ width: 300 }}
                  >
                    <p>{item.titulo}</p>
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
