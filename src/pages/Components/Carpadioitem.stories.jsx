import React from "react";
import CardapioItem from "./CardapioItem";
export default {
  title: "Example/CardapioItem",
  component: CardapioItem,
};

const Template = (args) => <CardapioItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  categoryName: "Nome da Categoria",
  categoryStyle: {
    color: "#7a4827",
    fontWeight: "bold",
    backgroundImage: `url(${require("../../assets/tinta.webp")}) `,
    backgroundRepeat: "no-repeat",
    backgroundSize: 150,
    minWidth: 360,
    backgroundPosition: "center",
    backgroundPositionX: "50%",
    backgroundPositionY: -8,
  },
  item: [
    {
      id: 1,
      name: "Nome do Produto",
      sub: "Subtitulo",
      description: "Descrição",
      price: "00,00",
      type: ["Cardapio"],
      ids: [1, 2, 3],
    },
  ],

  memoizedImgSrc: [
    {
      id: 1,
      url: "https://via.placeholder.com/150",
    },
  ],
  renderImageCarousel: (img1, index, id) => (
    <div key={index} className="flex">
      <img
        className="img"
        key={index}
        src={img1.url}
        alt="img"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  ),
};
