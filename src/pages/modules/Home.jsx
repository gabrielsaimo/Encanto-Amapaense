import React, { useState, useCallback, useMemo } from "react";
import ResizeListener from "../Components/ResizeListener";
import BackgroundImage from "../Components/BackgroundImage";
import { Link } from "react-router-dom";
import { Button, Divider } from "antd";
import { BookOutlined, ShoppingOutlined } from "@ant-design/icons";
import { i18n } from "../Translate/i18n";
import { FlagIcon } from "react-flag-kit";
import DrawerTranslate from "../Components/DrawerTranslate";
import { HappyProvider } from "@ant-design/happy-work-theme";
import logo from "../../assets/logo.webp";

function Home() {
  const isMobile = ResizeListener();
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setLanguage(localStorage.getItem("i18nextLng"));
  }, []);

  const buttonStyle = useMemo(
    () => ({
      width: "80vw",
      maxWidth: 400,
      height: "11vh",
      fontSize: "6vh",
    }),
    []
  );

  const styles = useMemo(
    () => ({
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
    }),
    [buttonStyle]
  );

  const renderButton = useCallback(
    (link, style, icon, text) => (
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
    ),
    [isMobile]
  );

  return (
    <div className="App background_fundo">
      <div className="App-header-content">
        <div className="App-header-content-logo">
          <img src={logo} className="logohome" alt="logo" />
        </div>
        <Divider />
        <HappyProvider>
          <Button
            shape="round"
            onClick={openDrawer}
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
        </HappyProvider>
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

      <DrawerTranslate open={isDrawerOpen} close={closeDrawer} />
    </div>
  );
}

export default React.memo(Home);
