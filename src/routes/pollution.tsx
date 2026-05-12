import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wind, Droplets, Factory, Car } from "lucide-react";

export const Route = createFileRoute("/pollution")({
  head: () => ({
    meta: [
      { title: "Загрязнение — SabzTajik" },
      { name: "description", content: "Загрязнение воздуха, воды и почвы в Таджикистане: причины, точки риска и решения." },
    ],
  }),
  component: PollutionPage,
});

const points = [
  { city: "Душанбе", type: "Воздух", level: 78, icon: Wind, cause: "Транспорт и угольное отопление", solution: "Электротранспорт, газификация, озеленение." },
  { city: "Турсунзаде", type: "Промышленность", level: 86, icon: Factory, cause: "Алюминиевый комбинат TALCO", solution: "Современные фильтры, мониторинг выбросов фтора." },
  { city: "Худжанд", type: "Воздух/Транспорт", level: 64, icon: Car, cause: "Старый автопарк, пыльные бури", solution: "Стандарты Евро, лесополосы вдоль дорог." },
  { city: "Сырдарья", type: "Вода", level: 71, icon: Droplets, cause: "Сток с хлопковых полей и сбросы", solution: "Капельный полив, очистные сооружения." },
];

function PollutionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <header className="text-center pt-8 pb-12">
        <p className="text-xs uppercase tracking-widest text-primary">Раздел 01</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-display">Загрязнение</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Невидимое давление на воздух, реки и почву Таджикистана. Точки на карте — места с подтверждёнными экологическими проблемами.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {points.map((p, i) => (
          <motion.article
            key={p.city}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-3xl p-6 hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-secondary/80 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-display">{p.city}</h3>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.type}</p>
                </div>
              </div>
              <span className="text-2xl font-display text-gradient">{p.level}</span>
            </div>
            <div className="mt-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Уровень риска</div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${p.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                  className="h-full bg-[var(--gradient-sun)]"
                />
              </div>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Причина</div>
                <p className="mt-1 text-foreground/90">{p.cause}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Решение</div>
                <p className="mt-1 text-foreground/90">{p.solution}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
