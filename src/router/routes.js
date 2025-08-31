// define routes
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // route to IndexPage.vue
      { path: "", component: () => import("pages/IndexPage.vue") },

      // route to PageCoords.vue
      {
        path: "/pagecoords",
        component: () => import("pages/PageCoords.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
