import React from "react";
import { Anchor, Button, Collapse, Drawer } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const Menu = ({ open }) => {
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
        <Button
          type="primary"
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
          }}
          onClick={showDrawer}
        >
          <UnorderedListOutlined style={{ fontSize: 30 }} />
        </Button>
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
