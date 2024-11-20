import { DocumentType } from '@prisma/client'

export const DocumentTypeLabel: Record<DocumentType, string> = {
  [DocumentType.RESUME]: 'Resume',
  [DocumentType.COVER_LETTER]: 'Cover Letter',
  [DocumentType.PORTFOLIO]: 'Portfolio',
  [DocumentType.OTHER]: 'Other',
}
