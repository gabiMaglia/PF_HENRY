import { getAnalytics, logEvent } from "firebase/analytics";
import axios from "axios";
const urlBack = import.meta.env.VITE_BACKEND_URL;

export const postEvent = (event, params) => {
  //Envio de notificaciónes a FIREBASE

  const analytics = getAnalytics();
  logEvent(analytics, event, params);
};

export const itemToWishlist = async (productId, wishlistProducts, jwt) => {
  let product = wishlistProducts.filter((item) => item.id === productId);
  if (product.length > 0) {
    product = product[0];
    const firebaseParams = {
      currency: "ARS",
      value: product?.name,
      items: [
        {
          item_id: product?.id,
          item_name: product?.name,
          price: product?.price,
        },
      ],
    };
    postEvent("add_to_wishlist", firebaseParams);
  } else {
    const { data } = await axios.get(`${urlBack}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (data) {
      const firebaseParams = {
        currency: "ARS",
        value: data?.name,
        items: [
          {
            item_id: data?.id,
            item_name: data?.name,
            price: data?.price,
          },
        ],
      };
      postEvent("remove_from_wishlist", firebaseParams);
    }
  }
};

export const viewDetailProduct = (product) => {
  const firebaseParams = {
    currency: "ARS",
    value: product?.name,
    items: [
      {
        item_id: product?.id,
        item_name: product?.name,
        item_category: product?.ProductCategories[0]?.name,
        price: product?.price,
      },
    ],
  };
  postEvent("view_item", firebaseParams);
};

export const addProductToCart = (product) => {
  const firebaseParams = {
    currency: "ARS",
    value: product?.name,
    items: [
      {
        item_id: product?.id,
        item_name: product?.name,
        item_category: product?.ProductCategories[0]?.name,
        price: product?.price,
      },
    ],
  };
  const analytics = getAnalytics();
  logEvent(analytics, "add_to_cart", firebaseParams);
};

export const userRegister = () => {
  const firebaseParams = {
    method: "local",
  };
  postEvent("sign_up", firebaseParams);
};

export const userLogin = (method) => {
  console.log(method);
  const firebaseParams = {
    method,
  };
  postEvent("sign_in", firebaseParams);
};

export const userSubmitForm = (form) => {
  const firebaseParams = {
    currency: "ARS",
    value: form,
  };
  postEvent("generate_lead", firebaseParams);
};
