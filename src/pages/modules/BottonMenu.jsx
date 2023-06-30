/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Anchor, Button, Drawer, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getCategoty } from "../../services/category.ws";
const Menu = () => {
  const [cardapioCategory, setCardapioCategory] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    cardapioCategory.length === 0 && getCardapiocategory();
  }, []);
  const getCardapiocategory = async () => {
    const cardapioCollection = await getCategoty();
    setCardapioCategory(cardapioCollection.sort((a, b) => a.id - b.id));
  };
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
          placement={"bottom"}
          closable={false}
          onClose={onClose}
          open={visible}
        >
          <Anchor
            affix={false}
            showInkInFixed
            items={cardapioCategory.map((item, index) => ({
              href: `#${item.name}`,
              key: `${index}`,
              title: `${item.name}`,
            }))}
          />
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
