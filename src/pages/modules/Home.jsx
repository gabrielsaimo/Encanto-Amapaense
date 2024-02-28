import React from "react";
import ResizeListener from "../Components/ResizeListener";
import BackgroundImage from "../Components/BackgroundImage";
import { Link } from "react-router-dom";
import { Button, Divider, Modal, Radio } from "antd";
import { BookOutlined, ShoppingOutlined } from "@ant-design/icons";
import { i18n } from "../Translate/i18n";
import { FlagIcon } from "react-flag-kit";

function Home() {
  const isMobile = ResizeListener();
  const [language] = React.useState(localStorage.getItem("i18nextLng"));
  const [onevisitend, setOneVisitEnd] = React.useState(false);

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
          <FlagIcon code="US" size={20} style={{ borderRadius: "100%" }} />
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
          <FlagIcon code="ES" size={20} style={{ borderRadius: "100%" }} />
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
          <FlagIcon code="FR" size={20} style={{ borderRadius: "100%" }} />
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
          <FlagIcon code="DE" size={20} style={{ borderRadius: "100%" }} />
          <Divider type="vertical" />
          {i18n.t("german")}
        </div>
      ),
      value: "de-DE",
    },
  ];

  const buttonStyle = {
    width: "80vw",
    maxWidth: 400,
    height: "11vh",
    fontSize: "6vh",
  };

  const styles = {
    button1: {
      ...buttonStyle,
      backgroundColor: "#00a758",
      color: "#753d00",
    },
    button2: {
      ...buttonStyle,
      backgroundColor: "#753d00",
      color: "#00a758",
    },
  };

  const renderButton = (link, style, icon, text) => (
    <div className="App-header-content-button">
      <Link to={link}>
        <Button
          style={style}
          shape="round"
          icon={icon}
          size={isMobile ? "large" : "middle"}
        >
          <b>{text}</b>
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="App background_fundo">
      <div className="App-header-content">
        <div className="App-header-content-logo">
          <BackgroundImage />
          <img
            src={require("../../assets/logo.webp")}
            className="logo"
            alt="logo"
          />
        </div>
        <Divider />
        <Button
          shape="round"
          onClick={() => setOneVisitEnd(true)}
          size={isMobile ? "large" : "large"}
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            margin: "auto",
            height: "8vh",
          }}
        >
          <FlagIcon
            code={language.substring(3, 5)}
            style={{ borderRadius: "100%" }}
            size={50}
          />
          <Divider type="vertical" />
          {i18n.t("changeLanguage")}
        </Button>

        <Divider />
        {renderButton(
          "/Cardapio",
          styles.button1,
          <BookOutlined />,
          i18n.t("menu")
        )}
        <Divider />
        {renderButton(
          "/Delivery",
          styles.button2,
          <ShoppingOutlined />,
          "Delivery"
        )}
        <Divider />
      </div>
      <Modal
        open={onevisitend}
        footer={null}
        closable={true}
        onCancel={() => setOneVisitEnd(false)}
      >
        <Radio.Group
          options={options}
          onChange={(value) => [
            localStorage.setItem("i18nextLng", value.target.value),
            i18n.changeLanguage(value.target.value),
            window.location.reload(),
          ]}
          optionType="button"
        />
      </Modal>
    </div>
  );
}

export default Home;
