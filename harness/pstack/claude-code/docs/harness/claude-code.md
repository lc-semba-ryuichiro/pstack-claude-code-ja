# Claude Code での pstack の利用

pstack のスキルでは Cursor の名称が使用されています。Claude Code で使用する際は、セッションごとにこのファイルを一度読み込み、以下の対応表を使ってスキル内の各 Cursor 名称をマッピングしてください。`<pstack>` は `skills/` と `docs/` を格納しているフォルダを指します。表に対応する行がない Cursor フィールドは除外し、その旨を明記してください。ツールスキーマが拒否するフィールドや値は決して渡さないでください。

## ツール

| Cursor | Claude Code |
| --- | --- |
| `Task` | `Agent` |
| `AskQuestion` | `AskUserQuestion`。`-p` モードでは利用できないため、プレーンテキストで質問してください。 |
| Todo リストを開く、または Todo リストツールにステップをコピーする | セッションで `TodoWrite` が提供されている場合はそれを使用します。そうでない場合は、返信内にリストを保持し、各フェーズで更新してください。 |
| 別の pstack スキルを実行する（`/name` または「**name** スキル」） | `<pstack>/skills/<name>/SKILL.md` を `Read` で読み込み、その指示に従います。`Skill` ツールは大半の pstack スキルを拒否します。ユーザーに入力を促す際は `/pstack:<name>` と記述してください。 |
| `Grep`, `Glob` | セッションに `Grep` や `Glob` がない場合は、`Bash` で `rg` を使用します。 |

## サブエージェントのフィールド

| Cursor | Claude Code |
| --- | --- |
| `subagent_type: generalPurpose` | `subagent_type: "general-purpose"` |
| `poteto-agent`, `comment-sicko` | `pstack:poteto-agent`, `pstack:comment-sicko` |
| `poteto-agent` ファイル内の `model:` 行 | ここには Cursor のスラッグ（識別子）が記載されています。そのスラッグが API に渡らないよう、`pstack:poteto-agent` を起動するすべての `Agent` 呼び出しにおいて、モデル対応表でマッピングした `model` と `effort` を渡してください。 |
| `readonly: true` | `subagent_type: "Explore"`。このタイプでも `Bash` は使えるため、指示書（ブリーフ）にも「ファイルを編集しないこと」と明記し、実行後に `git status` で確認してください。 |
| `readonly: false` | `general-purpose`。セッションの MCP サーバーが維持されます。 |
| `environment: "cloud"` | `isolation: "worktree"`。ワーカーがチェックアウトするブランチまたはコミットを指定してください。 |
| `environment: "local"` | 省略します。 |
| `cloud_base_branch: <b>` | ワーカーにまず `<b>` をチェックアウトするよう指示します。 |
| `run_in_background: true` | 省略します。サブエージェントはデフォルトでバックグラウンド実行され、完了時に通知されます。 |
| `resume` | 新しいエージェントを起動し、以前の結果をその指示書（ブリーフ）に貼り付けます。 |
| `file_attachments` | 指示書（ブリーフ）内にファイルパスを列挙します。 |

## モデル

| Cursor | Claude Code |
| --- | --- |
| `claude-<family>-<version>-<effort>[-fast]`（例：`claude-opus-5-5-xhigh`） | `model: "opus"` および `effort: "xhigh"`。`model` に指定できるのは `opus`、`sonnet`、`haiku`、`fable` のみです。`-fast` は取り除きます。 |
| `gemini-*` またはその他の非 Claude スラッグ | エージェントがセッションのモデルで実行されるよう `model` を省略し、その旨を明記します。 |
| `auto` または `inherit-parent` | `model` を省略します。 |
| `pstack-models.mdc` ルール（`~/.cursor/rules/pstack-models.mdc`） | `~/.claude/rules/pstack-models.md`。Claude Code は新しいセッションごとにこのファイルを読み込むため、各ロールの設定行はすでにコンテキストに含まれています。含まれていない場合はファイルを読み込んでください。ファイル自体や該当ロールの行が存在しない場合は、スキルのデフォルトスラッグを使用します。 |
| ロール値 `<model> <effort>`（例：`opus high`） | `model: "opus"` および `effort: "high"`。 |

## setup-pstack

