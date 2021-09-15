---
layout: Test
title: Gatsby × Typescript × Netlify で markdown ベースの blog を作ってみた
description: blog を作ったので軽い振り返りと課題の整理をする
date: 2020-08-25 00:00
slug: "gatsby-typescript-blog"
tags: [Gatsby, typescript, blog]
---

タイトルの通り、Gatsby.js × Typescript × Netlify で markdown ベースの blog を作ってみました。(作ったのは夏なのですが、しばらく放置してました。)

「 Gatsby blog 」とかでググるとよく出てくるあるあるな構成ではありますが、自分で作ってみると結構つまずいたので、振り返りも兼ねて記事を書こうと思います。

## ブログの技術スタック

もうすでに書いているものものもありますが改めて。

- Gatsby
- Typescript
- React.js
- Netlify
- CSS

で作成しました。

## 詰まったところ

静的サイトジェネレーターで爆速でブログ作るぞ！！的なノリに憧れてこのブログを作り始めたのに、JavaScript や CSS の基本的な力、 graphql の理解が乏しかったが故に最低限の機能を作るまでに結構時間がかかった

### json object の扱い

GraphQL は基本的にレスポンスが json 形で返されるのですが、その階層が外側に一つ多いため、この扱いに初めは少々苦しみました。

当ブログのデータを使って例にします。
例えば、

```js
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
        }
      }
    }
  }
}
```

こんな GraphQL query を作成するとします。
するとレスポンスは

```js
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "frontmatter": {
              "title": "Test"
            }
          }
        },
        {
          "node": {
            "frontmatter": {
              "title": "Test2"
            }
          }
        },
        {
          "node": {
            "frontmatter": {
              "title": "Gatsby × Typescript × Netlify で markdown ベースの blog を作ってみた"
            }
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

こんな感じになります。
これを見てサラッとデータの取り回しができればよかったのですが、階層が深い分、データの取り出し部分で少々手こずりました。
ただこれは書いているうちに慣れていけたのでまあ問題なしかなという感じでした。

### pagination

そもそも pagination の作り方を知らなかったので結構つまずきました。

ただ、さすが Gatsby、pagination に関してもしっかり document 上でサンプルコードとともにともに説明がされています。

https://www.gatsbyjs.com/docs/adding-pagination/

ここの少しコードを眺めていると、何をしたくてそう書いているのか、pagination の実装には一体何が必要なのかが徐々にわかるようになり、自分のブログでもなんとか実装できました。

## 使用プラグイン

Gatsby はプラグインがかなり充実しています。そしてこれらを組み合わせることでブログ機能が充実します。今回は以下の plugin を使用しました。

- markdown で記事を書く
  - `gatsby-source-filesystem`
  - `gatsby-transformer-remark`
  - 参考: https://www.gatsbyjs.com/docs/adding-markdown-pages/#add-plugin
- GraphQL queries の型を自動で生成する
  - `gatsby-plugin-codegen`
  - https://www.gatsbyjs.com/blog/2020-01-23-why-typescript-chose-gatsby/#typescript-support

## 今後

少しづつ書いていきます〜
