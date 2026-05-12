import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import before from "@/assets/forest-before.jpg";
import after from "@/assets/deforested.jpg";

export const Route = createFileRoute("/deforestation")({
  head: () => ({
    meta: [
      { title: "Вырубка лесов — SabzTajik" },
      { name: "description", content: "Исчезновение лесов Таджикистана: до и после, статистика и климатические последствия." },
    ],
  }),
  component: DeforestationPage,
});

const stats = [
  { v: "≈3%", l: "Площадь страны под лесом" },
  { v: "−30%", l: "Потеряно с 1990 года" },
  { v: "+1.2°C", l: "Рост средней температуры" },
  { v: "70%", l: "Доля дров в отоплении сёл" },
];

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden glass select-none">
      <img src={after} alt="После вырубки" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="До вырубки" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} loading="lazy" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-foreground/80 cursor-ew-resize"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center h-10 w-10 rounded-full glass text-xs">⇄</div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Сравнение до и после"
      />
      <div className="absolute top-3 left-3 text-xs uppercase tracking-widest glass px-3 py-1 rounded-full">До</div>
      <div className="absolute top-3 right-3 text-xs uppercase tracking-widest glass px-3 py-1 rounded-full">После</div>
    </div>
  );
}

function DeforestationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <header className="text-center pt-8 pb-12">
        <p className="text-xs uppercase tracking-widest text-primary">Раздел 02</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-display">Вырубка лесов</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Перетащите ползунок и увидите, как меняется горный склон, когда исчезают деревья.
        </p>
      </header>

      <BeforeAfter />

      <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5"
          >
            <div className="text-3xl md:text-4xl font-display text-gradient">{s.v}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-5">
        {[
          { t: "Эрозия почв", d: "Без корней деревьев горные склоны размываются дождями, питательный слой смывается в реки." },
          { t: "Изменение климата", d: "Сокращение лесов уменьшает поглощение CO₂ и нарушает региональный круговорот воды." },
          { t: "Потеря домов", d: "Снежный барс, бурый медведь и сотни птиц теряют места обитания вместе с лесом." },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="text-xl font-display">{c.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
