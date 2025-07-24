export interface PoMetadataField {
  property: string;          // Nome da propriedade/campo
  label?: string;            // Texto para cabeçalho da coluna
  required?: boolean;        // Se o campo é obrigatório
  showRequired?: boolean;    // Mostrar indicador de obrigatório
  gridColumns?: number;      // Quantidade de colunas na grid (se aplicável)
  maxLength?: number;        // Tamanho máximo do campo (string)
  maxValue?: number;         // Valor máximo (number)
  type?: 'string' | 'number' | 'boolean' | 'date';  // Tipo do campo
  placeholder?: string;      // Texto placeholder
  container?: string;        // Grupo/container do campo
  errorMessage?: string;     // Mensagem de erro personalizada
  align?: 'left' | 'right' | 'center';  // Alinhamento da coluna na tabela
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
  serviceApi: string;
}
