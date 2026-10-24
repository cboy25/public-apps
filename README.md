# public-apps

公開してよい業務用ツールをまとめたリポジトリです。各アプリはフォルダごとに分かれています。

## アプリ一覧

### work-log-organizer

現場記録・作業ログ整理ツール。トーク履歴や写真を1枚の記録に整理します。すべての処理は端末内で完結し、外部にデータは送信されません。

- `index.html` — トーク履歴（LINE WORKS/LINE/Slack/メールなど）を読み込んで整理する版
- `record.html` — スマホでその場から直接記録を作る版（カメラ撮影対応）

GitHub Pages公開時のURL例：
- `https://<username>.github.io/public-apps/work-log-organizer/index.html`
- `https://<username>.github.io/public-apps/work-log-organizer/record.html`

### doc-scanner

書類スキャナ。スマホで書類を撮影し、四隅の自動検出・台形補正・影除去(カラー補正/グレー/白黒)をしてPDFやJPEGで保存・共有します。すべての処理は端末内で完結し、外部にデータは送信されません。

- `index.html` — スキャナ本体(カメラ撮影対応・複数ページ対応)。右上の「設定」で検出・仕上がり・保存画質・PDFの用紙などの変更と、バージョン情報・更新の確認ができます
- `manifest.webmanifest`・`icons/` — アプリ(PWA)としてホーム画面にインストールするための設定とアイコン
- `sw.js` — 輪郭検出用の OpenCV.js(初回のみCDNから読み込み)とアプリ本体を端末に保存し、オフラインでも使えるようにする

GitHub Pages公開時のURL例：
- `https://<username>.github.io/public-apps/doc-scanner/`
