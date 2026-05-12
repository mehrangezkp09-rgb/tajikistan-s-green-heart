import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Новости экологии — SabzTajik" },
      { name: "description", content: "Свежие экологические новости и обновления о природе Таджикистана." },
    ],
  }),
  component: NewsPage,
});

const news = [
  { date: "2026-04-22", tag: "Лесовосстановление", title: "В Хатлонской области высажено 120 000 деревьев", excerpt: "Весенняя кампания по восстановлению тугайных лесов завершилась рекордным результатом." },
  { date: "2026-03-14", tag: "Климат", title: "Ледники Памира тают на 0.6 м в год", excerpt: "Исследование показало ускоренное сокращение ледников за последнее десятилетие." },
  { date: "2026-02-02", tag: "Виды", title: "Численность снежного барса стабилизировалась", excerpt: "Учёные фиксируют рост популяции в заповеднике «Зоркуль»." },
  { date: "2026-01-18", tag: "Воздух", title: "Душанбе вводит зоны с низкими выбросами", excerpt: "Программа охватит центр города и крупнейшие магистрали к 2027 году." },
];

function NewsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24">
      <header className="text-center pt-8 pb-12">
        <p className="text-xs uppercase tracking-widest text-primary">Журнал</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-display">Новости</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Хроника экологических событий и природоохранных инициатив Таджикистана.
        </p>
      </header>

      <ul className="space-y-4">
        {news.map((n, i) => (
          <motion.li
            key={n.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-3xl p-6 md:flex gap-6 items-start hover:-translate-y-0.5 transition"
          >
            <div className="md:w-40 shrink-0 text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(n.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div className="mt-3 md:mt-0 flex-1">
              <span className="text-xs uppercase tracking-widest text-primary">{n.tag}</span>
              <h3 className="mt-1 text-xl md:text-2xl font-display">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
