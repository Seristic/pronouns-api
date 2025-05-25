export interface Pronoun {
  id: string;
  pronounSetId: string;
  label: string;
  value: string;
  description?: string | null;  // allow null explicitly
  createdAt: Date;
  updatedAt: Date;
}