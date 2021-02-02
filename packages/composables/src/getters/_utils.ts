// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAttributeValue = (attribute) => {
  switch (attribute.__typename) {
    case 'StringAttribute':
      return attribute.stringValue;
    case 'DateAttribute':
      return attribute.dateValue;
    case 'DateTimeAttribute':
      return attribute.dateTimeValue;
    case 'TimeAttribute':
      return attribute.timeValue;
    case 'NumberAttribute':
      return attribute.numberValue;
    case 'EnumAttribute':
    case 'LocalizedEnumAttribute':
      return attribute.key;
    case 'LocalizedStringAttribute':
      return attribute.localizedString;
    case 'MoneyAttribute':
      return attribute.centAmount;
    case 'BooleanAttribute':
      return attribute.booleanValue;
    case 'ReferenceAttribute':
      return { typeId: attribute.typeId, id: attribute.id };
    default:
      return null;
  }
};

export const formatAttributeList = (attributes: Array<any>): AgnosticAttribute[] =>
  attributes.map((attr) => {
    return {
      name: attr.name,
      value: attr.values,
      label: attr.name
    };
  });
