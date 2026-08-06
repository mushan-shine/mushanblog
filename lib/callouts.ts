// lib/callouts.ts
// 让 marked 认识 Obsidian 风味的 callout：
//   > [!abstract] 摘要
//   > 正文……
// 渲染成 <div class="callout" data-callout="abstract">…</div>，由 globals.css 上样式。
// 普通引用（不带 [!type]）仍按 blockquote 处理，不受影响。
import type { TokenizerAndRendererExtension, Tokens } from "marked";

const ICON: Record<string, string> = {
  abstract: "❖", summary: "❖", tldr: "❖",
  note: "✎", info: "ℹ", tip: "✦", hint: "✦",
  quote: "❝", cite: "❝", example: "≡",
  warning: "▲", caution: "▲", danger: "▲",
  success: "✔", question: "?", todo: "☐",
};

interface CalloutToken extends Tokens.Generic {
  type: "callout";
  ctype: string;
  title: string;
  tokens: Tokens.Generic[];
}

export const calloutExtension: TokenizerAndRendererExtension = {
  name: "callout",
  level: "block",
  start(src: string) {
    const m = src.match(/^> *\[!/m);
    return m ? m.index : undefined;
  },
  tokenizer(src: string) {
    const m = /^((?:>.*(?:\n|$))+)/.exec(src);
    if (!m) return undefined;
    const block = m[0];
    const first = block.split("\n")[0];
    const head = /^> *\[!(\w+)\][+-]? *(.*)$/.exec(first);
    if (!head) return undefined; // 不是 callout → 交回给 blockquote
    const lines = block
      .replace(/\n+$/, "")
      .split("\n")
      .map((l) => l.replace(/^>\s?/, ""));
    const body = lines.slice(1).join("\n");
    const token: CalloutToken = {
      type: "callout",
      raw: block,
      ctype: head[1].toLowerCase(),
      title: head[2].trim(),
      tokens: [],
    };
    token.tokens = this.lexer.blockTokens(body, []);
    return token;
  },
  renderer(token) {
    const t = token as CalloutToken;
    const icon = ICON[t.ctype] ?? "›";
    const inner = this.parser.parse(t.tokens);
    const head = t.title
      ? `<div class="callout-title"><span class="callout-ic">${icon}</span><span>${t.title}</span></div>`
      : "";
    return `<div class="callout" data-callout="${t.ctype}">${head}<div class="callout-content">${inner}</div></div>`;
  },
};
