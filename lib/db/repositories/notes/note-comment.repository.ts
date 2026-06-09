import { ObjectId } from "mongodb";

import type { NoteCommentContent } from "@/lib/types/notes";
import { createRepository } from "../base.repository";

const repository = createRepository<NoteCommentContent>("noteComments");

export const noteCommentRepository = {
  ...repository,

  findByNoteSlug(noteSlug: string) {
    return repository
      .collection()
      .find({ noteSlug })
      .sort({ createdAt: -1 })
      .toArray();
  },

  async likeById(id: string) {
    await repository
      .collection()
      .updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } });

    return repository.findOne({ _id: new ObjectId(id) });
  },

  deleteByNoteSlug(noteSlug: string) {
    return repository.collection().deleteMany({ noteSlug });
  },
};
