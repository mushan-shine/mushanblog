"use client";
import { useEffect, useRef, useState } from "react";

// pdf.js（CDN，ESM）
const PDFJS_VER = "4.7.76";
const PDFJS_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VER}/pdf.min.mjs`;
const PDFJS_WORKER = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VER}/pdf.worker.min.mjs`;

// pdf.js 运行时最小类型（仅覆盖用到的部分）
interface PdfViewport {
  width: number;
  height: number;
}
interface PdfPage {
  getViewport: (opts: { scale: number }) => PdfViewport;
  render: (opts: { canvasContext: CanvasRenderingContext2D | null; viewport: PdfViewport }) => { promise: Promise<void> };
}
interface PdfDoc {
  numPages: number;
  getPage: (n: number) => Promise<PdfPage>;
}
interface PdfJs {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: string) => { promise: Promise<PdfDoc> };
}

export default function ArticleView({ contentHtml, pdf }: { contentHtml: string; pdf?: string }) {
  // 是否有正文（去掉标签后是否还有内容）
  const hasText = contentHtml.replace(/<[^>]*>/g, "").trim().length > 0;
  // 只有手稿时默认显示手稿
  const [view, setView] = useState<"text" | "pdf">(hasText ? "text" : "pdf");
  const [loading, setLoading] = useState(false);
  const pagesRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);
  // 用递增的"世代"号代替单一 cancelled 布尔值：
  // React 18 StrictMode 下 effect 会挂载→卸载→再挂载两次，
  // 若只用 cancelled 标记，先跑的那次可能在被取消后仍执行到
  // container.innerHTML = "" 才检测到取消，从而把后一次已经渲染好的
  // 第 1 页清掉，导致页面看起来"手稿前面部分被截断"。
  // 这里让每次 effect 运行都领取一个唯一世代号，只有当前最新世代
  // 才允许写 DOM，过期的世代在每个 await 之后立即退出、不做任何清空/写入。
  const genRef = useRef(0);

  useEffect(() => {
    if (view !== "pdf" || !pdf || renderedRef.current) return;
    const myGen = ++genRef.current;
    const isStale = () => genRef.current !== myGen;
    const container = pagesRef.current;
    if (!container) return;

    (async () => {
      try {
        setLoading(true);
        // 用 Function 包一层，绕开打包器/TS 对远程 ESM URL 的静态分析
        const dynamicImport = new Function("u", "return import(u)") as (u: string) => Promise<PdfJs>;
        const pdfjsLib = await dynamicImport(PDFJS_SRC);
        if (isStale()) return;
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        const doc = await pdfjsLib.getDocument(pdf).promise;
        if (isStale()) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        container.innerHTML = "";
        for (let i = 1; i <= doc.numPages; i++) {
          if (isStale()) return;
          const page = await doc.getPage(i);
          if (isStale()) return;
          const viewport = page.getViewport({ scale: 1.6 * dpr });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          container.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
          if (isStale()) return;
        }
        renderedRef.current = true;
      } catch {
        if (!isStale() && container) {
          container.innerHTML =
            '<p style="padding:2rem;color:#888;text-align:center;font-size:14px">手稿加载失败，可 <a href="' +
            pdf +
            '" target="_blank" style="color:#2563eb;text-decoration:underline">点此在新标签打开 PDF</a></p>';
        }
      } finally {
        if (!isStale()) setLoading(false);
      }
    })();
  }, [view, pdf]);

  return (
    <div className="mb-24">
      {pdf && hasText && (
        <div className="flex gap-2 mb-3">
          {(["text", "pdf"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
              style={{
                border: `1px solid ${view === v ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"}`,
                background: view === v ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.1)",
                color: view === v ? "#1a1a1a" : "rgba(255,255,255,0.75)",
              }}
            >
              {v === "text" ? "文字" : "手稿"}
            </button>
          ))}
        </div>
      )}

      {/* 文字视图 */}
      <article
        className="article-content"
        style={{
          display: hasText && view === "text" ? "block" : "none",
          background: "#fdfcfa",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: "16px",
          boxShadow: "0 6px 30px rgba(0,0,0,0.07)",
          padding: "clamp(28px, 5vw, 56px)",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>

      {/* PDF 手稿视图：逐页渲染为图片，像自然文档一样平铺 */}
      {pdf && (
        <div style={{ display: view === "pdf" ? "block" : "none" }}>
          {loading && (
            <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.6)", padding: "1rem" }}>
              手稿加载中…
            </p>
          )}
          <div
            ref={pagesRef}
            className="overflow-hidden"
            style={{
              background: "#fdfcfa",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: "16px",
              boxShadow: "0 6px 30px rgba(0,0,0,0.07)",
            }}
          />
        </div>
      )}
    </div>
  );
}
