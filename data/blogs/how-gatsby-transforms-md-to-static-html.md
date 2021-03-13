---
title: Gatsby で markdown ファイルが静的 HTML に変換される仕組みを追ってみた
description: 気になったのでコードを読んでみて自分なりにまとめました
date: 2021-03-12 13:25
slug: how-gatsby-transformer-markdown-to-static-html
tags: [Gatsby, remark]
---

本ブログでは markdown ファイルを記事データソースとして扱っています。

このやり方は[公式の document](https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/) を参考に `gatsby-source-filesystem` と `gatsby-transformer-remark` というプラグインを追加して構築したのですが、恥ずかしながら**実際だれがなのをどのようにして markdown ファイルから静的 HTML ファイルを生成しているのか**についてはイマイチわかっていないままでした。

このままではよくないなと感じたこともあり、その仕組みについて自分なりに調べてみました。この記事はその時のログをまとめたものです。

「Gatsby ではどのようにして markdown ファイルが静的 HTML として表示されているのか知りたい」という方の参考になれば幸いです。

なお筆者の知識/経験不足から間違えがあるかもしれません。その点をご承知いただいた上で読み進めていただければと思います。もし間違いに気づいていただけた方は教えていただけると幸いです。

## 前提

[公式の document](https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/) で示されているような `gatsby-source-filesystem` と `gatsby-transformer-remark` を使ったブログ構成

- https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/
- https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/

## 知りたかったこと

以下のような 「html」 Field を含む Query を実行するとなぜ markdown ファイルに基づく HTML を取得できるのか?

```graphql
query($slug: String!) {
  markdownRemark(frontmatter: { slug: { eq: $slug } }) {
    html
  }
}
```

## 結論

`gatsby-source-filesystem` と `gatsby-transformer-remark` がそれぞれ**以下のような処理を以下の順番で**行うことで実現されていました。

1. `gatsby-source-filesystem` が markdown ファイルを File node に変換

2. `gatsby-transformer-remark` が File node に含まれている markdown コンテンツから frontmatter を解析( markdown と frontmatter を分離)

3. `gatsby-transformer-remark` が Markdown node の作成

4. `gatsby-transformer-remark` が markdown を HTML に変換する resolver を持った「html」field を Markdown node に追加

5. (page) Query において「html」field を指定することによって処理 4 で作成された resolver が実行され html が生成される。それが返り値として component に渡され描画される

## 説明

「処理部分」と「Gatsby Node API」という二つの観点で結論の内容を補足していきます。

ちなみになぜ Gatsby Node API について補足しているかというと、**各処理がどの Gatsby Node API として扱われているのかが全体の処理順序に影響を与えている**からです。
Gatsby Node API と Gatsby における build プロセスの関係性については document に詳しく書かれているので見てただければと思います。

build プロセス

- https://www.gatsbyjs.com/docs/conceptual/gatsby-lifecycle-apis/
- https://www.gatsbyjs.com/docs/conceptual/overview-of-the-gatsby-build-process/#what-happens-when-you-run-gatsby-build

Gatsby Node API

- https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#apis

それでは内容に入ります。

### 1. `gatsby-source-filesystem` が markdown ファイルを File node に変換

`gatsby-source-filesystem` がローカルにある markdown ファイルを File Node というものに変換します。

- 処理部分
  - https://github.com/gatsbyjs/gatsby/blob/72f15717e9f166e338ba120591e8b4e1e8a92c16/packages/gatsby-source-filesystem/src/create-file-node.js
- Gatsby Node API: `sourceNode`
  - https://github.com/gatsbyjs/gatsby/blob/72f15717e9f166e338ba120591e8b4e1e8a92c16/packages/gatsby-source-filesystem/src/gatsby-node.js#L167

### 2. `gatsby-transformer-remark` が File node に含まれている markdown コンテンツから frontmatter を解析( markdown と frontmatter を分離)

