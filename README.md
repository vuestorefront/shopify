<div align="center">
  <img src="https://user-images.githubusercontent.com/1626923/137092657-fb398d20-b592-4661-a1f9-4135db0b61d5.png" alt="Vue Storefront" height="80px" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/65275444/127500448-04462002-9e92-4e02-9935-15fa2291d1b3.png" height="80px" />
</div>

### Stay connected

[![GitHub Repo stars](https://img.shields.io/github/stars/vuestorefront/vue-storefront?style=social)](https://github.com/vuestorefront/vue-storefront)
[![Twitter Follow](https://img.shields.io/twitter/follow/vuestorefront?style=social)](https://twitter.com/vuestorefront)
[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCkm1F3Cglty3CE1QwKQUhhg?style=social)](https://www.youtube.com/c/VueStorefront)
[![Discord](https://img.shields.io/discord/770285988244750366?label=join%20discord&logo=Discord&logoColor=white)](https://discord.vuestorefront.io)


## Vue Storefront 2 integration with Shopify

This project is a Shopify integration for [Vue Storefront 2](https://github.com/vuestorefront/vue-storefront/). This integration is **Stable** and ready for the production usage.

If you'd like to test it before diving in, experience our demo store [here](https://shopify-pwa.aureatelabs.com). 

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
- [Shopify integration Documentation](https://docs.vuestorefront.io/shopify)
- [Community Chat](https://discord.vuestorefront.io)
------
## Support

If you have any questions about this integration we will be happy to answer them on  `shopify` channel on [Discord](http://discord.vuestorefront.io).

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://aureatelabs.com/"><img src="https://avatars.githubusercontent.com/u/65275444?v=4?s=80" width="80px;" alt=""/><br /><sub><b>aureate-labs-team</b></sub></a><br /><a href="https://github.com/vuestorefront/shopify/commits?author=aureate-labs-team" title="Code">💻</a> <a href="https://github.com/vuestorefront/shopify/commits?author=aureate-labs-team" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/oscarmanderj"><img src="https://avatars.githubusercontent.com/u/24467529?v=4?s=80" width="80px;" alt=""/><br /><sub><b>oscarmanderj</b></sub></a><br /><a href="https://github.com/vuestorefront/shopify/commits?author=oscarmanderj" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/andrzejewsky"><img src="https://avatars.githubusercontent.com/u/7943292?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patryk Andrzejewski</b></sub></a><br /><a href="https://github.com/vuestorefront/shopify/commits?author=andrzejewsky" title="Code">💻</a></td>
    <td align="center"><a href="https://rakowski.dev/"><img src="https://avatars.githubusercontent.com/u/15185752?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Filip Rakowski</b></sub></a><br /><a href="https://github.com/vuestorefront/shopify/commits?author=filrak" title="Code">💻</a></td>
    <td align="center"><a href="https://heitor.co/"><img src="https://avatars.githubusercontent.com/u/1626923?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Heitor Ramon Ribeiro</b></sub></a><br /><a href="https://github.com/vuestorefront/shopify/commits?author=bloodf" title="Code">💻</a> <a href="#maintenance-bloodf" title="Maintenance">🚧</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://hoshinotsuyoshi.com/"><img src="https://avatars.githubusercontent.com/u/1394049?v=4?s=80" width="80px;" alt=""/><br /><sub><b>hoshino tsuyoshi</b></sub></a><br /><a href="https://github.com/vuestorefront/shopify/commits?author=hoshinotsuyoshi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tom-aniol"><img src="https://avatars.githubusercontent.com/u/33483514?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Tom Anioł</b></sub></a><br /><a href="https://github.com/vuestorefront/shopify/commits?author=tom-aniol" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
