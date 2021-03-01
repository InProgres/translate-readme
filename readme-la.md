# Factum interpretari Readme

## Latin Vulgate README

-   [anglicus](README.md)
-   [简体中文](README.zh-CN.md)
-   [Traditional Chinese](README.zh-TW.md)
-   [Hibernica](README.hi.md)
-   [Gallica](README.fr.md)
-   [Arabica](README.ar.md)

**Factum est autem lingua interpretari GitHub Readme**

Factum est autem GitHub qui transferendum in readme in repo sponte ad certa lingua.

_A ad submission[NSW: GitHub actiones pro patefacio radix!](https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn)hackathon_

## setup

1.  **Addere file workflow**ad project tua (exampla`.github/workflows/readme.yml`)


    name: Translate README

    on:
      push:
        branches:
          - main
          - master
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - name: Setup Node.js
            uses: actions/setup-node@v1
            with:
              node-version: 12.x
          # ISO Langusge Codes: https://cloud.google.com/translate/docs/languages  
          - name: Adding README - Chinese Simplified
            uses: dephraiim/translate-readme@main
            with:
              LANG: zh-CN
          - name: Adding README - Chinese Traditional
            uses: dephraiim/translate-readme@main
            with:
              LANG: zh-TW
          - name: Adding README - Hindi
            uses: dephraiim/translate-readme@main
            with:
              LANG: hi
          - name: Adding README - Arabic
            uses: dephraiim/translate-readme@main
            with:
              LANG: ar
          - name: Adding README - French
            uses: dephraiim/translate-readme@main
            with:
              LANG: fr

## Configuration

### options

Porro ad configurare potes agere cum optiones sequuntur:

-   `LANG`: Quod lingua interpretari velis tibi in readme. Simplified Chinese in default est. (Im 'a Ghanaian) De linguae sustineri posse inveniri inferius.
    (Default:`zh-CH`) (Requiritur:`false`)

## fulcitur Linguae

Linguae subnixus, hic inveniri possunt,<https://cloud.google.com/translate/docs/languages>

### quaestiones

represserat[hic](https://github.com/dephraiim/translate-readme/issues/1)et exitibus ad hoc opus.

### Development

Consilia contributions et semper grata!

### LICENTIA

[cUM](./LICENSE)
