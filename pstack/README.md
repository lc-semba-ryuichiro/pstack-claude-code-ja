# pstack

私は [poteto](https://x.com/poteto) です。社長でも CEO でもありませんが、Meta、Netflix、そして Cursor で数百万行規模のコードに携わってきました。また、React コアチームの一員として React Compiler の構築とメンテナンスも手伝っています。

AI が低品質で冗長なコード（slop code）を書きすぎているという感覚が広まっています。私も同感です。20人の雑な開発者チームが作ったようなコードをリリースしたいとは思いません。品質を伴わないスループットは、私が目指すゴールではありません。速く進みたいなら、まず深く掘り下げるべきです。

**pstack はそれに対する私なりの答えです。** これらは、私が Cursor で高品質なコードを日々リリースするために実際に使っているスキルそのものです。これを使うことで、Cursor が本物のエンジニアリングチームへと変わります。目的はコード行数（LOC）を最大化することではなく、むしろその逆です。pstack は、より少ないコード量で、より高品質なコードを書く手助けをします。

**pstack は恐れることのない並列実行をもたらします。** 1つのエージェントで深く掘り下げ、検証可能で優れたコードを書いてくれると信頼できるようになれば、自信を持って真の並列作業が可能になります。`poteto-mode` で複数のエージェントを立ち上げ、彼らが厳格なエンジニアリング原則を仕事に適用してくれることを信頼して任せてみてください。

**Cursor はすべての良いとこ取りを可能にします。** どの最先端モデルにも長所と短所があります。pstack では好きなモデルを使用できます。実際、私のスキルの多くはマルチモデルワークフローを採用しており、各モデル独自の強みを活かしています。

フォークして、改善して、自分のものにしてください。PR も大歓迎です！

## インストール

```bash
/add-plugin pstack
```

Claude Code の場合：

```bash
/plugin marketplace add cursor/plugins
/plugin install pstack@cursor-plugins
```

Claude Code ではサードパーティ製マーケットプレイスの自動更新がデフォルトでオフになっているため、pstack はインストール時のバージョンのまま維持されます。自動更新を有効にするには、`/plugin` を実行して **marketplaces** タブを開き、`cursor-plugins` を選択して **enable auto-update** を選んでください。手動で1回だけ更新する場合は、`claude plugin update pstack@cursor-plugins` を実行します。

Claude Code ではプラグインのコマンドやエージェントにプレフィックスが付くため、`/poteto-mode` は `/pstack:poteto-mode` になります。その他の Cursor 上の名称はすべて [Claude Code アダプター](./docs/harness/claude-code.md) によってマッピングされます。Claude Code で `/pstack:setup-pstack` を実行すると、選択したモデル設定が `~/.claude/rules/pstack-models.md` に書き込まれ、Bugbot や Automations といった Cursor 専用機能を必要とするステップは、1行の注記を残してスキップされます。

Claude Code は、リポジトリルートにある [`harness/pstack/`](https://github.com/cursor/plugins/tree/main/harness/pstack) から自動生成された pstack のコピー（この README やガイドを含む）をインストールします。pstack を変更した後は、リポジトリルートから `node scripts/generate-pstack-harness-trees.mjs` を実行し、その結果をコミットしてください。自動生成されたコピーが古いままの状態では CI が失敗します。

## はじめに

たった 2 ステップです：

1. [`/setup-pstack`](./skills/setup-pstack/SKILL.md) を実行し、推論バジェット（reasoning budget）と使用したいモデルを選択します。
2. 厳密さが求められる作業を行うときは、いつでも [`/poteto-mode`](./skills/poteto-mode/SKILL.md) を使用します。

初めて使う方は、[pstack ガイド](./docs/guide/README.md) をご覧ください。セットアップやプロンプトの書き方から、検証や夜間の自律実行まで、最初の本格的なタスクを通して順を追って解説しています。行き詰まったときや、どのスキルが適しているか迷ったときは、[`/poteto-help`](./skills/poteto-help/SKILL.md) に尋ねてください。

基本はこれだけです。他のスキルは状況に応じて使い分けるものであり、モードスキル（`poteto-mode`）が必要に応じて自動的に呼び出してくれます。初期状態では、コードの委譲（機能開発、リファクタリング、バグ修正、パフォーマンス改善、ヒルクライム）、文章作成、および判断タスクは `xhigh` 設定の `opus 5.5` に割り当てられており、`xhigh` を超える設定で実行されるロールはありません。レビューパネル以外では、`fable 5.2` はあなたが明示的に指定したとき、または同じ指示で `opus 5.5` の実行が2回失敗したときにのみ実行されます。デフォルトのレビューパネルは `fable 5.2 / opus 5.5 / gemini 4 neon` です。これらの設定はすべて [`/setup-pstack`](./skills/setup-pstack/SKILL.md) から変更できます。

## 使い方

タスクの開始時に [`/poteto-mode`](./skills/poteto-mode/SKILL.md) を使用します。リクエスト内容を読み取り、一連のプレイブックから適切なものを選択し、各ステップの必要に応じて他のスキルを実行します。

タスクを入力する前に `/` メニューから `/poteto-mode` を選択して、Cursor がメッセージにスキルを添付するようにしてください。

### まずは [`/poteto-mode`](./skills/poteto-mode/SKILL.md) を使う

このスキルがメインのショートカットです。エージェントに厳格なエンジニアリング作業をさせたいときは、いつもこれを使います。22種類のプレイブックが同梱されています：

```
/poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even when idle. repro
first, then fix and verify.
```

```
/poteto-mode i'm going to bed. land the stack even if ci flakes. i want everything merged by
morning.
```

<details>
<summary>22種類のプレイブック一覧</summary>

| プレイブック | 用途 |
|---|---|
| [investigation](./skills/poteto-mode/playbooks/investigation.md) | 読み取り専用の調査。「X はどのように動くのか」「なぜ Y はこのように作られたのか」「本当にそう言えるのか」といった疑問の解明。 |
| [bug fix](./skills/poteto-mode/playbooks/bug-fix.md) | 不具合を再現し、根本原因を特定したうえで、実行時の証拠とともに修正する。 |
| [perf](./skills/poteto-mode/playbooks/perf-issue.md) | 計測された遅延をトレースし、ベースラインと比較しながらパフォーマンスを改善する。 |
| [hillclimb](./skills/poteto-mode/playbooks/hillclimb.md) | ターゲットに対して単一のメトリクスを継続的かつ科学的に改善する。仮説検証と事前・事後計測のループを回し、改善が認められるたびに1コミットずつ積み上げる。 |
| [runtime forensics](./skills/poteto-mode/playbooks/runtime-forensics.md) | 計装（インストルメンテーション）データから、実行時の症状（メモリリーク、アイドル時の CPU スピン、描画の乱れなど）を診断する。 |
| [trace forensics](./skills/poteto-mode/playbooks/trace-forensics.md) | キャプチャされたプロファイリングデータ（cpuprofile、トレース、spindump、ヒープスナップショット）を診断する。 |
| [feature](./skills/poteto-mode/playbooks/feature.md) | 明確に定義されたデータ構造（data shape）をベースに、新機能や挙動の変更を構築する。 |
| [refactoring](./skills/poteto-mode/playbooks/refactoring.md) | 外部からの挙動を保ったまま、構造やデータ形状を変更する。 |
| [prototype](./skills/poteto-mode/playbooks/prototype.md) | 設計や挙動の意思決定を低コストで行うため、あるいは実験的な分岐を実際に観察して決着をつけるための使い捨てプロトタイプを作成する。 |
| [visual parity](./skills/poteto-mode/playbooks/visual-parity.md) | 2つの実装間でピクセル単位の完全な UI の一致を実現する。 |
| [authoring a skill](./skills/poteto-mode/playbooks/authoring-a-skill.md) | `SKILL.md` を新規作成または編集する。 |
| [eval](./skills/poteto-mode/playbooks/eval.md) | スキルやプロンプトの変更がエージェントの挙動にどう影響するかをブラインドテストで評価する。 |
| [babysit](./skills/poteto-mode/playbooks/babysit.md) | 競合、レビュースレッド、CI を扱い、単一 PR または PR スタックをマージ可能な状態まで導く。 |
| [shipping](./skills/poteto-mode/playbooks/shipping.md) | CI がグリーンになったスタックを独立して検証し、検証済みの連続した PR 群をボトムアップでマージする（デフォルトは GitHub 経由、利用可能な場合は origin 経由）。 |
| [autonomous run](./skills/poteto-mode/playbooks/autonomous-run.md) | 長時間のタスクを途中で止まることなく完了まで自律的に推進する。 |
| [autopilot-full](./skills/poteto-mode/playbooks/autopilot-full.md) | 独立した複数の PR を1つにつき1オーナー体制でマージまで実行する。コード準備完了時点の HEAD をスウォーム（並列ワーカー）で検証し、その後パッチに変更が加わるたびに再チェックを行う。 |
| [autopilot-stack](./skills/poteto-mode/playbooks/autopilot-stack.md) | マージを行わない `autopilot-full`。オペレーターがレビューしてマージできるよう PR の構築と検証を行い、依存関係のある PR のみをスタックとして積み上げる。 |
| [session pickup](./skills/poteto-mode/playbooks/session-pickup.md) | 以前のエージェントが進行中だった作業を再開または引き継ぐ。 |
| [pause safely](./skills/poteto-mode/playbooks/pause-safely.md) | 後で再開できるよう、進行中の作業をクリーンな状態で一時停止する。 |
| [multi-phase plan](./skills/poteto-mode/playbooks/multi-phase-plan.md) | 複数のフェーズや積み上がった PR（stacked PRs）にまたがる作業を進める。 |
| [worktree cleanup](./skills/poteto-mode/playbooks/worktree-cleanup.md) | 安全性チェックを挟みつつ、マージ済みや放棄された Git worktree および古い iOS シミュレーターを削除してディスク容量を解放する。 |
| [opening a pr](./skills/poteto-mode/playbooks/opening-a-pr.md) | 順序立てられた小さなコミット群から、Conventional Commits 形式のタイトルとブリーフィング形式の本文を備えたレビュー準備完了の PR を作成する。他のすべてのプレイブックの最後に呼び出される。 |

</details>

呼び出されると、以下の処理を行います：

1. タスクを適切な[プレイブック](./skills/poteto-mode/playbooks/)にマッチングし、そのステップをそのままコピーした項目を先頭に含む Todo リストを開きます。
2. 各ステップの進行に応じて、他のスキルへルーティングします。
3. 利用者（コンシューマー）と保守担当者（メンテナー）の双方にとって読みやすい、冗長さ（slop）を排した回答を作成します。

完全なルールとプレイブックは [`skills/poteto-mode/SKILL.md`](./skills/poteto-mode/SKILL.md) にあります。

複数のターンにわたって [`/poteto-mode`](./skills/poteto-mode/SKILL.md) を有効にし続けたい場合は、`/` メニューから選択した後、Enter ではなく `Option+Enter`（Mac）または `Alt+Enter`（Windows）を押してください。これにより[カスタムモード](https://cursor.com/docs/skills#using-a-skill-as-a-custom-mode)（Agents ウィンドウおよび CLI で利用可能）として動作し、モードを終了するまで毎ターンのコンテキストに保持されます。通常の Enter キーでは、その1回のメッセージにのみ添付されます。

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) は Cursor の `/loop` コマンドと非常に相性が良く、厳密さを損なうことなく何時間でも連続して作業させることができます。

## スキル一覧

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) はステップの必要に応じて大半のスキル（`why`、`architect`、`arena`、`swarm`、`interrogate`、`unslop`、`no-comments`、`technical-writing`、`tdd`、および各種原則）を自動的に実行します。以下の表は、個別のスキルを直接呼び出したい場合の一覧です：

```
/how do we cancel runs? do we have an n+1 when we look up every run to cancel?
```

```
/interrogate review this pr.
```

<details>
<summary>全スキル一覧</summary>

| スキル | 使用するタイミング |
|---|---|
| [`/poteto-mode`](./skills/poteto-mode/SKILL.md) | 単純ではないあらゆるタスクのデフォルトの入り口。 |
| [`/poteto-help`](./skills/poteto-help/SKILL.md) | pstack を使い始めたばかりで、どのスキル、プレイブック、または原則が適しているか分からないとき。やりたいことをヒアリングして回答し、そのまま入力できるプロンプトを提示します。`/poteto-help` と入力したときのみ実行されます。 |
| [`/in-your-own-words`](./skills/in-your-own-words/SKILL.md) | 作業を開始する前に、エージェント自身の言葉でゴールと課題を再確認させたいとき。`/in-your-own-words` と入力したときのみ実行されます。 |
| [`/sharpen`](./skills/sharpen/SKILL.md) | 送信前のプロンプトを「肥大化」させるのではなく「深化」させたいとき。トッププロフェッショナルなら当然行うが指示されていなかったこと、出発点となる一次情報、手法とツール、結果の正しさを確かめる外部検証を組み込みます。実験で決着がつく選択はプロトタイプを作るよう指示し、プロダクトや好みの選択はユーザーに委ねる形で書き直したプロンプトを返します（タスク自体は実行しません）。`/sharpen` と入力したときのみ実行されます。 |
| [`/how`](./skills/how/SKILL.md) | サブシステムがどのように動作するかのウォークスルーが欲しいとき。 |
| [`/why`](./skills/why/SKILL.md) | なぜそのように作られたのか理由を知りたいとき。コードではなく記録（それを導入したコミットや PR の議論、その後の各変更履歴、記録が薄い場合はその他の情報源）に基づいて回答します。作成者の記述を引用し、エージェント自身の推測は明示し、記録からは分からない点も明確に伝えます。 |
| [`/recall`](./skills/recall/SKILL.md) | 作業の開始時や再開時に、自分のチャット履歴と共有記録から特定のトピックに関する直近のコンテキストを再構築し、コンパクトな現状ブリーフィングとして受け取りたいとき。 |
| [`/ketchup`](./skills/ketchup/SKILL.md) | 自分の最後のメッセージ以降にこのチャットで何が変化したかを、平易な言葉と小さな図解で把握したいとき。ユーザーの判断待ちとなっているすべての項目をリストアップし、返信が長くなったとしても、その返信を読むだけで意思決定できる状態にします。 |
| [`/ketchup-video`](./skills/ketchup-video/SKILL.md) | `/ketchup` のキャッチアップ内容を字幕付きの短いスライド動画として受け取りたいとき。ユーザーの判断待ち項目は動画の下にテキストで記載されます。 |
| [`/blast-radius`](./skills/blast-radius/SKILL.md) | 小さく見える変更が他にどこを壊す可能性があるかを知りたいとき。推測や断言ではなく、実際にコードを実行して証明された「安全である根拠となる1つの事実」とともに提示します。 |
| [`/architect`](./skills/architect/SKILL.md) | 関数の境界をまたぐコードを書く前に、呼び出し側の使い方、型定義、モジュールの形状を先に固めたいとき。 |
| [`/arena`](./skills/arena/SKILL.md) | 同じ課題に対して N 個の並列アプローチを試行させ、それぞれの最も優れた部分を取り入れたいとき。 |
| [`/swarm`](./skills/swarm/SKILL.md) | 異なる領域や検証対象に対して N 個の並列ワーカーを走らせ、1つの統合レポートにまとめたいとき。 |
| [`/interrogate`](./skills/interrogate/SKILL.md) | 差分（diff）に対して複数の異なるモデルに破壊テスト（問題点の指摘）を行わせ、実際の実行によって証明された指摘だけを残したいとき。 |
| [`/automate-me`](./skills/automate-me/SKILL.md) | これまでの実際の作業履歴から、自分専用の `<自分の名前>-mode` スキルを起草したいとき。 |
| [`/make-bot-ui`](./skills/make-bot-ui/SKILL.md) | ボタンを押すと Webhook 経由で Grok Bot を起動するページやダッシュボードを作成したいとき（sender-key の受け渡しや Tailscale の設定を含む）。 |
| [`/setup-pstack`](./skills/setup-pstack/SKILL.md) | ロールごとに pstack が使用するモデルを選択したいとき。利用可能なモデルを検出し、設定ルールを書き出します。 |
| [`/reflect`](./skills/reflect/SKILL.md) | 長時間のタスクが完了した後、そこで得た手順や教訓をスキルの編集内容として定着させたいとき。 |
| [`/correct`](./skills/correct/SKILL.md) | エージェントの同じミスを何度も修正しているとき。履歴からミスのパターンを抽出し、機能する最も高いレイヤー（アーキテクチャ → 型・Lint・CI → テスト → 最後にドキュメント）で修正し、各ルールとそれを強制する仕組みを対応付けた表を維持します。 |
| [`/teach`](./skills/teach/SKILL.md) | 単なる要約ではなく、変更やサブシステムの仕組みを本質的に理解したいとき。`how` と `why` を実行し、図解を1つずつ積み上げながら平易な解説を組み立てます。 |
| [`/tdd`](./skills/tdd/SKILL.md) | バグ修正において、低コストで実行できるローカルテスト環境があるとき。まず失敗するテストを書き、その後に修正を行います。 |
| [`/benchmark-checklist`](./skills/benchmark-checklist/SKILL.md) | ベンチマークを実行したり、高速化やリグレッションを計測したりしたとき。数値を報告したり意思決定に使ったりする前に、その数値の妥当性（ボトルネック要因、チューニング条件、エラー有無、反復実行、エンドツーエンドでの意義）を精査します。 |
| [`/no-comments`](./skills/no-comments/SKILL.md) | レビュー前に不要なコメントを削除する。Comment Sicko を起動して指摘を精査し、受け入れた修正を適用したうえで、コメントに書かれていた制約をコードや型として表現する方法を提案します。 |
| [`/typescript-best-practices`](./skills/typescript-best-practices/SKILL.md) | TypeScript を読んだり編集したりするとき。`type-system-discipline`（型システムの規律）の原則を具体的な構文レベルに落とし込みます。 |
| [`/figure-it-out`](./skills/figure-it-out/SKILL.md) | 同梱されているどのプレイブックにも当てはまらないとき。そのタスク専用の厳格で監査可能なプレイブックを設計します。 |
| [`/show-me-your-work`](./skills/show-me-your-work/SKILL.md) | レビュー可能な意思決定の軌跡を残したいとき。コミット可能な TSV ファイルに判断履歴を記録します。 |
| [`/create-verification-skill`](./skills/create-verification-skill/SKILL.md) | プロジェクトにアプリの挙動を証明するスクリプト手段がないとき。あらゆる言語やプラットフォームに対応した、機能マップ付きのプロジェクト固有検証スキルを生成します。 |
| [`/maintain-verification-skill`](./skills/maintain-verification-skill/SKILL.md) | 検証スキルの機能マップが現在のアプリと乖離してしまったとき。ソースコードの調査と1回の実機パスを実行し、証明された修正のみを含む最大1つの PR を作成します。 |
| [`/create-formal-verification-skill`](./skills/create-formal-verification-skill/SKILL.md) | 競合状態、リトライ、ステートマシン、パーサー、アンセーフコードなどのバグに通常のテストでは到達できないとき。適切なツールで1つの性質を形式検証し、変更のたびに再チェックするプロジェクト固有スキルを生成します。 |
| [`/maintain-formal-verification-skill`](./skills/maintain-formal-verification-skill/SKILL.md) | 形式検証の対象コードが前回のチェック以降に変更されたとき。コードに合わせてモデル、ハーネス、または検証性質を更新して再実行し、各失敗が検証側の乖離によるものかコードのバグによるものかを判定します。 |
| [`/statechart`](./skills/statechart/SKILL.md) | 仕様書を読むのではなく、振る舞いのオーナーが視覚的に状態を理解する必要があるとき。TLA+ モデルをチェックし、ユーザーから見える挙動を Mermaid のステートチャートとして描画し、ルール違反となる各状態をマークしてそこへ至る最短パスを示します。 |
| [`/unslop`](./skills/unslop/SKILL.md) | 文章をクリーンアップしたいとき。AI 特有の不自然な言い回し（AI tells）を取り除きます。 |
| [`/bro`](./skills/bro/SKILL.md) | 直前のメッセージを、専門用語を使わない平易な人間の言葉で言い直してほしいとき。 |
| [`/technical-writing`](./skills/technical-writing/SKILL.md) | ドキュメント、RFC、README、PR 説明文、コミットメッセージのための重層的なドキュメント基準（Diátaxis + Google developer style + STE + Global English）。 |

</details>

### 使用例

ほとんどの場合、私はタスクの開始時に [`/poteto-mode`](./skills/poteto-mode/SKILL.md) を入力し、適切なプレイブックへのルーティングを任せています。他のスキルは各ステップの必要に応じて自動的に起動します。直接呼び出すことも多い例をいくつか挙げます。

<details>
<summary>すべての使用例</summary>

```
bug fix:           /poteto-mode this pr has a subtle bug where the scroll drifts every 750ms even
                   when idle. repro first, then fix and verify.
perf:              /poteto-mode a big list takes a second or two to load even though we virtualize.
                   run a cpu trace and tell me why.
feature:           /poteto-mode build a small feature behind a feature flag. verify it really works.
prototype:         /poteto-mode build two prototypes of the markdown renderer so we can compare.
                   spawn an agent for each.
multi-phase:       /poteto-mode open source these skills as a plugin. nothing internal leaks, work
                   in a temp dir, show me the dependency graph first.
overnight run:     /poteto-mode i'm going to bed. land the stack even if ci flakes. i want
                   everything merged by morning.
babysit:           /poteto-mode check on pr 123. anything outstanding?
visual parity:     /poteto-mode the row spacing is too tall when this flag is on. the second image
                   is correct. repro and fix until it matches.
figure it out:     /poteto-mode i'm stepping away. migrate every caller from the synchronous store
                   to the new async one, keeping behavior identical. i want to trust it was done
                   right when i'm back.
how:               /how do we cancel runs? do we have an n+1 when we look up every run to cancel?
why:               /why is this feature flag not on yet?
architect:         design this instrumentation to be high signal with no false positives. /architect
                   this first.
arena:             /arena take my prompt to the arena verbatim. i want to compare their proposals
                   with yours.
swarm:             /swarm check every package under packages/ against its check.sh. one worker per
                   package. one report.
interrogate:       /interrogate review this pr.
tdd:               /tdd implement
unslop:            can we unslop and tighten the new changes?
reflect:           /reflect that took too long. capture what we learned so the next run doesn't
                   repeat it.
correct:           /correct
show-me-your-work: /show-me-your-work keep a decision trail i can review when i'm back.
automate-me:       /automate-me
help:              /poteto-help which skill should i use to review this branch?
```

</details>

## `poteto-agent` と Comment Sicko サブエージェント

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) は、それを受け取ったチャット内で実行されます。そのチャットがプレイブック、Todo リスト、およびすべてのサブエージェントの起動を管理します。

