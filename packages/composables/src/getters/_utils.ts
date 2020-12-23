import { AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';
import { ProductVariant, ProductPrice, DiscountedProductPriceValue, LineItem } from './../types/GraphQL';
import { getSettings } from '@vue-storefront/shopify-api';
import { DiscountedLineItemPrice } from '../types/GraphQL';

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
export const getVariantByAttributes = (products, attributes: any): ProductVariant => {
  if (!products || products.length === 0) {
    return null;
  }
  // get available variants keys from product object
  const configurationKeys = Object.keys(attributes);

  // find variations based on selected key and value
  return products.find((product) => {
    const currentAttributes = formatAttributeList(product.options);

    return configurationKeys.every((attrName) =>
      currentAttributes.find(({ name, value }) => attrName === name && attributes[attrName] === value)
    );
  });
};

const getPrice = (price: ProductPrice | DiscountedProductPriceValue | DiscountedLineItemPrice) => price ? price.value.centAmount / 100 : null;

const getDiscount = (product: ProductVariant | LineItem) => product.price?.discounted;

const getSpecialPrice = (product: ProductVariant | LineItem) => {
  const discount = getDiscount(product);

  if (product.__typename === 'LineItem') {
    const { discountedPricePerQuantity } = product;
    const discountsLength = discountedPricePerQuantity.length;

    if (discountsLength > 0) {
      return getPrice(discountedPricePerQuantity[discountsLength - 1].discountedPrice);
    }
  }

  if (discount?.discount.isActive) {
    return getPrice(discount);
  }

  return null;
};

export const createPrice = (product: ProductVariant | LineItem): AgnosticPrice => {
  if (!product) {
    return { regular: null, special: null };
  }

  const regularPrice = getPrice(product.price);
  const specialPrice = getSpecialPrice(product);

  return {
    regular: regularPrice,
    special: specialPrice
  };
};

export const createFormatPrice = (price: number) => {
  if (!price) {
    return null;
  }
  const { locale, currency } = getSettings();

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
};
