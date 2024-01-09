import { getAnalytics, logEvent } from "firebase/analytics";

export const postEvent = (event, params) => {
  //Envio de notificaciónes a FIREBASE

  const analytics = getAnalytics();
  logEvent(analytics, event, params);
};
