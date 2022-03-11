/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AgnosticAttribute } from '@vue-storefront/core';

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

export const formatSelectedAttributeList = (attributes: Array<any>): AgnosticAttribute[] =>
  attributes.map((attr) => {
    return {
      name: attr.name,
      value: attr.value,
      label: attr.name
    };
  });

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatDate = (date: string) => {
  const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const toFormatDate = new Date(date);
  return monthsArray[toFormatDate.getMonth()] + ' ' + toFormatDate.getDate() + ', ' + toFormatDate.getFullYear() + ' at ' + toFormatDate.getHours() + ':' + toFormatDate.getMinutes();
}

export const getVariantByAttributes = (products, attributes: any) => {
  const configurationKeys = Object.keys(attributes);
  return products.variants.find((variant) => {
    const currentAttributes = formatSelectedAttributeList(
      variant.selectedOptions
    );
    return configurationKeys.every((attrName) =>
      currentAttributes.find(
        ({ name, value }) =>
          capitalize(attrName) === capitalize(name) && attributes[attrName] === value
      )
    );
  });
};
