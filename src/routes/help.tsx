import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Recycle, Droplet, Sprout, Bike, BookOpen, Users } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Как помочь природе — SabzTajik" },
      { name: "description", content: "Простые шаги для жителей Таджикистана: бытовая экология, волонтёрство и осознанное потребление." },
    ],
  }),
  component: HelpPage,
});

const tips = [
  { icon: Recycle, t: "Сортируйте отходы", d: "Стекло, пластик и бумага — это ресурсы, а не мусор." },
  { icon: Droplet, t: "Берегите воду", d: "Каждая капля важна для рек, ледников и хлопковых полей." },
  { icon: Sprout, t: "Сажайте деревья", d: "Присоединяйтесь к локальным акциям лесовосстановления." },
  { icon: Bike, t: "Меньше авто", d: "Велосипед и общественный транспорт сокращают выбросы." },
  { icon: BookOpen, t: "Учитесь и учите", d: "Делитесь знаниями об экологии с детьми и соседями." },
  { icon: Users, t: "Волонтёрство", d: "Поддерживайте местные природоохранные организации." },
];

function HelpPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <header className="text-center pt-8 pb-12">
        <p className="text-xs uppercase tracking-widest text-primary">Действие</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-display">Как помочь <span className="text-gradient">природе</span></h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Природе не нужны герои — ей нужны привычки. Шесть простых шагов, доступных каждому.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.t}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-3xl p-6 hover:-translate-y-1 transition"
          >
            <div className="grid place-items-center h-12 w-12 rounded-2xl bg-[var(--gradient-sun)] text-primary-foreground glow">
              <tip.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-display">{tip.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{tip.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
