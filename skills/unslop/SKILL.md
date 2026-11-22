---
name: unslop
description: あらゆる文章から AI 臭さ（AI tells）を削ぎ落とします。
disable-model-invocation: true
---

# Unslop

テキストを編集して AI パターンを取り除きます。以下のパターンをスキャンし、書き直してください。意味を保持し、意図されたトーンに合わせます。

ルール番号は他のスキルが引用する固定の ID です。削除されたルールは欠番になります。

3. 事実を付け加えない末尾の "-ing" フレーズを使わない（"highlighting..."、"ensuring..." など）。
5. 曖昧な出典を使わない（"experts believe" など）。情報源を明記するか削除する。
7. AI 語彙を使わない：additionally、crucial、delve、enhance、foster、landscape、pivotal、showcase、testament、underscore、vibrant。
8. "serves as"、"stands as"、"boasts"、"features" ではなく、"is" または "has" を使う。
9. "not just X, but Y"（X だけでなく Y も）を使わない。要点を直接述べる。
10. アイデアを無理に3つ組にまとめない。
11. 1つのものには1つの名前を使い、それを繰り返す。
12. X と Y が実際の尺度（スケール）上に並んでいない限り、"from X to Y" を使わない。
13. em ダッシュ、en ダッシュ、ダッシュ代わりのハイフンを使わず、その代わりの括弧も使わない。ピリオドまたはカンマを使う。
14. コロンはリストや例の前にのみ置き、文の途中で接続詞代わりに使わない。
15. すべての固有名詞や頭字語を太字にしない。
16. その行の内容を言い換えるだけの太字ラベルとコロンを使わない（"**Performance:** Performance improved..." など）。ピリオドで終わり新しい詳細を追加する太字の導入句であれば問題ない。
17. 見出しは文頭大文字（sentence case）にする。
18. 装飾目的の絵文字を使わない。
19. ストレートクォート（`"` や `'`）を使う。
20. チャットボット特有のフレーズを使わない（"I hope this helps!"、"Let me know if..." など）。
22. 賞賛や同意の前置きを使わない。直接応答する。
23. 埋め草（filler）を削る。"In order to" は "to" にする。"it is important to note that" は削除する。
24. 留保表現（hedge）は多くても "may" 1つまでにする。
25. 汎用的な結論を書かない。具体的な計画や事実を述べる。
26. 抽象的な比喩名詞（substrate、wedge、vector、nexus、primitive、harness、surface、scaffolding、paradigm、ratchet、north star、flywheel）を使わず、具体的な言葉を使う。
27. どう感じるかではなく、何をするかを述べる。メカニズムや数値を明記し、他のプロジェクトのドキュメントにそのまま載せられそうな文は削る。
28. 1文につき1アイデアとする。読み返さなければならない文は分割する。
29. 能動態を使う。行為者が不明または重要でない場合を除き、行為者を明記する。
30. 副詞を削るか、より強い動詞を使う。数値を示す。
31. 平易な言葉を使う："utilize" や "leverage" ではなく "use" を使う。
32. 文字通りの表現が存在する場所では、比喩、格言、コードの擬人化、比喩的な動詞を使わない。
33. 冠詞と動詞を備えた完全な文を書く。矢印や略語はスペルアウトする。
