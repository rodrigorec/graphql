const data = require("./dummy-data/items");
const { makeid } = require("./utils/helpers");

const Query = {
  item: (parent, args) => {
    return data.items.find((item) => item.id === args.id);
  },
  items: () => data.items,
};

const Mutation = {
  createItem: (parent, args, context) => {
    const { input } = args;
    const newItem = {
      ...input,
      id: makeid(5),
    };
    data.items.push(newItem);
    return newItem;
  },
  deleteItem: (parent, args, context) => {
    const itemToDelete = data.items.find((item) => item.id === args.id);
    if (!itemToDelete) {
      throw new Error("No item found to delete.");
    }
    data.items = data.items.filter((item) => item.id !== args.id);
    return args.id;
  },
  updateItem: (parent, args, context) => {
    const { id, input } = args;

    const itemToUpdateIndex = data.items.findIndex(
      (item) => item.id === id
    );

    if (itemToUpdateIndex === -1) {
      throw new Error("No item found to update.");
    }
    
    const updatedItem = {
        ...input,
        id: data.items[itemToUpdateIndex].id,
    };

    data.items.splice(itemToUpdateIndex, 1, updatedItem);

    return updatedItem;
  },
};

module.exports = {
  Query,
  Mutation,
};
