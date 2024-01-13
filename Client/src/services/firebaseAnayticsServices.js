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

export const viewDetailProduct = (product, carousel) => {
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
  if (carousel) {
    firebaseParams.promotion_name = "CarouselTop";
    postEvent("select_promotion", firebaseParams);
  } else {
    postEvent("view_item", firebaseParams);
  }
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
  try {
    const responses = await Promise.all(
      items.map((item) => {
        const response = axios.get(`${urlBack}/product/${item.id}`);
        return response;
      })
    );
    const completeItems = responses.map((item, index) => {
      return {
        item_id: item?.data?.id,
        item_name: item?.data?.name,
        item_category: item?.data?.ProductCategories[0]?.name,
        item_brand: item?.data?.ProductBrands[0]?.name,
        price: item?.data?.price,
        quantity: items[index].count,
      };
    });
    const firebaseParams = {
      currency: "ARS",
      value: total,
      items: completeItems,
    };
    window.localStorage.setItem(
      "purchaseOrder",
      JSON.stringify(firebaseParams)
    );
    postEvent("begin_checkout", firebaseParams);
  } catch (error) {
    return error;
  }
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

export const userSearchEvent = (input) => {
  postEvent("search", { search_term: input });
};

export const clickImportantEvent = (params) => {
  postEvent("select_content", params);
};

export const filtersOrSortEvents = (data, type) => {
  const firebaseParams = {
    value: data,
    filter: type,
  };
  postEvent("filters_or_sort", firebaseParams);
};

export const completePurchaseEvent = (event) => {
  try {
    let firebaseParams = window.localStorage.getItem("purchaseOrder");
    firebaseParams = JSON.parse(firebaseParams);
    postEvent(event, firebaseParams);
  } catch (error) {
    return error;
  }
};
