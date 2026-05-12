import { createFileRoute, Link } from "@tanstack/react-router";
import { TajikistanMap3D } from "@/components/TajikistanMap3D";
import { motion } from "framer-motion";
import { ArrowRight, Mountain, Trees, PawPrint, Wind } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SabzTajik — Экология Таджикистана в 3D" },
      { name: "description", content: "Интерактивная 3D-карта природы Таджикистана: горы, леса, реки и экологические вызовы." },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "3%", l: "Лесной покров страны" },
  { v: "−30%", l: "Сокращение лесов с 1990" },
  { v: "≈226", l: "Видов под угрозой" },
  { v: "1300+", l: "Ледников Памира" },
];

const sections = [
  { to: "/pollution" as const, icon: Wind, title: "Загрязнение", desc: "Воздух, вода и земля под давлением промышленности и транспорта.", color: "from-rose-500/20 to-orange-500/10" },
  { to: "/deforestation" as const, icon: Trees, title: "Вырубка лесов", desc: "Исторические и современные потери лесов: до и после.", color: "from-amber-500/20 to-yellow-500/10" },
  { to: "/animals" as const, icon: PawPrint, title: "Исчезающие виды", desc: "Снежный барс, бухарский олень и другие редкие животные.", color: "from-emerald-500/20 to-teal-500/10" },
];

function Index() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-8 pb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-widest text-primary">
          <Mountain className="h-3.5 w-3.5" /> Экосимулятор Таджикистана
        </div>
        <h1 className="mt-5 text-5xl md:text-7xl font-display leading-[1.05]">
          Дыхание <span className="text-gradient">гор</span>,<br />
          память <span className="italic">лесов</span>.
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground">
          Изучайте природу Таджикистана через интерактивную 3D-карту.
          Вращайте ландшафт, открывайте зоны и узнавайте об экологических вызовах региона.
        </p>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <TajikistanMap3D />
      </motion.div>

      <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
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

      <section className="mt-24">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-display">Три истории планеты</h2>
          <span className="hidden md:block text-sm text-muted-foreground">Выберите раздел</span>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {sections.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <Link
                to={s.to}
                className={`group relative block rounded-3xl p-6 h-full glass overflow-hidden hover:-translate-y-1 transition-all duration-500`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-50 group-hover:opacity-80 transition-opacity`} />
                <div className="relative">
                  <s.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-2xl font-display">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-foreground">
                    Открыть <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-24 glass rounded-3xl p-8 md:p-12 text-center grain relative overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-display">Природа не голосует.<br/>За неё говорим мы.</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          Узнайте, как маленькие действия складываются в большие изменения для Таджикистана.
        </p>
        <Link to="/help" className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--gradient-sun)] text-primary-foreground font-medium glow hover:scale-[1.03] transition-transform">
          Как помочь природе <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
