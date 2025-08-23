import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Hammer, Ruler, HardHat, Layers, MapPinned, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { getDictionary } from "./dictionaries"
import { ProjectImageCarousel } from "@/components/project-image-carousel"
import { CertificatesViewer } from "@/components/certificates-viewer"
import { ContactForm } from "@/components/contact-form"

type Lang = "en" | "ru" | "uz"

// Generate static params for build time
export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "ru" },
    { lang: "uz" }
  ]
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>
}) {
  try {
    const { lang } = await params
    
    if (!lang) {
      throw new Error("Language parameter is required")
    }
    
    const dict = await getDictionary(lang)



  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-600 w-fit bg-white/70">
              <HardHat className="h-4 w-4 text-emerald-700" />
              <span>{dict.common.company}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {dict.hero.title}
            </h1>
            <p className="text-neutral-600 text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/${lang}#contact`}>
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                  {dict.hero.cta_primary}
                </Button>
              </Link>
              <Link href={`/${lang}#projects`}>
                <Button variant="outline">{dict.hero.cta_secondary}</Button>
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-700" />
                <span>{dict.hero.points.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-emerald-700" />
                <span>{dict.hero.points.projects}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-emerald-700" />
                <span>{dict.hero.points.locations}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/construction-company.jpg"
              alt={dict.hero.image_alt}
              height={640}
              width={880}
              className="h-full w-full rounded-lg border object-cover shadow-sm"
              priority
            />
          </div>
        </div>
      </section>

      <section id="services" className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.services.title}</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">{dict.services.subtitle}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Hammer, ...dict.services.items.general },
              { icon: Ruler, ...dict.services.items.melioration },
              { icon: Layers, ...dict.services.items.electrical }
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-emerald-700" />
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.projects.title}</h2>
              <p className="mt-2 max-w-2xl text-neutral-600">{dict.projects.subtitle}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/${lang}/projects`} className="hidden sm:block">
                <Button variant="outline">
                  {lang === "uz" ? "Barcha loyihalar" : lang === "ru" ? "Все проекты" : "All Projects"}
                </Button>
              </Link>
              <Link href={`/${lang}#contact`} className="hidden sm:block">
                <Button variant="outline">{dict.projects.cta}</Button>
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <ProjectImageCarousel
                  images={dict.projects.cards[`images_${i}` as keyof typeof dict.projects.cards] as string[]}
                  alt={`${dict.projects.card_alt} ${i}`}
                  projectIndex={i}
                />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{dict.projects.cards[`title_${i}` as keyof typeof dict.projects.cards] as string}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-neutral-600 mb-4">{dict.projects.cards[`desc_${i}` as keyof typeof dict.projects.cards] as string}</p>
                  <Link href={`/${lang}/projects/${i}`}>
                    <Button variant="outline" className="w-full">
                      {lang === "uz" ? "Batafsil ma'lumot" : lang === "ru" ? "Подробнее" : "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.about.title}</h2>
            <p className="mt-4 text-neutral-600 max-w-3xl mx-auto">{dict.about.body}</p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2 mb-12">
            <div>
              <Image
                src="/construction.jpg"
                alt={dict.about.image_alt}
                height={560}
                width={720}
                className="h-full w-full rounded-lg border object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-neutral-700 mb-6">{dict.about.founder}</p>
              
                             <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-neutral-900">
                   {lang === "uz" ? "Faoliyat yo'nalishlarimiz:" :
                    lang === "ru" ? "Направления деятельности:" : "Our Activities:"}
                 </h3>
                 <ul className="space-y-2">
                   {dict.about.activities.map((activity: string, idx: number) => (
                     <li key={idx} className="flex items-start gap-2">
                       <Check className="mt-0.5 h-4 w-4 text-emerald-700 flex-shrink-0" />
                       <span className="text-neutral-700">{activity}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Licenses Section */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                {lang === "uz" ? "Litsenziyalar va ruxsatlar:" :
                 lang === "ru" ? "Лицензии и разрешения:" : "Licenses and Permits:"}
              </h3>
              <p className="text-neutral-700 mb-4">{dict.about.licenses}</p>
            </div>

            {/* Certificates Section */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {lang === "uz" ? "Sertifikatlarimiz:" :
                   lang === "ru" ? "Наши сертификаты:" : "Our Certificates:"}
                </h3>
                <p className="text-sm text-neutral-600">
                  {lang === "uz" ? "Sertifikatlarni ko'rish va yuklab olish uchun pastdagi tugmalardan foydalaning" :
                   lang === "ru" ? "Используйте кнопки ниже для просмотра и скачивания сертификатов" :
                   "Use the buttons below to view and download certificates"}
                </p>
              </div>
              
              <CertificatesViewer 
                certificates={dict.about.certificate_files} 
                lang={lang} 
              />
            </div>

            {/* Technical Base Section */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                {lang === "uz" ? "Texnik bazamiz:" :
                 lang === "ru" ? "Наша техническая база:" : "Our Technical Base:"}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dict.about.technical_base.map((equipment: string, idx: number) => (
                  <div key={idx} className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl mb-2">
                      {equipment === "Shalanda" || equipment === "Flatbed truck" || equipment === "Бортовой грузовик" ? "🚛" :
                       equipment === "Avtokran" || equipment === "Mobile crane" || equipment === "Автокран" ? "🏗️" :
                       equipment === "Ekskavator" || equipment === "Excavator" || equipment === "Экскаватор" ? "🚜" :
                       equipment === "Manipulyator" || equipment === "Manipulator" || equipment === "Манипулятор" ? "🚚" : "⚙️"}
                    </div>
                    <span className="text-sm text-neutral-700">{equipment}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                {lang === "uz" ? "Nega aynan biz?" :
                 lang === "ru" ? "Почему именно мы?" : "Why Choose Us?"}
              </h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {dict.about.why_choose_us.map((reason: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-700" aria-hidden />
                    <span className="text-neutral-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Tagline */}
            <div className="text-center bg-emerald-50 p-8 rounded-lg border border-emerald-200">
              <p className="text-lg font-medium text-emerald-800 italic">"{dict.about.tagline}"</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.contact.title}</h2>
              <p className="mt-2 text-neutral-600">{dict.contact.subtitle}</p>
              <div className="mt-6 space-y-3 text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-emerald-700" />
                  <div>
                    <div className="font-medium">{dict.contact.address_label}</div>
                    <div>Guliston, Sirdaryo</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-emerald-700" />
                  <div>
                    <div className="font-medium">{dict.contact.phone_label}</div>
                    <a href="tel:+998995555007" className="hover:underline">
                      +998 99 555 50 07
                    </a>
                  </div>
                </div>
                                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-emerald-700" />
                    <div>
                      <div className="font-medium">{dict.contact.email_label}</div>
                      <a href="mailto:info@oqoltintamir.uz" className="hover:underline">
                        info@oqoltintamir.uz
                      </a>
                    </div>
                  </div>
              </div>
            </div>
            <div>
              <ContactForm lang={lang} dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
  } catch (error) {
    console.error("Error in main Page:", error)
    
    // Return a fallback page for build errors
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Oqoltin Ta'mir
          </h1>
          <p className="text-neutral-600">
            Loading...
          </p>
        </div>
      </div>
    )
  }
}
