---
name: setup-pstack
description: pstack がロールごとに使用するモデルと推論バジェット（reasoning budget）を設定します。利用可能なモデルを検出し、スキルのデフォルト値を上書きする常時適用ルールを書き込みます。/setup-pstack、"configure pstack models"（pstack のモデル設定）、"pstack budget"（pstack のバジェット設定）、または pstack のモデル選択を変更する際に使用します。
---

# Setup pstack

ロールごとの pstack モデルを設定する常時適用ルール `~/.cursor/rules/pstack-models.mdc` を書き込みます。

## 手順

### 1. 利用可能なモデルを検出する

このセッションで `Task` サブエージェントに渡せるモデルスラグを列挙します。これが信頼できるソースです。Cursor がユーザーの権限付きモデルを一覧表示する models API または CLI を公開している場合は、網羅性のためにそちらを優先します。何も検出できない場合は、利用可能なスラグを貼り付けるようユーザーに依頼します。利用可能と確認できていない実際のスラグは絶対に書き込まないこと。エイリアスの `inherit-parent` と `auto` は検出されたスラグではありませんが、常に有効です。

### 2. 現在の状態をロードする

デフォルトのロール対モデルマッピングは、後述のステップ5に示すルールの形式です。`~/.cursor/rules/pstack-models.mdc` がすでに存在する場合はそれを読み込み、`# budget` 行とそのロール値を現在の選択として扱います。存在しない場合はデフォルトから開始します。`hardest tasks`、`architect runners`、`reflect tooling`、`why investigators` など、ステップ5にないロールの行は廃止されたロールのものなので削除します。

古いデフォルトでは、パネル席に別の Gemini モデル、次いで `gemini-4-neon-high` を配置していました。そのため、どのルールであってもパネルロール（`arena runners`、`arena cross-judge pool`、`interrogate reviewers`）内の `gemini-4-neon-high` エントリ、または `gemini-4-neon-*` 以外の `gemini-4-*` エントリは古いデフォルトです。これらはそれぞれ `gemini-4-neon-xhigh` に置き換えます。それ以外のレベルの Gemini 4 Neon エントリはユーザー自身の選択なのでそのまま残します。置き換えたエントリをユーザーに伝えてください。

`# defaults: 3` 行がないルールは古いセットアップ由来のものです。そのセットアップではすべてのロールに行を書き込んでいたため、値の一部はユーザーの選択ではなく古いデフォルトです。ステップ3の前に、以下の値を置き換えます。

- `arena cross-judge pool` のリストに `claude-fable-*` が1つ、`claude-opus-*` が1つ、`gemini-*` が1つ（順不同）だけ含まれている場合、ステップ5のリストを採用します。Fable と Opus は同一ベンダーであるため、Fable エントリは Opus エントリが審査できる場所でしか審査できませんでした。
- `# budget: unlimited` 行は `large` にします（`xhigh` を超えて実行されるロールはないため）。
- `# defaults: 2` 行もない場合、`grok-*` に一致するものが古いスラグです。`feature, refactoring`、`bug-fix`、`perf-issue`、`hillclimb`、または `swarm workers` 内の古いスラグはステップ5のデフォルトを採用します。パネルロール（`arena runners`、`arena cross-judge pool`、`interrogate reviewers`）において、`claude-opus-*` エントリ1つと古いスラグ1つ（順不同）からなるリストは、ステップ5のリストを採用します。その他のリスト内の各古いスラグは `claude-opus-5-5-high-fast` にします。

その他のすべての値（他のロール内の古いスラグや、すべての `inherit-parent` / `auto` 値を含む）はユーザーの選択としてそのまま残します。置き換えた値をユーザーに伝えてください。

### 3. バジェットの設定、マッピング、確認

**(a) バジェットを尋ねる。** 自由記述よりも AskQuestion を優先します。以下の3つのオプションを正確なラベルで提示し、ルールに記録されている場合は現在のバジェット名を挙げます。ルールがない場合は、`large` がスキルのデフォルトに一致する旨を伝えます。

- `large — xhigh reasoning`
- `medium — high reasoning`
- `small — medium reasoning`

**(b) 適用する。** スキルのデフォルトから作業テーブルを構築し、再実行時はファミリー、リスト、またはエイリアス（`inherit-parent`、`auto`）で変更されたロールを保持します。ファミリーは **arena** スキルの Phase A で定義されたものに従うため、Fable は独立したファミリーになります。各ロールにはターゲットエフォート（デフォルトのエフォートをバジェットに応じて移動したもの）があります。`xhigh` > `high` > `medium` > `low` のラダー上で、`large` は維持、`medium` は1段階下げ、`small` は2段階下げます。`xhigh` を超えて実行されるロールはなく、ラダーの最下段にあるターゲットはそこにとどまります。ほとんどのデフォルトは `xhigh` にあり、各バジェットラベルはそれらがどこに着地するかを示しています。パネルエントリを含め、ロール内のすべての実スラグのエフォートトークンをそのロールのターゲットに設定します。エフォートトークンは最後のトークン、または末尾の `fast` の直前のトークンです。結果が検出されたスラグにない場合は、ターゲット以下で最もエフォートが高い同ファミリーの検出済みスラグを使用し、それもなければ選択が必要（needing a choice）とマークします。`inherit-parent` と `auto` は変更しません。したがって、`medium` は `claude-opus-5-5-xhigh-fast` を `claude-opus-5-5-high-fast` に、`claude-opus-5-5-high-fast` を `claude-opus-5-5-medium-fast` に変え、`small` はそれらを `claude-opus-5-5-medium-fast` と `claude-opus-5-5-low-fast` に変えます。Opus 5.5 は常に `-fast` スラグで実行されるため、すべての Opus 5.5 値は `-fast` で終わります。Fable 5.2 と Gemini には fast スラグがないため、絶対に付けないこと。Gemini 4 Neon スラグは `low` から `xhigh` まであり、`max` や `fast` スラグはないため、その席は最上位スラグである `gemini-4-neon-xhigh` で実行されます。パネルロール内の Gemini 4 Neon エントリは独自のターゲット（`xhigh` をバジェットで移動したもの）を取るため、`large` は `gemini-4-neon-xhigh` を維持し、`medium` は `gemini-4-neon-high` を、`small` は `gemini-4-neon-medium` を書き込みます。

