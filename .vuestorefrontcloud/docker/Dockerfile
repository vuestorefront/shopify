FROM node:16

ARG COMMIT
ARG NPM_USER
ARG NPM_PASS
ARG NPM_EMAIL
ARG NPM_REGISTRY
ARG SHOPIFY_STOREFRONT_TOKEN
ARG SHOPIFY_DOMAIN

ENV LAST_COMMIT=${COMMIT}
ENV SHOPIFY_STOREFRONT_TOKEN=${SHOPIFY_STOREFRONT_TOKEN}
ENV SHOPIFY_DOMAIN=${SHOPIFY_DOMAIN}
ENV APP_PORT=3000


RUN npm install -g npm-cli-login \
  && npm-cli-login

WORKDIR /var/www

COPY . .

RUN yarn install && yarn build && yarn cache clean --all

COPY .vuestorefrontcloud/docker/vue-storefront.sh /usr/local/bin/

RUN chmod a+x /usr/local/bin/vue-storefront.sh

ENTRYPOINT ["vue-storefront.sh"]