- 処理部分

  - https://github.com/gatsbyjs/gatsby/blob/72f15717e9f166e338ba120591e8b4e1e8a92c16/packages/gatsby-transformer-remark/src/on-node-create.js#L32-L41

    - [gray-matter](https://github.com/jonschlinkert/gray-matter) を用いて frontmatter の解析( markdown と frontmatter を分離)

      - frontmatter を含む markdown ファイルを以下のようなオブジェクトに変換してくれます

        ```md
        ---
        title: Hello
        slug: home
        ---

        <h1>Hello world!</h1>
        ```

        ```json
        {
          "content": "<h1>Hello world!</h1>",
          "data": {
            "title": "Hello",
            "slug": "home"
          }
        }
        ```

- Gatsby Node API: `onCreateNode`
  - https://github.com/gatsbyjs/gatsby/blob/72f15717e9f166e338ba120591e8b4e1e8a92c16/packages/gatsby-transformer-remark/src/gatsby-node.js#L1-L4

### 3. `gatsby-transformer-remark` が Markdown node の作成

上記の frontmatter の解析結果をはじめいくつかのデータを生成した上で新しく Markdown node を作成します。ちなみにこれが後に page Query などでアクセスするデータの大元になります。

- 処理部分
  - https://github.com/gatsbyjs/gatsby/blob/72f15717e9f166e338ba120591e8b4e1e8a92c16/packages/gatsby-transformer-remark/src/on-node-create.js#L43-L69
- Gatsby Node API: `onCreateNode`
  - https://github.com/gatsbyjs/gatsby/blob/72f15717e9f166e338ba120591e8b4e1e8a92c16/packages/gatsby-transformer-remark/src/gatsby-node.js#L1-L4

#### 4. `gatsby-transformer-remark` が markdown を HTML に変換する resolver を持った「html」field 作成

- 処理部分
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L548-L679
  - markdown を HTML に変換する resolver が実装されています。ここが Query が html Field にアクセスする際に実際に見にいく実体みたいです。この部分は後述の[resolver の正体](#resolverの正体)でさらに詳しく触れます。
- Gatsby Node API: `setFieldsOnGraphQLNodeType`
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/gatsby-node.js#L8
  - `setFieldsOnGraphQLNodeType` は Gatsby の build プロセスのうち GraphQL schema の作成中に実行される API です。これは API 実行結果として得られるオブジェクト配列を対象の Node の types に一つ一つ Filed として追加していきます。ですので今回で言えば「処理部分」で返されているオブジェクトが追加されていきます。

### 5. (page) Query において「html」field を指定することによって処理 4 で作成された resolver が実行され html が生成される。それが返り値として component に渡され描画される

ここは Gatsby の build プロセスのうち、1~4 の処理を全て終えブログ構築に必要な data が全てそろった後に実行されます。これでめでたく markdown ファイルに基づいた html の取得ができるわけです。

---

以上が各処理の説明になります。処理順序としては `sourceNode` -> `onCreateNode` -> `setFieldsOnGraphQLNodeType` となっており build プロセス順通りになっていそうです。

- https://www.gatsbyjs.com/docs/conceptual/gatsby-lifecycle-apis/

ここまでの内容で自分の疑問に対する答えをある程度つかめました。

ただ実際に**markdown を html に変換する resolver が一体何をしているのか**がまだはっきりとわかっていなかったです。なのでそれについても調べてみたので次章でまとめます。

## resolver の正体

resolver の正体を該当ソースコードと共に追ってみたいと思います。
あくまで「何をしているのか」が知りたいので細かい部分は省略しつつ進めます。

### 結論

以下の流れで「markdown を HTML に変換する仕組み」を実現していました。remark というパッケージを利用しており、AST を作成してそれを変換していくみたいですね。

1. markdown を `markdownAST` に変換
2. `markdownAST` を `htmlAST` に変換
3. `htmlAST` を HTML に変換

### ソースコード

下に向かって参照が深くなっていきます。

- html Filed(Query がアクセスする Filed の実体)
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L549-L554
  - getHTML を実行して取得した結果を返す。
- `getHTML`(`getHTMLAst` を実行して取得した `htmlAST` を HTML に変換)
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L368-L384
- `getHTMLAst`(`getAST` を実行して取得した `markdownAST` を `htmlAST` に変換)
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L353-L366
  - `mdast-util-to-hast` の `toHast` という関数を使用して実現。
    - https://github.com/syntax-tree/mdast-util-to-hast
- `getAST`(`getMarkdownAST` を実行して取得した `markdownAST` を返す)
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L134-L162
- `getMarkdownAST`(`parseString` を実行して取得した `markdownAST` を返す)
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L228-L256
- `parseString`(`remark` の `parse` 関数の Wrapper)
  - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L165-L226
  - ここでようやくプラグイン名にも書いてある `remark` が登場ですね。`gatsby-transformer-remark` の根幹です。
    - `remark` の import
      - https://github.com/gatsbyjs/gatsby/blob/8cedc8dd15e0fd3cb5bc62e8276a4a1f96e7c6f4/packages/gatsby-transformer-remark/src/extend-node-type.js#L1
    - `remark` の初期化
      - https://github.com/gatsbyjs/gatsby/blob/8cedc8dd15e0fd3cb5bc62e8276a4a1f96e7c6f4/packages/gatsby-transformer-remark/src/extend-node-type.js#L116
    - `remark.parse()`
      - https://github.com/gatsbyjs/gatsby/blob/513e28a1e4111c978878abd57f5cbd4779455595/packages/gatsby-transformer-remark/src/extend-node-type.js#L177
      - markdown を AST に変換してくれます。

### remark について

remark 自体の理解にも結構苦しみました。AST についても初めて知ることになりました。
個人的には remark や AST の最低限の理解には remark が所属している unified というプロジェクトの README や以下で紹介するブログ記事がわかりやすかったので合わせて載せておきます。

doc

- unified
  - https://github.com/unifiedjs/unified#description
- remark
  - https://github.com/remarkjs/remark/
- remark-parse
  - https://github.com/remarkjs/remark/tree/main/packages/remark-parse/

参考ブログ記事(ありがとうございました)

- https://takumon.com/2018/10/28/
- https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html

以上が resolver の解説でした。結構タフでしたがなんとか理解できた気がしています...!

## 終わりに

まともにソースコードを読んだ経験はまだまだすくなかったのですが、今回こうしてプラグインのソースコードを一定程度読めたことは自信につながりました。

プラグインのコードは分量もそこまで多くなく、かつ周辺知識の習得もちゃんとやればきちんとできるので、今の自分にはあっている気もしました。機会があれば他のプラグインのコードは読んでみようと思います。

「なんとなく使える」「プラグイン追加して設定したら動いた」状態からは少し脱せたかな。。。
