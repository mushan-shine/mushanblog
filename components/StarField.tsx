"use client";
import { useEffect, useRef, useState } from "react";

const QUOTES = [
  // 一、允许、松弛与自我放过
  "慢慢来，就很快。",
  "所谓的松弛感，就是允许一切发生。",
  "别走得太快，等等你那落在后面的灵魂。",
  "允许自己不完美，是重获自由的开始。",
  "那些看似浪费的光阴，往往治愈了我们的隐性疲惫。",
  "你已经做得很好了，接下来的交给命运。",
  "最好的状态是，该努力时尽力，该摆烂时彻底。",
  "今天没有及格，但今天我很开心。",
  "允许生活有空白，别把日程表塞得太满。",
  "累了就说累了，这才是真正的勇敢。",
  "幸福不是跑得快，而是沿途的风景你都看清了。",
  "你已经走了很远的路，现在可以坐下来歇歇了。",
  "做不完的工作明天再做，可爱的落日今天不看就没了。",
  "允许生活有裂缝，因为那是光照进来的地方。",
  "走得慢的人，往往走得最远。",
  "你的价值，不取决于你有多忙碌。",
  "人生不是百米冲刺，而是一场没有终点的散步。",
  "今天的落日，是宇宙给所有疲惫人类的免费拥抱。",
  "允许一切如其所是。",
  "慢慢来，我们在时间的河流里总会相遇。",
  // 二、间歇、停顿与蓄力期
  "种子在土里要睡很久，才肯出来见太阳。",
  "所有的低谷，不过是蓄力期的另一种说法。",
  "那些在黑夜里看似停滞不前的日子，都是在扎根。",
  "别急，属于你的花期还没到。",
  "允许自己休息，是顶级自律的表现。",
  "别怕自己落后，每个人都有自己的时区。",
  "所谓的积淀，往往发生在无人问津的寂静里。",
  "现在的沉寂，是在给未来的惊艳拉长镜头。",
  "慢下来，你才能听见自己心底的声音。",
  "不必急于证明自己，时间会给所有人答案。",
  "那些没有声音的日子，是在积攒雷霆的力量。",
  "所谓的沉淀，就是把杂质放回水底。",
  "累了就去看看海，海能容纳你所有的疲惫。",
  "慢生活的真谛，是放慢脚步，加快感知。",
  "所谓的成熟，是学会了在适当的时候叫停。",
  "慢一点，让灵魂赶上你的皮囊。",
  "累了就去睡，天大的事明天再说。",
  "别跟时间赛跑，它永远是赢家，不如和它做朋友。",
  "所谓的笃定，是知道了最坏的结果也不过如此。",
  "别慌，月亮也等了很久才等来太阳。",
  // 三、日常、烟火与无用之美
  "顺其自然，是生活最顶级的智慧。",
  "好好吃饭，就是最伟大的修行。",
  "人间烟火气，最抚凡人心，别走得太快错过了饭香。",
  "所谓的精致，不是昂贵，而是对日常的敬重。",
  "那些无所事事的午后，才是人生的真正留白。",
  "允许自己在大街上漫无目的地走。",
  "那些无意义的快乐，才是最纯粹的快乐。",
  "那些在阳台上发呆的时刻，最接近神明。",
  "慢生活的艺术，在于对日常的深情。",
  "那些看似平凡的陪伴，最是深情。",
  "允许生活没有高潮，平淡就是最好的高潮。",
  "慢下来，去拥抱每一个具体的人。",
  "慢下来，去看一朵云的变化。",
  "别让忙碌，成了你逃避内心的借口。",
  "那些在书店虚度的时光，最是精神的富足。",
  "那些在深夜看书的时刻，世界只属于你。",
  "慢下来，去发现生活的小确幸。",
  "那些看似重复的日出日落，每一次都是崭新的。",
  "那些在路边看风景的时刻，你也是风景。",
  "顺其自然地活，就是对生命最大的温柔。",
  // 四、接纳、真实与内在和解
  "接纳自己的平庸，是走向不凡的第一步。",
  "允许自己有脆弱的时候，那不是软弱，是真实的证明。",
  "与自己的过去握手言和，它是你的一部分。",
  "别跟自己过不去，你已经是你所能做到的最好状态了。",
  "所谓的通透，就是看清了生活的真相后依然放得下。",
  "那些曾经让你痛苦的事情，现在可以笑着说出来了。",
  "慢慢学会原谅自己，你当时已经尽力了。",
  "所谓的温柔，是理解了世间所有不容易后的包容。",
  "别把敏感当成缺点，它是你感知世界的天赋。",
  "所谓的强大，不是能够战胜别人，而是能够接纳自己。",
  "慢一点，去拥抱那个并不完美的自己。",
  "所谓的自由，不是随心所欲，而是有说不的权利。",
  "所谓的智慧，是知道了什么时候该坚持，什么时候该放手。",
  "慢慢学会爱上自己的不完美。",
  "所谓的知足，不是没有追求，而是对当下的感恩。",
  "所谓的从容，是知道了不管发生什么，自己都能承受。",
  "所谓的格局，就是能容纳别人的不同和自己的不完美。",
  "所谓的幸福，就是内心没有恐惧，生活没有逼迫。",
  "所谓的成熟，是学会了对自己说没关系。",
  "慢慢来，一切都是最好的安排。",
  // 五、生活、热爱与时间长河
  "保持热爱，但也允许自己偶尔对生活感到失望。",
  "生活不是为了赶路，而是为了感受路上的每一个瞬间。",
  "人生是一场漫长的旅行，重要的不是目的地，而是沿途的心情。",
  "热爱生活，从好好吃一顿早餐开始。",
  "所谓的幸福，不过是当下的心安。",
  "那些被阳光照亮的平凡瞬间，就是人生的黄金时刻。",
  "慢慢走，在时间的荒野里，总会遇到属于你的温柔。",
  "所谓的浪漫，就是愿意花时间浪费在美好的事物上。",
  "慢生活不是懒惰，是对生命更高形式的尊重。",
  "所谓的人间值得，不过是那些平凡日子里的温暖瞬间。",
  "所谓的从容，是知道自己无论走得多慢，都在向阳而生。",
  "所谓的自由，是内心不再被外界的评价所左右。",
  "慢慢体会当下的每一秒，你会发现生命其实很长。",
  "慢慢找回对这个世界的好奇心，你就会永远年轻。",
  "所谓的知足常乐，是最朴素也最难得的真理。",
  "所谓的自在，是无论身处何地，心都安定。",
  "所谓的幸福，就是每天醒来，觉得日子还可以继续。",
  "慢慢来，我们在时间的河流里，终会找到自己的岸。",
  "别慌，生活没你想的那么急，放轻松，慢慢走。",
  "允许一切，接纳一切，慢慢来，就很快。",
];

