const messages = {
  fr: {
    translations: {
      menu: "Menu",
      delivery: "livraison",
      highlights: "Points forts",
      "Camarão no Bafo": "Crevettes à la Vapeur",
      "Batata ou Macaxeira": "Frites ou Manioc",
      "Camarão Pitú no bafo": "Crevettes à la Vapeur avec Pitu",
      "Camarão Pitú na chapa": "Crevettes Grillées avec Pitu",
      "Comarão rosa empanado": "Crevettes Roses Panées",
      "Camarão Rosa crocante": "Crevettes Roses Croustillantes",
      "Camarão Rosa ao alho e óleo": "Crevettes Roses à l'Ail et à l'Huile",
      "Isca de peixe à milanesa": "Filet de Poisson Pané",
      "Isca de peixe": "Filet de Poisson",
      "Isca de filé c/ fritas": "Lanières de Filet avec Frites",
      "Isca de maminha c/ macaxeira": "Lanières de Maminha avec Manioc",
      "Isca de picanha c/ macaxeira": "Lanières de Picanha avec Manioc",
      "Charque c/ macaxeira": "Viande Séchée avec Manioc",
      "Entrada de Encanto": "Entrée de Charme",
      "Tábua de frios": "Planche de Charcuterie",
      "Cold Cuts Board": "Planche de Charcuterie",
      "Bolinho de Bacalhau": "Beignets de Morue",
      "Casquinha de Caranguejo": "Coquille de Crabe",
      "Bolinho de Macaxeira": "Beignets de Manioc",
      "Caldo de Peixe": "Soupe de Poisson",
      "Camarão Regional": "Crevettes Régionales",
      Mista: "Mixte",
      "Camarão Rosa": "Crevettes Roses",
      "Caldo de Carne": "Soupe de Bœuf",
      "Caldo de Frango": "Soupe de Poulet",
      "Peixe ao molho de camarão Regional":
        "Poisson avec Sauce aux Crevettes Régionales",
      "Peixe Encanto Amapaense": "Poisson de l'Encanto Amapaense",
      "Peixe Escabeche": "Poisson Escabèche",
      "Peixe ao molho branco": "Poisson avec Sauce Blanche",
      "Peixe à delícia": "Poisson Délicieux",
      "Peixe ao molho de alcaparra": "Poisson avec Sauce aux Câpres",
      "Peixe ao molho de castanha": "Poisson avec Sauce aux Noix de Cajou",
      "Peixe ao molho de taperebá": "Poisson avec Sauce au Taperebá",
      "Peixe Recheado": "Poisson Farcie",
      "Peixe Recheado com camarão rosa": "Poisson Farcie aux Crevettes Roses",
      "Peixe Crocante": "Poisson Croustillant",
      "Peixe na crosta de castanha": "Poisson avec Croûte de Noix de Cajou",
      "Peixe Frito": "Poisson Frit",
      "Peixe na chapa c/ legumes": "Poisson Grillé avec Légumes",
      "Peixe na chapa c/ camarão rosa": "Poisson Grillé avec Crevettes Roses",
      "Mistura Tucuju": "Mélange Tucuju",
      "Prato do cheff": "Assiette du Chef",
      "Peixe pai-d'égua": "Poisson Pai-d'égua",
      "Encanto Regional": "Encanto Régional",
      "Sabor do Norte": "Goût du Nord",
      "Camarão Regional empanado": "Crevettes Régionales Panées",
      "Camarão Rosa ao molho branco": "Crevettes Roses avec Sauce Blanche",
      "Camarão Rosa empanado": "Crevettes Roses Panées",
      "Camarão Encanto": "Crevettes de l'Encanto",
      "Camarão Pitú ao alho e óleo": "Crevettes avec Ail et Huile",
      "Estrogonofe de camarão rosa": "Stroganoff de Crevettes Roses",
      "Camarão Rosa no queijo e manteiga":
        "Crevettes Roses avec Fromage et Beurre",
      "Camarão Tropical": "Crevettes Tropicales",
      "Risoto de cantarão Rosa": "Risotto aux Crevettes Roses",
      "Camarão na Moranga": "Crevettes dans la Citrouille",
      "Filé Grehado": "Filet Grillé",
      "Filé c/ fritas": "Filet avec Frites",
      "Filé à Parmegiana": "Filet à la Parmesan",
      "Filé à Rolê": "Filet Roulé",
      "Medalhão de Filé": "Médaillon de Filet",
      "Filé ao molho catupiry": "Filet avec Sauce Catupiry",
      "Picanha c/ macaxeira": "Picanha avec Manioc",
      "Picanha na cerveja": "Picanha à la Bière",
      "Picanha c/ abacaxi e legumes": "Picanha avec Ananas et Légumes",
      "Maninha c/ macaxeira": "Maninha avec Manioc",
      "Frango grelhado": "Poulet Grillé",
      "Frango crocante": "Poulet Croustillant",
      Strogonoff: "Stroganoff",
      Filhote: "Poisson Bébé",
      Camarão: "Crevettes",
      Completa: "Complète",
      Pirarucu: "Pirarucu",
      Baiana: "Baiana",
      Tucunaré: "Tucunaré",
      "Arroz baião": "Riz Baião",
      "Arroz à grega": "Riz à la Grecque",
      "Arroz branco": "Riz Blanc",
      "Arroz paraense": "Riz Pará",
      "Arroz piamontes": "Riz Piamontes",
      "Salada de maionese": "Salade de Mayonnaise",
      "Salada de pirarucu": "Salade de Pirarucu",
      "Salada de Camarão Regional": "Salade de Crevettes Régionales",
      Purê: "Purée",
      Vinagrete: "Vinaigrette",
      "Farofa de ovo": "Farofa aux Œufs",
      "Farofa de camarão": "Farofa aux Crevettes",
      "Legumes refogados": "Légumes Sautés",
      Pirão: "Pirão",
      "Filé kids": "Filet Enfants",
      "Frango kids": "Poulet Enfants",
      "Peixe kids": "Poisson Enfants",
      Mouse: "Souris",
      "Banana flambada c sorvete": "Banane Flambée avec Glace",
      Açaí: "Açaï",
      Pudim: "Flan",
      "Laranja ou Laranja c/ morango": "Orange ou Orange avec Fraise",
      "Limonada ou Limonada suíça": "Limonade ou Limonade Suisse",
      "Sucos diversos": "Jus Divers",
      Jarra: "Pichet",
      "Jarra de laranja": "Pichet d'Orange",
      "Refrigerante lata": "Soda Canette",
      "Refrigerante 1 litro": "Soda 1 litre",
      "Água s/gás": "Eau Plate",
      "Água c/gás": "Eau Gazeuse",
      "Água tônica": "Eau Tonique",
      "Água de coco": "Eau de Coco",
      H20: "h20",
      "Red bull": "Red Bull",
      "Schweppes citrus": "Schweppes Agrumes",
      "Schweppes tônica": "Schweppes Tonic",
      "Cerpinha Export Long Neck": "Cerpinha Export Long Neck",
      "Suco meio do mundo": "Jus Milieu du Monde",
      "Suco doce desejo": "Jus Doux Désir",
      "Gin tônico": "Gin Tonic",
      Marguerita: "Margarita",
      Caipirinha: "Caïpirinha",
      Caipifrutas: "Caïpirifrutas",
      "Coquetal de frutas": "Cocktail de Fruits",

      "(Acomp. Arroz, Purê, Farofa, Tucupi)":
        "(Servi avec du riz, de la purée, de la farofa, du Tucupi)",
      "(c/ camarão rosa)": "(avec des crevettes roses)",
      "(Acomp. Banna a Milanesa, Arroz, Salada de maionese. Farofa, Tucupi)":
        "(Servi avec de la banane panée, du riz, de la salade de mayonnaise, de la farofa, du Tucupi)",
      "(com Camarão Regional / Caranguejo)":
        "(avec des crevettes régionales / du crabe)",
      "(Acomp. Arroz à grega, Purê, Farofa, Tucupi)":
        "(Servi avec du riz grec, de la purée, de la farofa, du Tucupi)",
      "(Acomp. Arroz Baião, Salada de maionese, Farofa, Tucupi)":
        "(Servi avec du riz Baião, de la salade de mayonnaise, de la farofa, du Tucupi)",
      "(Acomp. Arroz , Purê, Farofa, Tucupi)":
        "(Servi avec du riz, de la purée, de la farofa, du Tucupi)",
      "(Acomp. Legumes , Arroz, Purê, Farofa, Tucupi)":
        "(Servi avec des légumes, du riz, de la purée, de la farofa, du Tucupi)",
      "(Camarão Rosa e Pitu)": "(Crevettes roses et Pitu)",
      "(Acomp. Arroz Paraense, Legumes, Purê, Farofa, Tucupi)":
        "(Servi avec du riz Pará, des légumes, de la purée, de la farofa, du Tucupi)",
      "(com Camarão Rosa)": "(avec des crevettes roses)",
      "(Acomp. Arroz Paraense, Abacaxi a milanesa, Purê, Farofa de camarào, Tucupi)":
        "(Servi avec du riz Pará, de l'ananas pané, de la purée, de la farofa aux crevettes, du Tucupi)",
      "(Acomp. Arroz Paraense, Purê, Farofa e Banana)":
        "(Servi avec du riz Pará, de la purée, de la farofa et de la banane)",
      "(camarão empanado /patinha de caranguejo empanado)":
        "(crevettes panées / pince de crabe panée)",
      "(Acomp. Arroz Baião, legumes Refogados, Farofa, salada de maionese, Tucupi)":
        "(Servi avec du riz Baião, des légumes sautés, de la farofa, de la salade de mayonnaise, du Tucupi)",
      "(Acomp. Arroz Baiào, legumes, salada de maionese, farofa de camarão, Tucupi)":
        "(Servi avec du riz Baião, des légumes, de la salade de mayonnaise, de la farofa aux crevettes, du Tucupi)",
      "(Empanado na Castanha)": "(Pané à la châtaigne)",
      "(Acomp. Arroz Farofa de ovo)":
        "(Servi avec du riz et de la farofa aux œufs)",
      "(Acomp. arroz, puré, farofa de ovo, tucupi)":
        "(Servi avec du riz, de la purée, de la farofa aux œufs, du Tucupi)",
      "(Maturada)": "(Maturée)",
      "(Acomp. Arroz Baião, Puré ,Salada de Maionese, farofa, Tucupi)":
        "(Servi avec du riz Baião, de la purée, de la salade de mayonnaise, de la farofa, du Tucupi)",
      "(peixe, frango, camarão rosa, calabresa, maminha)":
        "(poisson, poulet, crevettes roses, calabrese, maminha)",
      "(Acomp. Arroz à grega, Salada de maionese, Farofa, Tucupi)":
        "(Servi avec du riz grec, de la salade de mayonnaise, de la farofa, du Tucupi)",
      "(acomp. arroz, batata palha, puré, farofa, tucupi)":
        "(Servi avec du riz, des pailles de pommes de terre, de la purée, de la farofa, du Tucupi)",
      "(Acomp. Arroz, Pirão, Tucupi)":
        "(Servi avec du riz, du pirão, du Tucupi)",
      "(Filhote, Camarão Rosa)": "(Poisson bébé, Crevettes roses)",
      "(filhote, camarão rosa, Pitú)": "(poisson bébé, crevettes roses, Pitu)",
      "(filhote, camarão rosa)": "(poisson bébé, crevettes roses)",
      "(Filhote, Camarão Rosa, Pitú)": "(Poisson bébé, Crevettes roses, Pitu)",
      "(acomp. arroz, pirão, tucupi)":
        "(servi avec du riz, du pirão, du Tucupi)",
      "(acomp. arroz, pirão, tucupi)(Acomp. Arroz, Pirão,Tucupi)":
        "(servi avec du riz, du pirão, du Tucupi)",
      "(cupuaçu, maracujá e morango)":
        "(cupuaçu, fruit de la passion et fraise)",
      "(porção 350 ml)": "(portion de 350 ml)",
      "(+ 1 real adicional de leite)": "(+ 1 R$ supplémentaire de lait)",
      "(+ 5 reais adicional de leite)": "(+ 5 R$ supplémentaires de lait)",
      "(1,2 litros)": "(1,2 litres)",
      "(Acomp. Arroz. Saladada de maionese, Tropeiro, Tucupi)":
        "(Servi avec du riz, de la salade de mayonnaise, du Tropeiro, du Tucupi)",
      "Limão taiti, couve, gengibre e açúcar":
        "Citron de Tahiti, chou, gingembre et sucre",
      "Suco de laranja, limão e abacaxi, beterraba e açúcar branco ":
        "Jus d'orange, de citron et d'ananas, de betterave et de sucre blanc",
      "Suco de laranja, limão, mel e cenoura":
        "Jus d'orange, de citron, de miel et de carotte",
      "Abacaxi, gengibre, mel e hortelã": "Ananas, gingembre, miel et menthe",
      "Maracuja, mel, gengibre e açucar":
        "Fruit de la passion, miel, gingembre et sucre",
      "Red bull de açai, pitaya, licor de gengibre e gin":
        "Red bull d'açaï, de pitaya, de liqueur de gingembre et de gin",
      "Limoneto, suco de limão, licor de coco e gin":
        "Limoneto, jus de citron, liqueur de noix de coco et gin",
      "Suco de laranja, pedaços de morango e gin":
        "Jus d'orange, morceaux de fraise et gin",
      "Água tônico, suco de limão e gin": "Eau tonique, jus de citron et gin",
      "Suco de limão, tequila, cointreau e curaçau blue":
        "Jus de citron, tequila, cointreau et curaçau bleu",
      "Mix de frutas, leite condensado, creme de leite, espumante e vodka":
        "Mélange de fruits, lait concentré, crème, vin pétillant et vodka",
      "Maça, uva verde, sprite, licor de maça e gin":
        "Pomme, raisin vert, sprite, liqueur de pomme et gin",
      "Black label, cointreau, aperol, suco de laranja e gengibre":
        "Black label, cointreau, aperol, jus d'orange et gingembre",
      "Água tônica, suco de limão, hortelã, barcadí e rum":
        "Eau tonique, jus de citron, menthe, barcadí et rhum",
      "Vinho suave, água tônica, licor de gengibre e gin":
        "Vin doux, eau tonique, liqueur de gingembre et gin",
      "Morango, abacaxi, pitaia, kiwi e frutas vermelhas":
        "Fraise, ananas, pitaya, kiwi et fruits rouges",
      "Abacaxi, limão, hortelã e sagatiba":
        "Ananas, citron, menthe et sagatiba",
      "Mix de frutas, creme de leite, leite condensado e vodka":
        "Mélange de fruits, crème, lait concentré et vodka",

      Entradas: "Entrées",
      "Mujicas e Caldos": "Ragoûts et Bouillons",
      "Peixe ao Molho": "Poisson avec Sauce",
      "Peixe na Chapa": "Poisson Grillé",
      Carnes: "Viandes",
      Frango: "Poulet",
      Moquecas: "Moquecas",
      Caldeiradas: "Ragoûts de Poissons",
      "Porções Extras": "Extra Portions",
      Sobremesas: "Desserts",
      Bebidas: "Boissons",
      Cerveja: "Bières",
      "Sucos exóticos": "Jus Exotiques",
      "bebidas alcolicas": "Boissons Alcoolisées",
      Relate_sua_experiência: "Racontez votre expérience",
      changeLanguage: "Changer de langue",
      english: "Anglais",
      portuguese: "Portugais",
      spanish: "Espagnol",
      french: "Français",
    },
  },
};
export { messages };
