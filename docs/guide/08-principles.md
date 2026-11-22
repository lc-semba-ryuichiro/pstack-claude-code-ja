# 原則の名前を指定して舵を取る

pstack には、個別のスキルとして24の原則が同梱されています。`/pstack:poteto-mode` は複数ステップからなるすべてのタスクの開始時にこれらのインデックスを読み込み、タスクに応じて該当する原則を適用し、適用した原則の名前と「それによってどの意思決定が変わったか」を返信の中で明記します。

原則はコマンドのように直接呼び出すものではありません。その「名前」を使ってエージェントの軌道修正（舵取り）を行います。各原則の名前は、エージェントがすでに読み込んでいる詳細なルール全体を指し示しているため、長い指示文を何段落も書くよりも、そのフレーズを1つ伝えるだけで作業の方向性をより正確に修正できます。

## 実践での軌道修正（ステアリング）

たとえば、エージェントが既存の3つのアダプターに新しいアダプターを無理やり継ぎ足そうとしているときは、次のように伝えます：

```text
「subtract before you add（足す前に引く）」を適用して。まず不要になった古いアダプターを削除してから、残ったものをベースに設計して。
```

ビルドが通ったことだけを理由に完了を主張してきたときは、次のように伝えます：

```text
「prove it works（動作を証明する）」を適用して。実際のインポートフローを実行して、書き込まれたレコードを見せて。
```

2つの並列試行が同じブランチに同時に書き込もうとしているときは、次のように伝えます：

```text
「separate before serializing shared state（共有状態を直列化する前に分離する）」に従って。ロックは使わず、各試行に専用の worktree を割り当てて。
```

それぞれのフレーズが的確に効くのは、その背後にあるルールが具体的だからです。そのうえでエージェントは、そのルールによって「どの判断が変わったのか」を返信内で明示しなければなりません。具体的な意思決定の変化を伴わない単なる原則名の引用は、名前を挙げただけで実際には適用していないことを意味します。

## 24の原則の概要

コア原則（core principles）は、どれだけの量を作るべきか、そしていつ設計を見直すべきかを決定します：

- [Laziness Protocol](../../skills/principle-laziness-protocol/SKILL.md)：削除すること、そして問題を解決できる最小限の変更を行うことを優先します。
- [Foundational Thinking](../../skills/principle-foundational-thinking/SKILL.md)：ロジックを書き始める前に、コアとなるデータ構造を選定します。
- [Redesign from First Principles](../../skills/principle-redesign-from-first-principles/SKILL.md)：後付けするのではなく、新しい要件が初日から前提として存在していたかのように再設計します。
- [Attack the Premise](../../skills/principle-attack-the-premise/SKILL.md)：失敗に終わった2つ以上の修正が共有していた前提を書き出し、次の修正に進む前にその前提自体を直接テストします。
- [Subtract Before You Add](../../skills/principle-subtract-before-you-add/SKILL.md)：新たに積み上げる前に、不要な重荷（デッドコードや使われていない仕組み）を取り除きます。
- [Minimize Reader Load](../../skills/principle-minimize-reader-load/SKILL.md)：読み手が頭の中に保持しなければならないレイヤーや隠れた状態を統合・削減します。
- [Outcome-Oriented Execution](../../skills/principle-outcome-oriented-execution/SKILL.md)：使い捨ての互換状態を維持するのではなく、目標とする設計へと書き換えを一気に収束させます。
- [Experience First](../../skills/principle-experience-first/SKILL.md)：実装の都合よりも、ユーザーが得る結果（体験）を優先します。
- [Exhaust the Design Space](../../skills/principle-exhaust-the-design-space/SKILL.md)：前例がない場合は、競合する2〜3個のプロトタイプを作成して比較します。
- [Build the Lever](../../skills/principle-build-the-lever/SKILL.md)：レビュアーが再実行できるよう、作業を実行または証明するスクリプトを構築します。エージェントが同じ作業を何度も手作業で繰り返しているようなら、本来欲しかったツールやスキル自体を書かせてください。スクリプトで毎回同じように処理できるステップはスクリプトに任せ、エージェントは判断が必要な場面に温存します。

