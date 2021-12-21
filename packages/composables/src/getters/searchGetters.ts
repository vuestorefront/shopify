import { AgnosticBreadcrumb, AgnosticCategoryTree, AgnosticFilter, AgnosticMediaGalleryItem, AgnosticPagination, AgnosticPrice, AgnosticSort, UseSearchGetters } from '@vue-storefront/core'
import { QueryResult, Product } from '@vue-storefront/shopify-api/server/next'
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
  getCategoryTree(result: QueryResult): AgnosticCategoryTree {
    throw new Error('Function not implemented.')
  },
  getPagination(result: QueryResult): AgnosticPagination {
    throw new Error('Function not implemented.')
  },
  getItemPrice(item: Product): AgnosticPrice {
    throw new Error('Function not implemented.')
  },
  getSortOptions(result: QueryResult): AgnosticSort {
    throw new Error('Function not implemented.')
  },
  getBreadcrumbs(result: QueryResult): AgnosticBreadcrumb[] {
    throw new Error('Function not implemented.')
  },
  getItemImages(item: Product): AgnosticMediaGalleryItem[] {
    throw new Error('Function not implemented.')
  },
  getFilters(result: QueryResult): AgnosticFilter[] {
    throw new Error('Function not implemented.')
  },
  getItemName(item: Product): string {
    throw new Error('Function not implemented.')
  },
  getItemId(item: Product): string {
    throw new Error('Function not implemented.')
  },
  getItemSlug(item: Product): string {
    throw new Error('Function not implemented.')
  }
}

export default searchGetters