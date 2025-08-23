import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ArrowRight, MapPin, Calendar } from "lucide-react"
import { getDictionary } from "../dictionaries"

type Lang = "en" | "ru" | "uz"

interface ProjectsPageProps {
  params: Promise<{ lang: Lang }>
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  const projects = [
    {
      id: "1",
      title: dict.projects.cards.title_1,
      description: dict.projects.cards.desc_1,
      images: dict.projects.cards.images_1 as string[],
      type: lang === "uz" ? "Turar-joy majmuasi" : lang === "ru" ? "Жилой комплекс" : "Residential Complex",
      location: lang === "uz" ? "Toshkent shahri" : lang === "ru" ? "Город Ташкент" : "Tashkent City",
      area: lang === "uz" ? "15,000 m²" : lang === "ru" ? "15,000 м²" : "15,000 m²",
      status: lang === "uz" ? "Yakunlangan" : lang === "ru" ? "Завершен" : "Completed"
    },
    {
      id: "2",
      title: dict.projects.cards.title_2,
      description: dict.projects.cards.desc_2,
      images: dict.projects.cards.images_2 as string[],
      type: lang === "uz" ? "Savdo maydoni" : lang === "ru" ? "Торговое помещение" : "Retail Space",
      location: lang === "uz" ? "Toshkent markazi" : lang === "ru" ? "Центр Ташкента" : "Tashkent Center",
      area: lang === "uz" ? "2,500 m²" : lang === "ru" ? "2,500 м²" : "2,500 m²",
      status: lang === "uz" ? "Yakunlangan" : lang === "ru" ? "Завершен" : "Completed"
    },
    {
      id: "3",
      title: dict.projects.cards.title_3,
      description: dict.projects.cards.desc_3,
      images: dict.projects.cards.images_3 as string[],
      type: lang === "uz" ? "Logistika markazi" : lang === "ru" ? "Логистический центр" : "Logistics Hub",
      location: lang === "uz" ? "Toshkent viloyati" : lang === "ru" ? "Ташкентская область" : "Tashkent Region",
      area: lang === "uz" ? "8,000 m²" : lang === "ru" ? "8,000 м²" : "8,000 m²",
      status: lang === "uz" ? "Yakunlangan" : lang === "ru" ? "Завершен" : "Completed"
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-neutral-600 mb-6">
            <Link href={`/${lang}`} className="hover:text-neutral-900 transition-colors">
              {lang === "uz" ? "Bosh sahifa" : lang === "ru" ? "Главная" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">
              {lang === "uz" ? "Loyihalar" : lang === "ru" ? "Проекты" : "Projects"}
            </span>
          </nav>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-600 w-fit bg-white/70 mb-6">
              <Building2 className="h-4 w-4 text-emerald-700" />
              <span>{dict.common.company}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {lang === "uz" ? "Bizning loyihalarimiz" : lang === "ru" ? "Наши проекты" : "Our Projects"}
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {lang === "uz" ? "Oqoltin ta'mir kompaniyasining muvaffaqiyatli amalga oshirilgan loyihalari" :
               lang === "ru" ? "Успешно реализованные проекты компании Оқолтин таъмир" :
               "Successfully completed projects by Oqoltin ta'mir company"}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {project.type}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <div className="h-4 w-4">📐</div>
                        <span>{project.area}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/${lang}/projects/${project.id}`}>
                    <Button className="w-full group">
                      {lang === "uz" ? "Batafsil ma'lumot" : lang === "ru" ? "Подробнее" : "Learn More"}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              {lang === "uz" ? "O'xshash loyiha?" : lang === "ru" ? "Похожий проект?" : "Similar Project?"}
            </h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              {lang === "uz" ? "Biz bilan bog'laning va loyihangiz haqida suhbat qiling. Mutaxassislarimiz sizga yordam beradi." :
               lang === "ru" ? "Свяжитесь с нами и обсудите ваш проект. Наши специалисты помогут вам." :
               "Contact us and discuss your project. Our specialists will help you."}
            </p>
            <Link href={`/${lang}#contact`}>
              <Button size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white">
                {dict.contact.form.submit}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