アーキテクチャ原則（architecture principles）は、状態・バリデーション・互換性をどこに配置すべきかを決定します：

- [Model the Domain](../../skills/principle-model-the-domain/SKILL.md)：散在する条件分岐ではなく、1つのデータ構造の中に繰り返されるルールをエンコードします。
- [Boundary Discipline](../../skills/principle-boundary-discipline/SKILL.md)：システムの境界でバリデーションを行い、内部の型は信頼します。
- [Type System Discipline](../../skills/principle-type-system-discipline/SKILL.md)：不正な状態（illegal states）を型レベルで表現不可能にします。
- [Make Operations Idempotent](../../skills/principle-make-operations-idempotent/SKILL.md)：リトライを実行しても常に同じ最終状態に収束するようにします。
- [Migrate Callers Then Delete Legacy APIs](../../skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md)：呼び出し元の移行と古い API の削除を同じ波（wave）の中で一気に行います。
- [Separate Before Serializing Shared State](../../skills/principle-separate-before-serializing-shared-state/SKILL.md)：調停（ロックなどの同期制御）を追加する前に、まず状態の共有自体を排除します。

検証原則（verification principles）は、何をもって「証明」とみなすかを定義します：

- [Prove It Works](../../skills/principle-prove-it-works/SKILL.md)：プロキシ指標（コンパイル通過など）ではなく、実際の成果物を検証します。
- [Fix Root Causes](../../skills/principle-fix-root-causes/SKILL.md)：コードを変更する前に事象を再現させ、根本原因までトレースします。
- [Sequence Work into Verifiable Units](../../skills/principle-sequence-verifiable-units/SKILL.md)：小さな作業単位ごとにチェックを完了させてから、次の単位に着手します。
- [Test Behavior, Not Implementation](../../skills/principle-test-behavior-not-implementation/SKILL.md)：コードの利用者が観測できる振る舞いをアサートすることで、その振る舞いが壊れたときにはテストが失敗し、内部実装だけの変更ではテストが落ちないようにします。
- [Explain the Number](../../skills/principle-explain-the-number/SKILL.md)：計測した数値を信頼・報告する前に、何がその数値を制限しているかを特定し、意図した処理以外のものを測ってしまっている可能性を排除します。[`/pstack:benchmark-checklist`](../../skills/benchmark-checklist/SKILL.md) はこれを、実際の実行結果から答える7つの質問へと落とし込んだものです。

委譲原則（delegation principles）は、並列作業を破綻させずに健全に保ちます：

- [Guard the Context Window](../../skills/principle-guard-the-context-window/SKILL.md)：大量の読み込み作業はサブエージェントに振り分け、メインチャットには得られた知見だけを保持します。
- [Never Block on the Human](../../skills/principle-never-block-on-the-human/SKILL.md)：後から覆せる（可逆な）作業は確認を求めずに進め、結果を提示します。

そしてメタ原則（meta principle）が1つあります：

- [Encode Lessons in Structure](../../skills/principle-encode-lessons-in-structure/SKILL.md)：2回繰り返したアドバイスは、Lint ルール、チェック機構、またはスクリプトへと落とし込みます。[`/pstack:correct`](../../skills/correct/SKILL.md) はこれをリポジトリ全体に適用するスキルで、[自分好みにカスタマイズする](./09-make-it-yours.md#pstackcorrect-で開発環境リポジトリ側を修正する) で詳しく解説しています。

このリストを丸暗記する必要はありません。今はざっと目を通すだけにしておき、エージェントが「ここの原則名を知っていれば防げたはずの動き」をしているのを見つけたときにまた戻ってきてください。そうやって使っていくうちに、自然と語彙として定着していきます。

次へ：[自分好みにカスタマイズする](./09-make-it-yours.md)