pstack には、実行中に委譲先として起動されるラッパーとして [`subagent_type: "poteto-agent"`](./agents/poteto-agent.md) も同梱されています。このサブエージェントは作業を開始する前に、インラインの原則インデックスを含む `poteto-mode` の全文を読み込みます。代わりに `generalPurpose` を使用するとこの読み込みがスキップされ、方針のズレ（ドリフト）が生じます。なお、プレイブック自体の実行に `poteto-agent` を起動しないでください。

[`/poteto-mode`](./skills/poteto-mode/SKILL.md) と [`subagent_type: "poteto-agent"`](./agents/poteto-agent.md) は同じラッパーを経由してルーティングされます。

pstack にはさらに、読み取り専用のコメントレビュアーである [Comment Sicko](./agents/comment-sicko.md) も `subagent_type: "comment-sicko"` として同梱されています。通常は直接呼び出さず、[`/no-comments`](./skills/no-comments/SKILL.md) を通じて起動します。

## 原則（Principles）

1原則につき1つの短いスキルとして、計24個の原則が用意されています。`poteto-mode` はこれらをインラインでインデックス化しており、タスク開始時にそのインデックスを読み込みます。個別のファイルとして独立しているのは、他のスキルから名前で原則を参照できるようにするためと、インデックスから各原則の完全なルールへリンクできるようにするためです。

