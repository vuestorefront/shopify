import { Product, ProductConnection, ProductVariant, ProductVariantConnection, Image, ImageConnection } from "@vue-storefront/shopify-api/server/next";

export type LocalProduct = Omit<Product, 'variants' | 'images'> & {
    variants: ProductVariant[] | ProductVariantConnection,
    images: Image[] | ImageConnection
}

export function convertProductsGqlToLocal(data: ProductConnection): LocalProduct[] {
    return data.edges.map(edge => ({
        ...edge.node,
        images: edge.node.images.edges.map(imageEdge => imageEdge.node),
        variants: edge.node.variants.edges.map(variantEdge => variantEdge.node)
    }))
}