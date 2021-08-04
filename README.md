<img src="https://user-images.githubusercontent.com/65275444/127496837-4c966e30-ac60-4d8f-9c7b-a653547c3cb0.png" height="80px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/65275444/127500448-04462002-9e92-4e02-9935-15fa2291d1b3.png" height="80px" />




## Vue Storefront 2 (a.k.a. Next) integration with Shopify

This project is a Shopify integration for [Vue Storefront 2](https://github.com/vuestorefront/vue-storefront/). This integration is **Stable** and ready for the production usage.

If you'd like to test it before diving in, experience our demo store [here](https://shopify-pwa-beta.aureatelabs.com). 

This integration is being developed and maintained by superheroes from [Aureate Labs](https://aureatelabs.com/) ❤️ &nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/65275444/127497312-89dd3405-2c7b-49e9-a2ef-a8df5fad9ba2.png" height="20px" />





## How to start if you want to try out the integration

```
yarn global add @vue-storefront/cli
```
```
vsf init <project_name> && cd <project_name> && yarn && yarn dev
```

## How to start if you want to contribute?

Want to contribute? Ping us on `#shopify` channel on [our Discord](https://discord.vuestorefront.io)!

### Requirements:
- NodeJS v12 or later
- Yarn1
- A shopify store

### Steps:
1. Fork this repository in your Github account
2. Clone your fork repository in your system
    ```
    example:
    git clone https://github.com/vuestorefront/shopify.git
    cd shopify
    ```
3. Checkout develop branch using `git checkout develop`
4. Run `yarn` to install dependencies
5. Build dependencies `yarn build:api-client && yarn build:composables`
6. Run `yarn dev:theme` to run theme. You can find other commands in `package.json`
7. [Open PR](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) to develop branch

💡 If you need HMR on ```Api-Client```/ ```Composables``` run `yarn dev:api-client` or `yarn dev:composables` on a separate terminal window.

## How to report integration issue?
You can help us to make this itegration bug-free by reporting your issues here: [repository issues page](https://github.com/vuestorefront/shopify/issues)

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Shopify integration Documentation](https://docs.vuestorefront.io/v2/shopify)
- [Community Chat](https://discord.vuestorefront.io)
------
## Support

If you have any questions about this integration we will be happy to answer them on  `shopify` channel on [Discord](http://discord.vuestorefront.io).

## Contributors ✨ <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-green.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://rakowski.dev/"><img src="https://avatars.githubusercontent.com/u/15185752?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Filip Rakowski</b></sub></a><br /><a href="https://github.com/filrak" title="Code">💻</a></td><td align="center"><a href="#"><img src="https://avatars.githubusercontent.com/u/7943292?v=4" width="100px;" alt=""/><br /><sub><b>Patryk Andrzejewski</b></sub></a><br /><a href="https://github.com/andrzejewsky" title="Code">💻</a></td><td align="center"><a href="https://heitor.co"><img src="https://avatars.githubusercontent.com/u/1626923?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Heitor Ramon Ribeiro</b></sub></a><br /><a href="https://github.com/bloodf" title="Code">💻</a></td><td align="center"><a href="https://aureatelabs.com/"><img src="https://avatars.githubusercontent.com/u/65275444?v=4" width="100px;" alt=""/><br /><sub><b>Aureate Labs</b></sub></a><br /><a href="https://github.com/aureate-labs-team" title="Code">💻</a></td><td align="center"><a href="https://bareblends.com.au"><img src="https://avatars.githubusercontent.com/u/24467529?s=64&v=4" width="100px;" alt=""/><br /><sub><b>oscarmanderj</b></sub></a><br /><a href="https://github.com/oscarmanderj" title="Code">💻</a></td><td align="center"><a href="https://hoshinotsuyoshi.com"><img src="https://avatars.githubusercontent.com/u/1394049?v=4" width="100px;" alt=""/><br /><sub><b>hoshino tsuyoshi</b></sub></a><br /><a href="https://github.com/hoshinotsuyoshi" title="Code">💻</a></td><td align="center"><a href="#"><img src="https://avatars.githubusercontent.com/u/4693818?v=4" width="100px;" alt=""/><br /><sub><b>Michael Westbay</b></sub></a><br /><a href="https://github.com/westbaystars" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