<details>
<summary>全24の原則一覧</summary>

| 原則 | グループ | ルール |
|---|---|---|
| [laziness-protocol](./skills/principle-laziness-protocol/SKILL.md) | core | 削除すること、そして問題を解決できる最小限の変更を行うことを優先する。 |
| [foundational-thinking](./skills/principle-foundational-thinking/SKILL.md) | core | ロジックを書く前に適用する：コアとなる型やデータ構造の選択、足場作り（scaffold）と機能実装の順序付け、並行アクター間で何を共有するかの問いかけ。データ構造を正しく設計すれば、下流のコードは自明になる。 |
| [redesign-from-first-principles](./skills/principle-redesign-from-first-principles/SKILL.md) | core | 後付けで継ぎ足すのではなく、その要件が初日から基本前提であったかのように再設計する。 |
| [attack-the-premise](./skills/principle-attack-the-premise/SKILL.md) | core | 同じ前提を共有する2つ以上の修正が同じゲート（検証）で失敗したときに適用する。その前提を書き出し、同じ前提に立った別の修正を書く前に、前提そのものを直接テストする。 |
| [subtract-before-you-add](./skills/principle-subtract-before-you-add/SKILL.md) | core | まず不要な重荷（デッドコード）、冗長なバリデータ、スタブ参照を取り除き、よりシンプルになった土台の上に構築する。 |
| [minimize-reader-load](./skills/principle-minimize-reader-load/SKILL.md) | core | 疑問から答えまでのレイヤー数と、読み手の頭の中に保持させる隠れた状態の数を数える。呼び出し元が1つしかないラッパーを統合し、可変（mutable）スコープを縮小する。 |
| [outcome-oriented-execution](./skills/principle-outcome-oriented-execution/SKILL.md) | core | 明確なフェーズ境界を持つ計画的な書き換えやマイグレーション中に適用する。使い捨ての互換コードで滑らかな中間状態を維持しようとせず、目標とするアーキテクチャへ一気に収束させる。 |
| [experience-first](./skills/principle-experience-first/SKILL.md) | core | 実装の都合よりもユーザーの喜びを選ぶ。粗削りな機能を多く出すより、洗練された機能を少なくリリースする。 |
| [exhaust-the-design-space](./skills/principle-exhaust-the-design-space/SKILL.md) | core | 方針を確定する前に、競合する2〜3個のプロトタイプを作成し、並べて比較する。 |
| [build-the-lever](./skills/principle-build-the-lever/SKILL.md) | core | 一括処理だけでなく、編集、マイグレーション、分析、チェックなどあらゆる非自明な作業に適用する。手作業で進めるのではなく、それを実行または証明するツール（codemod、スクリプト、ジェネレーター、またはサブエージェントが従うスキル）を構築する。そのツール自体が、レビュアーが再実行できる成果物となる。 |
| [model-the-domain](./skills/principle-model-the-domain/SKILL.md) | architecture | 散在する条件分岐ではなく、データ構造の中にドメイン知識をエンコードする。 |
| [boundary-discipline](./skills/principle-boundary-discipline/SKILL.md) | architecture | ガード処理（入力検証など）はシステムの境界（CLI、設定、ネットワーク、外部 API）に集中させ、内部の型を信頼してビジネスロジックは純粋関数に保つ。 |
| [type-system-discipline](./skills/principle-type-system-discipline/SKILL.md) | architecture | 不正な状態（illegal states）を表現不可能にし、意味のあるプリミティブにブランド型（branded types）を付け、境界で外部データをパースし、バリアントを網羅的に扱い、信頼できる単一のスキーマから型を導出する。 |
| [make-operations-idempotent](./skills/principle-make-operations-idempotent/SKILL.md) | architecture | 過去の不完全な実行状態に関わらず、常に同じ最終状態に収束するようにする。 |
| [migrate-callers-then-delete-legacy-apis](./skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) | architecture | 互換性レイヤーを残すのではなく、同じ作業波（wave）の中で呼び出し元をすべて移行し、古い API を削除する。 |
| [separate-before-serializing-shared-state](./skills/principle-separate-before-serializing-shared-state/SKILL.md) | architecture | まず状態の共有自体を排除する。単一の共有ライターであることが真の不変条件である場合にのみ、構造的に直列化する。 |
| [prove-it-works](./skills/principle-prove-it-works/SKILL.md) | verification | タスク完了後、完了宣言をする前に適用する。プロキシ指標や自己申告、「コンパイルが通った」ことではなく、実際の成果物に対して検証する（機能の実行、実際の値の読み取り、差分の検査）。 |
| [fix-root-causes](./skills/principle-fix-root-causes/SKILL.md) | verification | 各症状をシステムが最初に誤動作した箇所まで遡り、そこで修正する。ガード処理が正当な修正となるのは、それが扱う状態が本来あり得る正当な状態である場合のみである。 |
| [sequence-verifiable-units](./skills/principle-sequence-verifiable-units/SKILL.md) | verification | 複数ステップの作業（一括置換、マイグレーション、類似編集の連続）およびコミットや PR の積み上げ方に適用する。各単位が検証可能な状態で終わるように作業を分割し、次へ進む前にそれぞれをチェックし、その順序自体がレビュアーに対して正しさを証明するように配置する。 |
| [test-behavior-not-implementation](./skills/principle-test-behavior-not-implementation/SKILL.md) | verification | テストを書く、変更する、または維持する際に適用する。コードの利用者が観測できる振る舞いをアサートすることで、その振る舞いが壊れたときにテストが失敗し、内部実装だけが変わったときにはパスし続けるようにする。 |
| [explain-the-number](./skills/principle-explain-the-number/SKILL.md) | verification | 計測した数値（高速化率、リグレッション、スループット、レイテンシ、評価結果）を信頼・報告・行動に移す前に適用する。何がその数値を制限しているかを特定し、意図した処理以外の何かを計測してしまっている可能性を排除する。 |
| [guard-the-context-window](./skills/principle-guard-the-context-window/SKILL.md) | delegation | 大量の処理はサブエージェントに振り分け、メインスレッドには生のペイロードではなく要約だけを保持する。 |
| [never-block-on-the-human](./skills/principle-never-block-on-the-human/SKILL.md) | delegation | まず作業を進めて結果を提示し、人間が事後に軌道修正できるようにする。確認を求めるのは取り消しができない不可逆な操作のみに限定する。 |
| [encode-lessons-in-structure](./skills/principle-encode-lessons-in-structure/SKILL.md) | meta | テキストの追記ではなく、Lint ルール、メタデータフラグ、実行時チェック、またはスクリプトとしてルールを構造に組み込む。 |

