const KoaRouter = require("koa-router");
const router = new KoaRouter();
const todo = require("../models/todo");

router.get("/todo", async (ctx, next) => {
  ctx.body = todo.list();
});

router.get("/todo/:id", async (ctx, next) => {
  ctx.body = todo.get();
});

router.post("/todo", async (ctx, next) => {
  ctx.body = todo.create();
  ctx.status = 201;
});

router.put("/todo/:id", async (ctx, next) => {
  ctx.body = todo.update();
});

router.del("/todo/:id", async (ctx, next) => {
  ctx.body = todo.remove();
});

module.exports = router;