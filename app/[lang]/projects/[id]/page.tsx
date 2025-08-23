import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Users, Building2, CheckCircle } from "lucide-react"
import { getDictionary } from "../../dictionaries"
import { notFound } from "next/navigation"

type Lang = "en" | "ru" | "uz"

interface ProjectPageProps {
  params: Promise<{ lang: Lang; id: string }>
}

// Generate static params for build time
export async function generateStaticParams() {
  const languages = ["en", "ru", "uz"]
  const projectIds = ["1", "2", "3"]
  
  return languages.flatMap(lang => 
    projectIds.map(id => ({ lang, id }))
  )
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { lang, id } = await params
    
    if (!lang || !id) {
      throw new Error("Language and project ID parameters are required")
    }
    
    const dict = await getDictionary(lang)

  // Project data based on ID
  const projects = {
    "1": {
      title: dict.projects.cards.title_1,
      description: dict.projects.cards.desc_1,
      images: dict.projects.cards.images_1 as string[],
      details: {
        type: lang === "uz" ? "Turar-joy majmuasi" : lang === "ru" ? "Жилой комплекс" : "Residential Complex",
        location: lang === "uz" ? "Toshkent shahri" : lang === "ru" ? "Город Ташкент" : "Tashkent City",
        area: lang === "uz" ? "15,000 m²" : lang === "ru" ? "15,000 м²" : "15,000 m²",
        floors: lang === "uz" ? "15 qavat" : lang === "ru" ? "15 этажей" : "15 floors",
        duration: lang === "uz" ? "18 oy" : lang === "ru" ? "18 месяцев" : "18 months",
        status: lang === "uz" ? "Yakunlangan" : lang === "ru" ? "Завершен" : "Completed"
      },
      features: lang === "uz" ? [
        "Zamonaviy arxitektura va dizayn",
        "Erta qavat avtomobil to'xtash joyi (200 ta joy)",
        "24/7 xavfsizlik tizimi va video nazorat",
        "Zamonaviy liftlar va eskalatorlar",
        "Yashil maydonlar va dam olish zonalari",
        "Bolalar o'yin maydoni va sport maydoni",
        "Konditsioner va isitish tizimi",
        "Yuqori sifatli materiallar va jihozlash"
      ] : lang === "ru" ? [
        "Современная архитектура и дизайн",
        "Подземная парковка (200 мест)",
        "Система безопасности 24/7 и видеонаблюдение",
        "Современные лифты и эскалаторы",
        "Зеленые зоны и зоны отдыха",
        "Детская игровая площадка и спортивная зона",
        "Система кондиционирования и отопления",
        "Высококачественные материалы и отделка"
      ] : [
        "Modern architecture and design",
        "Underground parking (200 spaces)",
        "24/7 security system and video surveillance",
        "Modern elevators and escalators",
        "Green spaces and recreation areas",
        "Children's playground and sports area",
        "Air conditioning and heating system",
        "High-quality materials and finishing"
      ],
      services: lang === "uz" ? [
        "Loyihalash va rejalashtirish",
        "Qurilish ishlari",
        "Ichki va tashqi pardozlash",
        "Muhandislik tizimlari",
        "Xavfsizlik tizimlari",
        "Landshaft dizayni"
      ] : lang === "ru" ? [
        "Проектирование и планирование",
        "Строительные работы",
        "Внутренняя и внешняя отделка",
        "Инженерные системы",
        "Системы безопасности",
        "Ландшафтный дизайн"
      ] : [
        "Design and planning",
        "Construction works",
        "Interior and exterior finishing",
        "Engineering systems",
        "Security systems",
        "Landscape design"
      ]
    },
    "2": {
      title: dict.projects.cards.title_2,
      description: dict.projects.cards.desc_2,
      images: dict.projects.cards.images_2 as string[],
      details: {
        type: lang === "uz" ? "Savdo maydoni" : lang === "ru" ? "Торговое помещение" : "Retail Space",
        location: lang === "uz" ? "Toshkent markazi" : lang === "ru" ? "Центр Ташкента" : "Tashkent Center",
        area: lang === "uz" ? "2,500 m²" : lang === "ru" ? "2,500 м²" : "2,500 m²",
        floors: lang === "uz" ? "2 qavat" : lang === "ru" ? "2 этажа" : "2 floors",
        duration: lang === "uz" ? "6 oy" : lang === "ru" ? "6 месяцев" : "6 months",
        status: lang === "uz" ? "Yakunlangan" : lang === "ru" ? "Завершен" : "Completed"
      },
      features: lang === "uz" ? [
        "Zamonaviy interyer dizayni",
        "Yuqori sifatli materiallar",
        "Yorug'lik tizimi",
        "Konditsioner tizimi",
        "Xavfsizlik kameralari",
        "Avtomatik eshiklar"
      ] : lang === "ru" ? [
        "Современный дизайн интерьера",
        "Высококачественные материалы",
        "Система освещения",
        "Система кондиционирования",
        "Камеры безопасности",
        "Автоматические двери"
      ] : [
        "Modern interior design",
        "High-quality materials",
        "Lighting system",
        "Air conditioning system",
        "Security cameras",
        "Automatic doors"
      ],
      services: lang === "uz" ? [
        "Interyer dizayni",
        "Qurilish va pardozlash",
        "Elektrik ishlari",
        "Santexnika ishlari",
        "Ventilyatsiya tizimi",
        "Xavfsizlik tizimi"
      ] : lang === "ru" ? [
        "Дизайн интерьера",
        "Строительство и отделка",
        "Электромонтажные работы",
        "Сантехнические работы",
        "Система вентиляции",
        "Система безопасности"
      ] : [
        "Interior design",
        "Construction and finishing",
        "Electrical works",
        "Plumbing works",
        "Ventilation system",
        "Security system"
      ]
    },
    "3": {
      title: dict.projects.cards.title_3,
      description: dict.projects.cards.desc_3,
      images: dict.projects.cards.images_3 as string[],
      details: {
        type: lang === "uz" ? "Logistika markazi" : lang === "ru" ? "Логистический центр" : "Logistics Hub",
        location: lang === "uz" ? "Toshkent viloyati" : lang === "ru" ? "Ташкентская область" : "Tashkent Region",
        area: lang === "uz" ? "8,000 m²" : lang === "ru" ? "8,000 м²" : "8,000 m²",
        floors: lang === "uz" ? "1 qavat + mezzanin" : lang === "ru" ? "1 этаж + мезонин" : "1 floor + mezzanine",
        duration: lang === "uz" ? "12 oy" : lang === "ru" ? "12 месяцев" : "12 months",
        status: lang === "uz" ? "Yakunlangan" : lang === "ru" ? "Завершен" : "Completed"
      },
      features: lang === "uz" ? [
        "Katta yuk tashish qobiliyati",
        "Zamonaviy logistika tizimi",
        "Ofis maydoni",
        "Yuk tashish maydoni",
        "Xavfsizlik tizimi",
        "Parking maydoni"
      ] : lang === "ru" ? [
        "Высокая грузоподъемность",
        "Современная логистическая система",
        "Офисное пространство",
        "Грузовая зона",
        "Система безопасности",
        "Парковочная зона"
      ] : [
        "High load capacity",
        "Modern logistics system",
        "Office space",
        "Cargo area",
        "Security system",
        "Parking area"
      ],
      services: lang === "uz" ? [
        "Loyihalash va rejalashtirish",
        "Qurilish ishlari",
        "Muhandislik tizimlari",
        "Logistika tizimi",
        "Xavfsizlik tizimi",
        "Landshaft dizayni"
      ] : lang === "ru" ? [
        "Проектирование и планирование",
        "Строительные работы",
        "Инженерные системы",
        "Логистическая система",
        "Система безопасности",
        "Ландшафтный дизайн"
      ] : [
        "Design and planning",
        "Construction works",
        "Engineering systems",
        "Logistics system",
        "Security system",
        "Landscape design"
      ]
    }
  }

  const project = projects[id as keyof typeof projects]

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
            <Link href={`/${lang}`} className="hover:text-neutral-900 transition-colors">
              {lang === "uz" ? "Bosh sahifa" : lang === "ru" ? "Главная" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/projects`} className="hover:text-neutral-900 transition-colors">
              {lang === "uz" ? "Loyihalar" : lang === "ru" ? "Проекты" : "Projects"}
            </Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">{project.title}</span>
          </nav>
          
          <Link href={`/${lang}/projects`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {lang === "uz" ? "Orqaga" : lang === "ru" ? "Назад" : "Back to Projects"}
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-8 w-8 text-emerald-700" />
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">{project.title}</h1>
              <p className="text-lg text-neutral-600">{project.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="text-sm">
              {project.details.type}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {project.details.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Images */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {lang === "uz" ? "Loyiha rasmlari" : lang === "ru" ? "Фотографии проекта" : "Project Photos"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.map((image, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${project.title} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {lang === "uz" ? "Loyiha xususiyatlari" : lang === "ru" ? "Особенности проекта" : "Project Features"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services Provided */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {lang === "uz" ? "Ko'rsatilgan xizmatlar" : lang === "ru" ? "Предоставленные услуги" : "Services Provided"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-neutral-700">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {lang === "uz" ? "Loyiha jadvali" : lang === "ru" ? "График проекта" : "Project Timeline"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {lang === "uz" ? "Loyihalash va rejalashtirish" : lang === "ru" ? "Проектирование и планирование" : "Design & Planning"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {lang === "uz" ? "Arxitektura va muhandislik loyihalari" : lang === "ru" ? "Архитектурные и инженерные проекты" : "Architectural and engineering designs"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {lang === "uz" ? "Qurilish ishlari" : lang === "ru" ? "Строительные работы" : "Construction"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {lang === "uz" ? "Asosiy qurilish va tuzilma" : lang === "ru" ? "Основное строительство и структура" : "Main construction and structure"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {lang === "uz" ? "Pardozlash ishlari" : lang === "ru" ? "Отделочные работы" : "Finishing"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {lang === "uz" ? "Ichki va tashqi pardozlash" : lang === "ru" ? "Внутренняя и внешняя отделка" : "Interior and exterior finishing"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {lang === "uz" ? "Muhandislik tizimlari" : lang === "ru" ? "Инженерные системы" : "Engineering Systems"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {lang === "uz" ? "Elektrik, santexnika va xavfsizlik" : lang === "ru" ? "Электрика, сантехника и безопасность" : "Electrical, plumbing and security"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {lang === "uz" ? "Yakunlash va topshirish" : lang === "ru" ? "Завершение и сдача" : "Completion & Handover"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {lang === "uz" ? "Final tekshiruv va mijozga topshirish" : lang === "ru" ? "Финальная проверка и передача клиенту" : "Final inspection and client handover"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {lang === "uz" ? "Loyiha ma'lumotlari" : lang === "ru" ? "Детали проекта" : "Project Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-neutral-500">
                      {lang === "uz" ? "Loyiha turi" : lang === "ru" ? "Тип проекта" : "Project Type"}
                    </p>
                    <p className="font-medium">{project.details.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-neutral-500">
                      {lang === "uz" ? "Manzil" : lang === "ru" ? "Местоположение" : "Location"}
                    </p>
                    <p className="font-medium">{project.details.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 text-emerald-600">📐</div>
                  <div>
                    <p className="text-sm text-neutral-500">
                      {lang === "uz" ? "Maydon" : lang === "ru" ? "Площадь" : "Area"}
                    </p>
                    <p className="font-medium">{project.details.area}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 text-emerald-600">🏗️</div>
                  <div>
                    <p className="text-sm text-neutral-500">
                      {lang === "uz" ? "Qavatlar" : lang === "ru" ? "Этажи" : "Floors"}
                    </p>
                    <p className="font-medium">{project.details.floors}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-neutral-500">
                      {lang === "uz" ? "Davomiyligi" : lang === "ru" ? "Продолжительность" : "Duration"}
                    </p>
                    <p className="font-medium">{project.details.duration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="bg-emerald-50 border-emerald-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-emerald-800 mb-3">
                  {lang === "uz" ? "O'xshash loyiha?" : lang === "ru" ? "Похожий проект?" : "Similar Project?"}
                </h3>
                <p className="text-sm text-emerald-700 mb-4">
                  {lang === "uz" ? "Biz bilan bog'laning va loyihangiz haqida suhbat qiling" :
                   lang === "ru" ? "Свяжитесь с нами и обсудите ваш проект" :
                   "Contact us and discuss your project"}
                </p>
                <Link href={`/${lang}#contact`}>
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                    {dict.contact.form.submit}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
  } catch (error) {
    console.error("Error in ProjectPage:", error)
    
    // Return a fallback page for build errors
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Project Details
          </h1>
          <p className="text-neutral-600">
            Loading project...
          </p>
        </div>
      </div>
    )
  }
}