</details>

## ここには同梱されていないもの

`poteto-mode` から参照されるものの、このプラグインには同梱されていないものがいくつかあります：

- `/deslop` と `deslop` スキルは `cursor-team-kit` プラグインに同梱されています。
- `control-cli`（CLI および TUI 用）と `control-ui`（ブラウザ、Electron、Web 用）も `cursor-team-kit` に同梱されています。
- `/create-skill` は Cursor の組み込み機能です。また、Cursor には PR を監視する組み込みの `/autopilot` も搭載されていますが、`poteto-mode` 内での PR ステータス確認リクエストは代わりに [babysit プレイブック](./skills/poteto-mode/playbooks/babysit.md) にルーティングされます。

フルセットを使いたい場合は、pstack とあわせて `cursor-team-kit` をインストールしてください。

## なぜプランニング（計画立案）スキルがないのか？

Cursor にはすでに優れた Plan モードがあり、pstack とも非常にうまく連携します。ただ私個人としては、事前の計画立案をあまり信じていません。最高の仕様書はコードそのものです。それでも計画を立てたい場合は [`/poteto-mode`](./skills/poteto-mode/SKILL.md) でカバーしていますが、デフォルトのワークフローにはしていません。

## 自分好みにカスタマイズする

`poteto-mode` は私のスタイルです。あなたにぴったり合うとは限りません。

