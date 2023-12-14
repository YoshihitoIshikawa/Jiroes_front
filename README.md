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
4. 店舗登録機能
5. Google Map API機能
6. レビューいいね機能
<br>

1. ユーザーログイン機能<br>
ヘッダー右上の「ログイン」をクリックして、<br>
Auth0を利用しメールアドレスとパスワードでログインが可能です。<br>
ゲストログインは、<br>
email: guest@example.com<br>
password: 123456Aa<br>
でゲストアカウントにログイン出来ます。<br>
<img width="700" alt="ログイン画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/d43790d0-ac08-4bbe-8e88-bc21420bc2d1">
<br>
<br>

3. 店舗検索機能<br>
店舗名や所在地を検索ワードとして部分一致検索が出来ます。<br>
<img width="700" alt="検索結果画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/cd994671-34c8-4b21-ae67-8f8f75f51efd">
<br>
<br>

4. レビュー投稿機能<br>
画像ファイルを添付してレビュー投稿が出来ます。<br>
<img width="700" alt="レビュー投稿画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/8b3eb9c9-ccc2-41ab-a873-88929332898c">
<br>
<br>

投稿したレビューは店舗詳細ページでその店舗のレビューが一覧で表示されます。
<br>
<img width="700" alt="レビュー一覧画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/245ca7ff-4c04-4246-ab46-9414cad201a2">
<br>
<br>

自身で投稿したレビューにはレビュー詳細ページにボタンが表示され編集・削除ができます。
<br>
<img width="700" alt="レビュー詳細画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/29df2a4c-125c-4a2e-ad3d-aae84cfad7e7">
<br>
<br>

4. 店舗登録機能<br>
店舗情報を入力して新規店舗を登録出来ます。<br>
<img width="700" alt="店舗登録画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/d46b6083-e0f8-4bd6-b232-c19d5b14f8d8">
<br>
<br>

登録した情報は店舗詳細ページの店舗情報タブで閲覧・編集出来ます。
<br>
<img width="700" alt="店舗情報画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/dea8346a-3d72-45fb-a9fd-55738b7813eb">
<br>
<br>

5. Google Map API機能<br>
店舗詳細ページのマップボタンからgoogle map apiを呼び出す事が出来ます。<br>
<img width="700" alt="店舗登録画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/f82069cf-72ed-41c7-b8ea-4bfaf4c145f3">
<br>
<br>

6. レビューいいね機能<br>
ログインユーザーはレビューをいいねする事が出来ます。<br>
<img width="700" alt="店舗登録画面" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/6276af3f-c9be-4eea-94ad-d6c61bb30e9f">
<br>
<br>

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
- インフラ
  - Github Actions (CI/CD)
  - S3 (画像アップロード先)
  - postgreSQL (データベース)
  - Heroku (バックエンドデプロイ先)
  - Vercel (フロントエンドデプロイ先)
  - Auth0 (ログイン認証用外部API)
  - Google Maps Platform (Google Map利用外部API)
    - Geocoding API (緯度・経度の取得)
    - Maps JavaScript API (地図の表示)
 
## 開発経緯
私自身二郎系ラーメンが好きで、二郎系をもっと多くの人に知ってもらいたいという思いがあります。  
ですが、二郎系というと「ルールが厳しくて入りにくい」というイメージがついており、  
入店のハードルが高いと考えている方が一定数いらっしゃると思います。  
そこで、二郎系特有のルールや店舗情報を一度に収集出来る場所があれば、   
そういった方々の不安を取り除く事ができると思い当アプリを開発しました。

## バックエンドリポジトリ
[Jiroes_api](https://github.com/YoshihitoIshikawa/Jiroes_api)

## ER図
<img width="600" alt="ER図" src="https://github.com/YoshihitoIshikawa/Jiroes_front/assets/124547294/9a805041-4d7f-4ee9-aeee-c942afce2e3a">


