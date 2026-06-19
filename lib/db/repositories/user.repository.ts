import { ObjectId, type Collection } from "mongodb";

import { db } from "@/lib/db/config";
import type { CmsUser } from "@/lib/types/user";

const collection = (): Collection<CmsUser> => db.collection<CmsUser>("user");

export function toObjectId(id?: string | ObjectId) {
  if (!id) return undefined;

  if (id instanceof ObjectId) return id;

  const trimmedId = id.trim();

  if (!ObjectId.isValid(trimmedId)) throw new Error(`Invalid ObjectId: ${id}`);

  return new ObjectId(trimmedId);
}

export async function getUserById(id: string | ObjectId) {
  const _id = toObjectId(id);
  return collection().findOne({ _id });
}

export async function getUserByEmail(email: string) {
  return collection().findOne({ email: email.toLowerCase() });
}

export async function listUsers() {
  return collection().find({}).sort({ createdAt: -1 }).toArray();
}
