import React from "react";
import { Button, Divider, Drawer, Radio } from "antd";
import { FlagIcon } from "react-flag-kit";
import { i18n } from "../Translate/i18n";

const DrawerTranslate = ({ open, close }) => {
  const options = [
    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="BR" size={40} style={{ borderRadius: "100%" }} />
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
          <FlagIcon code="US" size={40} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
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
          <FlagIcon code="ES" size={40} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
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
          <FlagIcon code="DE" size={40} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
          {i18n.t("german")}
        </div>
      ),
      value: "de-DE",
    },

    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="FR" size={40} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
          {i18n.t("french")}
        </div>
      ),
      value: "fr-FR",
    },
    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="IN" size={40} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
          {i18n.t("hindi")}
        </div>
      ),
      value: "hi-IN",
    },
    {
      label: (
        <div
          style={{ textAlign: "center", display: "flex", alignItems: "center" }}
        >
          <FlagIcon code="CN" size={40} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
          {i18n.t("chinese")}
        </div>
      ),
      value: "zh-CN",
    },
  ];
  const [language, setLanguage] = React.useState(
    localStorage.getItem("i18nextLng")
  );
  const handleLanguageChange = (value) => {
    localStorage.setItem("i18nextLng", value);
    i18n.changeLanguage(value);
    setLanguage(value);
    close();
  };
  return (
    <Drawer title={i18n.t("changeLanguage")} onClose={close} open={open}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {options.map((option) => (
          <Button
            style={{
              fontSize: "2em",
              height: "80px",
              margin: "10px",
              textTransform: "uppercase",
              fontWeight: "bold",
              borderRadius: "10px",
              backgroundColor: language === option.value ? "green" : "white",
              color: language === option.value ? "white" : "black",
            }}
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Drawer>
  );
};

export default DrawerTranslate;
