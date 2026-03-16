import { auth } from "../src/config/firebaseConfig";

async function main(): Promise<void> {
  const officerUser = await auth.getUserByEmail("officer@pixell-river.com");
  await auth.setCustomUserClaims(officerUser.uid, { role: "officer" });

  const managerUser = await auth.getUserByEmail("manager@pixell-river.com");
  await auth.setCustomUserClaims(managerUser.uid, { role: "manager" });

  const adminUser = await auth.getUserByEmail("admin@pixell-river.com");
  await auth.setCustomUserClaims(adminUser.uid, { role: "admin" });

  console.log("Custom claims set successfully.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});