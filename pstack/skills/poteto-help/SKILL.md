---
name: poteto-help
description: pstack のセットアップ、/pstack:poteto-mode の使い方、そしてタスクに最適なスキル・プレイブック・原則の選び方を案内します。質問を添えて /pstack:poteto-help と入力してください。
disable-model-invocation: true
---

# Poteto help

pstack に関するユーザーの質問に答え、そのまま送信できるプロンプト例を渡し、回答の根拠となったファイルへのリンクを提示します。ヘルプ目的の質問に対しては、実際の作業を開始しないでください。ユーザーが尋ねているのは「やり方」であり、pstack を実行すると実際にトークンを消費するため、実行するかどうかはユーザー自身がプロンプトを送って決める形にします。

「pstack を使ってこのバグを直して」のように実作業を依頼するメッセージは、ヘルプの質問ではありません。その場合は [`poteto-mode`](../poteto-mode/SKILL.md) を読み込み、そのルールに従って作業を進めたうえで、「新しいタスクは毎回 `/pstack:poteto-mode` を付けて始めてください」と一度だけ案内してください。

このファイルは、ユーザーの質問を「答えが書かれているスキルやガイドページ」へルーティングするための地図です。具体的な詳細の正本（オーナー）は、それぞれのリンク先ファイルにあります。ルーティング先のファイルを引用する前には必ず中身を読み、もしこの地図の記述とリンク先ファイルの内容が食い違っていた場合は、リンク先ファイルのほうを正としてください。また、ここに記載されている相対リンクはインストール済みプラグイン内部を指しており、ユーザーが直接開けない場合があるため、ユーザーに提示する際は公開リポジトリの URL（`https://github.com/lc-semba-ryuichiro/cursor-plugins-translation-ja/blob/main/pstack/` の後ろに該当パスをつなげたもの）を案内してください。

## ユーザーのニーズを見極める

ユーザーのメッセージとこれまでの会話の流れからニーズを推測します。「PR をレビューするスキルはどれ？」のように具体的な状況が示されている場合は、該当するセクションへ直接進みます。ニーズがまだ曖昧な場合は、以下の選択肢を用いた選択式の質問を1つだけ投げかけ、ユーザーが選んだセクションについてのみ回答してください：

- セットアップしたい（Get set up）
- `/pstack:poteto-mode` でタスクを始めたい（Start a task with `/pstack:poteto-mode`）
- 状況に合うスキルを選びたい（Pick a skill for a situation）
- うまくいかなかった実行を修正したい（Fix a run that went wrong）
- pstack を自分好みにカスタマイズしたい（Make pstack my own）

回答内容に影響する現在の状態を確認し、該当する場合にのみ言及してください：

- `~/.claude/rules/pstack-models.md` が存在しない場合：このユーザーはまだ `/pstack:setup-pstack` を実行していないため、すべてのロール（役割）でデフォルトモデルが使われます。
- プロジェクト内に `verify-*` スキルやその他のアプリ操作ハーネスが存在しない場合：エージェントがスクリプト経由でアプリを操作する手段がない状態です。変更の動作確認（動作証明）に関する質問であれば、`/pstack:create-verification-skill` を案内してください。
- プロジェクト内に形式検証スキルが存在しない場合：通常のテストが到達しない領域の性質（プロパティ）がチェックされていない状態です。競合状態（レースコンディション）や不変条件など、テストでは見つけにくいケースに関する質問であれば、`/pstack:create-formal-verification-skill` を案内してください。すでに形式検証スキルが存在し、かつ対象コードが「最後に同期済みと記録されたコミット」以降に変更されている場合は、そのコードに触れる質問であれば `/pstack:maintain-formal-verification-skill` を案内してください。

モデル設定ルールが未作成かつそれが重要な場面では、「今すぐ各ロールのモデルと推論バジェット（予算）を設定しますか？」と尋ねてください。これが重要になるのは、ユーザーが初めて使う場合、セットアップやコストに関する質問の場合、またはどのモデルが動くかによって答えが変わる場合です。この質問は1つのチャットにつき最大1回までにしてください。ニーズ自体も不明確な場合は、両方の質問をまとめて聞いてください。以下の2つの選択肢を提示してください：

- 今すぐ設定する：入力用コマンドとして `/pstack:setup-pstack` を提示したうえで、元の質問にも回答します。
- 後で設定する：元の質問に回答し、末尾に「`/pstack:setup-pstack` を実行するまでは、すべてのロールでデフォルトモデルが使用されます」と1行添えます。

