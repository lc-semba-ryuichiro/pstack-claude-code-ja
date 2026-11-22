# pstack 日本語版（Claude Code 専用）

> [!NOTE]
> このリポジトリは、[cursor/plugins](https://github.com/cursor/plugins) に含まれる `pstack` を日本語に訳した**非公式**の翻訳版です。Cursor／Anysphere とは関係ありません。著作権表示とライセンス文は [`pstack/LICENSE`](pstack/LICENSE) に原文のまま残しています。

pstack は Cursor 向けに書かれたスキル集ですが、このリポジトリでは Claude Code 専用に書き換えてあります。スキルの本文は Claude Code のツール名・パス・モデル指定で直接書かれており、Cursor では正しく動きません。pstack 以外のプラグインは含まれていません。

## インストール

Claude Code で次を実行します。

```text
/plugin marketplace add lc-semba-ryuichiro/pstack-claude-code-ja
/plugin install pstack@pstack-claude-code-ja
```

使い方は [pstack/README.md](pstack/README.md) と [ガイド](pstack/docs/guide/README.md) を参照してください。

## リポジトリの構成

```text
├── .claude-plugin/
│   └── marketplace.json       # Claude Code のマーケットプレイス（pstack のみ）
└── pstack/                    # Claude Code がそのままインストールするプラグイン
    ├── .claude-plugin/
    │   └── plugin.json        # プラグインのマニフェスト
    ├── skills/
    ├── agents/
    └── docs/guide/
```

## 本家の更新を取り込む

本家の main をマージし、このリポジトリにないパスへの変更は削除します。

```bash
git remote add upstream https://github.com/cursor/plugins.git
```

```bash
git fetch upstream && git merge --no-commit upstream/main
```

`pstack/` の衝突は、英語の原文と訳文がぶつかったものです。本家の変更を訳したうえで、手で解決します。そのとき、Cursor 固有の名前は Claude Code の名前に置き換えてください。`README.md` と `.claude-plugin/marketplace.json` は、このリポジトリの内容を残します。

## ライセンス

MIT（著作権表示とライセンス文は [`pstack/LICENSE`](pstack/LICENSE) を参照してください）
