import Router from "./router/Router.class";

const router = new Router();

router.register("/", "get", (req, res, next) => {
  console.log("Frist middleware");

  req.user = 1;

  next();
});

router.register("/", "get", (req, res, next) => {
  console.log("Second Middleware");

  next();
});

router.register("/", "get", (req, res, next) => {
  console.log("Third Middleware");
  console.log(req, res);
  next();
});

router.register("/user/:uid", "get", (req, res) => {
  console.log("Controller");
});

router.handleRequest(
  {
    method: "get",
    path: "/user/:uid",
  },
  {}
);
