import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowIcon } from "./icons";

const HOLD_MS = 3800;
const EASE = [0.16, 1, 0.3, 1] as const;

type Floater = {
  src: string;
  className: string;
  layer: "back" | "front";
  depth: number;
  delay: number;
};

function extractCorners(src: string): Floater[] {
  return [
    { src, className: "left-[2%] top-[10%] w-[min(20vw,168px)]", layer: "back", depth: 12, delay: 0.15 },
    { src, className: "right-[2%] top-[12%] w-[min(16vw,136px)] rotate-6", layer: "back", depth: 14, delay: 0.4 },
    { src, className: "left-[5%] bottom-[14%] w-[min(17vw,140px)] -rotate-8", layer: "front", depth: 22, delay: 0.7 },
  ];
}

const VARIANTS = [
  {
    id: "charcoal",
    src: "/product-handwash-charcoal.webp?v=2",
    name: "Charcoal",
    line: "Charcoal Hand Wash",
    word: "DETOX",
    slogan: "Magnetic Purity.",
    description:
      "Draw out the unseen. A deep, unapologetic cleanse with the raw power of activated charcoal.",
    bg: "#3D4450",
    ink: "#F4F1EA",
    cta: "#F4F1EA",
    ctaInk: "#2C3138",
    floats: [
      {
        src: "/charcoal-rocks.webp",
        className: "left-[-1%] top-[6%] w-[min(28vw,260px)]",
        layer: "back",
        depth: 10,
        delay: 0.12,
      },
      {
        src: "/charcoal-rocks.webp",
        className: "right-[-2%] top-[8%] w-[min(24vw,230px)] -scale-x-100",
        layer: "back",
        depth: 12,
        delay: 0.35,
      },
    ],
  },
  {
    id: "toilet",
    src: "/product-toilet.webp",
    name: "Toilet",
    line: "Powerful Toilet Cleaner",
    word: "POWER",
    slogan: "10X The Clean.",
    description: "Removes tough stains with a fresh fragrance. Deep cleaning that holds.",
    bg: "#1A3F7A",
    ink: "#F4F7FC",
    cta: "#F4F7FC",
    ctaInk: "#1A3F7A",
    floats: [
      {
        src: "/mint-toilet.webp",
        className: "left-[-1%] top-[10%] w-[min(26vw,240px)]",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/mint-toilet.webp",
        className: "right-[-2%] top-[12%] w-[min(22vw,210px)] -scale-x-100 rotate-6",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
  {
    id: "bathroom",
    src: "/product-bathroom.webp",
    name: "Bathroom",
    line: "Disinfectant Bathroom Cleaner",
    word: "FRESH",
    slogan: "Tiles That Gleam.",
    description: "10X better cleaning for sinks, tiles and fittings. 99.9% germs gone.",
    bg: "#6E1010",
    ink: "#FFF5F5",
    cta: "#FFF5F5",
    ctaInk: "#6E1010",
    floats: [
      {
        src: "/bathroom-flower.webp",
        className: "left-[-2%] top-[8%] w-[min(28vw,260px)]",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/bathroom-flower.webp",
        className: "right-[-2%] top-[10%] w-[min(26vw,240px)] -scale-x-100 rotate-6",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
  {
    id: "dish",
    src: "/product-dish.webp",
    name: "Dish",
    line: "Dish Wash Liquid",
    word: "LEMON",
    slogan: "Grease, Gone.",
    description: "Tough on grease, gentle on hands, with a fresh lemon fragrance.",
    bg: "#C4A000",
    ink: "#1C1408",
    cta: "#1C1408",
    ctaInk: "#F5C400",
    floats: [
      {
        src: "/lemon-dish.webp",
        className: "left-[-1%] top-[10%] w-[min(26vw,240px)]",
        layer: "back",
        depth: 12,
        delay: 0.12,
      },
      {
        src: "/lemon-dish.webp",
        className: "right-[-2%] top-[14%] w-[min(22vw,210px)] -scale-x-100 rotate-6",
        layer: "back",
        depth: 14,
        delay: 0.35,
      },
    ],
  },
] as const;

function StageFloat({
  item,
  index,
  px,
  py,
  reduce,
}: {
  item: Floater;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduce: boolean | null;
}) {
  const x = useTransform(px, [-0.5, 0.5], [-item.depth, item.depth]);
  const y = useTransform(py, [-0.5, 0.5], [-item.depth * 0.55, item.depth * 0.55]);

  return (
    <motion.div
      className={`absolute ${item.className}`}
      style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.08 * index, duration: 0.5, ease: EASE }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, item.layer === "front" ? -14 : -8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 5.2 + index * 0.35, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src={item.src}
          alt=""
          width={220}
          height={220}
          className="h-auto w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.28)]"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = VARIANTS[index];
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  useEffect(() => {
    document.documentElement.dataset.hero = slide.id;
    return () => {
      delete document.documentElement.dataset.hero;
    };
  }, [slide.id]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (event: PointerEvent) => {
      px.set(event.clientX / window.innerWidth - 0.5);
      py.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % VARIANTS.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [index, reduce]);

  const back = slide.floats.filter((item) => item.layer === "back");
  const front = slide.floats.filter((item) => item.layer === "front");
  const wordSize =
    slide.word.length > 6
      ? "clamp(3.4rem, 12vw, 12rem)"
      : "clamp(4.2rem, 15vw, 15rem)";

  return (
    <motion.section
      className="relative isolate h-dvh min-h-[640px] overflow-hidden"
      animate={{ backgroundColor: slide.bg }}
      transition={{ duration: reduce ? 0 : 0.75, ease: EASE }}
      aria-label="Aura Clean collection"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 18% 8%, rgba(255,255,255,0.2), transparent 58%), radial-gradient(ellipse 70% 50% at 50% 108%, rgba(0,0,0,0.22), transparent 60%)",
            }}
          />

          <p
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center font-display font-black uppercase leading-none tracking-[-0.06em] whitespace-nowrap"
            style={{ color: slide.ink, fontSize: wordSize }}
          >
            {slide.word}
          </p>

          <div className="pointer-events-none absolute inset-0 z-[12] hidden md:block">
            {back.map((item, i) => (
              <StageFloat key={`${slide.id}-b-${i}`} item={item} index={i} px={px} py={py} reduce={reduce} />
            ))}
          </div>

          <div className="absolute inset-0 z-20 grid place-items-center px-[clamp(1rem,4vw,3rem)]">
            <motion.img
              src={slide.src}
              alt={slide.line}
              width={480}
              height={960}
              className="hero-bottle"
              style={{ filter: "drop-shadow(0 32px 36px rgba(0,0,0,0.38))" }}
              animate={reduce ? undefined : { y: [0, -16, 0] }}
              transition={reduce ? undefined : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
            {front.map((item, i) => (
              <StageFloat key={`${slide.id}-f-${i}`} item={item} index={i + 3} px={px} py={py} reduce={reduce} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-[7.4rem] left-0 z-40 w-full max-w-[34rem] px-[clamp(1rem,4.5vw,4.5rem)] lg:bottom-[5.6rem]">
        <div className="relative min-h-[13.8rem]">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              style={{ color: slide.ink }}
            >
              <p className="m-0 text-[0.7rem] font-extrabold uppercase tracking-[0.28em] opacity-55">
                {slide.line}
              </p>
              <h1 className="mt-2 max-w-[14ch] font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-black leading-[0.92] tracking-[-0.04em]">
                {slide.slogan}
              </h1>
              <p className="mt-3 m-0 max-w-[36ch] text-[0.98rem] leading-relaxed opacity-75">
                {slide.description}
              </p>
              <Link
                to="/product"
                className="mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-full px-7 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ background: slide.cta, color: slide.ctaInk }}
              >
                Shop Now
                <span
                  className="grid size-7 place-items-center rounded-full"
                  style={{ background: "color-mix(in srgb, currentColor 16%, transparent)" }}
                  aria-hidden="true"
                >
                  <ArrowIcon className="size-4" />
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 flex justify-end px-[clamp(1rem,4.5vw,4.5rem)] pb-[max(1.1rem,env(safe-area-inset-bottom))]">
        <div
          className="flex max-w-[min(100%,42rem)] flex-wrap justify-end gap-1.5"
          role="tablist"
          aria-label="Aura Clean products"
        >
          {VARIANTS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={item.line}
              onClick={() => setIndex(i)}
              className="h-10 min-w-10 cursor-pointer rounded-full px-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3"
              style={{
                color: slide.ink,
                background: i === index ? "color-mix(in srgb, currentColor 14%, transparent)" : "transparent",
                boxShadow:
                  i === index
                    ? `inset 0 0 0 2px ${slide.ink}`
                    : `inset 0 0 0 1px color-mix(in srgb, ${slide.ink} 35%, transparent)`,
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={index}
        className="absolute bottom-0 left-0 z-50 h-[3px] origin-left"
        style={{ background: slide.ink }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: reduce ? 0 : 1 }}
        transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
      />
    </motion.section>
  );
}
