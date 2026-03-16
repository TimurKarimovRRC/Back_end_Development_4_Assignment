import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as serviceAccount from "../../assignment-cca09-firebase-adminsdk-fbsvc-75ce29446a.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount)
});

export const auth = getAuth();