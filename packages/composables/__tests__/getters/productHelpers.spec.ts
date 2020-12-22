import {
  getProductName,
  getProductSlug,
  getProductPrice,
  getProductGallery,
  getProductCoverImage,
  getProductFiltered,
  getProductAttributes,
  getProductCategoryIds,
  getProductId
} from './../../src/getters/productGetters';
import * as utils from './../../src/getters/_utils';

jest.spyOn(utils, 'createPrice').mockImplementation((product) => ({
  special: product?.price,
  regular: product?.price
} as any));

const product = {
  _name: 'variant 1',
  _slug: 'variant-1',
  _id: 1234,
  price: 12,
  attributeList: [
    {
      name: 'articleNumberManufacturer',
      stringValue: 'H805 C195 85072',
      __typename: 'StringAttribute'
    }
  ],
  images: [{ url: 'imageV11/url.jpg' }, { url: 'imageV12/url.jpg' }],
  _categoriesRef: [
    'catA',
    'catB'
  ]
} as any;

describe('[commercetools-getters] product getters', () => {
  it('returns default values', () => {
    expect(getProductName(null)).toBe('');
    expect(getProductSlug(null)).toBe('');
    expect(getProductGallery(null)).toEqual([]);
    expect(getProductFiltered(null)).toEqual([]);
  });

  it('returns name', () => {
    expect(getProductName(product)).toBe('variant 1');
  });

  it('returns slug', () => {
    expect(getProductSlug(product)).toBe('variant-1');
  });

  it('returns price', () => {
    expect(getProductPrice(product)).toEqual({ regular: 12, special: 12 });
  });

  it('returns gallery', () => {
    expect(getProductGallery(product)).toEqual([
      {
        small: 'imageV11/url.jpg',
        big: 'imageV11/url.jpg',
        normal: 'imageV11/url.jpg'
      },
      {
        small: 'imageV12/url.jpg',
        big: 'imageV12/url.jpg',
        normal: 'imageV12/url.jpg'
      }
    ]);
  });

  it('returns cover image', () => {
    expect(getProductCoverImage({ images: [] } as any)).toEqual(null);
    expect(getProductCoverImage(product)).toEqual('imageV11/url.jpg');
  });

  it('returns master variant', () => {
    const variants = [
      { _name: 'variant 1',
        _master: false },
      { _name: 'variant 2',
        _master: true }
    ];
    expect(getProductFiltered(variants as any, { master: true })).toEqual([{
      _name: 'variant 2',
      _master: true
    }]);
  });

  it('returns master variants', () => {
    const variants = [
      { _name: 'variant 1_1',
        _master: false },
      { _name: 'variant 1_2',
        _master: true },
      { _name: 'variant 2_1',
        _master: true },
      { _name: 'variant 2_2',
        _master: false }
    ];
    expect(getProductFiltered(variants as any, { master: true })).toEqual([
      { _name: 'variant 1_2',
        _master: true },
      { _name: 'variant 2_1',
        _master: true }
    ]);
  });

  it('returns all variants', () => {
    const variants = [
      { _name: 'variant 1',
        _master: false },
      { _name: 'variant 2',
        _master: true }
    ];
    expect(getProductFiltered(variants as any)).toEqual(variants);
  });

  it('returns product by given attributes', () => {
    const variant1 = {
      ...product,
      attributeList: [
        {
          name: 'size',
          stringValue: '36',
          __typename: 'StringAttribute'
        },
        {
          name: 'color',
          stringValue: 'white',
          __typename: 'StringAttribute'
        }
      ]
    };
    const variant2 = {
      ...product,
      attributeList: [
        {
          name: 'size',
          stringValue: '38',
          __typename: 'StringAttribute'
        },
        {
          name: 'color',
          stringValue: 'black',
          __typename: 'StringAttribute'
        }
      ]
    };

    const variants = [variant1, variant2];

    const attributes = { color: 'black',
      size: '38' };
    expect(getProductFiltered(variants, { attributes })).toEqual([variant2]);
  });

  // Attributes

  it('returns product attributes', () => {
    expect(getProductAttributes([product])).toEqual({
      articleNumberManufacturer: [{ label: 'H805 C195 85072',
        value: 'H805 C195 85072' }]
    });
  });

  it('returns attributes of single product', () => {
    expect(getProductAttributes(product)).toEqual({ articleNumberManufacturer: 'H805 C195 85072' });
  });

  it('returns product unique attributes', () => {
    const prod = {
      ...product,
      attributeList: [
        {
          name: 'articleNumberManufacturer',
          stringValue: 'H805 C195 85072',
          __typename: 'StringAttribute'
        },
        {
          name: 'articleNumberManufacturer',
          stringValue: 'H805 C195 85072',
          __typename: 'StringAttribute'
        }
      ]
    } as any;

    expect(getProductAttributes([prod])).toEqual({
      articleNumberManufacturer: [{ label: 'H805 C195 85072',
        value: 'H805 C195 85072' }]
    });
  });

  it('returns filtered product attributes', () => {
    const product = {
      attributeList: [
        {
          name: 'articleNumberManufacturer',
          stringValue: 'H805 C195 85072',
          __typename: 'StringAttribute'
        },
        {
          name: 'color',
          stringValue: 'H805 C195 85072',
          __typename: 'StringAttribute'
        }
      ]
    } as any;

    expect(getProductAttributes([product], ['color'])).toEqual({
      color: [{ value: 'H805 C195 85072',
        label: 'H805 C195 85072' }]
    });
  });

  it('returns product categories', () => {
    expect(getProductCategoryIds(product)).toEqual([
      'catA',
      'catB'
    ]);
  });

  it('returns product ID', () => {
    expect(getProductId(product)).toEqual(1234);
  });

  it('returns empty array if there is no product', () => {
    expect(getProductAttributes(null)).toEqual({});
  });
});
