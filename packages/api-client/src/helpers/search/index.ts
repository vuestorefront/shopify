import {
  CategoryWhereSearch,
  ProductWhereSearch,
  OrderWhereSearch,
  Filter,
  AttributeType
} from './../../types/Api';
import { getSettings } from './../../index';

const mapFilterToPredicate = (filter: Filter) => {
  const { locale, currency } = getSettings();

  let valuePredicate: string;
  switch (filter.type) {
    case AttributeType.STRING:
      valuePredicate = `value = "${filter.value}"`;
      break;
    case AttributeType.DATE:
    case AttributeType.DATETIME:
    case AttributeType.TIME:
      valuePredicate = Array.isArray(filter.value) ? `value >= "${filter.value[0]}" and value <= "${filter.value[1]}"` : `value = "${filter.value}"`;
      break;
    case AttributeType.NUMBER:
      valuePredicate = Array.isArray(filter.value) ? `value >= ${filter.value[0]} and value <= ${filter.value[1]}` : `value = ${filter.value}`;
      break;
    case AttributeType.ENUM:
    case AttributeType.LOCALIZED_ENUM:
      valuePredicate = `value(key = "${filter.value}")`;
      break;
    case AttributeType.LOCALIZED_STRING:
      valuePredicate = `value(${locale.toLowerCase()} = "${filter.value}")`;
      break;
    case AttributeType.MONEY:
      valuePredicate = Array.isArray(filter.value)
        ? `value(centAmount >= ${(filter.value[0] as number) * 100} and centAmount <= ${(filter.value[1] as number) * 100} and currencyCode = "${currency}")`
        : `value(centAmount = ${filter.value} and currencyCode = "${currency}")`;
      break;
    case AttributeType.BOOLEAN:
      valuePredicate = `value = ${filter.value}`;
      break;
  }

  return `masterData(current(masterVariant(attributes(name = "${filter.name}" and ${valuePredicate}))))`;
};

const buildProductWhere = (search: ProductWhereSearch) => {
  const { acceptLanguage } = getSettings();

  const predicates: string[] = [];

  if (search?.catId) {
    const catIds = (Array.isArray(search.catId) ? search.catId : [search.catId]).join('","');
    predicates.push(`masterData(current(categories(id in ("${catIds}"))))`);
  }

  if (search?.slug) {
    const predicate = acceptLanguage.map(locale => `${locale}="${search.slug}"`).join(' or ');
    predicates.push(`masterData(current(slug(${predicate})))`);
  }

  if (search?.id) {
    predicates.push(`id="${search.id}"`);
  }

  if (search?.filters) {
    const filterPredicates = search.filters.map(mapFilterToPredicate).join(' or ');
    if (filterPredicates) {
      predicates.push(filterPredicates);
    }
  }

  return predicates.join(' and ');
};

const buildCategoryWhere = (search: CategoryWhereSearch) => {
  const { acceptLanguage } = getSettings();

  if (search?.catId) {
    return `id="${search.catId}"`;
  }

  if (search?.slug) {
    const predicate = acceptLanguage.map(locale => `${locale}="${search.slug}"`).join(' or ');
    return `slug(${predicate})`;
  }

  return undefined;
};

const buildOrderWhere = (search: OrderWhereSearch): string => {
  if (search?.id) {
    return `id="${search.id}"`;
  }

  return null;
};

export {
  buildProductWhere,
  buildCategoryWhere,
  buildOrderWhere
};
