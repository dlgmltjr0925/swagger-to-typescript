/**
 * https://swagger.io/specification/v2/
 */

/**
 * list of mime types
 * http://www.iana.org/assignments/media-types/media-types.xhtml
 */
type MimeType = string;

export interface ContactObject {
  name?: string;
  url?: string;
  email?: string;
}

export interface LicenseObject {
  name: string;
  url?: string;
}

export interface InfoObject {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
  version: string;
}

interface XMLObject {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
}

export interface ExternalDocumentationObject {
  description?: string;
  url: string;
}

export interface SchemaObject {
  discriminator?: string;
  readOnly?: boolean;
  xml?: XMLObject;
  externalDocs?: ExternalDocumentationObject;
  example?: any;
}

interface ParameterObjectBase {
  name: string;
  description?: string;
  required?: boolean;
}

interface ParameterObjectBody extends ParameterObjectBase {
  in: 'body';
  schema: SchemaObject;
}

interface ItemsObject {
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'array';
  format?: string;
  items?: ItemsObject;
  collectionFormat?: 'csv' | 'ssv' | 'tsv' | 'pipes';
  default?: any;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  enum?: any[];
  multipleOf?: number;
}

interface ParameterObjectOther
  extends Omit<ItemsObject, 'type' | 'collectionFormat'> {
  in: 'query' | 'header' | 'path' | 'formData';
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'file';
  collectionFormat?: 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
  allowEmptyValue?: boolean;
}

export type ParameterObject = ParameterObjectBody | ParameterObjectOther;

export interface HeadersObject extends ItemsObject {
  description?: string;
}

export interface ExampleObject {
  [mimeType: string]: any;
}

export interface ResponseObject {
  description: string;
  schema?: SchemaObject;
  headers?: HeadersObject;
  examples?: ExampleObject;
}

export interface ReferenceObject {
  $ref: string;
}

export interface ResponsesObject {
  default?: ResponseObject | ReferenceObject;
}

export type Scheme = 'http' | 'https' | 'ws' | 'wss';

export interface SecurityRequirementObject {
  [name: string]: string[];
}

export interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
  operationId?: string;
  consumes?: MimeType[];
  produces?: MimeType[];
  parameters?: ParameterObject | ReferenceObject;
  responses: ResponsesObject;
  schemes?: Scheme[];
  deprecated?: boolean;
  security?: SecurityRequirementObject[];
}

export interface PathItemObject {
  $ref?: string;
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
  parameters?: ParameterObject | ReferenceObject;
}

export interface PathsObject {
  [key: string]: PathItemObject;
}

export interface DefinitionsObject {
  [name: string]: SchemaObject;
}

export interface ParametersDefinitionsObject {
  [name: string]: ParameterObject;
}

export interface ResponsesDefinitionsObject {
  [name: string]: ResponseObject;
}

export interface SecuritySchemeObjectBase {
  description?: string;
}

export interface SecuritySchemeObjectBasic extends SecuritySchemeObjectBase {
  type: 'basic';
}

export interface SecuritySchemeObjectApiKey extends SecuritySchemeObjectBase {
  type: 'apiKey';
  name: string;
  in: 'query' | 'header';
}

export interface ScopesObject {
  [name: string]: string;
}

export interface SecuritySchemeObjectOAuth2 extends SecuritySchemeObjectBase {
  type: 'oauth2';
  flow: string;
  authorizationUrl: string;
  tokenUrl: string;
  scopes: ScopesObject;
}

export type SecuritySchemeObject =
  | SecuritySchemeObjectBasic
  | SecuritySchemeObjectApiKey
  | SecuritySchemeObjectOAuth2;

export interface SecurityDefinitionsObject {
  [name: string]: SecuritySchemeObject;
}

export interface TagObject {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentationObject;
}

export interface SwaggerObject {
  swagger: string;
  info: InfoObject;
  host?: string;
  basePath?: string;
  schemes?: Scheme[];
  consumes?: MimeType[];
  produces?: MimeType[];
  paths: PathsObject;
  definitions?: DefinitionsObject;
  parameters?: ParametersDefinitionsObject;
  responses?: ResponsesDefinitionsObject;
  securityDefinitions?: SecurityDefinitionsObject;
  security?: SecurityRequirementObject[];
  tags: TagObject[];
  externalDocs: ExternalDocumentationObject;
}
