---
title: JJUG レポート
date: "2019-05-18"
tags:
  - JJUG
  - Java
  - WIP
---

# 初めての gRPC

## gRPC の概要

- HTTP/2 でデータを送受信する。
- Protocol Buffers でデータ構造と RPC を定義する。
- 多言語で相互通信可能。
- Google の内部で１０年以上使われてきた技術。

### gRPC の利点

- API ファースト開発。
- 高い通信効率（HTTP/2, Protocol Buffers）。

### HTTP/2

- 多重化によって、１本の通信にまとめることができる。

### Protocol Buffers

- 構造化データを定義する IDL フォーマット

### gRPC と Protocol Buffers

### REST(OpenAPI/Swagger)の違い

- Proto ファイルは Swagger よりも記述量が少ない。
- Swagger から生成したコードは編集する前提なので、自動生成しても、後から変更を入れづらい。
- REST と共存できる。

## Protocol Buffers 入門

### protoc コンパイラ

- プラグインにより出力をカスタマイズ可能。

### proto ファイルの構成

# パッケージ管理していなかった既存システムに後付けで Gradle を導入した話

パッケージ管理していなかった既存システムに後付けで Gradle を導入した話  
<https://qiita.com/saiya_moebius/items/a46a62cb42cd5398ae88>

アーティファクトリポジトリマネージャの比較 Nexus/Archiva/Artifactory  
<https://qiita.com/shrkw/items/fbd0aeb3bcaf4dd006ba>
