# TypeScript patterns

`SKILL.md` の各ルールに対するコード例です。根底にある原則は言語に依存しません。**type-system-discipline** および **boundary-discipline** 原則スキルを参照してください。

## Branded types（ブランド型）

プリミティブをブランド化して混同を防ぎます。境界で一度だけ検証し、下流のコードはその型を信頼します。

```ts
type AgentId = string & { readonly __brand: "AgentId" };

function isAgentId(input: string): input is AgentId {
  return isUUID(input);
}

function parseAgentId(input: string): AgentId {
  if (!isAgentId(input)) throw new Error(`Invalid agent id: ${input}`);
  return input;
}

function focusAgent(id: AgentId): void {
  /* input is trusted */
}
```

`readonly __brand: 'X'` の形状に合わせること。新しい独自規約を作らないでください。

## Discriminated unions（判別共用体）

リテラル判別子でバリアントをモデル化します。すべてのバリアントがフィールド名を共有し、各バリアントの値が固有であるため、あり得ない組み合わせを表現できなくなります。

```ts
// Don't. Boolean + optionals lets contradictory states exist.
type DiffState = { loading: boolean; diff?: GitDiff; error?: string };

// Do. Only valid states exist.
type DiffState =
  | { kind: "loading" }
  | { kind: "ready"; diff: GitDiff }
  | { kind: "error"; error: string };
```

判別子名は1つ（`kind`、`type`、`tag` のいずれか）を選び、それを貫きます。

## Constructive modeling（構成的モデリング）

緩い型をランタイムチェックで制限するのではなく、すべてが正当なパーツから型を構築します。

可変長タプルによる非空表現：

```ts
type NonEmpty<T> = [T, ...T[]];

// Don't: T[] plus a length check every caller must repeat
function pickWinner(entries: string[]): string {
  if (entries.length === 0) throw new Error("no entries");
  return entries[Math.floor(Math.random() * entries.length)];
}

// Do: an empty value of the type can't exist
function pickWinner(entries: NonEmpty<string>): string {
  return entries[Math.floor(Math.random() * entries.length)];
}
```

通常の `T[]` が到着する場所では、ガードで一度だけ絞り込みます。その事実は型に乗って伝播します。

```ts
const isNonEmpty = <T>(arr: T[]): arr is NonEmpty<T> => arr.length > 0;
```

ペアによる偶数長表現：

```ts
type Pairs<T> = [T, T][];
```

開始時刻と期間による時間範囲表現：

```ts
// Don't: a comment holds the invariant
type TimeRange = { start: Date; end: Date }; // start <= end

// Do: a negative range can't be written; derive end when needed
type TimeRange = { start: Date; durationMs: number };
```

`durationMs` は通常の `number` のままにします。反射的にではなく、期間が期待される場所に生の数値が渡される恐れがある場合にのみ（Branded types に従って）ブランド化してください。不正な状態を構築不可能にする表現を選び、その上に必要な読み取り手段（`pairs.flat()`、`rangeEnd()` ヘルパーなど）を公開します。

## Simplest total type（最もシンプルな全域型）

すべてを強化しようとしないでください。配列に対するすべての操作が全域（total）である場合は `T[]` のままにします。

```ts
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0); // [] is 0, fine
```

緩い型が使用箇所で嘘をつくことを強いる場合に強化します。その兆候は `!`、`arr[0] as T`、そして「起こり得ないはずの」throw です。

```ts
// Don't: partiality smuggled past the compiler
function newestSession(sessions: Session[]): Session {
  return sessions.at(0)!;
}

// Do: strengthen the input; the assertion disappears
function newestSession(sessions: NonEmpty<Session>): Session {
  return sessions[0];
}
```

戻り値を `Session | undefined` に弱めるのも、もう1つの全域シグネチャです。

## `unknown` over `any`（`any` より `unknown`）

外部データは常に `unknown` です。使用する前に絞り込みます。

```ts
// Don't
function handle(input: any) {
  return input.foo.bar;
}

// Do
function handle(input: unknown) {
  if (typeof input === "object" && input !== null && "foo" in input) {
    // narrowed; compiler verifies access
  }
}
```

外部ソースには、RPC ペイロード、`JSON.parse`、`postMessage`、IPC、ファイル内容、環境変数、データベース結果が含まれます。

## Schemas before hand-rolled guards（自前のガードより先にスキーマ）

外部データに対してプロパティごとの型ガードを書く前に、リポジトリのランタイムスキーマライブラリと既存スキーマを探します。1つのスキーマにバリデーションを所有させ、そこから TypeScript の型を派生させます。互いにズレ（drift）る可能性のあるスキーマ、重複したインターフェース、ガードを並行して維持しないでください。

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["admin", "member"]),
});

type User = z.infer<typeof UserSchema>;

function parseUser(input: unknown): User {
  return UserSchema.parse(input);
}
```

失敗が想定内の分岐である場合は `safeParse` を使用します。リポジトリが別のスキーマライブラリを使用している場合は、同等の推論ヘルパーを使用します。1つのガードのために新しいスキーマ依存関係を追加しないでください。このルールは、コードベースがすでに信頼しているスキーマシステムを優先します。

## No `as` casts（`as` キャスト禁止）

すべての `as` は潜在的な実行時クラッシュです。型システムが主張を検証した後にのみキャストします。

```ts
import { z } from "zod";

