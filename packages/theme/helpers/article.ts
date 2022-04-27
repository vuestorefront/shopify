import { formatDate } from "./utils"

export const getArticleImage = (article) => {
  return article?.image?.url
}

export const getArticlePublishedAt = (article) => {
  return article?.publishedAt && formatDate(article?.publishedAt)
}

export const getArticleLink = (article) => {
  return {
    name: 'articles-handle',
    params: { handle: article.handle },
    query: { id: article.id }
  };
};