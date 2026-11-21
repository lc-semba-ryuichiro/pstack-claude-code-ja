### Opening a PR

他のすべてのプレイブックの最後に呼び出されます。

トランク（trunk）から切った git ワークツリーで作業し、無関係な作業を混ぜないようにします。着地可能な小さなコミットにリベースし、コミット前に diff 全体に対して `cursor-team-kit` の `/deslop` を実行します。

タイトル：`type(scope): subject` の形式とし、変更の核となる実際のシンボル名があればそれを記載します。本文：40行以内の1分で読めるブリーフィングとし、空のセクションは省いた上で以下の `##` 見出しをこの順序で配置します：`## Why`、`## What changed`、`## Scope`、`## Tradeoffs`（そう書かないとレビュアーが質問してくるような却下された代替案のみ）、`## Blast Radius`、`## Verification`。

フォローアップはベースブランチごとにスタックします。PR は実行環境の PR ツールで `draft: false` を指定して準備完了（ready）状態で開きます。専用ツールがない場合は、`--draft` を付けずに `gh pr create` を使用するか、Origin の CLI がリポジトリを解決できる場合は `origin pr create --status open` を使用します。PR を開いても babysit は自動的に開始されません。
