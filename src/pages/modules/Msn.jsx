import React from "react";
import { Button, Divider, Input, message, Modal, Select } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { service } from "../../services/firebase.ws";

export default function Msn() {
  const [ok, setOk] = React.useState(false);
  const [name, setName] = React.useState("");
  const [motivo, setMotivo] = React.useState("");
  const [menssagem, setMensagem] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const db = getFirestore(service);
  const colletionRefMensagens = collection(db, "mensagens");
  const motivos = ["Dúvida", "Sugestão", "Reclamação", "Elogio", "Outros"];
  async function handleSave() {
    await addDoc(colletionRefMensagens, {
      name,
      motivo,
      menssagem,
    });
    message.success("Mensagem enviada com sucesso");
    setVisible(false);
    setOk(true);
  }

  return (
    <>
      {!ok ? (
        <div
          id="part-13"
          style={{
            border: "2px solid",
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            height: 150,
            borderRadius: 10,
          }}
        >
          <h3>Relate aqui como foi sua experiência!</h3>
          <Button onClick={() => setVisible(true)}>
            <MessageOutlined />
          </Button>
          <Modal
            title="Mensagem"
            visible={visible}
            onOk={handleSave}
            onCancel={() => setVisible(false)}
            okText="Enviar"
            cancelText="Cancelar"
          >
            <Divider />
            <Input
              placeholder="Nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Divider />
            <Select
              placeholder="Selecione o Motivo"
              onChange={(e) => setMotivo(e)}
            >
              {motivos.map((motivo) => (
                <Select.Option value={motivo}>{motivo}</Select.Option>
              ))}
            </Select>
            <Divider />
            <Input.TextArea
              placeholder="Mensagem"
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
            />
            <Divider />
          </Modal>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            color: "black",
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Obrigado pelo seu Seu feedback!
        </div>
      )}
    </>
  );
}
