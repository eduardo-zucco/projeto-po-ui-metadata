export interface PoMetadataField {
  property: string;
  label?: string;
  key?: boolean;
  type?: string;
  visible?: boolean;
  width?: number;
}
export interface PoMetadataActions {
  new?: string;
  edit?: string;
  delete?: boolean;
}
export interface PoMetadata {
  title: string;
  fields: PoMetadataField[];
  actions: PoMetadataActions;
}
