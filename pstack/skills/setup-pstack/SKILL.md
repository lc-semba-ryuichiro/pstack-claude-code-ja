---
name: setup-pstack
description: pstack がロールごとに使用するモデルと推論バジェット（reasoning budget）を設定します。利用可能なモデルを検出し、スキルのデフォルト値を上書きするルールファイルを書き出します。/pstack:setup-pstack、"configure pstack models"（pstack のモデル設定）、"pstack budget"（pstack のバジェット設定）、または pstack のモデル選択を変更する際に使用します。
---

# Setup pstack

ロールごとの pstack モデルを設定するルールファイル `~/.claude/rules/pstack-models.md` を書き出します。Claude Code は `~/.claude/rules/` の `.md` ファイルを新しいセッションごとに自動で読み込むため、frontmatter は不要です。

## 手順

### 1. 利用可能なモデルを検出する

このセッションの `Agent` ツールのスキーマを確認します。`model` に列挙されている値（`opus`、`sonnet`、`haiku`、`fable` のうち列挙されているもの）と、`effort` に列挙されている値（`low`、`medium`、`high`、`xhigh`、`max`）の組み合わせが検出済みセットです。これが信頼できるソースです。値は `<model> <effort>` の形で書きます（例 `opus xhigh`）。最後のトークンが effort です。スキーマに `model` か `effort` の列挙が見つからない場合は、使える値を貼り付けるようユーザーに依頼します。検出できていない値は絶対に書き出さないこと。エイリアスの `inherit-parent` と `auto` は検出済みの値ではありませんが、常に有効です。

### 2. 現在の状態をロードする

デフォルトのロール対モデルマッピングは、後述のステップ5に示すルールの形式です。`~/.claude/rules/pstack-models.md` がすでに存在する場合はそれを読み込み、`# budget` 行とロールの値を現在の選択として扱います。存在しない場合はデフォルトから開始し、現在のバジェットは `large` とします。

- `hardest tasks`、`architect runners`、`reflect tooling`、`why investigators` など、ステップ5にないロールの行は廃止されたロールのものなので削除します。
- `# budget: unlimited` 行は `large` にします（`xhigh` を超えて実行されるロールはないため）。`# budget` 行がない場合も `large` とみなします。
- effort が `xhigh` を超える値（`opus max` など）は、effort を `xhigh` にします。
- ステップ5にあってファイルにないロールは、デフォルト値から始めます。

それ以外の値（`inherit-parent` と `auto` を含む）はすべてユーザーの選択としてそのまま残します。削除した行と変えた値をユーザーに伝えてください。

### 3. バジェットの設定、マッピング、確認

**(a) バジェットを尋ねる。** 自由記述よりも AskUserQuestion を優先します（`-p` モードなど AskUserQuestion が使えない場合はプレーンテキストで尋ねます）。以下の3つのオプションを正確なラベルで提示し、ルールに記録されている場合は現在のバジェット名を挙げます。ルールがない場合は、`large` がスキルのデフォルトに一致する旨を伝えます。

- `large — xhigh reasoning`
- `medium — high reasoning`
- `small — medium reasoning`

**(b) 適用する。** ステップ2の値から作業テーブルを作ります。各ロールにはターゲット effort があります。これは、ステップ5のデフォルトの effort をバジェットに応じて動かしたものです。`xhigh` > `high` > `medium` > `low` のラダー上で、`large` は維持、`medium` は1段下げ、`small` は2段下げます。`xhigh` を超えるロールはなく、最下段のターゲットはそこにとどまります。

- パネルのエントリを含め、ロール内のすべての実際の値の effort（最後のトークン）を、そのロールのターゲットにします。model は変えません。
- 結果が検出済みセットにない場合は、同じ model の検出済みの値のうち、ターゲット以下で最も effort が高いものを使います。それもなければ「選択が必要（needing a choice）」とマークします。
- `inherit-parent` と `auto` は変更しません。

したがって、`medium` はデフォルトの `opus xhigh` を `opus high` に、`opus high` を `opus medium` にし、`small` はそれらを `opus medium` と `opus low` にします。ほとんどのデフォルトは `xhigh` にあり、各バジェットラベルはそれらがどこに着地するかを示しています。

