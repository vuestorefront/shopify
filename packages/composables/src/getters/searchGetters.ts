import { AgnosticBreadcrumb, AgnosticCategoryTree, AgnosticFilter, AgnosticMediaGalleryItem, AgnosticPagination, AgnosticPrice, AgnosticSort, UseSearchGetters } from '@vue-storefront/core'
import { QueryResult } from '@vue-storefront/shopify-apollo/src/library'
import { Product } from '@vue-storefront/shopify-apollo/src/shopify'
import { enhanceProduct } from '../helpers/internals'

const searchGetters: UseSearchGetters<QueryResult, Product> = {
  getItems(result: QueryResult): Product[] {
    if (result.error) {
      throw new Error(result.error.message)
    }

    if (!result.data) {
      return []
    }

    let items = result.data.products.edges.map(item => {
      const product: Product = {
        ...item.node,
        images: item.node.images.edges.map(image => image.node) as any,
        variants: item.node.variants.edges.map(variant => variant.node) as any
      }


      return product
    })

    items = enhanceProduct(items) as any

    return items
  },
  getCategoryTree(_: QueryResult): AgnosticCategoryTree {
    throw new Error('Function not implemented.')
  },
  getPagination(_: QueryResult): AgnosticPagination {
    throw new Error('Function not implemented.')
  },
  getItemPrice(_: Product): AgnosticPrice {
    throw new Error('Function not implemented.')
  },
  getSortOptions(_: QueryResult): AgnosticSort {
    throw new Error('Function not implemented.')
  },
  getBreadcrumbs(_: QueryResult): AgnosticBreadcrumb[] {
    throw new Error('Function not implemented.')
  },
  getItemImages(_: Product): AgnosticMediaGalleryItem[] {
    throw new Error('Function not implemented.')
  },
  getFilters(_: QueryResult): AgnosticFilter[] {
    throw new Error('Function not implemented.')
  },
  getItemName(_: Product): string {
    throw new Error('Function not implemented.')
  },
  getItemId(_: Product): string {
    throw new Error('Function not implemented.')
  },
  getItemSlug(_: Product): string {
    throw new Error('Function not implemented.')
  }
}

export default searchGetters