# ノートの作成

「ノートの作成」機能では、ブラウザまたは CLI からタイトル付きのノートを保存したり、作成途中の下書きを破棄したり、別のユーザー向け画面から保存済みのノートを確認したりできます。

## Sub-features

- `create-open`：ブラウザ上の各エントリーポイントから空のエディタを開きます。
- `create-save`：タイトルと本文を永続化（保存）します。
- `create-cancel`：ブラウザ上の作成途中の下書きを破棄します。
- `create-cli`：ターミナルから同じデータ構造のノートを作成します。

## How to get to it (user POV)

- ブラウザのツールバーにある `New note` ボタンを選択します。
- ブラウザ上で、入力可能なフィールド以外にフォーカスがある状態で `n` キーを押します。
- ターミナルで `notes create --title <title> --body <body>` を実行します。

## Driving it with control-notes

Preconditions:

- Notes アプリが `http://127.0.0.1:4173` で正常に稼働していること。
- `Release checklist` というタイトルのノートが存在しないこと。
- `control-notes doctor` が想定通りの URL と使い捨て用データディレクトリを報告すること。

- **エディタを開く。** `New note` を選択します。`control-notes browser click --role button --name "New note"` を実行すると、`Note editor` という名前のフォームが表示され、`Title` テキストボックスにフォーカスが当たります。
- **内容を入力する。** タイトルと本文を入力します。`control-notes browser fill --role textbox --name "Title" --value "Release checklist"` と `control-notes browser fill --role textbox --name "Body" --value "Tag and publish"` を実行すると、`Save note` ボタンが有効化されます。
- **ノートを保存する。** `Save note` を選択します。`control-notes browser click --role button --name "Save note"` を実行すると、`Note saved` というステータスが表示され、見出しが `Release checklist` になります。
- **永続化を確認する。** ノート一覧に戻り、保存したノートを再度開きます。`control-notes browser click --role link --name "All notes"` と `control-notes browser click --role link --name "Release checklist"` を実行すると、エディタ上に保存したタイトルと本文の両方が表示されます。
- **下書きをキャンセルする。** 新規ノートを開いて `Discard me` と入力し、`Cancel` を選択します。`control-notes browser click --role button --name "New note"`、`control-notes browser fill --role textbox --name "Title" --value "Discard me"`、`control-notes browser click --role button --name "Cancel"` を順に実行すると、ノート一覧画面に戻り、`Discard me` へのリンクが存在しないことが確認できます。
- **CLI からの登録。** 2つ目のノートを作成します。`control-notes cli -- notes create --title "CLI note" --body "Created from terminal" --format json` を実行すると、終了コード `0` で完了し、標準出力（stdout）に新しいノートの ID とタイトルが含まれます。
- **証拠の取得。** `All notes` から保存した2つのノートを両方開き直します。`control-notes browser snapshot --aria --path artifacts/create-note/list.aria.txt` と `control-notes browser screenshot --path artifacts/create-note/list.png` を実行すると、生成されたアーティファクトに `Release checklist` と `CLI note` が記録されます。

## Gotchas

- テキストボックスにフォーカスがある状態で `n` を押すと、新規エディタは開かず、単に文字として `n` が入力されます。
- タイトルは保存時に前後の空白がトリムされます。下書きの入力値ではなく、実際にレンダリングされたタイトルに対してアサートを行ってください。
- 保存完了のステータス表示だけでは十分な証拠になりません。必ず一覧画面からノートを開き直して確認してください。
- フィクスチャのクリーンアップ時には `Release checklist` と `CLI note` のデータを削除しますが、検証の証拠アーティファクト自体は削除せず残しておいてください。
