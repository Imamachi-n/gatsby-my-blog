---
title: Spring Boot + React web apps
date: "2019-07-27"
tags:
  - Spring Boot
  - React
  - AWS
  - WIP
---

## Creating the Backend Application using Spring Boot

Let's create the new project using Spring Initialzr on InteliJ IDEA.

1. Select **Spring Boot DevTools**, **Lombok**, **Spring Web Starter**, **Rest Repositories**, **Spring Data JPA**, **H2 Database** dependencies from the Dependencies section.
2. Create the new project.

![spring-initialzr-1](spring-initialzr-1.png)

## Adding additional dependencies

Open `pom.xml` file from the root directory and add the following to the `<dependencies>`section.

```xml
<!-- For Working with Json Web Tokens (JWT) -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>

<!-- For Java 8 Date/Time Support -->
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
</dependency>
```

```java
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
)
@Getter
@Setter
public abstract class DateAudit implements Serializable {

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
```

Entity クラスの親クラスを作りたい場合、`@MappedSuperclass`を指定します。  
Entity クラスの場合、`Serializable`の実装クラスにする必要はないが、親クラスの場合、`Serializable`の実装クラスにする必要がある？

自動更新させたい entity に`@EntityListeners`を付与します。これを付与することでテーブルの Insert/Update 時に`createdAt`と`updatedAt`に日付を自動で入れてくれます。

Serializable について  
<https://qiita.com/NBT/items/9f76c9fd1c7a90506658>

Java のシリアライズ(直列化)メモ  
<https://qiita.com/Sekky0905/items/b3c6776d10f183d8fc89>

<https://qiita.com/kunikunipon/items/291f1767edf927e672e5>

```java
@Entity
@Table(name = "roles")
@NoArgsConstructor
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleName name;

    public Role(RoleName name){
        this.name = name;
    }
}
```

`@NaturalId`は primary key ではないが、内部的にユニークなキーとなるフィールド。  
例えば、employee テーブルで、id は primary key となるが、id で検索するのではなく、同じくユニークなキーとなる email で検索したい場合に、`@NaturalId`をつけておくと便利。

Hibernate @NaturalId Example Tutorial  
<https://howtodoinjava.com/hibernate/hibernate-naturalid-example-tutorial/>

Spring DATA JPA でデータ検索  
<https://dev.classmethod.jp/server-side/java/spring-data-jpa_search/>

spring-data-jpa: ORA-01795: maximum number of expressions in a list is 1000  
<https://stackoverflow.com/questions/40462110/spring-data-jpa-ora-01795-maximum-number-of-expressions-in-a-list-is-1000>
