---
title: 初めてOSSコントリビュートした
description: 記念に記事を書いた
date: 2021-04-13 21:21
slug: my-first-oss-contribute
tags: [oss, CircleCI]
---

## 6/30 追記

この記事で紹介した PR は author 側からのリアクションがなく、後にリポジトリ側で stale な PR とされ、 bot によって close されてしまった。

内容を見た上での判断でなかったのが残念ではあるが、深追いはしないことにした。

OSS コントリビュートというものについてだけでなく、こういうことあると知れて、総じて良い経験であったのは間違い無いので引き続き自分のできる貢献はしていきたいと思う。

---

今日初めて OSS コントリビュートした。

issue: https://github.com/CircleCI-Public/aws-ecr-orb/issues/138

PR: https://github.com/CircleCI-Public/aws-ecr-orb/pull/139

## 経緯

- 仕事の中で `aws-ecr-orb` の `image-push-and-build` command を使用した際、 docker login を行う step で warning が出ていることに気がついた。
  ```
  WARNING! Using --password via the CLI is insecure. Use --password-stdin.
  ```
- 言う通りに docker login の際に `--password-stdin` を使用して標準入力から password を受け取るようにしたところ warning は消えた。
- 会社の人に背中を押してもらい issue をたて PR を投げた

## やったこと

- issue
  - [aws-ecr-orb](https://github.com/CircleCI-Public/aws-ecr-orb/) リポジトリ上で issue を作る
- PR
  - [aws-ecr-orb](https://github.com/CircleCI-Public/aws-ecr-orb/) リポジトリを fork しローカル環境に `git clone`
  - master からブランチを切って修正
  - 修正して commit し、fork したリポジトリに向けて push
  - PR を作成し [aws-ecr-orb](https://github.com/CircleCI-Public/aws-ecr-orb/) 側で表示されていることを確認

## 感想

OSS に PR を投げるなど難しいことであり、自分がやるのはまだまだ先の話だと思っていたが、ふとした瞬間にチャンスが訪れた。

実際にやってみると、今回に限っては、英語で修正意図を伝えること以外は普段仕事でやっている「修正作業」とほとんど変わらなかったと思う。それゆえ、強者たちが作っているイメージのあった OSS にも自分が貢献できる余地はあり、まずはその余地に対してできる貢献をしていけば良いとわかった。

今回は運によるものもあったし、会社の人に力を貸していただいたからできたことでもある。また、この後結局 merge されないかもしれないのでまだ完全なコントリビュートともいえないかもしれない。

しかし、今日 1 日で OSS に対する警戒心のようなものがかなり軽減された感はあるし、良い経験ができたと思う。
