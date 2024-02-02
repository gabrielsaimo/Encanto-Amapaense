import ResizeListener from "../Components/ResizeListener";
import BackgroundImage from "../Components/BackgroundImage";
import { Link } from "react-router-dom";
import { Button, Divider } from "antd";
import { BookOutlined, ShoppingOutlined } from "@ant-design/icons";

function Home() {
  const isMobile = ResizeListener();

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
        {renderButton(
          "/Cardapio",
          styles.button1,
          <BookOutlined />,
          "Cardápio"
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
    </div>
  );
}

export default Home;
