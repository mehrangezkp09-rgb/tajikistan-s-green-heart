import { createRootRouteWithContext, Outlet, HeadContent, Scripts, Link, useRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center px-4 pt-32">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-display text-gradient">404</h1>
        <p className="mt-3 text-muted-foreground">Эта страница затерялась в горах Памира.</p>
        <Link to="/" className="mt-6 inline-flex px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition">На главную</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="min-h-screen grid place-items-center px-4 pt-32">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-display">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground">Повторить</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SabzTajik — 3D-симулятор экологии Таджикистана" },
      { name: "description", content: "Интерактивная 3D-платформа о природе, лесах и экологических вызовах Таджикистана." },
      { property: "og:title", content: "SabzTajik — экология Таджикистана в 3D" },
      { property: "og:description", content: "Изучите горы, леса и реки Таджикистана через интерактивную 3D-карту." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="pt-24">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
