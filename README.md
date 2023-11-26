# JIROES
JIROESは、**二郎系ラーメン専用**の口コミ情報サイトです。<br>
ユーザーはレビュー投稿や新規店舗登録が出来、閲覧する事が可能です。<br>

[https://jiroes-front.vercel.app/](https://jiroes-front.vercel.app/)
<br>
<br>

![FireShot Capture 011 -  - jiroes-front vercel app](https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/76a4af8f-79cc-49b2-8899-99f6f58961ed)

## 機能紹介
1. ユーザーログイン機能
2. 店舗検索機能
3. レビュー投稿機能
4. 新規店舗登録・編集機能
<br>
1. ユーザーログイン機能<br>
Auth0を利用しメールアドレスとパスワードでログインが可能です。<br>
<img width="800" alt="ER図" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/d43790d0-ac08-4bbe-8e88-bc21420bc2d1">
<br>
<br>

2. 店舗検索機能<br>
店舗名や所在地を検索ワードとして部分一致検索が出来ます。<br>
<img width="800" alt="ER図" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/cd994671-34c8-4b21-ae67-8f8f75f51efd">
<br>
<br>

3. レビュー投稿機能<br>
画像ファイルを添付してレビュー投稿が出来ます。<br>
<img width="800" alt="ER図" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/8b3eb9c9-ccc2-41ab-a873-88929332898c">
投稿したレビューは店舗詳細ページでその店舗のレビューが一覧で表示されます。



## 使用技術
- バックエンド
  - Ruby 2.7.7
  - Ruby on Rails 6.1.7
  - rspec-rails 5.0.3
  - rubocop 1.32
- フロントエンド
  - React 18.2.0
  - Next.js 13.4.16
  - jest 29.7.0
  - eslint 8.47.0
  - prettier 3.0.3
  - Auth0　(ログイン認証用外部API)
- インフラ
  - Github Actions　(CI/CD)
  - S3 (画像アップロード先)
  - postgreSQL (データベース)
  - Heroku　(バックエンドデプロイ先)
  - Vercel　(フロントエンドデプロイ先)
 
## 開発経緯
私が二郎系ラーメンが好きで、二郎系をもっと多くの人に知ってもらいたいという思いから開発に至りました。  
二郎系というと「ルールが厳しくて入りにくい」というイメージがついており、  
入店のハードルが高くなっている一面があると思っています。  
そこで、二郎系特有のルールや店舗情報を一度に収集出来る場所があれば  
そのハードルを下げる事ができると思い当アプリを開発しました。

## バックエンドリポジトリ
[Jiroes_api](https://github.com/YoshihitoIshikawa/Jiroes_api)

## ER図
<img width="600" alt="ER図" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/c4c0b307-b296-415e-b8a3-15a7c2b2ed9b">