// Don't
const user = data as User;

// Don't
function isUser(data: unknown): data is User {
  return typeof data === "object" && data !== null && "id" in data;
}

// Do
const userSchema = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof userSchema>;

function parseUser(data: unknown): User {
  return userSchema.parse(data);
}
```

型が先にある場合は、それが証明する型でバリデーターに注釈を付けます。そうすると、型よりも少ないことしか証明しないバリデーターをコンパイラが拒否します。以下のオブジェクトから `name` を削除すると、代入がコンパイルエラーになります。

```ts
type User = { id: string; name: string };

const userSchema: z.ZodType<User> = z.object({ id: z.string(), name: z.string() });
```

既存コードから `as` をリファクタリングして取り除く際は、なぜ TypeScript が推論できないのかを特定します。

- 判別子の欠如: 判別子を追加し、判別共用体に切り替える。
- 広すぎるソース型（例: `Record<string, unknown>`）: 型を絞り込む。
- 型なし境界: その形状を所有するスキーマでパースする。スキーマが存在しない場合のみ追加する。
- 本当に表現不可能な場合: ブランド型または `satisfies` を使用する。

## Narrowing hierarchy（絞り込みの優先順位）

最善から最終手段まで：

1. **Discriminated union switch / if:** コンパイラが自動的に絞り込む。
2. **`in` 演算子:** `"key" in obj` でそのキーを含むバリアントに絞り込む。
3. **`typeof` / `instanceof`:** プリミティブとクラスインスタンス用。
4. **ユーザー定義型ガード:** 上記では不十分な場合。
5. **`as` キャスト:** 検証後にのみ使用。

```ts
function area(s: Shape): number {
  if ("radius" in s) return Math.PI * s.radius ** 2; // narrowed to circle
  return s.width * s.height; // narrowed to rect
}
```

## Type guards（型ガード）

ガードは主張を実際に検証しなければなりません。嘘をつくガードは `as` より悪質です。

```ts
function isCircle(s: Shape): s is Shape & { kind: "circle" } {
  return s.kind === "circle";
}
```

可能な限り判別子による絞り込みを優先してください。

## Exhaustiveness（網羅性チェック）

default アームでは、判別子を `never` 型のローカル変数に代入します。

```ts
// Value-returning switch
function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "rect":
      return s.width * s.height;
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}

// Void switch
function handle(s: Shape): void {
  switch (s.kind) {
    case "circle":
      drawCircle(s);
      break;
    case "rect":
      drawRect(s);
      break;
    default: {
      const _exhaustive: never = s;
      void _exhaustive;
    }
  }
}
```

値を返す switch では return スタイル、文としての switch では void スタイルを使います。

## `satisfies` over `as`（`as` より `satisfies`）

`satisfies` はリテラル型を広げずに検証を行います。

```ts
// Don't. Widens, loses literal types.
const config = { theme: "dark", cols: 3 } as Config;

// Do. Validates AND preserves literal types.
const config = { theme: "dark", cols: 3 } satisfies Config;
// config.theme is "dark" (literal), not string
```

## Boundary validation（境界バリデーション）

データが入ってくる境界で一度だけ検証します。内部では型を信頼してください。**boundary-discipline** 原則スキルを参照。

- **ワイヤーフォーマット**（proto、JSON-RPC）: 前方互換性のある変更で古いクライアントが壊れないよう、`ignoreUnknownFields` でパースします。
- **永続化された JSON:** パース処理を try/catch で囲んだバージョン付きブロブにします。
- コールチェーンの奥深くで**再バリデーションしないこと**。

## Schema-derived types（スキーマ派生型）

`.proto`、OpenAPI スペック、GraphQL スキーマ、またはデータベースマイグレーションですでに形状が定義されている場合は、重複定義せずに生成された型から派生させます。

```ts
// Don't. Duplicate shape, drifts when the schema changes.
type CheckSummary = {
  totalCount: number;
  checks: { name: string; status: string }[];
};
function renderChecks(s: CheckSummary) {
  /* ... */
}

// Do. Derive from the generated schema type.
import type { ChecksMessage } from "<generated module>";
function renderChecks(s: Pick<ChecksMessage, "totalCount" | "checks">) {
  /* ... */
}
```

新しいインターフェースを書く前に `Pick`、`Omit`、`Parameters`、`ReturnType`、`Awaited`、`typeof` を活用してください。

## Object args（オブジェクト引数）

```ts
// Don't. Swap two args, still compiles.
openFile(uri, {
  startLineNumber: 10,
  startColumn: 1,
  endLineNumber: 10,
  endColumn: 1,
});

// Do. Order-independent, self-documenting.
openFile({
  uri,
  selection: {
    startLineNumber: 10,
    startColumn: 1,
    endLineNumber: 10,
    endColumn: 1,
  },
});
```

ホットパス（フレームごとの描画、トークナイザー、パーサー、その他アロケーションコストが問題になるタイトなループ内）では省略してください。