## セットアップ方法

1. Claude Code で `/plugin marketplace add lc-semba-ryuichiro/cursor-plugins-translation-ja` を実行し、続けて `/plugin install pstack@cursor-plugins-ja` を実行します。
2. [`/pstack:setup-pstack`](../setup-pstack/SKILL.md) を実行します。推論バジェットを尋ねたうえで、各ロールにモデルを割り当て、ルールファイル `~/.claude/rules/pstack-models.md` を書き出します。このルールは新しいセッションから適用されます。その後、プロジェクト内にまだ存在しない場合に限り、検証スキルと形式検証スキルを生成するかどうかを1回ずつ提案します。
3. `/pstack:poteto-mode` にゴールと「成功・失敗を判定できるチェック条件」を添えて、実際のタスクを開始します。

インストールしただけでは何も挙動は変わらず、ユーザーがスキルを呼び出して初めて機能します。ユーザーの自然言語から自動的に読み込まれるのは `/pstack:setup-pstack` だけです。詳細は [README](../../README.md) と[ガイドページ 1](../../docs/guide/01-setup.md) に記載されています。また、[`references/prompting.md`](references/prompting.md) に従って、最初のプロンプトを一緒に作成することを提案してください。

コストが心配な場合は、どこでトークンが消費されるのか、どうすれば節約できるのかを説明します。pstack はサブエージェントの起動やレビューパネルの実行で追加のトークンを消費します。節約したい場合は、再度 `/pstack:setup-pstack` を実行してバジェットを小さくするか、より安価なモデルを選択してください。ロールを `auto` または `inherit-parent` に設定すると、親チャットと同じモデルで動作するため、チャット側を安価なモデルにしておけばトークンを節約できます。また、レビューパネルのリストを短くすれば、エントリ数に応じて起動するサブエージェントの数を減らせます。`/pstack:poteto-mode` は厳格さ（リガー）が求められる作業に絞って使うのがおすすめです。

pstack のコマンドには、`/pstack:poteto-mode` のように `pstack:` プレフィックスが付きます。スキルは Agent Skills フォーマットで書かれているため、他のツールでもスキルファイル自体は読み込めます。ただし、`/pstack:poteto-mode`、`/pstack:how`、`/pstack:teach` をはじめとする多くのワークフロー系スキルは Claude Code の `Agent` ツールでサブエージェント（一部はロール別モデル指定付き）を起動します。他のツールではその部分が動作しない場合があります。

## `/pstack:poteto-mode` でタスクを始める

`/pstack:poteto-mode` は、タスクの内容に最も合うプレイブックを選択し、そのプレイブックのステップを Todo リスト（`TodoWrite`）にコピーしたうえで、各ステップで必要となる他のスキルを順次呼び出して実行します。良いプロンプトとは「達成したいゴール」と「何をもって完了とみなすか」を明記したものです。良いプロンプトは個別のスキル名を書き並べません。人間が手書きでスキル順序を指定すると、本来のプレイブックが維持している重要なステップを落としたり順番を狂わせたりしがちだからです。プロンプト作成を手伝う前には [`references/prompting.md`](references/prompting.md) を読んでください。[ガイドページ 2](../../docs/guide/02-poteto-mode.md) にも実例が載っています。

`/pstack:poteto-mode` を付けてメッセージを送ると、スキルの内容が会話に読み込まれます。新しいタスクを始めるときは、もう一度 `/pstack:poteto-mode` を付けて開始してください。そのタスクに合うプレイブックが選び直されます。

チャットの途中で「new task（新しいタスク）」と伝えると、モードが切り替わって新しいプレイブックがマッチングされます。`/pstack:poteto-mode` はプレイブックのステップから起動するサブエージェントに最初から `poteto-agent` を使用しています。自分で独自に起動するサブエージェントにも同じスタイルを適用したい場合は、`subagent_type: "pstack:poteto-agent"` を指定して起動してください。

## スキルを選ぶ

基本的なデフォルトの選択肢は `/pstack:poteto-mode` です。ステップの進行に応じて、他のほとんどのスキルを自動的に呼び出してくれます。ユーザーが何かをプレイブックの提供分より「もっと多く」または「もっと少なく」求めている場合に、個別のスキル名を直接案内してください。スキルを推奨する前には必ずそのスキルの中身を読み、プロンプトの使用例を1つ添えてください。

