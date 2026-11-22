# ノートの検索

「ノートの検索」機能では、タイトルや本文のテキストからノートを検索したり、ヒットしたノートの中身を確認したりできるほか、「一致するノートがない状態」と「検索機能自体が利用できない状態」を明確に区別できます。

## Sub-features

- `search-open`：ブラウザ上の各エントリーポイントから検索画面を開きます。
- `search-match`：ノートデータを一切変更することなく、タイトルおよび本文の一致結果を返します。
- `search-open-result`：検索結果をノートエディタで開きます。
- `search-empty`：一致する結果がないクエリに対して、適切な空状態（エンプティステート）を表示します。
- `search-clear`：検索クエリをクリアし、最近のノート一覧表示に戻します。
- `search-cli`：ターミナルから同じ一致条件のノートを返します。

## How to get to it (user POV)

- ブラウザのツールバーにある `Search` ボタンを選択します。
- ブラウザ上で、入力可能なフィールド以外にフォーカスがある状態で `/` キーを押します。
- ターミナルで `notes search <query>` を実行します。

## Driving it with control-notes

Preconditions:

- Notes アプリが `http://127.0.0.1:4173` で正常に稼働していること。
- 使い捨て用データディレクトリ内に、本文に `Draft budget` を含む `Quarterly plan` というノートが存在すること。
- `control-notes doctor` が想定通りの URL とデータディレクトリを報告すること。

- **ツールバーからの起動。** `Search` ボタンを選択します。`control-notes browser click --role button --name "Search"` を実行すると、`Search notes` という名前のダイアログが表示され、その中の検索ボックスにフォーカスが当たります。
- **キーボードからの起動。** ダイアログを閉じ、ページ本体にフォーカスを当てて `/` を押します。`control-notes browser press --key "/"` を実行すると、同じダイアログが表示され、ページ内にスラッシュ文字は入力されません。
- **タイトルでの検索一致。** `quarterly` と入力します。`control-notes browser fill --role searchbox --name "Search notes" --value "quarterly"` を実行すると、`Search results` リストに `Quarterly plan` が含まれ、`Grocery list` は含まれない状態になります。
- **本文での検索一致。** 検索クエリを `budget` に書き換えます。`control-notes browser fill --role searchbox --name "Search notes" --value "budget"` を実行すると、検索結果に `Quarterly plan` が引き続き表示され、本文の一致箇所の抜粋が添えられます。
- **検索結果を開く。** `Quarterly plan` を選択します。`control-notes browser click --role link --name "Quarterly plan"` を実行すると、ダイアログが閉じ、エディタの見出しが `Quarterly plan` になります。
- **空状態（ヒットなし）の確認。** 再度検索ダイアログを開いて `volcano` と入力します。`control-notes browser fill --role searchbox --name "Search notes" --value "volcano"` を実行すると、検索完了後に `No matching notes` というステータスが表示されます。
- **クエリのクリア。** `Clear search` を選択します。`control-notes browser click --role button --name "Clear search"` を実行すると、検索ボックスが空になり、結果リストの代わりに `Recent notes` 領域が表示されます。
- **CLI での検索一致。** ターミナルから検索を実行します。`control-notes cli -- notes search "quarterly" --format json` を実行すると、終了コード `0` で完了し、標準出力（stdout）にタイトルが `Quarterly plan` であるオブジェクトが 1 件含まれます。
- **CLI でのヒットなし。** 存在しないキーワードで検索します。`control-notes cli -- notes search "volcano" --format json` を実行すると、終了コード `0` で完了し、標準出力（stdout）に `[]` が出力されます。
- **証拠の取得。** 検索結果が表示された状態をキャプチャします。`control-notes browser snapshot --aria --path artifacts/search/results.aria.txt` と `control-notes browser screenshot --path artifacts/search/results.png` を実行すると、生成された両方のアーティファクトに Notes アプリの識別情報、検索クエリ、および `Quarterly plan` が記録されます。

## Gotchas

- エディタや検索ボックスにフォーカスがある状態で `/` を押すと、検索画面は開かず、単に文字として `/` が入力されます。
- 検索結果は短いデバウンス処理の後に更新されます。固定時間でのスリープではなく、結果リストまたは空状態のステータスが表示されるまで待機してください。
- ユーザーが `Include archived` を有効にしない限り、アーカイブ済みのノートは検索結果から除外されます。
- CLI のデフォルト出力は人間が読みやすいテキスト形式です。安定したアサーションを行うには `--format json` を使用してください。
- 検索結果を開くとブラウザの状態が変化します。別のクエリを検証する前には、必ず検索画面を開き直してください。
