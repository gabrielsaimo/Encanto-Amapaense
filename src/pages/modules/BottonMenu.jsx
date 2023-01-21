import React, { useEffect, useState } from "react";
import { Anchor, Button, Drawer, Tooltip } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDHuslm5iZZGtOk3ChXKXoIGpQQQI4UaUQ",
  authDomain: "encanto-amapaense.firebaseapp.com",
  projectId: "encanto-amapaense",
  storageBucket: "encanto-amapaense.appspot.com",
  messagingSenderId: "66845466662",
  appId: "1:66845466662:web:6d45a230c3b2ccf49fc6e7",
  measurementId: "G-T9LP3T7QBB",
});

const Menu = () => {
  const db = getFirestore(firebaseConfig);
  const colletionCategory = collection(db, "categorias_cardapio");
  const [cardapioCategory, setCardapioCategory] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [placement, setPlacement] = React.useState("bottom");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  useEffect(() => {
    const getCardapiocategory = async () => {
      const cardapioCollection = await getDocs(colletionCategory);
      const cardapios = cardapioCollection.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setCardapioCategory(cardapios.sort((a, b) => a.id - b.id));
    };

    getCardapiocategory();
  }, []);
  return (
    <div style={{ margin: 5 }}>
      <div style={{ margin: 5 }}>
        <Tooltip title="Pesquisar">
          <Button
            type="primary"
            onClick={showDrawer}
            shape="circle"
            size="large"
            icon={<SearchOutlined />}
          />
        </Tooltip>

        <Drawer
          title="Menu"
          placement={placement}
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Anchor affix={false} showInkInFixed>
            {cardapioCategory.map((item, index) => (
              <Anchor.Link href={`#part-${index}`} title={item.name} />
            ))}
          </Anchor>
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