const STAR_COUNT = 130;
const BAND_ANGLE = -Math.PI / 5; // 银河带倾斜方向

interface Star {
  x: number;
  y: number;
  r: number;
  base: number; // 基础亮度
  phase: number;
  speed: number;
  quote: string;
}

interface Popup {
  left: number; // 文字中心 x
  top: number;
  quote: string;
}

// 用离屏 canvas 测量文字宽度
let measureCtx: CanvasRenderingContext2D | null = null;
function measureText(text: string): number {
  if (typeof document === "undefined") return 0;
  if (!measureCtx) measureCtx = document.createElement("canvas").getContext("2d");
  if (!measureCtx) return 0;
  measureCtx.font = '14px "FangSong","STFangsong","仿宋",serif';
  return measureCtx.measureText(text).width;
}

// 近似高斯（-1.5~1.5 集中在 0 附近）
function gaussian() {
  return Math.random() + Math.random() + Math.random() - 1.5;
}

export default function StarField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [visible, setVisible] = useState(false);

  // 弹窗渐显：挂载后下一帧切到可见；约 4 秒后自动渐隐
  useEffect(() => {
    if (!popup) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), 3000);
    const unmount = setTimeout(() => setPopup(null), 3850);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
      clearTimeout(unmount);
    };
  }, [popup]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0;
    let H = 0;
    let last = 0;
    const FRAME = 1000 / 30; // 限制 ~30fps 降低重绘负担
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = W * 0.5;
      const cy = H * 0.5;
      const diag = Math.hypot(W, H);
      const stars: Star[] = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        let x: number, y: number, band: boolean;
        if (i < STAR_COUNT * 0.7) {
          // 银河带：沿倾斜线聚集，垂直方向高斯散开
          band = true;
          const along = (Math.random() - 0.5) * diag * 0.95;
          const across = gaussian() * Math.min(W, H) * 0.16;
          x = cx + Math.cos(BAND_ANGLE) * along - Math.sin(BAND_ANGLE) * across;
          y = cy + Math.sin(BAND_ANGLE) * along + Math.cos(BAND_ANGLE) * across;
        } else {
          band = false;
          x = Math.random() * W;
          y = Math.random() * H;
        }
        x = Math.max(3, Math.min(W - 3, x));
        y = Math.max(3, Math.min(H - 3, y));
        const bright = Math.random();
        stars.push({
          x,
          y,
          r: bright > 0.93 ? Math.random() * 1.4 + 1.6 : Math.random() * 1.1 + 0.5,
          base: band ? 0.5 + Math.random() * 0.5 : 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 1.4 + 0.5,
          quote: QUOTES[Math.floor(Math.random() * QUOTES.length)],
        });
      }
      starsRef.current = stars;
    };

    const drawNebula = () => {
      // 柔和的银河光带
      ctx.save();
      ctx.translate(W * 0.5, H * 0.5);
      ctx.rotate(BAND_ANGLE);
      const grad = ctx.createLinearGradient(0, -H * 0.5, 0, H * 0.5);
      grad.addColorStop(0, "rgba(180,195,255,0)");
      grad.addColorStop(0.5, "rgba(190,205,255,0.06)");
      grad.addColorStop(1, "rgba(180,195,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(-Math.hypot(W, H) / 2, -H * 0.32, Math.hypot(W, H), H * 0.64);
      ctx.restore();
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < FRAME) return;
      last = t;
      ctx.clearRect(0, 0, W, H);
      drawNebula();
      for (const s of starsRef.current) {
        const tw = 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase);
        const a = Math.min(1, s.base * tw);
        // 柔和光晕：外圈淡填充（比 shadowBlur 便宜很多）
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,215,255,${a * 0.14})`;
        ctx.fill();
        // 星芯
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
    };

    seed();
    raf = requestAnimationFrame(draw);
    const onResize = () => seed();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    let best: Star | null = null;
    let bestD = Infinity;
    for (const s of starsRef.current) {
      const d = Math.hypot(s.x - cx, s.y - cy);
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    if (best && bestD < Math.max(best.r * 6, 18)) {
      const margin = 14;
      const W = rect.width;
      const H = rect.height;
      // 文字实际宽度（不超过区域可用宽度）
      const textW = Math.min(measureText(best.quote), W - margin * 2);
      // 横向：以星星为中心，收拢到整句能完整显示的最近位置
      const minC = margin + textW / 2;
      const maxC = W - margin - textW / 2;
      const left = maxC < minC ? W / 2 : Math.min(Math.max(best.x, minC), maxC);
      // 纵向：默认星星下方；若太靠底则放到星星上方
      const top = best.y + 34 <= H ? best.y + 12 : Math.max(6, best.y - 26);
      setVisible(false);
      setPopup({ left, top, quote: best.quote });
    } else {
      close();
    }
  }

  function close() {
    setVisible(false);
    setTimeout(() => setPopup(null), 340);
  }

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "min(46%, 900px)",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ position: "absolute", inset: 0, pointerEvents: "auto", cursor: "pointer" }}
      />

      {popup && (
        <div
          onClick={close}
          style={{
            position: "absolute",
            left: `${popup.left}px`,
            top: `${popup.top}px`,
            transform: "translate(-50%, 0)",
            color: "#fff",
            fontSize: "14px",
            lineHeight: 1.5,
            fontFamily: '"FangSong", "STFangsong", "FangSong_GB2312", "仿宋", serif',
            whiteSpace: "nowrap",
            textShadow: "0 1px 6px rgba(0,0,0,0.7), 0 0 14px rgba(0,0,0,0.45)",
            pointerEvents: "auto",
            cursor: "pointer",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {popup.quote}
        </div>
      )}
    </div>
  );
}
