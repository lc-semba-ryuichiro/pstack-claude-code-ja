---
name: principle-laziness-protocol
description: "リファクタリング、diff のサイズの評価、または抽象化、レイヤー、層をまたいだシグナルやフラグの引き回しを追加したくなったときに適用します。削除と、問題を解決する最小の変更を優先します。"
disable-model-invocation: true
---

# Laziness Protocol

- **決定を統合する:** 同じ選択を複数箇所で繰り返さないこと。単一の信頼できる情報源（source of truth）の背後に置き、結果をシンプルなフラグとして渡します。
- **diff を最小化する:** 問題を解決する最小の変更を行うこと。行数が少ないことは「エレガント」なボイラープレートに勝ります。
