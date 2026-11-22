#!/usr/bin/env node

import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PSTACK = join(ROOT, "pstack");
const SKILLS = join(PSTACK, "skills");
// Outside pstack/ so Cursor, which copies the whole plugin folder, does not install this tree too.
const OUT = join(ROOT, "harness", "pstack");
const TREE = "claude-code";
const GUIDE = "docs/guide";
const MANIFESTS = ["plugin.json", ".claude-plugin/plugin.json"];
const COMMAND = "node scripts/generate-pstack-harness-trees.mjs";
const GITHUB = "https://github.com/cursor/plugins";
const LINK = /\]\(([^)\s]+)\)/g;
const README = `# pstack harness tree

このフォルダは、\`pstack/skills\`、\`pstack/agents\`、\`pstack/${GUIDE}\`、\`pstack/README.md\`、\`pstack/LICENSE\`、および \`pstack/plugin.json\` から自動生成されています。手動で編集しないでください。

Claude Code は \`${TREE}/\` をインストールします。このツリーでは、\`pstack/automations\` や \`pstack/assets\` など、\`pstack/\` 内のその他のディレクトリは除外されています。ツリーから除外された pstack 内のファイルへの相対リンクは、代わりに GitHub の \`main\` ブランチ上の該当ファイルを指すようになっています。

上記のソースファイルを編集した後は、リポジトリのルートディレクトリから \`${COMMAND}\` を実行し、生成された結果をコミットしてください。
`;

// pstack/ は Claude Code 専用に書き換えてあるので、本家からのマージで Cursor 固有の名前が戻ってきたら止める。
// Bugbot は GitHub PR 上のレビューコメントとして Claude Code でも扱うので、ここには入れない。
const CURSOR_NAMES = [
  { name: "Task ツール", re: /`Task`|\bTask (tool|subagent|call)|Task ?(ツール|サブエージェント|呼び出し)/ },
  { name: "AskQuestion", re: /\bAskQuestion\b/ },
  { name: "generalPurpose", re: /generalPurpose/ },
  { name: "readonly", re: /readonly: (true|false)|readonly\/Ask/ },
  { name: "environment", re: /environment: "(cloud|local)"|cloud_base_branch/ },
  { name: "run_in_background", re: /run_in_background/ },
  { name: "file_attachments", re: /file_attachments/ },
  { name: "Cursor のモデルスラッグ", re: /\bclaude-[a-z]+-\d|\bgrok-\d|\bgpt-\d|\bgemini-\d/ },
  { name: "Cursor のパス", re: /\.cursor\/|\.cursor-plugin|\.mdc\b|agent-transcripts/ },
  { name: "Cursor Automations", re: /update_state|SendToUser|cursor\.(sh|com)|Cursor [Aa]utomation/ },
  { name: "Cursor のクラウドエージェント", re: /[Cc]loud [Aa]gent|クラウド(サブ)?エージェント/ },
  { name: "Cursor 組み込み機能", re: /Cursor (の)?組み込み|Cursor 標準|Cursor の (Plan|プラン)/ },
];
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (name === ".DS_Store" || name === "node_modules") return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function file(path) {
  return { bytes: readFileSync(path), executable: (statSync(path).mode & 0o111) !== 0 };
}

const skills = readdirSync(SKILLS).filter((name) => existsSync(join(SKILLS, name, "SKILL.md")));

const problems = [];
for (const skill of skills) {
  // Cursor runs a skill by its folder name and Claude Code lists it by its frontmatter `name`, so the two must match. The Agent Skills spec limits both to SKILL_NAME.
  const frontmatter = readFileSync(join(SKILLS, skill, "SKILL.md"), "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const name = frontmatter.match(/^name:(.*)$/m)?.[1].trim().replace(/^(["'])(.*)\1$/, "$2");
  if (name !== skill) problems.push(`skills/${skill}/SKILL.md has name ${JSON.stringify(name ?? "")}, not its folder name ${skill}`);
  if (!SKILL_NAME.test(skill) || skill.length > 64) problems.push(`skills/${skill} is not lowercase words joined by hyphens, at most 64 characters`);
}
// 大半の pstack スキルは disable-model-invocation: true で Skill ツールから呼べないため、別スキルへの指示は SKILL.md へのリンクにして Read させる。
// 原則スキルは「**x** 原則スキル」と、フォルダ名から principle- を除いた名前で呼ばれることが多い。
const principles = skills.filter((name) => name.startsWith("principle-")).map((name) => name.slice("principle-".length));
const others = [...skills, ...principles].join("|");
const bareSkill = new RegExp(`(?<!\\[)\\*\\*(${others})\\*\\* ?(原則)?スキル(?!\\]\\()`, "g");
const scanned = [...walk(SKILLS), ...walk(join(PSTACK, "agents")), ...walk(join(PSTACK, GUIDE)), join(PSTACK, "README.md")];
for (const path of scanned.filter((path) => /\.(md|sh)$/.test(path))) {
  const rel = relative(PSTACK, path);
  const lines = readFileSync(path, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const { name, re } of CURSOR_NAMES) if (re.test(line)) problems.push(`${rel}:${index + 1} names ${name}, which Claude Code does not have`);
    if (!rel.startsWith("skills/") && !rel.startsWith("agents/")) return;
    const self = rel.match(/^skills\/([^/]+)\//)?.[1];
    for (const { 1: named } of line.matchAll(bareSkill)) {
      const skill = skills.includes(named) ? named : `principle-${named}`;
      if (skill !== self && !line.includes(`${skill}/SKILL.md)`)) problems.push(`${rel}:${index + 1} names the ${skill} skill without linking its SKILL.md`);
    }
  });
}
for (const problem of problems) console.log(`FAIL ${problem}`);
if (problems.length > 0) process.exit(1);