| ユーザーのやりたいこと | スキル |
|---|---|
| ちょっとした作業ではない本格的なタスクを厳格に進めたい | [`/pstack:poteto-mode`](../poteto-mode/SKILL.md) |
| 作業を始める前に、エージェントがゴールと課題を正しく理解しているか確認したい | [`/pstack:in-your-own-words`](../in-your-own-words/SKILL.md) |
| プロンプトを送信する前に、長くするのではなく「深く」書き直したい（トッププロなら何を追加するか、一次情報や手法、外部からの検証視点の組み込みなど）。書き直したプロンプトを返すだけで、タスク自体は実行しない | [`/pstack:sharpen`](../sharpen/SKILL.md) |
| 現在のコードがどう動いているか、または新しいコードをどこに配置すべきか知りたい | [`/pstack:how`](../how/SKILL.md) |
| なぜコードがこのような形になっているのか、またはある数値がどこから来たのかを知りたい | [`/pstack:why`](../why/SKILL.md) |
| 変更内容やサブシステムの仕組みを平易な言葉で分かりやすく解説してほしい | [`/pstack:teach`](../teach/SKILL.md) |
| 特定のトピックに関する自分の最近の作業履歴をキャッチアップしたい | [`/pstack:recall`](../recall/SKILL.md) |
| 自分の最後のメッセージ以降にこのチャットで何が変化したかを、平易な言葉とコンパクトなビジュアルで把握し、判断待ち項目を返信だけで決定できるようにしたい | [`/pstack:ketchup`](../ketchup/SKILL.md) |
| `/pstack:ketchup` と同様のキャッチアップを、字幕付きの短いスライド動画と、その下の判断待ちテキストで確認したい | [`/pstack:ketchup-video`](../ketchup-video/SKILL.md) |
| 小さな差分（diff）が、その外側のどこを壊す可能性があるか知りたい | [`/pstack:blast-radius`](../blast-radius/SKILL.md) |
| 関数の境界をまたぐコードを書く前に、型定義やモジュール構造を固めたい | [`/pstack:architect`](../architect/SKILL.md) |
| 1つの指示書（ブリーフ）に対して複数のアプローチを試させ、最良の要素を統合したい | [`/pstack:arena`](../arena/SKILL.md) |
| スライスごとの並列チェックやワーカー同士の競争を、ワーカーごとに専用の worktree で実行したい | [`/pstack:swarm`](../swarm/SKILL.md) |
| 異なるモデル群に差分をレビューさせ、壊せる箇所がないか徹底的に攻めさせたい | [`/pstack:interrogate`](../interrogate/SKILL.md) |
| 低コストなローカルテストが存在する場合に、テストファーストでバグを修正したい | [`/pstack:tdd`](../tdd/SKILL.md) |
| `.ts` や `.tsx` の作業に TypeScript のベストプラクティスルールを適用したい | [`/pstack:typescript-best-practices`](../typescript-best-practices/SKILL.md) |
| レビュー前に、書いた本人とは別のレビュアー視点で不要なコメントを削ぎ落としたい | [`/pstack:no-comments`](../no-comments/SKILL.md) |
| 文章から AI 特有のくどい言い回し（AI 臭さ）を取り除きたい | [`/pstack:unslop`](../unslop/SKILL.md) |
| ドキュメント、RFC、README、PR 説明文、コミットメッセージを一定の品質基準で書きたい | [`/pstack:technical-writing`](../technical-writing/SKILL.md) |
| 直前の返信内容を、専門用語なしの平易な言葉でもう一度聞き直したい | [`/pstack:bro`](../bro/SKILL.md) |
| アプリを操作して挙動を証明するためのスクリプト化された検証スキルをエージェントに与えたい | [`/pstack:create-verification-skill`](../create-verification-skill/SKILL.md) |
| 検証スキルと機能マップを、最新のアプリの実態と再び一致させたい | [`/pstack:maintain-verification-skill`](../maintain-verification-skill/SKILL.md) |
| 競合状態や不変条件など、通常のテストでは到達しにくい性質を形式検証したい | [`/pstack:create-formal-verification-skill`](../create-formal-verification-skill/SKILL.md) |
| カバー対象コードの変更後に形式検証を最新コードと再同期し、失敗が「検証のズレ」か「コードのバグ」かを見極めたい | [`/pstack:maintain-formal-verification-skill`](../maintain-formal-verification-skill/SKILL.md) |
| ユーザーが見る画面遷移を TLA+ モデルで検証済みのチャートとして PM やデザイナーに示し、ルール違反に至る最短パスを可視化したい | [`/pstack:statechart`](../statechart/SKILL.md) |
| パフォーマンス計測値を報告したり判断材料にしたりする前に、妥当性を精査したい | [`/pstack:benchmark-checklist`](../benchmark-checklist/SKILL.md) |
| 大規模または複数領域にまたがる変更や、人間が席を外した後にレビューする作業を進めたい | [`/pstack:figure-it-out`](../figure-it-out/SKILL.md) |
| 実行中の意思決定ログを記録し、後からレビューできるようにしたい | [`/pstack:show-me-your-work`](../show-me-your-work/SKILL.md) |
| 各ロールに割り当てるモデルと推論バジェットを選択したい | [`/pstack:setup-pstack`](../setup-pstack/SKILL.md) |
| 自分自身の作業習慣をパーソナルなモードスキルとして自動化したい | [`/pstack:automate-me`](../automate-me/SKILL.md) |
| 完了したタスクから得た教訓を、スキルの編集内容へと昇華させたい | [`/pstack:reflect`](../reflect/SKILL.md) |
| このリポジトリでエージェントが同じミスを繰り返すのを構造的に止めたい | [`/pstack:correct`](../correct/SKILL.md) |
| pstack の使い方や適切なスキルを探したい | `/pstack:poteto-help` |

