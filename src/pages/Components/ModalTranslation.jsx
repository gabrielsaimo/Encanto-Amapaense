import { Divider, Modal, Radio } from "antd";
import { FlagIcon } from "react-flag-kit";
import React from "react";
import { i18n } from "../Translate/i18n";

const ModalTranslation = ({ onevisitend }) => {
  const options = [
    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="BR" size={20} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
          {i18n.t("portuguese")}
        </div>
      ),
      value: "pt-BR",
    },
    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="ES" size={20} /> <Divider type="vertical" />
          {i18n.t("spanish")}
        </div>
      ),
      value: "es-ES",
    },
    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="US" size={20} /> <Divider type="vertical" />
          {i18n.t("english")}
        </div>
      ),
      value: "en-US",
    },
    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="FR" size={20} /> <Divider type="vertical" />
          {i18n.t("french")}
        </div>
      ),
      value: "fr-FR",
    },
  ];
  <Modal open={onevisitend} footer={null} closable={true}>
    <Radio.Group
      options={options}
      onChange={(value) => [
        localStorage.setItem("i18nextLng", value.target.value),
        i18n.changeLanguage(value.target.value),
        window.location.reload(),
      ]}
      optionType="button"
    />
  </Modal>;
};

export default ModalTranslation;
