import React from "react";
import { Anchor, Button, Drawer, Tooltip } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";

const Menu = () => {
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

  return (
    <div id="part-14" style={{ margin: 5 }}>
      <div style={{ margin: 5 }}>
        <Tooltip title="search">
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
          <Anchor>
            <Anchor.Link href="#part-0" title="Entradas" />
            <Anchor.Link href="#part-1" title="Mujicas e Caldos" />
            <Anchor.Link href="#part-2" title="Peixe ao molho" />
            <Anchor.Link href="#part-3" title="Peixe frito" />
            <Anchor.Link href="#part-4" title="Peixe na chapa" />
            <Anchor.Link href="#part-5" title="Camarão" />
            <Anchor.Link href="#part-6" title="Carnes" />
            <Anchor.Link href="#part-7" title="Frango" />
            <Anchor.Link href="#part-8" title="Moquecas" />
            <Anchor.Link href="#part-9" title="Caldeiradas" />
            <Anchor.Link href="#part-10" title="Porções extras" />
            <Anchor.Link href="#part-11" title="Sobremesas" />
            <Anchor.Link href="#part-12" title="Bebidas" />
          </Anchor>
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