**(c) ロールを表示して確認する。** すべてのロールとその値を表示し、検出済みセットにない値には「選択が必要」とマークします。ステップ2で削除した各行も一覧表示します。このまま承認するか、特定のロールを変更するかを尋ねます。選択肢は、検出済みセットのうち effort が `xhigh` 以下の値と、`inherit-parent` と `auto` です。どちらのエイリアスも「このロールは親チャットのモデルで実行される」という意味です。自由記述よりも AskUserQuestion を優先します。

パネルロール（`arena runners`、`interrogate reviewers`）の値はリストです。エイリアスを含めエントリごとに1つのサブエージェントが実行されるため、リストの長さが実行数を決めます。`arena cross-judge pool` もリストですが、Arena が実行する審査員は1つです。Arena は親チャットと別のモデルファミリーの値をリスト順に試すため、優先順位順に並べてください。ファミリーは `model` の値そのもの（`opus`、`sonnet`、`haiku`、`fable`）です。`inherit-parent` や `auto` の値は審査を行いません。`swarm workers` は、レースや比較でアームごとに別のモデルが割り当てられない限り、すべてのワーカーのデフォルトモデルになります。

### 4. 検証する

書き出すすべての実際の値は、検出済みセットに含まれ、かつ effort が `xhigh` 以下でなければなりません。検出済みセットに `max` があっても書き出しません。`inherit-parent` と `auto` は常にパスします。選択された値が利用できない場合は停止して再度尋ねます。

### 5. ルールを書き込む

`~/.claude/rules/pstack-models.md` を frontmatter なしで書き出します。中身はコメント行、選んだラベルとそのラベルが示す effort を記した `# budget` 行（`large (xhigh)`、`medium (high)`、`small (medium)` のいずれか）、そして poteto-mode が使用するのと同じラベルを使ったロールごとの1行です。再実行時の冪等性を保つため、ファイル全体を上書きします。ロールの行は `CLAUDE.md` や `AGENTS.md` には決して書かないこと。デフォルトの内容は以下の通りです。

```
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit the Agent `model`). Alias entries in a panel list still count toward its fan-out.
# budget: large (xhigh)
feature, refactoring: opus xhigh
bug-fix: opus xhigh
perf-issue: opus xhigh
hillclimb: opus xhigh
judgment and prose: opus xhigh
arena runners: fable high, opus high, sonnet xhigh
arena cross-judge pool: opus high, sonnet xhigh
swarm workers: opus high
interrogate reviewers: fable high, opus high, sonnet xhigh
```

### 6. 確認する

ルールが書き込まれたこと、および新しいセッションから適用されることをユーザーに伝えます。このスキルを再実行すると更新されます。

### 7. 検証スキルを提案する（任意）

プロジェクトに実際のアプリを動かして証明する手段（`verify-*` スキルや既存のハーネス（harness））があるか確認します。ない場合は一度だけ提案します。「エージェントがユーザーと同じようにアプリを操作して変更の動作を証明できるよう、プロジェクト固有の検証スキルを用意しますか？ /pstack:create-verification-skill で生成できます。」（"want a project-local verification skill, so agents can drive the app the way a user does and prove changes work? I can generate one with /pstack:create-verification-skill."）イエスの場合は [**create-verification-skill** スキル](../create-verification-skill/SKILL.md)を Read して従います。ノーの場合は深追いせず次に進みます。

### 8. 形式検証スキルを提案する（任意）

プロジェクトにすでに形式検証スキル（コードに対してモデルチェッカー、証明、またはその他の検証器を実行するプロジェクトスキル）があるか確認します。ない場合は一度だけ提案します。「テストが到達するケースだけでなく、スコープ内のあらゆるケースでコードの重要な性質が成り立つことをエージェントが証明できるよう、形式検証スキルを用意しますか？ /pstack:create-formal-verification-skill で生成できます。」（"want a formal verification skill, so agents can prove a key property of your code holds in every case in scope, not only the cases tests reach? I can generate one with /pstack:create-formal-verification-skill."）イエスの場合は [**create-formal-verification-skill** スキル](../create-formal-verification-skill/SKILL.md)を Read して従います。ノーの場合は深追いせず次に進みます。
