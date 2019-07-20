---
title: JJUG
date: "2019-07-12"
tags:
  - Java
  - Spring Framework
---

## Spring Initializr

<https://start.spring.io/>

## クラウド時代だから spring-retry フレームワーク

短時間で復旧している可能性が高いなら、自動リトライ  
そもそも通信過多なら、スロットリング

aws-sdk-java  
スロットリングとリトライの両方を内蔵している

JDBC 接続のリトライ  
REST-API の HTTP リクエストのリトライ

RDS のフェイルオーバー  
60-120 秒かかる.

db.biz.internal は、CNAME：エイリアス名  
ホスト名：フェイルオーバー後に エイリアスが変わる。

AWS:既存の接続の再確立が必要となります。  
JVM が生きている間は、DNS 検索結果を一生キャッシュするのがデフォルトなので、  
エイリアスの変更を JVM が察知しない。  
→3 秒にした。

> **Amazon RDS のフェイルオーバープロセス**  
> フェイルオーバーメカニズムでは、スタンバイ DB インスタンスをポイントするように DB インスタンスの DNS レコードが自動的に変更されます。したがって、DB インスタンスへの既存の接続の再確立が必要になります。Java DNS キャッシュメカニズムがどのように機能するかによって、JVM 環境の再設定が必要になる場合があります。
> <https://docs.aws.amazon.com/ja_jp/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html#Concepts.MultiAZ.Failover>

HikariCP  
ConnectionTimeout などの設定は重要。数秒に設定したほうがいい。

RetryTemplate  
simple retry policy

フェイルオーバー試験をすべき。

## フレームワーク移行で学ぶ Spring Boot のつまづきポイント

View へのデータの渡し方  
Helper クラスを用意して、チーム内で同様の渡し方を実現する。

github: dbflute-exmaple-on-springboot

## これで怖くない！？コードリーディングで学ぶ Spring Security
