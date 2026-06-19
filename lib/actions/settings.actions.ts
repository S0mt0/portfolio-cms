"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

import { requireAdminSession } from "@/lib/auth/guards";
import { client, db } from "@/lib/db/config";
import {
  adminAllowlistRepository,
  envAdminEmails,
  normalizeAdminEmail,
} from "@/lib/db/repositories/admin-allowlist.repository";
import { isValidEmail } from "../utils";
import { mailService } from "../services";
import { getUserByEmail } from "../db/repositories/user.repository";

export async function addAdminEmail(email: string) {
  await requireAdminSession();

  const normalized = normalizeAdminEmail(email);
  if (!normalized || !isValidEmail(normalized)) {
    return { error: "Enter a valid admin email." };
  }

  await Promise.all([
    adminAllowlistRepository.add(normalized),
    mailService.sendAccessGrantedEmail(normalized),
  ]);
  revalidatePath("/settings");
}

export async function removeAdminEmail(email: string) {
  const session = await requireAdminSession();
  const normalized = normalizeAdminEmail(email);

  if (envAdminEmails.includes(normalized)) {
    return { error: "Env admins cannot be removed from the CMS." };
  }

  if (normalizeAdminEmail(session.user.email) === normalized) {
    return { error: "You cannot remove your own admin email here." };
  }

  const tx = client.startSession();

  try {
    // Start Transaction
    tx.startTransaction();
    const evicted = await getUserByEmail(email);

    // 1. Remove email from allowed email list record
    await adminAllowlistRepository.remove(normalized);

    // 2. Delete their accounts from databse
    await db.collection("account").deleteOne({
      userId: new ObjectId(evicted?._id),
    });
    db.collection("user").deleteOne({ _id: evicted?._id });

    // 3. Delete and end their session
    await db.collection("session").deleteOne({
      userId: evicted?._id,
    });

    // Commit Transaction
    await tx.commitTransaction();

    mailService.sendAccessRevokedEmail(normalized);
    revalidatePath("/settings");
  } catch (error) {
    console.log("An error occurred during the transaction: " + error);
    // Abort Transaction
    await tx.abortTransaction();
  } finally {
    // End Transaction
    await tx.endSession();
  }
}

export async function deleteCurrentAccount() {
  const session = await requireAdminSession();
  const userId = session.user.id;

  await Promise.all([
    db.collection("session").deleteMany({ userId }),
    db.collection("account").deleteMany({ userId }),
    db.collection("user").deleteOne({ id: userId }),
  ]);
}
