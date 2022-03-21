import { ContentType } from '../src/types/ContentType'
import useContent from '../src/useContent'

const getBlog = jest.fn()
const getBlogs = jest.fn()

const mockContext = {
  $shopify: {
    api: {
      getBlog,
      getBlogs
    }
  }
}

jest.mock('@vue-storefront/core', () => ({
  useContentFactory: (params) => () => params
}));

describe('[shopify-composables] mapping of useContent', () => {
  it('should fetch single blog', async () => {
    const params = {
      contentType: ContentType.Blog,
      id: 'test'
    }

    const { search } = useContent('test') as { search: any }

    await search(mockContext, params)

    expect(getBlog).toHaveBeenCalledWith(params)
  })

  it('should fetch blogs', async () => {
    const params = {
      contentType: ContentType.Blog,
      query: 'blog_title:test'
    }

    const { search } = useContent('test') as { search: any }

    await search(mockContext, params)

    expect(getBlogs).toHaveBeenCalledWith(params)
  })
})