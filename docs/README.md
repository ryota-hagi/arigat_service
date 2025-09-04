# ARIGAT Service Docs

- Location: `docs/`
- Purpose: 商品・サービスのHTML資料を集約し、一覧ページ（`docs/index.html`）から閲覧できるようにしました。
- 運用: 既存のHTMLはそのまま `docs/pages/` に配置（名称も原則維持）。新規追加や更新は同フォルダへ配置し、必要に応じて `docs/index.html` にリンクを追記します。

## GitHub Pages（任意）
GitHub Pages を使う場合は、リポジトリ設定で Pages のソースを `GitHub Actions` か `main /docs` に設定してください。`/docs` 配下がサイトルートになります。

