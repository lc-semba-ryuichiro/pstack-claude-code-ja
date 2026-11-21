# Render a chart

表示する各 `.mmd` ファイルを npm パッケージ `pele@1.9.0` でレンダリングし、ユーザーに SVG を渡します。Pele はリポジトリ外に一度だけインストールします。各 SVG は対応する `.mmd` ファイルの隣に同じ名前で書き出します。API は https://pele.run/api にあります。`render` のオプションには `{ limit: 1_000_000, outputLimit: 8_000_000, maxEdges: 10_000 }` を渡してください（Pele のデフォルト値は 500 状態のチャートに対して小さすぎます）。Pele が `PeleError` をスローした場合は、Mermaid テキストとエラー内容をユーザーに提示します。

## 配色

Pele は Mermaid の `theme` と `themeVariables` を無視します。`.pele` に対して `--pele-*` CSS 変数を設定してください（一覧は https://pele.run/theming にあります）。コマンドは各状態にそのグループのカラークラス（例: `class sN teal`）を付与します。また、不正な状態には `class sN breaks` または `class sN mayBreak` を、バグへの最短パス上の各状態には `class sN bugPath` を、PROPERTY の反例が無限に繰り返す各状態には `class sN repeats` をマークします。Pele はこれらのクラスを状態のノードに付与するため、CSS で各クラスに色を付けます。

`.mmd` ファイルには、任意の Mermaid ビューアーでバグマークが表示されるよう `breaks` と `mayBreak` の `classDef` 行が含まれていますが、グループカラー、`bugPath`、`repeats` の `classDef` はありません。Pele は各 `classDef` の色をノードの `style` 属性として書き出すため、`style` 属性が通常の CSS ルールに勝ってしまいます。そのため、以下のマーク用ルールでは `!important` を使用します。これがないと、ダークテーマでもライトテーマのマーク色が残ってしまいます。バグマークは塗りつぶし（fill）とテキスト色を設定し、`bugPath` と `repeats` は枠線（border）を設定します。マークがグループカラーの上に表示されるよう、グループカラーの後にマークのルールを配置してください。

以下の色は推奨設定（旧スキルのカラー）です。各 SVG の先頭にある `<style>` 要素内に配置してください。これにより、各 SVG がビューアーのライト／ダーク設定に追従するようになります。

```css
.pele {
  --pele-bg: #ffffff;
  --pele-fg: #1c1c1c;
  --pele-muted: #656565;
  --pele-line: #808080;
  --pele-surface: #fcfcfc;
  --pele-surface-alt: #f1f1f1;
  --pele-border: #c9c9c9;
}
.pele .blue rect { fill: #c3e0ff; }
.pele .orange rect { fill: #f0d3bf; }
.pele .purple rect { fill: #e3d5ff; }
.pele .yellow rect { fill: #f0dcbf; }
.pele .teal rect { fill: #bfe3df; }
.pele .tan rect { fill: #e5d9ce; }
.pele .pink rect { fill: #ffcbe6; }
.pele .breaks rect {
  fill: #ffecee !important;
  stroke: #e72e3b !important;
  stroke-width: 2.5px !important;
}
.pele .breaks text {
  fill: #cd2834 !important;
}
.pele .mayBreak rect {
  fill: #fff3e6 !important;
  stroke: #e8730c !important;
  stroke-width: 2.5px !important;
}
.pele .mayBreak text {
  fill: #b85a06 !important;
}
.pele .bugPath rect {
  stroke: #1680f3 !important;
  stroke-width: 2.5px !important;
}
.pele .repeats rect {
  stroke: #9b35d6 !important;
  stroke-width: 2.5px !important;
  stroke-dasharray: 6 3;
}
@media (prefers-color-scheme: dark) {
  .pele {
    --pele-bg: #1f1f1f;
    --pele-fg: #f5f5f5;
    --pele-muted: #acacac;
    --pele-line: #939393;
    --pele-surface: #121212;
    --pele-surface-alt: #2c2c2c;
    --pele-border: #4e4e4e;
  }
  .pele .blue rect { fill: #1b3857; }
  .pele .orange rect { fill: #573117; }
  .pele .purple rect { fill: #3c2e57; }
  .pele .yellow rect { fill: #573d17; }
  .pele .teal rect { fill: #174641; }
  .pele .tan rect { fill: #3d3127; }
  .pele .pink rect { fill: #57233e; }
  .pele .breaks rect {
    fill: #2e2021 !important;
    stroke: #cf2b35 !important;
  }
  .pele .breaks text {
    fill: #ff6463 !important;
  }
  .pele .mayBreak rect {
    fill: #2e2619 !important;
    stroke: #d0700f !important;
  }
  .pele .mayBreak text {
    fill: #ffa257 !important;
  }
  .pele .bugPath rect {
    stroke: #116dd2 !important;
  }
  .pele .repeats rect {
    stroke: #9a3fcf !important;
  }
}
```
