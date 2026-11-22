---
name: principle-redesign-from-first-principles
description: "新しい要件を既存のデザインに統合するときに適用します。"
disable-model-invocation: true
---

# Redesign From First Principles

変更を統合する際、既存のデザインに後付け（bolt on）しないこと。その要件が最初からの基本的な前提であったかのように再設計します。

- 影響を受けるすべてのファイルを読み、現在の設計を理解します。
- 「この新しい要件を持った状態でゼロから書くとしたら、何を構築するか？」と問いかけます。
- 型、ドキュメント、例、根拠（rationale）セクションなど、すべての参照に変更を伝播させます。
- 再設計の全体像を考え、その後、段階的に（incrementally）提供します。

これは、既存のデザインに変更を統合する際にオプション価値（option value）を維持するための方法論です。
