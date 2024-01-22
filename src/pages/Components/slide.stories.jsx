import { SlideRenderer } from "./slide";

export default {
  title: "Components/Slide",
  component: SlideRenderer,
  argTypes: {
    index: { control: "number" },
  },
};

const Template = (args) => <SlideRenderer {...args} />;
export const Slide = Template.bind({});
Slide.args = {
  index: 0,
};