**(c) ロールを表示して確認する。** すべてのロールとそのモデルを表示し、検出済みセットに含まれない実スラグには選択が必要である旨をマークします。ステップ2で削除した各行も一覧表示します。このまま承認するか特定のロールを変更するかを尋ね、選択肢として `xhigh` 以下の検出済みモデルに加え、`inherit-parent` と `auto`（どちらも「このロールは親チャットのモデルで実行される」という意味で、Auto ユーザーが Auto を維持するための指定）を提示します。自由記述よりも AskQuestion を優先します。パネルロール（`arena runners`、`interrogate reviewers`）の値はリストであり、エイリアスエントリを含めエントリごとに1つのサブエージェントが実行されるため、リストの長さが実行数を決めます。`arena cross-judge pool` もリストですが、Arena が実行する審査員は1つです。親とは異なるベンダーの値をリスト順に試すため、優先順位順に並べてください。Fable と他の Claude モデルは同一ベンダーです。`inherit-parent` や `auto` の値は審査を行いません。`swarm workers` は、レースや比較でアームごとに別のモデルが割り当てられない限り、すべてのワーカーのデフォルトモデルになります。

### 4. 検証する

書き込まれるすべての実スラグは、検出済みセットに含まれ、かつ `xhigh` 以下でなければなりません。`inherit-parent` と `auto` は常にパスします。選択された実スラグが利用できない場合は停止して再度尋ねます。

### 5. ルールを書き込む

`alwaysApply: true`、`# defaults: 3` 行、選択されたラベルとそのラベルが示すエフォートを記した `# budget` 行、および poteto-mode が使用するのと同じラベルを使ったロールごとの1行を含む `~/.cursor/rules/pstack-models.mdc` を書き込みます。再実行時の冪等性を保つため、ファイル全体を上書きします。形式は以下の通りです。

```
---
description: pstack per-role model choices (overrides skill defaults)
alwaysApply: true
---
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model` and spawn `generalPurpose`). Alias entries in a panel list still count toward its fan-out.
# defaults: 3
# budget: large (xhigh)
feature, refactoring: claude-opus-5-5-xhigh-fast
bug-fix: claude-opus-5-5-xhigh-fast
perf-issue: claude-opus-5-5-xhigh-fast
hillclimb: claude-opus-5-5-xhigh-fast
judgment and prose: claude-opus-5-5-xhigh-fast
arena runners: claude-fable-5-2-high, claude-opus-5-5-high-fast, gemini-4-neon-xhigh
arena cross-judge pool: claude-opus-5-5-high-fast, gemini-4-neon-xhigh
swarm workers: claude-opus-5-5-high-fast
interrogate reviewers: claude-fable-5-2-high, claude-opus-5-5-high-fast, gemini-4-neon-xhigh
```

### 6. 確認する

ルールが書き込まれたこと、および新しいセッションから適用されることをユーザーに伝えます。このスキルを再実行すると更新されます。

### 7. 検証スキルを提案する（任意）

プロジェクトに実際のアプリを動かして証明する手段（`verify-*` スキルや既存のハーネス（harness））があるか確認します。ない場合は一度だけ提案します。「エージェントがユーザーと同じようにアプリを操作して変更の動作を証明できるよう、プロジェクト固有の検証スキルを用意しますか？ /create-verification-skill で生成できます。」（"want a project-local verification skill, so agents can drive the app the way a user does and prove changes work? I can generate one with /create-verification-skill."）イエスの場合は `/create-verification-skill` を呼び出します（ワークスペース、ユーザー、プラグインのいずれか pstack がインストールされている場所から解決されます）。ノーの場合は深追いせず次に進みます。

### 8. 形式検証スキルを提案する（任意）

プロジェクトにすでに形式検証スキル（コードに対してモデルチェッカー、証明、またはその他の検証器を実行するプロジェクトスキル）があるか確認します。ない場合は一度だけ提案します。「テストが到達するケースだけでなく、スコープ内のあらゆるケースでコードの重要な性質が成り立つことをエージェントが証明できるよう、形式検証スキルを用意しますか？ /create-formal-verification-skill で生成できます。」（"want a formal verification skill, so agents can prove a key property of your code holds in every case in scope, not only the cases tests reach? I can generate one with /create-formal-verification-skill."）イエスの場合は `/create-formal-verification-skill` を呼び出します（ワークスペース、ユーザー、プラグインのいずれか pstack がインストールされている場所から解決されます）。ノーの場合は深追いせず次に進みます。
