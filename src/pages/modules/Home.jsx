import ResizeListener from "../Components/ResizeListener";
import BackgroundImage from "../Components/BackgroundImage";
import { Link } from "react-router-dom";
import { Button, Divider } from "antd";
import {
  BookOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

function Home() {
  const isMobile = ResizeListener();

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
                style={{
                  backgroundColor: "#00a758",
                  color: "#753d00",
                  width: "70vw",
                  maxWidth: 400,
                  height: "11vh",
                  fontSize: "6vh",
                }}
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
                style={{
                  backgroundColor: "#753d00",
                  color: "#00a758",
                  width: "70vw",
                  maxWidth: 400,
                  height: "11vh",
                  fontSize: "6vh",
                }}
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
