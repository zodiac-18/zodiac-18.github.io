# デプロイ手順（AWS S3 + CloudFront）

このサイトは静的SPA（`npm run build` で `dist/` に出力）です。
AWS の **S3（配信元）+ CloudFront（CDN/HTTPS）** で公開します。
S3 バケットは**非公開のまま**にし、CloudFront の **OAC（Origin Access Control）**経由でのみ配信する
現行ベストプラクティス構成です。

想定コスト：個人ポートフォリオの低トラフィックなら**月数十円〜、実質ほぼ無料**。

---

## 0. 事前準備

### AWS CLI のインストール（macOS）
```bash
brew install awscli        # Homebrew がある場合
aws --version              # 確認
```

### 認証情報の設定
IAM ユーザーのアクセスキーを発行し（マネジメントコンソール → IAM）、
```bash
aws configure
# AWS Access Key ID / Secret / region(例: ap-northeast-1) / output(json) を入力
```

> 学習用途なら最初は管理者権限ユーザーで進め、慣れたら S3/CloudFront に絞った最小権限ポリシーに変更するのが安全です。

---

## 1. ビルド
```bash
npm install
npm run build      # dist/ が生成される
```

---

## 2. S3 バケット作成（配信元・非公開）

コンソール → S3 → **バケットを作成**
- バケット名：グローバルに一意（例 `ogita-portfolio-2026`）
- リージョン：東京 `ap-northeast-1` でOK
- **「パブリックアクセスをすべてブロック」はオンのまま**（CloudFront 経由でしか触らせない）
- バージョニング等は任意

CLI でやる場合：
```bash
aws s3 mb s3://ogita-portfolio-2026 --region ap-northeast-1
```

### 中身をアップロード
```bash
aws s3 sync dist/ s3://ogita-portfolio-2026 --delete
```
（`--delete` でローカルに無いファイルを削除＝完全同期）

---

## 3. CloudFront ディストリビューション作成

コンソール → CloudFront → **ディストリビューションを作成**

- **Origin domain**：作成した S3 バケットを選択
  （「S3 website endpoint」ではなく**バケット本体**を選ぶ）
- **Origin access**：**Origin access control settings (recommended)** を選択
  → 「Create control setting」で OAC を新規作成
- 設定後に表示される**バケットポリシーを S3 にコピー**するよう案内が出る
  → ボタンから自動反映、または S3 のバケットポリシーに貼り付け
  （CloudFront からのみ `s3:GetObject` を許可する内容）
- **Viewer protocol policy**：`Redirect HTTP to HTTPS`
- **Default root object**：`index.html` ← 必須
- 価格クラス・WAF などは任意（学習なら最小でOK）

作成後、`dxxxx.cloudfront.net` のドメインが発行されます。数分で配信開始。

### SPA のフォールバック（任意）
このサイトはページ内アンカー遷移のみで実URLルーティングは無いため必須ではありませんが、
将来 React Router 等を入れる場合は CloudFront の **Error pages** で
`403` と `404` → レスポンスページ `/index.html`、HTTP 200 を返す設定を追加します。

---

## 4. 独自ドメイン（任意）

1. **ACM で証明書発行**：CloudFront 用の証明書は**必ず `us-east-1`（バージニア北部）**で作成
   - ドメイン（例 `ogita.dev`）を入力 → DNS 検証
2. CloudFront ディストリビューションの **Alternate domain name (CNAME)** にドメインを追加し、
   発行した ACM 証明書を割り当て
3. DNS（Route 53 もしくは他社）で、ドメインを CloudFront ドメインへ **CNAME / ALIAS** で向ける

---

## 5. 更新時のデプロイ（2コマンド）

コード変更後は以下を実行：
```bash
npm run build
aws s3 sync dist/ s3://ogita-portfolio-2026 --delete

# CloudFront のキャッシュを破棄して即時反映
aws cloudfront create-invalidation \
  --distribution-id <YOUR_DISTRIBUTION_ID> \
  --paths "/*"
```

> 毎回打つのが面倒なら `package.json` の scripts に
> `"deploy": "vite build && aws s3 sync dist/ s3://ogita-portfolio-2026 --delete && aws cloudfront create-invalidation --distribution-id <ID> --paths '/*'"`
> を足して `npm run deploy` 一発にできます。

---

## チェックリスト
- [ ] `vite.config.js` の `base` が `'/'`（ルート配信用）← 設定済み
- [ ] `npm run build` 成功
- [ ] S3 はパブリックアクセスブロックON（非公開）
- [ ] CloudFront は OAC 経由・Default root object = `index.html`
- [ ] `https://<dxxxx>.cloudfront.net` で表示確認
- [ ] テーマ切替・JA/EN 切替・各セクション表示OK
