
// GET /todo
const list = async () => {
  console.log("list")
};

// GET /todo/:id
const get = async () => {
  console.log("get");
};

// POST /todo
const create = async () => {
  console.log("create");
};

// PUT /todo/:id
const update = async () => {
  console.log("update");
};

// DELETE /todo/:id
const remove = async () => {
  console.log("remove");
};

module.exports = {list, get, create, update, remove};
