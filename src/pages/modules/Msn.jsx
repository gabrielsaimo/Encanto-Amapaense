import React from "react";
import { Button, Card, Divider, Input, message, Modal, Select } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { service } from "../../services/firebase.ws";
import { i18n } from "../Translate/i18n";

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
        <Card
          id="part-13"
          style={{
            border: "2px solid",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
            height: 150,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}
        >
          <h3>{i18n.t("Relate_sua_experiência")}</h3>
          <Button
            style={{ width: 200, height: 60 }}
            onClick={() => setVisible(true)}
          >
            <MessageOutlined />
          </Button>
          <Modal
            title={i18n.t("Mensagem")}
            open={visible}
            onOk={handleSave}
            onCancel={() => setVisible(false)}
            okText={i18n.t("Enviar")}
            cancelText={i18n.t("Cancelar")}
          >
            <Divider />
            <Input
              placeholder={i18n.t("Seu Nome")}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Divider />
            <Select
              placeholder={i18n.t("Motivo")}
              aria-required
              style={{ width: 200 }}
              onChange={(e) => setMotivo(e)}
            >
              {motivos.map((motivo, index) => (
                <Select.Option key={index} value={motivo}>
                  {i18n.t(motivo)}
                </Select.Option>
              ))}
            </Select>
            <Divider />
            <Input.TextArea
              placeholder={i18n.t("Mensagem")}
              required
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
            />
            <Divider />
          </Modal>
        </Card>
      ) : (
        <Card
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            color: "black",
            width: 300,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {i18n.t("Mensagem enviada com sucesso")}
        </Card>
      )}
    </>
  );
}
