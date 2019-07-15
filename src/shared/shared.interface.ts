import { SwaggerEnumType } from "@nestjs/swagger/dist/types/swagger-enum.type";

export interface IApiModelPropertyMetadata {
  description?: string;
  type?: any;
  isArray?: boolean;
  collectionFormat?: string;
  default?: any;
  enum?: SwaggerEnumType;
  format?: string;
  in?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  readOnly?: boolean;
  xml?: any;
  example?: any;
}
