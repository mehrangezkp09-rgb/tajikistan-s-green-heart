import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-display text-xl"><span className="text-gradient">Sabz</span>Tajik</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Образовательная 3D-платформа о природе и экологических вызовах Таджикистана.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <h4 className="text-foreground font-medium mb-2">Разделы</h4>
          <ul className="space-y-1">
            <li>Загрязнение</li>
            <li>Вырубка лесов</li>
            <li>Исчезающие виды</li>
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <h4 className="text-foreground font-medium mb-2">Контакты</h4>
          <p>info@sabztajik.tj</p>
          <p className="mt-3 text-xs">© {new Date().getFullYear()} SabzTajik. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