Claude Code は新しいセッションごとに `~/.claude/rules/` 内のすべての `.md` ファイルを読み込むため、`setup-pstack` はそこにルールファイルを書き出します。以下の変更点を適用したうえで手順に従ってください：

- **検出（Detect）**：検出されるモデルは、`Agent` ツールスキーマに列挙されている `model` の値と、それぞれの `effort` の値の組み合わせです。実際のモデルは `opus xhigh` のように `<model> <effort>` の形式で記述します。最後のトークンが effort になるため、バジェット設定のステップはそのまま機能します。
- **デフォルト値（Defaults）**：上記の表に従って各デフォルトスラッグをマッピングします。`claude-opus-5-5-xhigh-fast` は `opus xhigh`、`claude-opus-5-5-high-fast` は `opus high`、`claude-fable-5-2-high` は `fable high`、`gemini-4-neon-xhigh` は `inherit-parent` になります。
- **書き出し（Write）**：フロントマターを付けずに `~/.claude/rules/pstack-models.md` を書き出し、コメント行、`# budget` 行、およびステップ 5 の各ロールにつき1行ずつ記述します。ファイル全体を上書きしてください。ロールの設定行は決して `CLAUDE.md` や `AGENTS.md` に書かないでください。

## パス

| Cursor | Claude Code |
| --- | --- |
| `.cursor/skills/`, `~/.cursor/skills/` | `.claude/skills/`, `~/.claude/skills/` |
| `~/.cursor/plugins/`, `.cursor-plugin/plugin.json` | `~/.claude/plugins/`, `.claude-plugin/plugin.json` |
| `.cursor/rules/*.mdc`、常時適用ルール | `CLAUDE.md`、または `CLAUDE.md` が存在しない場合は `AGENTS.md`。Claude Code は `.mdc` ファイルを一切読み込みません。モデル設定ルールは例外です（「モデル」の項を参照）。 |
| `https://github.com/cursor/plugins/blob/main/pstack/<path>` | 該当ファイルが存在する場合は `<pstack>/<path>`。プラグインにはスキル、`docs/guide/`、`README.md` が同梱されています。外部からフェッチせずローカルのコピーを読み込んでください。ユーザーにリンクを示す必要がある場合のみ URL を提示してください。 |
| `~/.cursor/projects/<slug>/agent-transcripts/` 内のトランスクリプト | `~/.claude/projects/<slug>/<session>.jsonl`。スラッグはワークスペースパスの `/` と `.` をそれぞれ `-` に置換したものです（例：`/Users/you/proj` は `-Users-you-proj`）。そのフォルダ直下にある最新の `.jsonl` ファイルが現在のセッションです。`<session>/subagents/` フォルダにサブエージェントのトランスクリプトが格納されています。このワークスペースのフォルダのみを読み込んでください。 |

## Cursor 専用機能

Claude Code には Cursor Automations、Bugbot、Cursor クラウドエージェント、組み込みの PR ツールがありません。ステップでこれらが必要になった場合は、返信に `Skipped in Claude Code: <step>. <reason>.` という1行を記載し、そのまま次のステップに進んでください。停止したり、ユーザーに確認したり、リトライしたりしないでください。後のステップで、スキップしたステップの成果物（URL やキーなど）が必要になる場合は、プレースホルダーを残し、その1行の中で名前を明記してください。

| Cursor | Claude Code |
| --- | --- |
| Cursor Automations：ルーチン、`update_state` ルーチン呼び出し、`api2.cursor.sh/automations` Webhook、ルーチン起動、`SendToUser` シークレットリクエスト | 上記の1行を記載してスキップします。 |
| Bugbot | GitHub PR 上の Bugbot のコメントは通常のレビュースレッドであるため、ステップで指定されたホスティングサービスのコマンド（`gh` など）でトリアージしてください。PR に Bugbot のチェックやコメントがない場合は、Bugbot の起動・待機・設定を行うステップをスキップしてください。 |
| Cursor クラウドエージェント | 「サブエージェントのフィールド」にある通り、`environment: "cloud"` は worktree にマッピングされます。ダッシュボードのステータスや専用マシンなど、クラウドエージェント自体を必要とするステップはスキップしてください。 |
| 組み込みの PR ツール | `gh pr create` など、ステップで指定されたホスティングサービスのコマンドを使用してください。これはスキップには当たらないため、スキップ行は記載しません。 |
