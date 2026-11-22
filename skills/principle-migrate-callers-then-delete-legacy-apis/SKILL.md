---
name: principle-migrate-callers-then-delete-legacy-apis
description: "古い呼び出し元（callers）がまだ存在する状態で、新しい内部 API を導入するときに適用します。互換性レイヤーを残すのではなく、同じウェーブで呼び出し元を移行し、古い API を削除します。"
disable-model-invocation: true
---

# Migrate Callers Then Delete Legacy APIs

- 新しい契約（contract）をアサートするようにテストを更新し、リファクタリング前の実装の詳細のみを保護するテストは削除します。

**適用条件:**
- 後方互換性に依存する外部ユーザーがいない
- プロジェクトが協調的な破壊的変更（breaking changes）を吸収できる
- 新しい API がシンプル化またはリファクタリングのイニシアチブの一部である
