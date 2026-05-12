import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import snowLeopard from "@/assets/snow-leopard.jpg";
import markhor from "@/assets/markhor.jpg";
import deer from "@/assets/bukhara-deer.jpg";
import bear from "@/assets/brown-bear.jpg";

export const Route = createFileRoute("/animals")({
  head: () => ({
    meta: [
      { title: "Исчезающие животные — SabzTajik" },
      { name: "description", content: "Снежный барс, винторогий козёл, бухарский олень и другие виды Таджикистана под угрозой." },
    ],
  }),
  component: AnimalsPage,
});

const animals = [
  { img: snowLeopard, name: "Снежный барс", latin: "Panthera uncia", status: "Уязвимый", desc: "Хищник высокогорий Памира. В Таджикистане осталось около 250–300 особей.", color: "bg-sky-500/20 text-sky-200" },
  { img: markhor, name: "Винторогий козёл", latin: "Capra falconeri", status: "В опасности", desc: "Символ горных хребтов. Восстанавливает численность благодаря охраняемым территориям.", color: "bg-amber-500/20 text-amber-200" },
  { img: deer, name: "Бухарский олень", latin: "Cervus hanglu bactrianus", status: "В опасности", desc: "Обитает в тугайных лесах Тигровой балки вдоль реки Вахш.", color: "bg-rose-500/20 text-rose-200" },
  { img: bear, name: "Тяньшанский бурый медведь", latin: "Ursus arctos isabellinus", status: "Уязвимый", desc: "Редкий обитатель лесов и альпийских лугов восточного Таджикистана.", color: "bg-emerald-500/20 text-emerald-200" },
];

function AnimalsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24">
      <header className="text-center pt-8 pb-12">
        <p className="text-xs uppercase tracking-widest text-primary">Раздел 03</p>
        <h1 className="mt-3 text-5xl md:text-6xl font-display">Исчезающие виды</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Каждый из этих видов — часть хрупкой экосистемы Таджикистана. Их сохранение зависит от нас.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {animals.map((a, i) => (
          <motion.article
            key={a.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group glass rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform duration-500"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={a.img}
                alt={a.name}
                width={1024}
                height={768}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-wider ${a.color} backdrop-blur`}>
                {a.status}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-display">{a.name}</h3>
              <p className="text-xs italic text-muted-foreground">{a.latin}</p>
              <p className="mt-3 text-sm text-muted-foreground">{a.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
