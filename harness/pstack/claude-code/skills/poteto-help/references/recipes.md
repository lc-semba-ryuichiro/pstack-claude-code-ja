# コピペして使える実践プロンプト集

実際のパス、スキル名、完了チェック条件に置き換えて使ってください。くだけた口語表現でも問題なく伝わります。

## コードと文脈の理解（Understand）

- `/pstack:poteto-mode <thread> を読んで、根本的な課題を自分の言葉・平易な日本語で言い直して。`
- `/pstack:in-your-own-words <長文や雑多な依頼内容>`
- `/pstack:sharpen <これから送ろうとしているプロンプト>`
- `/pstack:poteto-mode なぜ <symptom> が起きているのか調査して。分かっている事実、参照したデータ、最も有力な仮説を教えて。まだコードは一切変更しないで。`
- `/pstack:how を使って <subsystem> の仕組みを把握して。そのあと /pstack:why を使って最近なぜ壊れたのか背景を突き止めて。`
- `/pstack:recall 先週自分が進めていた <topic> に関する作業を呼び出して、そのあと <issue> を読んで。`
- `/pstack:teach <other way> ではなく、なぜこの方法で実装したのか教えて。どんなトレードオフがあった？`
- `/pstack:poteto-mode このブランチを引き継いで。意思決定ログを読んでどこまで終わっているか把握し、続きを進めて。完了済みの作業はやり直さないで。`

## 実装と修正（Build）

- バグ修正：`/pstack:poteto-mode <symptom>。まず再現させてから修正し、動作を検証して。`
- アプリのバグ修正：`/pstack:poteto-mode /verify-<app> を使ってこの事象を再現させて。main でも再現するなら修正し、証拠として操作動画を見せて。`
- 低コストなテストが書けるバグ：`/pstack:poteto-mode まず <bug> を再現させて。手軽にテストを書ける経路があるなら /pstack:tdd で進めて。そのあと修正して再実行して。`
- 機能追加：`/pstack:poteto-mode <behavior> を追加して。<current output> はバイト単位で完全一致のまま維持すること。両方を検証して。`
- リファクタリング：`/pstack:poteto-mode <code> を1つのモジュールにまとめて。外部から見た挙動は一切変えないこと。まず現在の出力を記録し、変更後もまったく変わっていないことを証明して。`
- パフォーマンス改善：`/pstack:poteto-mode <fixture> 上で <operation> に <time> かかっている。トレースして実測ベースの原因を直し、ビフォー・アフターの数値を見せて。`

## 設計と計画（Design and plan）

- `/pstack:poteto-mode <feature> についていくつか別案のプロトタイプを作って。比較できるようにスクリーンショットか動画を撮って。`
- `/pstack:poteto-mode <feature> が必要。まず /pstack:architect で設計を固めて、未確定の疑問点はプロトタイプを動かして答えを出して。次に進む前に一度レビューさせて。`
- `/pstack:poteto-mode まず <new package> をどう使うかのチュートリアルを書いて。そのあと、なぜ現行のものより優れているのか /pstack:teach で解説して。`
- `このスレッドの議論と私たちのアプローチについて、/pstack:arena でセカンドオピニオンを求めて。`
- `/pstack:poteto-mode この設計を実装計画に落とし込んで。検証可能な小さな PR 単位に分割し、それぞれに専用の検証ステップを付けて。`
- `/pstack:poteto-mode <library> から <target> へのマイグレーション計画を立てて。検証可能な小さな PR 単位に分けること。結果はバグの挙動も含めて元の実装と完全に一致させること。`

## レビューと出荷（Review and ship）

- `/pstack:interrogate ブランチ全体を疑いの目を持って徹底的に攻めて。まだ何も変更しないで。本物のバグやリグレッションでない限り、細かい重箱の隅つつきは不要。`（出力された Dropped（却下）リストにも必ず目を通してください）
- `/pstack:create-formal-verification-skill <steps> が並行に割り込んだりリトライされたりしても、<module> 内で <property> が常に成り立つことを証明して。`（該当コードにマージやリファクタリングが入った後は `/pstack:maintain-formal-verification-skill` を実行します）
- `/pstack:swarm <dir> 配下の全パッケージをそれぞれのチェックスクリプトで検証して。1パッケージにつきワーカー1体を割り当て、1つのレポートにまとめて。`
- `/pstack:poteto-mode PR を作成して。順序立てられた小さなコミット群にし、PR の説明文に動作の証拠を記載して。`
- `/pstack:poteto-mode この PR を監視（babysit）して、CI をグリーンにして。` ステータス確認だけをしたい場合：`/pstack:poteto-mode PR #<number> の状況を確認して。何か残課題はある？`
- `/pstack:poteto-mode このスタック PR をマージ（着地）させて。`

## 席を外すとき・戻ったとき（Away and back）

- `/pstack:poteto-mode もう寝ます（im going to bed）。<base> から新しい worktree を切って <goal> を進めて。完了条件は <checks>。意思決定ログを残して。コミット前の確認は不要。完了するまで /loop を回して。数時間経っても本当に手詰まりになったら、停止して理由を書き出して。`
- `/pstack:show-me-your-work 昨晩やった作業のキャッチアップをして。`（まず返信末尾の Attention セクションから確認してください）
- `/pstack:ketchup` を使うと、あなたの最後のメッセージ以降にこのチャットで何が変化したかをキャッチアップし、判断待ちになっている全項目を一覧化できます。
- `/pstack:poteto-mode このキューに対して完全自動運転（full autopilot）を実行して。各アイテムは互いに独立しています。`
- `/pstack:poteto-mode これらの変更を自動運転（autopilot）で進めて。ただしマージはしないで、最終的なマージは自分で行います。`
- `/pstack:reflect 次回の実行で同じ轍を踏まないよう、今回学んだ教訓をスキルに反映して。`（将来の判断を実際に変える編集内容だけを承認してください）
- `/pstack:bro` を使うと、直前の返信内容を専門用語なしの平易な言葉で言い直してくれます。
