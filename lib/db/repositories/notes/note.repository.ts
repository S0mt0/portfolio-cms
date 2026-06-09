import { createRepository } from "../base.repository";
import type { NoteContent } from "@/lib/types/notes";
import { ObjectId, type Filter } from "mongodb";

const repository = createRepository<NoteContent>("noteContent");

export const noteRepository = {
  ...repository,

  findById(id: string) {
    return repository.findOne({ _id: new ObjectId(id) });
  },

  findBySlug(slug: string) {
    return repository.findOne({ slug });
  },

  findPublished() {
    return repository.findMany({ published: true });
  },

  async findPublishedPaginated({
    page,
    limit,
    query,
  }: {
    page: number;
    limit: number;
    query?: string;
  }) {
    const filter: Filter<NoteContent> = { published: true };

    if (query) {
      const search = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ title: search }, { tags: search }];
    }

    const skip = Math.max(page - 1, 0) * limit;
    const [items, total] = await Promise.all([
      repository
        .collection()
        .find(filter)
        .sort({ publishedAt: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      repository.collection().countDocuments(filter),
    ]);

    return { items, total };
  },

  findRelated(note: NoteContent, limit: number) {
    if (!note.tags?.length) return Promise.resolve([]);

    return repository
      .collection()
      .find({
        published: true,
        slug: { $ne: note.slug },
        tags: { $in: note.tags },
      })
      .sort({ publishedAt: -1, updatedAt: -1 })
      .limit(limit)
      .toArray();
  },

  findFeatured(limit: number) {
    return repository
      .collection()
      .find({ published: true, featured: true })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .toArray();
  },

  findFiltered(filter: Filter<NoteContent> = {}) {
    return repository.findMany(filter);
  },

  updateById(
    id: string,
    data: Partial<Omit<NoteContent, "_id" | "createdAt" | "updatedAt">>
  ) {
    return repository.updateOne({ _id: new ObjectId(id) }, data);
  },

  deleteById(id: string) {
    return repository.deleteOne({ _id: new ObjectId(id) });
  },

  deleteBySlug(slug: string) {
    return repository.deleteOne({ slug });
  },

  deleteManyBySlugs(slugs: string[]) {
    return repository.collection().deleteMany({ slug: { $in: slugs } });
  },
};
