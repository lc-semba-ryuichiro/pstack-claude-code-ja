---
name: typescript-best-practices
description: TypeScript のベストプラクティス。あらゆる .ts または .tsx ファイルの読み取り・編集時に使用します。
paths: ["**/*.ts", "**/*.tsx"]
disable-model-invocation: true
---

# TypeScript best practices

まず **type-system-discipline** 原則スキルを適用すること。

| Rule | Summary |
|------|---------|
| Discriminated unions（判別共用体） | 不可能な状態を表現できないよう、`kind` リテラル判別子でバリアントをモデル化する。オプショナルフィールドの寄せ集め（optional-field bags）は使わない。 |
| Branded types（ブランド型） | プリミティブに `& { readonly __brand: "X" }` を付けて混同を防ぐ。境界で一度だけ検証する。ブランドは `as` ではなく検証用の型ガード（`input is AgentId`）から付与する。 |
| Constructive modeling（構成的モデリング） | 不正な値を構築できない形状を作る。非空には `[T, ...T[]]`、偶数長には `[T, T][]`、期間には `start` と `duration` を使う。ランタイムガードや篩型（refinement types）への願望に頼らない。 |
| Simplest total type（最もシンプルな全域型） | すべての操作が全域（total）である間は `T[]` のままにする。緩い型が `!`、キャスト、または「起こり得ないはずの」throw を強いる箇所でのみ `NonEmpty<T>` に強化する。 |
| `unknown` over `any` | 外部データは `unknown` とする。 |
| Schemas before guards（ガードより先にスキーマ） | プロパティごとの型ガードを手書きする前に、リポジトリのランタイムスキーマライブラリを使い、`z.infer` などでスキーマから型を推論する。 |
| No `as` casts（`as` キャスト禁止） | すべての `as` は実行時クラッシュの予備軍である。検証後にのみキャストする。 |
| Narrowing hierarchy（絞り込みの優先順位） | 判別子の switch > `in` 演算子 > `typeof`/`instanceof` > ユーザー定義型ガード > `as`。 |
| Type guards（型ガード） | 主張内容を実際に検証しなければならない。嘘をつくガードは「安全」という名前の裏にバグを隠すため `as` より悪質である。名前は `isX` または `hasX` にする。 |
| Exhaustiveness（網羅性チェック） | 新しいバリアントが追加されたときにコンパイルエラーになるよう、default アームに `const _exhaustive: never = x;` をインラインで書く。 |
| `satisfies` over `as` | リテラル型を広げ（widening）ずに値を検証する。 |
| Boundary validation（境界バリデーション） | データが入ってくる境界で名前付きドメイン型にパースする。`Record<string, unknown>`（どんな表記であれ）はそのパースで食い止め、内部では型を信頼する。**boundary-discipline** 原則スキルを参照。 |
| Schema-derived types（スキーマ派生型） | 新しいインターフェースを宣言する前に `Pick`/`Omit`/`Parameters`/`ReturnType`/`Awaited`/`typeof` を使う。 |
| Object args（オブジェクト引数） | 引数の順序が自己文書化されるよう、位置引数ではなくオブジェクトを渡す。ホットパス（フレームごとの描画、トークナイザー、パーサー）では省略する。 |
| Real tests（実際のテスト） | 実行できるものをモックしない。リーク／破棄チェック付きのフレームワーク本来のテストプリミティブを優先し、UI は実行中のビルドで検証する。ローカルで実行できないものだけをモックする。 |
| Structured telemetry（構造化テレメトリ） | ID からデバッグできる十分なコンテキストを備えた構造化ロガー診断を優先する。出荷コードに `console.log` を残さない。 |

Examples: `references/patterns.md`.
