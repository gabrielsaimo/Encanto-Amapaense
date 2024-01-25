import ResizeListener from "../Components/ResizeListener";
import BackgroundImage from "../Components/BackgroundImage";
import { Link } from "react-router-dom";
import { Button, Divider } from "antd";
import { BookOutlined, ShoppingOutlined } from "@ant-design/icons";

function Home() {
  const isMobile = ResizeListener();
  const styles = {
    button1: {
      backgroundColor: "#00a758",
      color: "#753d00",
      width: "80vw",
      maxWidth: 400,
      height: "11vh",
      fontSize: "6vh",
    },
    button2: {
      backgroundColor: "#753d00",
      color: "#00a758",
      width: "80vw",
      maxWidth: 400,
      height: "11vh",
      fontSize: "6vh",
    },
  };
  return (
    <div className="App background_fundo">
      <div>
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
          <div className="App-header-content-button">
            <Link to="/Cardapio">
              <Button
                style={styles.button1}
                shape="round"
                icon={<BookOutlined />}
                size={isMobile ? "large" : "middle"}
              >
                <b>Cardápio</b>
              </Button>
            </Link>
          </div>
          <Divider />
          <div className="App-header-content-button">
            <Link to="/Delivery">
              <Button
                style={styles.button2}
                shape="round"
                icon={<ShoppingOutlined />}
                size={isMobile ? "large" : "middle"}
              >
                <b>Delivery</b>
              </Button>
            </Link>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  );
}

export default Home;
