# Cursor プラグイン

> [!NOTE]
> このリポジトリは、[cursor/plugins](https://github.com/cursor/plugins) を日本語に訳した**非公式**の翻訳版です。Cursor／Anysphere とは関係ありません。各プラグインの著作権表示とライセンス文は、それぞれの `LICENSE` に原文のまま残しています。

よく使われる開発ツール、フレームワーク、SaaS 製品向けの Cursor 公式プラグイン集です。各プラグインはリポジトリ直下にある独立したディレクトリで、それぞれ専用の `.cursor-plugin/plugin.json` マニフェストを持ちます。

## プラグイン一覧

| `name` | プラグイン | 作者 | カテゴリ | 説明（マーケットプレイスの `description` を和訳） |
|:-------|:-------|:-------|:---------|:-------------------------------------|
| `teaching` | [Teaching](teaching/) | Cursor | Utilities | スキルの棚卸し、練習計画、学習の振り返り。 |
| `continual-learning` | [Continual Learning](continual-learning/) | Eric Zakariasson | Developer Tools | 重要度の高い要点だけを箇条書きにして、会話記録をもとに AGENTS.md の記憶を少しずつ更新する。 |
| `cursor-team-kit` | [Cursor Team Kit](cursor-team-kit/) | Eric Zakariasson | Developer Tools | CI、コードレビュー、リリース、ローカルの自動化、検証のための社内チーム向けワークフロー。 |
| `thermos` | [Thermos](thermos/) | Cursor | Developer Tools | ブランチを徹底的にレビューする。セキュリティと正しさの深い監査、厳しいコード品質ルーブリック、並列サブエージェント、thermos によるオーケストレーション、任意でマージ可能な PR まで進めるフロー。 |
| `create-plugin` | [Create Plugin](create-plugin/) | Cursor | Developer Tools | 新しいエージェントプラグインのひな形を作り、検証する。 |
| `ralph-loop` | [Ralph Loop](ralph-loop/) | Cursor | Developer Tools | Ralph Wiggum 手法を使った、自己参照的に繰り返す AI ループ。 |
| `agent-compatibility` | [Agent Compatibility](agent-compatibility/) | Cursor | Developer Tools | CLI によるリポジトリの互換性スキャンと、起動手順・検証・ドキュメントが実態と合っているかを監査するエージェント。 |
| `cli-for-agent` | [CLI for Agents](cli-for-agent/) | Eric Zakariasson | Developer Tools | コーディングエージェントが確実に実行できる CLI を設計するためのパターン。フラグ、例付きのヘルプ、パイプライン、エラー、冪等性、ドライラン。 |
| `pr-review-canvas` | [PR Review Canvas](pr-review-canvas/) | Cursor | Developer Tools | PR の差分を、重要度ごとにまとめたレビュー用キャンバスとして表示する。 |
| `docs-canvas` | [Docs Canvas](docs-canvas/) | Cursor | Developer Tools | ドキュメントを、たどりやすいキャンバスとして表示する。 |
| `cursor-sdk` | [Cursor SDK](cursor-sdk/) | Cursor | Developer Tools | TypeScript SDK でアプリ、スクリプト、自動化を作る。 |
| `origin-apps` | [Origin Apps](origin-apps/) | Cursor | Developer Tools | Cursor Origin API の上で開発するためのスキル。まず最新の仕様を取得し、認証情報、スコープ、Webhook、ページング、エラーについて Origin のルールに従う。既存の GitHub App の移植を計画するスキルも含む。 |
| `orchestrate` | [Orchestrate](orchestrate/) | Cursor | Developer Tools | 大きなタスクを、プランナー、ワーカー、検証役、構造化された引き継ぎを使って、並列のクラウドエージェントに分散させる。 |
| `pstack` | [pstack](pstack/) | Lauren Tan | Developer Tools | 速く進みたいなら、まず深く掘り下げること。pstack は、より少ないコード量でより高品質なコードを書く手助けをします。自信を持って並列化できる、厳格なエージェントワークフロー。 |
| `dyl-stack` | [dyl-stack](dyl-stack/) | Dylan Gattey | Developer Tools | pstack の上に Dylan のエージェントのスタイルを載せたもの。症状への対処より根本原因、設計の前に The Algorithm、簡潔で検証済みの納品、貼り付けて収まる PR レビュー、ビジュアル審査役付きの Figma から UI への変換。 |
| `advisor` | [Advisor](advisor/) | Cursor | Developer Tools | 大きな判断の前、行き詰まったとき、完了を宣言する前に、より強いモデルに相談する。 |
| `grok-voice` | [Grok Voice](grok-voice/) | Eric Zakariasson | Developer Tools | アプリに Grok の音声機能を追加する。リアルタイムの音声対音声、音声入力（speech-to-text）、読み上げ（text-to-speech）、ログをもとに音声セッションを直していくループ。 |
| `gmail` | [Gmail](third_party/gmail/) | Cursor | Productivity | メールを検索、閲覧、下書き、管理する。 |
| `google-drive` | [Google Drive](third_party/google-drive/) | Cursor | Productivity | ファイルを検索、閲覧、作成、共有する。 |
| `google-calendar` | [Google Calendar](third_party/google-calendar/) | Cursor | Productivity | 予定を検索し、会議を設定する。 |
| `google-docs` | [Google Docs](third_party/google-docs/) | Cursor | Productivity | ドキュメントを閲覧、作成、編集する。 |
| `google-sheets` | [Google Sheets](third_party/google-sheets/) | Cursor | Productivity | スプレッドシートのデータを読み取り、書き込み、追記する。 |
| `google-slides` | [Google Slides](third_party/google-slides/) | Cursor | Productivity | プレゼンテーションを作成、編集、描画する。 |
| `google-ads` | [Google Ads](third_party/google-ads/) | Cursor | Integrations | キャンペーンをレポートし、キーワードを調査し、プレビューしたうえで変更する。 |
| `google-analytics` | [Google Analytics](third_party/google-analytics/) | Cursor | Integrations | GA4 のレポートを実行し、プロパティの設定を管理する。 |
| `google-search-console` | [Google Search Console](third_party/google-search-console/) | Cursor | Integrations | 検索パフォーマンスを照会し、URL を検査し、サイトマップを管理する。 |
| `gong` | [Gong](third_party/gong/) | Cursor | Integrations | アカウントの要約、商談のインサイト、通話の概要を取得する。 |
| `salesforce` | [Salesforce](third_party/salesforce/) | Cursor | Integrations | 組織内のレコードを照会、作成、更新する。 |
| `salesforce-headless-360` | [Salesforce (Headless 360, Beta)](third_party/salesforce-headless-360/) | Cursor | Integrations | Salesforce 全体のレコード、ユーザー、組織設定を管理する。 |
| `playwright` | [Playwright](third_party/playwright/) | Cursor | Integrations | 実際のブラウザで移動、クリック、スクリーンショット、テストを行う。 |
| `github` | [GitHub](third_party/github/) | Cursor | Integrations | リポジトリ、Issue、プルリクエスト、Actions を管理する。 |
| `ashby` | [Ashby](third_party/ashby/) | Cursor | Integrations | 候補者を検索し、面接を準備し、選考パイプラインのタスクを管理する。 |
| `hubspot` | [HubSpot](third_party/hubspot/) | Cursor | Integrations | コンタクト、会社、取引、チケットを検索・更新する。 |
| `intercom` | [Intercom](third_party/intercom/) | Cursor | Integrations | 会話、コンタクト、ヘルプセンターの記事を検索する。 |
| `zoom` | [Zoom](third_party/zoom/) | Cursor | Integrations | ミーティングを検索し、文字起こしを取得し、Zoom Docs を操作する。 |
| `x` | [X](third_party/x/) | Cursor | Integrations | 投稿の検索、タイムラインの閲覧、トレンドの取得、スペースとコミュニティの閲覧、リストとブックマークの管理、X Chat の利用、X の通話の予約、ライブ配信の管理。 |
| `clay` | [Clay](third_party/clay/) | Cursor | Integrations | 人物と企業の情報を補完し、AI リサーチエージェントを実行する。 |
| `circleback` | [Circleback](third_party/circleback/) | Cursor | Integrations | ミーティング、文字起こし、アクションアイテム、メールを検索する。 |
| `docusign` | [Docusign](third_party/docusign/) | Cursor | Integrations | エンベロープ、テンプレート、ワークフロー、契約を管理する。 |
| `navan` | [Navan](third_party/navan/) | Cursor | Integrations | 経費、出張の予約、規程、カードを照会する。 |
| `profound` | [Profound](third_party/profound/) | Cursor | Integrations | AI 上での露出度、評判、引用を追跡する。 |
| `juicebox` | [Juicebox](third_party/juicebox/) | Cursor | Integrations | 採用分析、候補者リスト、ソーシングエージェントを照会する。 |
| `outreach` | [Outreach](third_party/outreach/) | Cursor | Integrations | シーケンス、見込み客、Kaia のミーティングを検索する。 |
| `amplemarket` | [Amplemarket](third_party/amplemarket/) | Cursor | Integrations | 人物と企業を検索し、リード情報を補完し、シーケンスを実行する。 |
| `klaviyo` | [Klaviyo](third_party/klaviyo/) | Cursor | Integrations | プロファイル、セグメント、キャンペーン、フローを管理する。 |
| `customer-io` | [Customer.io](third_party/customer-io/) | Cursor | Integrations | キャンペーンを作成し、セグメントを管理し、人物を照会する。 |
| `mailerlite` | [MailerLite](third_party/mailerlite/) | Cursor | Integrations | 購読者、グループ、キャンペーン、自動化を管理する。 |
| `brevo` | [Brevo](third_party/brevo/) | Cursor | Integrations | コンタクト、メールと SMS のキャンペーン、CRM の取引を管理する。 |
| `typeform` | [Typeform](third_party/typeform/) | Cursor | Integrations | フォームを作成し、回答を分析し、コンタクトを管理する。 |
| `jotform` | [Jotform](third_party/jotform/) | Cursor | Integrations | フォームを作成・編集し、送信内容を読み取る。 |
| `semrush` | [Semrush](third_party/semrush/) | Cursor | Integrations | キーワード、被リンク、トラフィック、競合を調査する。 |
| `ahrefs` | [Ahrefs](third_party/ahrefs/) | Cursor | Integrations | キーワード、被リンク、順位、サイトの健全性を調査する。 |
| `godaddy` | [GoDaddy](third_party/godaddy/) | Cursor | Integrations | ドメイン名の候補を考え、空き状況を確認する。 |
| `upwork` | [Upwork](third_party/upwork/) | Cursor | Integrations | 人材を検索し、仕事を掲載し、契約を管理する。 |
| `workable` | [Workable](third_party/workable/) | Cursor | Integrations | 候補者を検索し、選考パイプラインを進め、人事記録を管理する。 |
| `brex` | [Brex](third_party/brex/) | Cursor | Integrations | 経費、領収書、請求書、カード、出張を照会する。 |
| `todoist` | [Todoist](third_party/todoist/) | Cursor | Integrations | タスクとプロジェクトを作成、検索、完了する。 |
| `calendly` | [Calendly](third_party/calendly/) | Cursor | Integrations | 空き状況を確認し、予約、キャンセル、日程変更を行う。 |
| `smartsheet` | [Smartsheet](third_party/smartsheet/) | Cursor | Integrations | シート、行、ワークスペースを照会・更新する。 |
| `wrike` | [Wrike](third_party/wrike/) | Cursor | Integrations | プロジェクトを検索し、タスクを作成し、コメントを投稿する。 |
| `coda` | [Coda](third_party/coda/) | Cursor | Integrations | ドキュメントを検索し、ページを読み、テーブルを更新する。 |
| `guru` | [Guru](third_party/guru/) | Cursor | Integrations | 社内のナレッジを検索し、検証済みの回答を下書きする。 |
| `fireflies` | [Fireflies](third_party/fireflies/) | Cursor | Integrations | ミーティングの文字起こし、要約、アクションアイテムを検索する。 |
| `otter` | [Otter.ai](third_party/otter/) | Cursor | Integrations | ミーティングの履歴を検索し、文字起こしの全文を取得する。 |
| `fathom` | [Fathom](third_party/fathom/) | Cursor | Integrations | ミーティングを検索し、文字起こしと要約を取得する。 |
| `craft` | [Craft](third_party/craft/) | Cursor | Integrations | ドキュメントとデイリーノートを検索、作成、更新する。 |
| `mem` | [Mem](third_party/mem/) | Cursor | Integrations | メモとコレクションを記録、検索、整理する。 |
| `readwise` | [Readwise](third_party/readwise/) | Cursor | Integrations | ハイライトと Reader のドキュメントを検索し、記事を保存する。 |
| `similarweb` | [Similarweb](third_party/similarweb/) | Cursor | Integrations | Web サイトのトラフィック、利用者層、競合を分析する。 |
| `xero` | [Xero](third_party/xero/) | Cursor | Integrations | 請求書、取引先、レポート、給与のデータを読み書きする。 |
| `x-ads` | [X Ads](third_party/x-ads/) | Cursor | Integrations | 広告キャンペーンを管理し、広告を作成し、コンバージョンを計測し、成果データを取得する。 |
| `meta-ads` | [Meta Ads](third_party/meta-ads/) | Cursor | Integrations | キャンペーン、広告、オーディエンス、カタログを管理し、成果のインサイトを取得する。 |
| `attio` | [Attio](third_party/attio/) | Cursor | Integrations | CRM のレコード、リスト、メモ、タスクを検索・更新する。 |
| `hunter` | [Hunter](third_party/hunter/) | Cursor | Integrations | メールアドレスを検索・検証し、企業を見つけ、リードを保存する。 |
| `stable` | [Stable](third_party/stable/) | Cursor | Integrations | 郵便物を探し、スキャンした書類を読み、Stable API のエンドポイントを呼び出す。 |
| `gamma` | [Gamma](third_party/gamma/) | Cursor | Integrations | プレゼンテーション、ドキュメント、Web ページを生成する。 |
| `teams` | [Teams](third_party/teams/) | Cursor | Productivity | Microsoft Teams のチャットとチャネルのメッセージを検索、閲覧、送信する。 |
| `sharepoint` | [SharePoint](third_party/sharepoint/) | Cursor | Productivity | Microsoft SharePoint のサイト、ドキュメントライブラリ、ファイル、リストを検索・閲覧する。 |
| `power-bi` | [Power BI](third_party/power-bi/) | Cursor | Integrations | Microsoft Power BI のワークスペースを閲覧し、レポートのページを表示する。 |
| `finance` | [Finance](third_party/finance/) | Cursor | Integrations | アカウントを安全に接続し、支出、サブスクリプション、残高、投資についての質問に Grok が答えられるようにする。 |
| `webull` | [Webull](third_party/webull/) | Cursor | Integrations | 口座、ポジション、注文、ウォッチリスト、市場データを表示する。 |
| `sp-global` | [S&P Global](third_party/sp-global/) | Cursor | Integrations | S&P Capital IQ の財務データ、株価、決算説明会の文字起こしを照会する。 |
| `interactive-brokers` | [Interactive Brokers](third_party/interactive-brokers/) | Cursor | Integrations | ポジション、残高、損益を確認し、取引指示を下書きする。 |
| `meltwater` | [Meltwater](third_party/meltwater/) | Cursor | Integrations | メディアとソーシャルでの言及を検索し、分析データを取得する。 |
| `daloopa` | [Daloopa](third_party/daloopa/) | Cursor | Integrations | 出典にリンクされたファンダメンタルズ、KPI、開示書類、株価を取得する。 |
| `pitchbook` | [PitchBook](third_party/pitchbook/) | Cursor | Integrations | 未上場企業、ディール、投資家、ファンドを調査する。 |
| `excalidraw` | [Excalidraw](third_party/excalidraw/) | Cursor | Integrations | チャットから手描き風の図を描き、書き出す。 |
| `google-cloud-bigquery` | [Google Cloud BigQuery](third_party/google-cloud-bigquery/) | Cursor | Integrations | データセットとテーブルを調べ、SQL クエリを実行する。 |
| `statsig` | [Statsig](third_party/statsig/) | Cursor | Integrations | フィーチャーゲート、実験、動的設定、メトリクスを確認・管理する。 |
| `robinhood` | [Robinhood](third_party/robinhood/) | Cursor | Integrations | ポートフォリオ、ポジション、注文、ウォッチリスト、市場データを表示し、Robinhood Agentic 口座で取引する。 |
| `coinbase` | [Coinbase](third_party/coinbase/) | Cursor | Integrations | 残高を確認し、見積もりを取り、取引をプレビューまたは発注する。 |
| `etoro-trading` | [eToro Trading](third_party/etoro-trading/) | Cursor | Integrations | eToro のポートフォリオ、残高、ポジション、ウォッチリストを表示し、銘柄とトレーダーを調べ、取引を準備・発注する。 |
| `x-money` | [X Money](third_party/x-money/) | Cursor | Integrations | X Money Card を使い、X のユーザーに送金し、お金を管理し、残高を確認し、取引履歴を閲覧する。 |
| `shopify-store` | [Shopify](third_party/shopify-store/) | Cursor | Integrations | Shopify ストアを接続し、商品、注文、顧客、在庫、売上についての質問に Grok が答えられるようにする。 |
| `quickbooks-online` | [Intuit QuickBooks](third_party/quickbooks-online/) | Cursor | Finance and Legal | QuickBooks は Grok Bot と連携して、事業の財務管理を助け、入金を早め、スケジュールどおりに動くボットで主要な業務を進めます。損益、キャッシュフロー、貸借対照表、売掛金と買掛金の年齢表、顧客別・商品別の売上のレポートで、事業の状況を把握できます。利益、売上、経費を、同じ地域の類似事業と比較できます。請求書と見積書の作成・送付・フォローアップ、定期請求書の設定、支払いリンクの送付（米国とカナダ）ができます。顧客、商品、従業員を管理し、給与明細を確認し、次回の給与計算をプレビューできます。CSV から取引を QuickBooks に直接取り込み、QuickBooks Capital の融資についての回答を得られます。 |
| `workday` | [Workday](third_party/workday/) | Cursor | Integrations | Workday で従業員、組織、休暇、給与、採用のデータを調べる。 |
| `whatsapp-business` | [WhatsApp Business](third_party/whatsapp-business/) | Cursor | Integrations | WhatsApp Business でメッセージを送り、テンプレート、連絡先、電話番号を管理する。 |
| `zoho-crm` | [Zoho CRM](third_party/zoho-crm/) | Cursor | Integrations | リード、コンタクト、アカウント、商談など、Zoho CRM のレコードを扱う。 |
| `zoho-desk` | [Zoho Desk](third_party/zoho-desk/) | Cursor | Integrations | Zoho Desk のチケット、コンタクト、タスク、ナレッジベースの記事を扱う。 |
| `zoho-books` | [Zoho Books](third_party/zoho-books/) | Cursor | Integrations | Zoho Books の取引先、請求書、見積書、品目を扱う。 |
| `business-central` | [Microsoft Dynamics 365 Business Central](third_party/business-central/) | Cursor | Integrations | Business Central の顧客、仕入先、品目、販売・購買の伝票、総勘定元帳を扱う。 |
| `sap-s4hana-cloud` | [SAP S/4HANA Cloud](third_party/sap-s4hana-cloud/) | Cursor | Integrations | SAP S/4HANA Cloud のビジネスパートナー、製品、受注・発注、仕入先請求書、仕訳明細を扱う。 |
| `square` | [Square](third_party/square/) | Cursor | Integrations | 決済、注文、カタログ、顧客、請求書を扱う。 |
| `tailscale` | [Tailscale](third_party/tailscale/) | Cursor | Integrations | プライベートな Tailscale ネットワーク上の MCP サーバーに Grok Bot が到達できるようにする。自分の tailnet を接続するか、チーム管理者が有効にした会社の tailnet を使い、メンバーはそれぞれ自分のデバイスから接続する。 |
| `highlevel` | [HighLevel](third_party/highlevel/) | Cursor | Integrations | コンタクト、会話、商談、カレンダー、決済を扱う。 |
| `finary` | [Finary](third_party/finary/) | Cursor | Integrations | 純資産、口座、保有資産、支出、予算を読み取る。 |
| `tiktok-for-business` | [TikTok for Business](third_party/tiktok-for-business/) | Cursor | Integrations | TikTok の広告キャンペーン、広告グループ、広告、オーディエンス、クリエイティブ、レポートを管理する。 |
| `gusto` | [Gusto](third_party/gusto/) | Cursor | Integrations | 給与、従業員、業務委託、休暇、レポートを扱う。 |
| `gopuff` | [Gopuff](third_party/gopuff/) | Cursor | Integrations | Gopuff 公式の MCP サーバーを通じて、Grok Bot から Gopuff で買い物をする。Gopuff アカウントでサインインする。サインインは Gopuff が処理し、検索、カート、注文はそのアカウントで Gopuff に送られるため、注文は通常の Gopuff の注文と同じように請求・配達される。 |
| `databricks-genie` | [Databricks Genie](third_party/databricks-genie/) | Cursor | Integrations | ワークスペースのデータについて、普段の言葉で Databricks Genie に質問する。 |
| `lark` | [Lark](third_party/lark/) | Cursor | Integrations | Lark Suite のドキュメントを検索、作成、更新し、Lark のメッセージとグループを読む。 |
| `lark-base` | [Lark Base](third_party/lark-base/) | Cursor | Integrations | Lark Base のテーブル、フィールド、ビュー、レコードを読み取り・更新する。 |
| `feishu` | [Feishu](third_party/feishu/) | Cursor | Integrations | Feishu のドキュメントを検索、作成、更新し、Feishu のメッセージとグループを読む。 |
| `vanta` | [Vanta](third_party/vanta/) | Cursor | Integrations | Vanta のコンプライアンステスト、コントロール、フレームワーク、リスク、脆弱性を照会し、是正する。 |
| `ringcentral-phone` | [RingCentral Phone](third_party/ringcentral-phone/) | Cursor | Integrations | 通話履歴、AI による通話メモ、SMS、留守番電話、FAX を読み取り、SMS を送信する。 |
| `ringcentral-chat` | [RingCentral Chat](third_party/ringcentral-chat/) | Cursor | Integrations | チームのチャットと投稿を読み、メッセージを送り、チーム、タスク、メモを管理する。 |
| `servicenow` | [ServiceNow](third_party/servicenow/) | Cursor | Integrations | 管理者が ServiceNow インスタンスで公開しているツールを呼び出す。 |
| `rippling` | [Rippling](third_party/rippling/) | Cursor | Integrations | Rippling で人、休暇、社内規程を調べ、休暇申請や採用の下書きを作成する。 |
| `onepay` | [OnePay](third_party/onepay/) | Cursor | Integrations | OnePay の口座にアクセスする。残高、取引、クレジット、Pay Later、投資、暗号資産、リワード。 |
| `questrade` | [Questrade](third_party/questrade/) | Cursor | Integrations | Questrade のポートフォリオを読み取り、リアルタイムの市場データを取得し、取引の候補について相談する。 |
| `tesla` | [Tesla](third_party/tesla/) | Cursor | Integrations | Tesla の車とエネルギーサイトの情報を読み取り、確認したうえでコマンドを送る。 |
| `uber-courier` | [Uber Courier](third_party/uber-courier/) | Cursor | Integrations | Uber アカウントで、荷物配送の料金確認、予約、追跡、キャンセルを行う。 |
| `fitmetrics` | [FitMetrics](third_party/fitmetrics/) | Cursor | Integrations | Trainerize のクライアントとチェックインを確認し、マクロ、メッセージ、プログラムを更新する。 |
| `mixpanel` | [Mixpanel](third_party/mixpanel/) | Cursor | Integrations | Mixpanel のイベント、ファネル、フロー、リテンションを照会し、ダッシュボード、コホート、実験、フィーチャーフラグを管理する。 |
| `metricool` | [Metricool](third_party/metricool/) | Cursor | Integrations | Metricool の各ブランドで、SNS 投稿の計画と公開、指標とレポートの取得、受信箱・レビュー・広告の管理を行う。 |
| `eight-sleep` | [Eight Sleep](third_party/eight-sleep/) | Cursor | Integrations | Eight Sleep アカウントを接続し、睡眠スコア、睡眠段階、心拍の指標、Pod の状態と温度設定を確認し、変更ごとに承認したうえでアラームと自分側の Pod を管理する。 |
| `netsuite` | [NetSuite](third_party/netsuite/) | Cursor | Integrations | NetSuite のレコード、レポート、保存検索、SuiteQL クエリを扱う。 |
| `front` | [Front](third_party/front/) | Cursor | Integrations | 会話を検索し、返信を下書き・送信し、タグ、タスク、受信箱を管理する。 |
| `paypal` | [PayPal](third_party/paypal/) | Cursor | Integrations | PayPal の請求書、注文、返金、サブスクリプション、異議申し立て、取引を扱う。 |
| `engine` | [Engine](third_party/engine/) | Cursor | Integrations | Engine でホテルを検索・予約し、滞在を短縮・キャンセルし、サポートケースを確認する。 |
| `squarespace` | [Squarespace](third_party/squarespace/) | Cursor | Integrations | Squarespace でビジネス名の候補を考え、ドメインの空き状況、料金、購入リンクを確認する。 |
| `runta` | [Runta](third_party/runta/) | Cursor | Integrations | Runta で永続的なエージェント実行環境を作成・実行し、ポートを公開し、外向き通信、チェックポイント、イメージを管理する。 |
| `hospitable` | [Hospitable](third_party/hospitable/) | Cursor | Integrations | Hospitable で、短期賃貸の物件、予約、カレンダー、ゲストとのメッセージ、タスク、支払い、オーナー向け明細を管理する。 |
| `close` | [Close](third_party/close/) | Cursor | Integrations | Close のリード、コンタクト、商談、タスク、会話を検索・更新する。 |
| `factset` | [FactSet](third_party/factset/) | Cursor | Integrations | FactSet のファンダメンタルズ、株価、予想、株主構成、企業データを照会する。 |
| `redo` | [Redo](third_party/redo/) | Cursor | Integrations | Redo で、注文と顧客の検索、返品の作成と処理、サポートチケットの対応、マーケティングキャンペーンと自動化の確認、フルフィルメントと在庫の管理、分析レポートの作成を行う。 |
| `strava` | [Strava](third_party/strava/) | Cursor | Integrations | Strava アカウントを接続し、アクティビティ、統計、アスリートプロフィールを Grok が読み取ってトレーニングについての質問に答えられるようにする。非公開のアクティビティを含め、プロフィールとアクティビティのデータを共有することになる。アクセスは読み取り専用で、Strava の My Apps 設定からいつでも接続を解除できる。 |
| `expensify` | [Expensify](third_party/expensify/) | Cursor | Integrations | Expensify アカウントを接続し、経費、レポート、領収書、請求書を Grok が検索して支出についての質問に答えられるようにする。共有されるのは、そのアカウントですでに見られる Expensify のデータ。アクセスは読み取り専用で、いつでも取り消せる。 |
| `rillet` | [Rillet](third_party/rillet/) | Cursor | Integrations | Rillet の財務レポートを照会し、顧客、請求書、支払請求、契約、仕入先を管理する。 |
| `item` | [Item](third_party/item/) | Cursor | Integrations | CRM のコンタクト、会社、カスタムオブジェクトを検索・作成・更新し、保存したビューを実行し、リスト、メモ、タスクを管理し、顧客データについて Item アシスタントに質問する。 |
| `hq` | [HQ](third_party/hq/) | Cursor | Integrations | HQ by Indigo で、社内のナレッジ、プロジェクト、規程、ファイル、スキルを読み取り・記録し、チームメイトやボットにメッセージを送り、管理された連携機能を呼び出す。 |
| `createos` | [CreateOS](third_party/createos/) | Cursor | Integrations | NodeOps CreateOS で、プロジェクト、環境、デプロイ、ドメイン、ログ、cron ジョブ、セキュリティスキャン、テンプレート、サンドボックスをデプロイ・管理する。 |
| `fiscal-ai` | [Fiscal.ai](third_party/fiscal-ai/) | Cursor | Integrations | Fiscal.ai から、出典にリンクされた財務データ、開示書類、財務比率、株価、セグメント、KPI、株主構成、ファンドレター、ニュースを取得する。 |
| `lmty` | [LMTY](third_party/lmty/) | Cursor | Integrations | 自社製品について、追跡中の競合、競合分析レポート、変更履歴、根拠、SNS での言及、市場フィードを読み、LMTY の公開 Markets、イベントのタイムライン、企業・製品・人物のプロフィールを閲覧する。 |
| `sabre-developer-hub` | [Sabre Developer Hub](third_party/sabre-developer-hub/) | Cursor | Integrations | 旅行関連の API、SDK、製品コレクションについて、Sabre Developer Hub のドキュメント、OpenAPI 仕様、Sabre が公開するエージェントスキルを検索・閲覧する。 |

「作者」欄の値は、各プラグインの `plugin.json` にある `author.name` と一致します（Cursor のマニフェストには `plugins@cursor.com` が記載されています）。

## リポジトリの構成

このリポジトリは、複数のプラグインをまとめたマーケットプレイスです。ルートの `.cursor-plugin/marketplace.json` が全プラグインを列挙し、各プラグインはそれぞれ自分のマニフェストを持ちます。

```
plugins/
├── .cursor-plugin/
│   └── marketplace.json       # マーケットプレイスのマニフェスト（全プラグインを列挙）
├── plugin-name/
│   ├── .cursor-plugin/
│   │   └── plugin.json        # プラグインごとのマニフェスト
│   ├── skills/                # エージェントスキル（frontmatter 付きの SKILL.md）
│   ├── rules/                 # Cursor ルール（.mdc ファイル）
│   ├── mcp.json               # MCP サーバーの定義
│   ├── README.md
│   ├── CHANGELOG.md
│   └── LICENSE
└── ...
```

## ライセンス

MIT（各プラグインの著作権表示とライセンス文は、それぞれの `LICENSE` を参照してください）
