---
title: Gatsby.js × Cloudinary 構成で OGP 画像を自動生成させてみた
description: Cloudinary で各記事のタイトルが書かれた OGP 画像を作るようにしたのでその内容をまとめました
date: 2021-09-12 20:39
slug: blog-ogp-image-by-cloudinary
tags: [ogp, Cloudinary, blog]
---

## 結論

こんな感じで記事に合わせた OGP 画像が表示されるようになった

## やったこと

createPages のタイミングで各記事用の OGP 画像を生成し pageContext として `Post.tsx` に渡した。

あとは `Post.tsx` 側で SEO コンポーネントに URL を渡すだけ。

- `gatsby-node/index.ts`

  ```ts
  export const createPages: GatsbyNode["createPages"] = async ({
    graphql,
    actions: { createPage },
  }) => {
    //...省略

    // posts = build 対象の記事の node
    posts.forEach(({ node }, index) => {
      const next = getNextPost(index)
      const previous = getPreviousPost(index)

      // ogp image url
      const titleOnImage = `#${index}\n${node.frontmatter.title}`
      const ogpImageUrl = new CloudinaryService(titleOnImage).getImageUrl()

      createPage({
        path: node.frontmatter.slug,
        component: path.resolve("./src/templates/Post.tsx"),
        context: {
          slug: node.frontmatter.slug,
          title: node.frontmatter.title,
          ogpImageUrl,
          previous,
          next,
        },
      })
    })
  ```

- `lib/CloudinaryService.ts`

  ```ts
  import * as cloudinary from "cloudinary"

  export default class CloudinaryService {
    overlayText: string = ""

    constructor(textOnImage: string) {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })
      this.overlayText = textOnImage
    }

    private createTransformationConfig() {
      return [
        {
          overlay: {
            font_family: "Verdana",
            font_size: 65,
            font_weight: "bold",
            text: this.overlayText,
          },
          width: 800,
          height: 400,
          crop: "fit",
        },
      ]
    }

    getImageUrl(): string {
      return cloudinary.v2.url(process.env.BASE_IMAGE, {
        transformation: this.createTransformationConfig(),
        sign_url: true,
        type: "authenticated",
        secure: true,
      })
    }
  }
  ```

## 気にかけた点

- 既存の Gatsby 用プラグインがあるのを知った上で使わなかった
  - [gatsby-transformer-cloudinary](https://www.gatsbyjs.com/plugins/gatsby-transformer-cloudinary/)
  - 勉強のため
  - 上記プラグインは画像表示まで考えられているが、今回は画像 URL の取得ができれば十分だった
- 画像 URL の生成タイミングを build の中にしたこと
  - template や SEO コンポーネントでの実施も考えたが、API 通信を含んだ処理をそれらで行うのは責務の観点でおかしそうと感じた。
- CloudinaryService
  - url メソッドを使った点
    - image メソッドなどもあるが、url を取得したいという用途に合わせた
    - https://cloudinary.com/documentation/image_transformations#embedding_images_in_web_pages
  - TS 化
    - [型定義ファイル](https://github.com/cloudinary/cloudinary_npm/blob/7dcdd278da4c57c28f9eb20fe501b618458c05c6/types/index.d.ts)が提供されていたので TS 化することにした
  - 設計
    - 初期化に引数として画像に載せる文字(記事タイトル)を取るようにしたこと
    - `getImageUrl()`が title 文字列を受け取ったりしてもよかったのが、初期化時にインスタンス変数として扱うようにすることで、呼び出しもとが `getImageUrl()` の引数情報などについて知る必要がなくなり、依存を少なくできるのでは？と思った。

## 気になっている点

- CloudinaryService 設計の正当性
- 長いタイトルだと省略されてしまう
  - transformation の設定ミスのようにも感じるが一旦完成を優先したので後日また検証して修正したい
-