[`/automate-me`](./skills/automate-me/SKILL.md) と入力してみてください。最近のチャット履歴をマイニングし、あなたの実際の働き方から `<あなたの名前>-mode` スキルを起草し、裏側で pstack を経由してルーティングするように設定します。pstack をベースとして維持したまま、`poteto-mode` と並んで自分専用のルーティングスキルを手に入れることができます。

使用モデルも設定可能です。[`/setup-pstack`](./skills/setup-pstack/SKILL.md) と入力すると、アクセス可能なモデルを検出し、各ロール（コード生成、判断、レビューパネル）をモデルにマッピングする小さな常時適用ルールを書き出します。すべてのスキルはこのルールを読み込み、ルールが存在しない場合は適切なデフォルト値にフォールバックするため、変更したい部分だけを上書きできます。

デフォルト設定がアップデートされた場合、変更前に作成されたルールは再度 `/setup-pstack` を実行するまで古いデフォルト値を固定し続けます。再実行すると、認識された古いデフォルト値は新しいものに置き換わり、デフォルトとは異なるモデルを明示的に指定していた他のロールはそのまま維持されます。認識されない固定設定を解除したい場合は、先に該当ロールの行またはルールファイル自体を削除してください。

## オートメーション（Automations）

pstack には、休止状態の [benny オートメーションパック](./automations/benny/) も同梱されています。benny は Slack 上の不具合報告をトリアージし、確認されたバグを実際の UI の証拠とともに再現・修正します。これらのファイルはスラッシュスキルとしては登録されていません。

セットアップするには、Cursor に [`FOR_AGENTS.md`](./automations/benny/FOR_AGENTS.md) を参照させてください。セットアップを実行すると、対象リポジトリの `.cursor/automations/benny/` にパックがコピーされ、共通スキルを利用できるようにそこで pstack が有効化されます（ユーザー設定はコピーされたパックの外部に保持されます）。benny は Cursor Automations 上で動作するため、Cursor 専用機能となります。

## ライセンス

MIT
