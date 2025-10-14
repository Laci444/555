import {
  type RouteConfig,
  index,
  route,
  prefix,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  ...prefix("articles", [
    index("routes/article/list.tsx"),
    route(":id", "routes/article/detail.tsx"),
    layout("routes/authProtectedRoute.tsx", [
      route(":id/edit", "routes/article/edit.tsx"),
      route("new", "routes/article/new.tsx"),
    ]),
  ]),
  ...prefix("authors", [
    index("routes/author/list.tsx"),
    route(":id", "routes/author/detail.tsx"),
  ]),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
