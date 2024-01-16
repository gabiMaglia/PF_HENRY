const PATHROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  SUPPORT: "/support",
  QUESTIONS: "/questions",
  DETAIL: "/product/:id",
  CATEGORIES: "/products/filters/:categoryName",
  REVIEW: "/review",
  CHANGEPASS:'/change_password/:token',
  //USER PANEL
  CUSTOMER_USER_PANEL: "/customer/userPanel",
  ADMIN_USER_PANEL: "/admin/userPanel",
  TECHNICIAN_USER_PANEL: "/technician/userPanel",
  PROFILE: "/profile",
  PRODUCTS_SERVICES: "/productServices",
  //CUSTOMER
  SHOPINGS: "/shoppings",
  WISHLIST: "/wishlist",
  SHOPCART: "/shoppingCart",
  //ADMIN
  PRODUCT_CREATE: "/productCreate",
  USERS_LIST: "/usersList",
  PRODUCTS_LIST: "/productsList",
  SERVICE_LIST: "/servicesList",
  ANALYTICS_INFO: "/analytics",
  //TECHNICIAN
  SERVICE_CREATE: "/serviceCreate",
};

export default PATHROUTES;
