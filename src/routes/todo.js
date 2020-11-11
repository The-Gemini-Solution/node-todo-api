const KoaRouter = require("koa-router");
const router = new KoaRouter();
const todo = require("../models/todo");

router.get("/todo", async (ctx, next) => {
  ctx.body = await todo.list();
});

router.get("/todo/:id", async (ctx, next) => {
  ctx.body = await todo.get(ctx.params.id);
});

router.post("/todo", async (ctx, next) => {
  ctx.body = await todo.create(ctx.request.body);
  ctx.status = 201;
});

router.put("/todo/:id", async (ctx, next) => {
  ctx.body = await todo.update(ctx.params.id, ctx.request.body);
});

router.del("/todo/:id", async (ctx, next) => {
  ctx.body = todo.remove();
});

module.exports = router;