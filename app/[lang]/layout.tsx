import type { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LangSwitcher } from "@/components/lang-switcher"



const locales = ["en", "ru", "uz"] as const

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ lang: "en" | "ru" | "uz" }>
}>) {
  const { lang } = await params
  const nav = [
    { id: "services", label: { en: "Services", ru: "Услуги", uz: "Xizmatlar" }[lang], href: `/${lang}#services` },
    { id: "projects", label: { en: "Projects", ru: "Проекты", uz: "Loyihalar" }[lang], href: `/${lang}/projects` },
    { id: "about", label: { en: "About", ru: "О компании", uz: "Biz haqimizda" }[lang], href: `/${lang}#about` },
    { id: "contact", label: { en: "Contact", ru: "Контакты", uz: "Bog'lanish" }[lang], href: `/${lang}#contact` },
  ]

  return (
    <div className="min-h-dvh bg-white text-neutral-900 antialiased">
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href={`/${lang}`} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-emerald-600" aria-hidden />
              <span className="text-lg font-semibold tracking-tight">Oqoltin ta'mir</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <LangSwitcher />
            </nav>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Oqoltin ta'mir</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-4">
                    {nav.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="text-base text-neutral-800"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="pt-2">
                      <LangSwitcher />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t bg-neutral-50">
          <div className="container mx-auto px-4 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Oqoltin ta'mir. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href={`/${lang}#about`} className="hover:text-neutral-800">
                About
              </Link>
              <Link href={`/${lang}#contact`} className="hover:text-neutral-800">
                Contact
              </Link>
            </div>
          </div>
        </footer>
    </div>
  )
}
