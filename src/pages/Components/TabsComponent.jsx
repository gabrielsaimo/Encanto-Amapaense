import { Tabs } from "antd";

export default function TabsComponent({ slot, onChange, items }) {
  return (
    <Tabs
      tabBarExtraContent={slot}
      onChange={onChange}
      key={items}
      type="card"
      items={items}
    />
  );
}