このディレクトリと並んでいるスキルフォルダの中に上記の表に載っていないものがある場合は、そのフロントマターを読み、説明文（description）に従ってルーティングしてください。`principle-*` ディレクトリ群については、下記の「プレイブックと原則」で説明します。

紛らわしいスキルの使い分け：

- `/pstack:how` は「コードが何をしているか」を説明し、`/pstack:why` は「なぜそうなっているのか（背景・理由）」を説明します。`/pstack:teach` はその片方または両方を実行したうえで、結果を平易に解説します。
- `/pstack:arena` はすべてのワーカーにまったく同じブリーフ（指示）を与えて最良の部分を統合します。`/pstack:swarm` は作業を複数のスライスに分割するか競争（レース）として実行し、1つのレポートにまとめます。
- `/pstack:interrogate` は差分そのものを攻撃的にレビューします。`/pstack:blast-radius` は差分の外側に波及する破壊箇所を探し出し、変更が安全であることを裏付ける「決定的な1つの事実」を証明します。
- `/pstack:recall` は最近の複数のチャットを横断して文脈を再構築します。`/pstack:ketchup` はこのチャット内の「ユーザーの最後のメッセージ以降」だけを対象にします。特定のチャットやブランチの作業を再開したい場合は、Session pickup プレイブックを使います。
- `/pstack:figure-it-out` は1つの厳格な実行計画をゼロから設計します。Autonomous run プレイブックは、あらかじめ決まった完了条件に向けて1つのタスクを自律的に駆動します。

pstack に含まれないもの：

- `/loop` は Claude Code 組み込みのコマンドです。
- pstack には `/orchestrate` というスキルはありません。スラッシュメニューに `/orchestrate` が表示される場合は、別のプラグインが提供しているものです。

## プレイブックと原則（Principles）

プレイブックは `/pstack:poteto-mode` の内部に定義されたステップ一覧であり、独立したスキルではないため、専用のスラッシュコマンドはありません。`/pstack:poteto-mode` の中でタスク内容を説明すれば適切なプレイブックが自動選択されますが、以下のフレーズを使うと特定のプレイブックを直接指定できます：

- 「babysit this pr」または「check on pr 123」と伝えると **Babysit** が実行されます。PR をマージ可能な状態まで仕上げてそこで停止します。ユーザーから「merge（マージして）」「land（着地させて）」「ship（出荷して）」と指示されない限り、勝手にマージは行いません。
- 「land the stack」は **Shipping** を実行します。
- 「take over this branch」は **Session pickup** を実行します。
- 「pause safely」は **Pause safely** を実行します。
- 「full autopilot on this queue」は **Autopilot-full** を、「autopilot, don't merge」は **Autopilot-stack** を実行します。
- 「run the eval playbook」は **Eval** を実行します。

すべてのプレイブックの一覧は [`poteto-mode`](../poteto-mode/SKILL.md) の Playbooks セクションに記載されています。PR の作成・監視（babysit）・マージについては[ガイドページ 6](../../docs/guide/06-verify-and-ship.md) で解説しています。

