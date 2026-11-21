### Investigation

**答えはあなたが所有します。計画し、ルーティングし、書くこと。**

調査（Investigation）リクエストは読み取り専用です。コードの変更ではなく、引用付きの解説または推奨案を生成します。

1. 質問の対象となっているコードをトレースします。動機や理由に関する質問であれば、**why** スキルも経由させます。
2. スループットチェックポイントは1行で記載します：`throughput checkpoint: n/a, read-only investigation`。
3. 出力（Overview / Key Concepts / How It Works / Where Things Live / Gotchas）、または代替案の間の意思決定であればトレードオフ表を添えた推奨案を作成します。
4. 返信に **unslop** スキルを適用します。

調査がコード変更に先行するものでない限り、PR も babysit も `architect` も不要です。コード変更につながる場合は、ユーザーに結果を返した上で Bug fix または Feature に再ルーティングしてください。

**返信形式：** 調査結果の出力。「本当にこれで合っていますか？（are we sure?）」といった質問に対しては、理由を添えたあなた自身の率直な判断を含めてください。前提が間違っている場合は反論（push back）してください（Autonomy を参照）。
