import { getAnalytics, logEvent } from "firebase/analytics";
import axios from "axios";
const urlBack = import.meta.env.VITE_BACKEND_URL;

export const postEvent = (event, params) => {
  //Envio de notificaciónes a FIREBASE
  console.log(event, params);

  const analytics = getAnalytics();
  logEvent(analytics, event, params);
};

export const itemToWishlist = async (productId, wishlistProducts, jwt) => {
  let product = wishlistProducts.filter((item) => item.id === productId);
  let action;
  if (product.length > 0) {
    action = "add_to_wishlist";
  } else {
    action = "remove_from_wishlist";
  }
  const { data } = await axios.get(`${urlBack}/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (data) {
    const firebaseParams = {
      currency: "ARS",
      value: data?.price,
      items: [
        {
          item_id: data?.id,
          item_name: data?.name,
          item_brand: data?.ProductCategories[0]?.name,
          item_category: data?.ProductBrands[0]?.name,
          price: data?.price,
        },
      ],
    };
    postEvent(action, firebaseParams);
  }
};

export const viewDetailProduct = (product) => {
  const firebaseParams = {
    currency: "ARS",
    value: product?.price,
    items: [
      {
        item_id: product?.id,
        item_name: product?.name,
        item_category: product?.ProductCategories[0]?.name,
        item_brand: product?.ProductBrands[0]?.name,
        price: product?.price,
      },
    ],
  };
  postEvent("view_item", firebaseParams);
};

export const addProductToCart = (product) => {
  const firebaseParams = {
    currency: "ARS",
    value: product?.price,
    items: [
      {
        item_id: product?.id,
        item_name: product?.name,
        item_category: product?.ProductCategories[0]?.name,
        item_brand: product?.ProductBrands[0]?.name,
        price: product?.price,
      },
    ],
  };

  postEvent("add_to_cart", firebaseParams);
};

export const removeProductFromCart = async (product) => {
  try {
    const { data } = await axios.get(`${urlBack}/product/${product}`);
    if (data) {
      const firebaseParams = {
        currency: "ARS",
        value: data?.price,
        items: [
          {
            item_id: data?.id,
            item_name: data?.name,
            item_category: data?.ProductCategories[0]?.name,
            item_brand: data?.ProductBrands[0]?.name,
            price: data?.price,
          },
        ],
      };

      postEvent("remove_from_cart", firebaseParams);
    }
  } catch (error) {
    return error;
  }
};

export const generatePurchaseOrderEvent = async (items, total) => {
  // try {
  //   console.log(items, total);
  //   const responses = await Promise.all(
  //     items.map((item) => {
  //       const { data } = axios.get(`${urlBack}/product/${item.id}`);
  //       return data;
  //     })
  //   );
  //   const items = responses.map((item) => {
  //     return {
  //       item_id: item?.id,
  //       item_name: item?.name,
  //       item_category: item?.ProductCategories[0]?.name,
  //       item_brand: item?.ProductBrands[0]?.name,
  //       price: item?.price,
  //     };
  //   });
  //   console.log(items);
  // } catch (error) {
  //   return error;
  // }
  // // const firebaseParams = {
  // //   currency: "ARS",
  // //   value: data?.total,
  // //   items: [
  // //     {
  // //       item_id: data?.id,
  // //       item_name: data?.name,
  // //       item_category: data?.ProductCategories[0]?.name,
  // //       item_brand: data?.ProductBrands[0]?.name,
  // //       price: data?.price,
  // //     },
  // //   ],
  // // };
  // // postEvent("begin_checkout", firebaseParams);
};

export const userRegister = () => {
  const firebaseParams = {
    method: "local",
  };
  postEvent("sign_up", firebaseParams);
};

export const userLogin = (method) => {
  const firebaseParams = {
    method,
  };
  postEvent("login", firebaseParams);
};

export const userLogoutEvent = () => {
  postEvent("sign_out", {});
};

export const userSubmitForm = (form) => {
  const firebaseParams = {
    currency: "ARS",
    value: form,
  };
  postEvent("generate_lead", firebaseParams);
};

export const createServiceEvent = ({ data }) => {
  const firebaseParams = {
    currency: "ARS",
    value: data?.product_model,
    items: [
      {
        item_id: data?.id,
        item_name: data?.product_model,
        price: data?.Service_status?.budget,
        technician_name: data?.technicianName,
        client_name: data?.clientName,
      },
    ],
  };
  postEvent("create_service", firebaseParams);
};

export const finalServiceEvent = ({ data }, final) => {
  const firebaseParams = {
    currency: "ARS",
    value:
      final === "finished_service"
        ? data?.Service_status?.budget
        : data?.product_model,
    items: [
      {
        item_id: data?.id,
        item_name: data?.product_model,
        price: data?.Service_status?.budget,
        technician_name: data?.technicianName,
        client_name: data?.clientName,
      },
    ],
  };
  postEvent(final, firebaseParams);
};

export const userViewCartEvent = (items, total) => {
  const cartItems = items.map((product) => {
    return {
      item_id: product?.id,
      item_name: product?.name,
      quantity: product.count,
      price: product?.price,
    };
  });

  const firebaseParams = {
    currency: "ARS",
    value: total,
    items: cartItems,
  };

  postEvent("view_cart", firebaseParams);
};
