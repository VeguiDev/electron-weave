import Router from "./router/Router.class";

const router = new Router();

// router.register("/", "get", (req, res, next) => {
//   console.log("Frist middleware");

//   req.user = 1;

//   next();
// });

// router.register("/", "get", (req, res, next) => {
//   console.log("Second Middleware");

//   next();
// });

// router.register("/", "get", (req, res, next) => {
//   console.log("Third Middleware");
//   console.log(req, res);
//   next();
// });

// router.register("/user/:uid", "get", (req, res) => {
//   console.log("Controller");
// });

// router.handleRequest(
//   {
//     method: "get",
//     path: "/user/:uid",
//   },
//   {}
// );

router.get("/", (req, res) => {
  console.log("Route " + req.path + " handled by get!");
  console.log(req);
  console.log(res);
});

router.post("/", (req, res) => {
  console.log("Route " + req.path + " handled by post");
  console.log(req);
  console.log(res);
});

router.handleRequest(
  {
    method: "get",
    path: "/",
  },
  {}
);

router.handleRequest(
  {
    method: "post",
    path: "/users",
  },
  {}
);