// The pstack-relative path that a relative link in `from` points at, if that path exists.
function resolve(from, href) {
  const target = href.replace(/[#?].*/, "");
  if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) return undefined;
  const path = posix.join(posix.dirname(from), target).replace(/\/$/, "");
  return existsSync(join(PSTACK, path)) ? path : undefined;
}

function has(files, path) {
  return files.has(path) || [...files.keys()].some((key) => key.startsWith(`${path}/`));
}

function render() {
  // Skills read the guide and the README at runtime, so Claude Code never fetches them.
  const copies = [
    ...walk(SKILLS),
    ...walk(join(PSTACK, "agents")),
    ...walk(join(PSTACK, GUIDE)),
    join(PSTACK, "README.md"),
  ];
  const files = new Map(copies.map((path) => [relative(PSTACK, path), file(path)]));
  files.set("LICENSE", file(join(PSTACK, "LICENSE")));
  for (const manifest of MANIFESTS) files.set(manifest, file(join(PSTACK, "plugin.json")));
  for (const [path, entry] of files) {
    if (!path.endsWith(".md")) continue;
    const text = entry.bytes.toString("utf8").replace(LINK, (link, href) => {
      const target = resolve(path, href);
      if (!target || target.split("/")[0] === ".." || has(files, target)) return link;
      const kind = statSync(join(PSTACK, target)).isDirectory() ? "tree" : "blob";
      return `](${GITHUB}/${kind}/main/pstack/${target}${href.slice(href.search(/[#?]|$/))})`;
    });
    entry.bytes = Buffer.from(text);
  }
  return files;
}

// Claude Code installs only the tree, so a relative link that works from pstack/ has to work inside the tree too.
// Links to pstack files that the tree leaves out already point at GitHub, so a failure here is a link that leaves pstack/.
const files = render();
const rendered = new Map([["README.md", { bytes: Buffer.from(README), executable: false }]]);
const dangling = [];
for (const [path, entry] of files) {
  rendered.set(`${TREE}/${path}`, entry);
  if (!path.endsWith(".md")) continue;
  for (const [, href] of entry.bytes.toString("utf8").matchAll(LINK)) {
    const target = resolve(path, href);
    if (target && !has(files, target)) dangling.push(`harness/pstack/${TREE}/${path} links to ${href}, which is not in the tree`);
  }
}
for (const link of dangling) console.log(`FAIL ${link}`);
if (dangling.length > 0) process.exit(1);

if (process.argv.includes("--check")) {
  const onDisk = new Map(existsSync(OUT) ? walk(OUT).map((path) => [relative(OUT, path), file(path)]) : []);
  const drifted = [...new Set([...rendered.keys(), ...onDisk.keys()])].sort().filter((path) => {
    const [want, have] = [rendered.get(path), onDisk.get(path)];
    return !want || !have || !want.bytes.equals(have.bytes) || want.executable !== have.executable;
  });
  for (const path of drifted.slice(0, 20)) console.log(`harness/pstack/${path}`);
  if (drifted.length > 0) {
    console.log(`harness/pstack is out of date. Run \`${COMMAND}\` and commit the result.`);
    process.exit(1);
  }
  console.log("harness/pstack is up to date.");
} else {
  rmSync(OUT, { recursive: true, force: true });
  for (const [path, { bytes, executable }] of rendered) {
    mkdirSync(dirname(join(OUT, path)), { recursive: true });
    writeFileSync(join(OUT, path), bytes);
    chmodSync(join(OUT, path), executable ? 0o755 : 0o644);
  }
  console.log(`${skills.length} skills`);
}
