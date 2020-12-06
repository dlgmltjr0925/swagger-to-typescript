import { ItemsObject, SwaggerObject } from '../types/SwaggerObject';

/**
 *  Comments
 */
type Comments = Record<string, string>;

/**
 * Properties
 */
interface Properties {
  type: string;
  comments: Comments;
  required: boolean;
}

/**
 * Definition
 */
interface Definition {
  comments: Comments;
  properties: Record<string, Properties>;
}

/**
 * Models
 */
interface Models {
  [key: string]: Definition;
}

/**
 * SchemeType
 */
type SchemeType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'array'
  | 'object'
  | 'file';

/**
 * getTypescriptTypeFromSchemeTypeArgs
 */
interface GetTypescriptTypeFromSchemeTypeArgs {
  schemeType: SchemeType;
  enumValues?: string[];
  arrayItems?: ItemsObject;
}

/**
 * getTypescriptTypeFromSchemeType
 */
const getTypescriptTypeFromSchemeType = ({
  schemeType,
  enumValues,
  arrayItems,
}: GetTypescriptTypeFromSchemeTypeArgs): string => {
  switch (schemeType) {
    case 'string':
      if (enumValues) return `'${enumValues.join("' | '")}'`;
      return 'string';
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      if (arrayItems?.$ref) {
        const name = arrayItems.$ref.split('/').pop() as string;
        return `Array<${name}>`;
      } else if (arrayItems?.type) {
        return `Array<${arrayItems.type}>`;
      } else {
        return `Array<any>`;
      }
    default:
      return 'any';
  }
};

/**
 * Function to extract model from swagger object.
 * @param swaggerObject Object transformed from swagger json.
 */
export const createModelFromSwaggerObject = ({
  definitions,
}: SwaggerObject): Models => {
  const models: Models = {};
  if (!definitions) return models;
  for (const name in definitions) {
    models[name] = {
      comments: {},
      properties: {},
    };
    const { type, xml = {}, required = [], properties = {} } = definitions[
      name
    ];
    if (type === 'object') {
      /**
       * xml
       */
      Object.entries(xml).forEach(([xmlKey, xmlValue]) => {
        if (typeof xmlValue === 'string') {
          models[name].comments[`@${xmlKey}`] = xmlValue;
        } else if (typeof xmlValue === 'boolean') {
          models[name].comments[`@${xmlKey}`] = xmlValue ? 'true' : 'false';
        }
      });
      /**
       * properties
       */
      Object.entries(properties).forEach(
        ([
          propertyKey,
          { type, $ref, enum: enumValues, items: arrayItems, ...others },
        ]) => {
          if ($ref) {
            const typeName = $ref.split('/').pop() as string;
            models[name].properties[propertyKey] = {
              type: typeName,
              required: required.includes(propertyKey),
              comments: { '@type': typeName },
            };
          } else if (type) {
            models[name].properties[propertyKey] = {
              type: getTypescriptTypeFromSchemeType({
                schemeType: type,
                enumValues,
                arrayItems,
              }),
              required: required.includes(propertyKey),
              comments: { '@type': type },
            };
            Object.entries(others).forEach(([othersKey, value]) => {
              models[name].properties[propertyKey].comments[
                `@${othersKey}`
              ] = value as string;
            });
          } else {
            models[name].properties[propertyKey] = {
              type: 'any',
              required: required.includes(propertyKey),
              comments: {},
            };
          }
        }
      );
    }
  }

  return models;
};

/**
 * Function that defines an interface based on a models.
 */
export const createDefinitionFromModel = (modeles: Models): string => {
  let definition = '';

  Object.entries(modeles).forEach(([name, model]) => {
    /**
     * comments
     */
    definition += '/**\n';
    definition += ` * ${name}\n`;
    Object.entries(model.comments).forEach(([commentName, commentValue]) => {
      definition += ` * ${commentName} ${commentValue}\n`;
    });
    definition += ' */\n';
    definition += `export interface ${name} {\n`;
    /**
     * properties
     */
    Object.entries(model.properties).forEach(
      ([propertyName, { comments, required, type }]) => {
        definition += '  /**\n';
        definition += `   * ${propertyName}\n`;
        Object.entries(comments).forEach(([commentName, commentValue]) => {
          definition += `   * ${commentName} ${commentValue}\n`;
        });
        definition += `   */\n`;
        definition += `  ${propertyName}${required ? '' : '?'}: ${type};\n`;
      }
    );
    definition += '}\n\n';
  });

  return definition;
};
