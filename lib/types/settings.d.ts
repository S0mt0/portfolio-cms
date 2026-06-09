import type { CmsDocumentBase } from "./shared";

export interface AdminAllowlistEntry extends CmsDocumentBase {
  email: string;
}
