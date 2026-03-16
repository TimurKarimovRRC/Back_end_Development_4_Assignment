import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccountJson from "../../assignment-cca09-firebase-adminsdk-fbsvc-75ce29446a.json";

const serviceAccount: ServiceAccount = {
  projectId: serviceAccountJson.project_id,
  clientEmail: serviceAccountJson.client_email,
  privateKey: serviceAccountJson.private_key
};

initializeApp({
  credential: cert(serviceAccount)
});

export const auth = getAuth();