const data = {
  root: {
    Fruit: {
      Apple: null,
      Orange: null,
      Lemon: null,
      Berries: {
        Strawberry: null,
        Blueberry: null,
      },
      Banana: null,
    },
    Meals: {
      America: {
        SmashBurger: null,
        Chowder: null,
        Ravioli: null,
        MacAndCheese: null,
        Brownies: null,
      },
      Europe: {
        Risotto: null,
        Spaghetti: null,
        Pizza: null,
        Weisswurst: null,
        Spargel: null,
      },
      Asia: {
        Curry: null,
        PadThai: null,
        Jiaozi: null,
        Sushi: null,
      },
      Australia: {
        PotatoWedges: null,
        PokeBowl: null,
        LemonCurd: null,
        KumaraFries: null,
      },
    },
    Desserts: {
      Cookies: null,
      IceCream: null,
    },
    Drinks: {
      PinaColada: null,
      Cola: null,
      Juice: null,
    },
  },
};

const readTemplate = (template, data = { items: {} }) => {
  for (const [key, value] of Object.entries(template)) {
    data.items[key] = {
      index: key,
      hasChildren: value !== null,
      children: value !== null ? Object.keys(value) : [],
      data: key,
    };

    if (value !== null) {
      readTemplate(value, data);
    }
  }
  return data;
};

const selectData = readTemplate(data);
export default selectData;
