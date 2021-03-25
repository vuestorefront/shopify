<template>
  <SfSection title-heading="Latest blogs" class="section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel
        data-cy="blog-posts-carousel"
        :settings="{ gap :20, autoplay: 2000, breakpoints: { 1023: { peek: 0, perView: 1 } } }"
        class="carousel"
      >
        <SfCarouselItem class="carousel__item" v-for="(blog, i) in articles" :key="i">
          <div class="blog-item-wrapper">
            <div class="img-wrapper">
                <a href="javscript:void(0);"><img class="img-responsive" :src="blog.image.originalSrc"/></a>
            </div>
            <div class="article-meta">
                <h4><a href="javscript:void(0);">{{blog.title}}</a></h4>
                {{ blog.excerpt }}
            </div>
            <div class="article-item__meta">
                <time class="article-item__meta-item">{{ blog.publishedAt }}</time>
            </div>
          </div>
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script lang="ts" type="module">

import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader
} from '@storefront-ui/vue';

import { productGetters } from '@vue-storefront/shopify';

export default {
  name: 'blogPosts',
  data() {
    return {
      articles: [
        {
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          handle: 'lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit',
          excerptHtml: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id eros sagittis, condimentum purus sit amet, pretium elit. Proin ac orci eu dui rutrum faucibus. Pellentesque ornare risus nibh, nec rhoncus risus fermentum non.',
          image: {
            id: 'Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvNjI5MTQ4MjIzMDQ=',
            originalSrc: '//cdn.shopify.com/s/files/1/0407/1902/4288/articles/blog-details.jpg?v=1602486249'
          },
          publishedAt: '2020-10-09T22:00:00Z',
          authorV2: {
            bio: null
          }
        },
        {
          title: 'Sample Blog',
          handle: 'sample-blog',
          excerptHtml: '<meta http-equiv="content-type" content="text/html; charset=utf-8"><strong>Lorem Ipsum</strong><span> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type </span>',
          image: {
            id: 'Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvNjQ0Nzk3ODkyMTY=',
            originalSrc: '//cdn.shopify.com/s/files/1/0407/1902/4288/articles/daiwei-lu-evl5l1EVQi0-unsplash_500x_34de6f62-9b43-4bb0-9b5c-ce431edfcbc1.jpg?v=1612164484'
          },
          publishedAt: '2021-02-01T07:28:54Z',
          authorV2: {
            bio: null
          }
        },
        {
          title: 'Blog by quick tester',
          handle: 'blog-by-quick-tester',
          excerptHtml: '<meta http-equiv="content-type" content="text/html; charset=utf-8"><span>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia</span>',
          image: {
            id: 'Z2lkOi8vc2hvcGlmeS9BcnRpY2xlSW1hZ2UvNjQ0ODAxMTY4OTY=',
            originalSrc: '//cdn.shopify.com/s/files/1/0407/1902/4288/articles/daiwei-lu-evl5l1EVQi0-unsplash_500x_21bc8bc0-4702-4572-85da-459ebcc51955.jpg?v=1612167432'
          },
          publishedAt: '2021-02-01T08:17:11Z',
          authorV2: {
            bio: null
          }
        }
      ]
    };
  },
  setup() {
    return { productGetters };
  },
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  }
};
</script>

<style lang="scss" scoped>
.section {
  margin-top: var(--spacer-base);
}

.article-meta h4 a{
    color: #111111;
    font-weight: 600;
    font-size: 20px;
}
.article-meta {
    margin-top: 10px;
}
.article-item__meta-item:not(:last-child)::after {
    display: inline-block;
    content: "";
    width: 5px;
    height: 5px;
    margin: -1px 10px 0 10px;
    border-radius: 100%;
    background: rgba(0,0,0, 0.4);
    vertical-align: middle;
}
.img-responsive{
    width: var(--image-width);
    max-width: 100%;
    height: var(--image-height, auto);
}
.blog-posts-carousel .sf-carousel-item{
    margin: 0 30px !important;
}
</style>
