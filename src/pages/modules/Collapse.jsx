/* eslint-disable  */
import React, { useState, useEffect } from "react";
import { Collapse, Modal } from "antd";
import "../../css/Collapse.css";
import { CaretRightOutlined } from "@ant-design/icons";
import SlidesPrincipal from "./SlidePrincipal";
import SlidesSobemesas from "./SlideSobremesas";
import SlidesBebidas from "./SlideBebidas";
import { getCardapio } from "../../services/cardapio.ws";
import { getCategoty } from "../../services/category.ws";
const { Panel } = Collapse;

const CollapseMenu = () => {
  const [cardapio, setCardapio] = useState([]);
  const [cardapioCategory, setCardapioCategory] = useState([]);
  const [imgModal, setImgModal] = useState(null);
  useEffect(() => {
    cardapio.length === 0 && gtCardapio();
    cardapioCategory.length === 0 && getCardapioCategory();
  }, []);
  const gtCardapio = async () => {
    const cardapioCollection = await getCardapio();
    setCardapio(cardapioCollection);
  };
  const getCardapioCategory = async () => {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection);
  };
  const renderSlides = (index) => {
    if (index === 0) {
      return <SlidesPrincipal />;
    } else if (index === 11) {
      return <SlidesSobemesas />;
    } else if (index === 14) {
      return <SlidesBebidas />;
    }
    return null;
  };

  function closeModal() {
    setModalImgVisible(false);
  }
  const [modalImgVisible, setModalImgVisible] = useState(false);

  const items = cardapioCategory.map((item1, index) => {
    const key = item1.name;

    return (
      <div key={index}>
        {renderSlides(index)}

        <Collapse
          key={index}
          bordered={false}
          header={item1.name}
          defaultActiveKey={Array.from({ length: 31 }, (_, i) => String(i))}
          destroyInactivePanel={false}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: "transparent",
          }}
        >
          <Panel
            id={key}
            style={{
              color: "#7a4827",
              fontWeight: "bold",
              backgroundImage: `url(${require("../../assets/tinta.png")}) `,
              backgroundRepeat: "no-repeat",
              backgroundSize: 150,
              backgroundPositionX: "50%",
              backgroundPositionY: -8,
            }}
            header={item1.name}
          >
            {cardapio.map((categotia, index) => (
              <div key={index}>
                {categotia.category === item1.name &&
                categotia.active === true ? (
                  <div className="border">
                    <div style={{ display: "flex" }}>
                      <div className="flex">
                        <div>
                          <p className="p_1 name georgia-font">
                            {categotia.name}
                          </p>
                        </div>
                        <div className="flex">
                          <div>
                            <div className="sub">
                              {categotia.sub} {categotia.description}
                            </div>
                            <p className="p_1 price georgia-bold-font">
                              {categotia.price % 1 !== 0
                                ? "R$ " + categotia.price.replace(".", ",")
                                : "R$ " + categotia.price + ",00"}
                            </p>
                          </div>
                        </div>
                      </div>
                      {categotia.img === undefined ||
                      categotia.img === null ? null : (
                        <div
                          className="img"
                          style={{
                            position: "relative",
                            
                          }}
                        >
                          <img
                            src={atob(categotia.img)}
                            style={{ borderRadius: 5 }}
                            onClick={() => [
                              setModalImgVisible(true),
                              setImgModal(atob(categotia.img)),
                            ]}
                            alt={categotia.name}
                            width="150"
                            height="150"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </Panel>
        </Collapse>
        <Modal
          open={modalImgVisible}
          onCancel={closeModal}
          footer={null}
          width={"90vw"}
        >
          <img src={imgModal} alt="img" style={{ width: "100%" }} />
        </Modal>
      </div>
    );
  });

  return <div style={{ margin: 5 }}>{items}</div>;
};
export default CollapseMenu;