pstack には専用の計画立案スキルはありません。Claude Code の plan mode（`/plan`）は pstack と併用できます。複数のフェーズやスタック PR にまたがる作業で `/pstack:poteto-mode` に計画作成を依頼すると、[Multi-phase plan プレイブック](../poteto-mode/playbooks/multi-phase-plan.md) が実行され、実装には進まず計画書だけを作成します。設計上の迷いがある場合は、まず Prototype プレイブックか `/pstack:architect` を使ってコード上で方針を固めてください。

原則（Principles）は、`/pstack:poteto-mode` が読み込んで回答内で引用する「1ルール単位の小さなスキル」です。ユーザーが直接呼び出すことはめったになく、代わりに「prove it works を適用して、実際の出力を見せて」のように原則の名前を挙げてエージェントの挙動をコントロールします。もちろん、`/pstack:principle-<name>` と入力すればオンデマンドで読み込むことも可能です。原則の一覧は[ガイドページ 8](../../docs/guide/08-principles.md) にまとまっています。

## うまくいかなかった実行を修正する

| 症状 | 対処法 |
|---|---|
| 数ターン経つとモードが効かなくなった | タスクが変わったのに `/pstack:poteto-mode` を付け直していない可能性があります。タスクごとに付けて開始してください。会話が長くなっている場合は、新しいセッションで始め直すのも有効です。 |
| 単なる質問をしただけなのに、直前のタスクの「次のステップ」として処理された | 「new task（新しいタスク）」と伝えるか、そのターンにはモードが不要であることを明言してください。 |
| モデル設定を変更したのに反映されない | `/pstack:setup-pstack` で生成されたルールは「新しいセッション」から適用されます。新しいセッションを開始してください。 |
| 予想以上にトークンコストがかかった | 「セットアップ方法」のコストに関する段落を参照してください。 |
| スキルが自動的に読み込まれなかった | ユーザーの自然言語から自動ロードされるのは `/pstack:setup-pstack` だけです。他のスキルはユーザーがコマンドを入力したとき、または `/pstack:poteto-mode` が必要と判断したときにのみ読み込まれます（`/pstack:poteto-mode` もすべてのスキルを使うわけではありません）。 |
| 並列実行したエージェント同士が互いの変更を上書きしてしまった | 各エージェントに専用の worktree を割り当ててください（`Agent` ツールの `isolation: "worktree"`）。 |
| 夜間実行（オーバーナイト）が動いてはいたが何も完了していなかった | Claude Code 組み込みの `/loop` には時間指定ではなく、「成功・失敗を判定できるチェック条件」を与える必要があります。[ガイドページ 7](../../docs/guide/07-overnight.md) を参照してください。 |
| ビルドが通った（グリーンになった）ことだけを根拠に「成功」と主張してくる | 実際に動かしたコマンド、処理フロー、保存された値、またはプロファイル結果を提示するよう求めてください。これが `prove-it-works` 原則の基本です。 |

実行が脱線し始めたときの軌道修正用ワンライナーは [`references/prompting.md`](references/prompting.md) に載っています。さらなる落とし穴とコピペして使えるレシピ集は[ガイドページ 10](../../docs/guide/10-recipes-and-pitfalls.md) を参照してください。

## pstack を自分好みにカスタマイズする

- [`/pstack:automate-me`](../automate-me/SKILL.md)：ユーザー自身の過去の作業履歴から、`/pstack:poteto-mode` と併用できるパーソナルなモードスキルの下書きを作成します。
- [`/pstack:reflect`](../reflect/SKILL.md)：セッション終了後にその場の教訓を振り返り、ユーザーの承認を得たうえでスキルの編集内容へと反映します。
- `/pstack:poteto-mode write a skill for <workflow>`：スキル作成用の authoring プレイブックを実行します。変更したスキルのテストには eval プレイブックを使ってブラインド評価を行えます。
- 期待通りに動かないスキルを修正するときは、機能開発の PR の中に混ぜるのではなく、必ず独立した専用の PR として修正してください。

これらの詳細は[ガイドページ 9](../../docs/guide/09-make-it-yours.md) で解説しています。

## 返信の仕方

結論（答え）から先に書き始めてください。適切なものがあれば [`references/recipes.md`](references/recipes.md) をベースに調整したプロンプト例をコードブロックで最大1つだけ提示し、そのファイルへのリンクを添えます。ユーザーから全体マップを求められていない限り、回答は簡潔にまとめてください。
