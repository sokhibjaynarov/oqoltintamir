import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2 } from "lucide-react"

interface NotFoundProps {
  params: Promise<{ lang: string }>
}

export default async function NotFound({ params }: NotFoundProps) {
  const resolvedParams = await params
  const { lang } = resolvedParams

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <Building2 className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {lang === "uz" ? "Loyiha topilmadi" : 
             lang === "ru" ? "Проект не найден" : 
             "Project Not Found"}
          </h1>
          <p className="text-neutral-600">
            {lang === "uz" ? "Siz qidirayotgan loyiha mavjud emas yoki o'chirilgan." :
             lang === "ru" ? "Проект, который вы ищете, не существует или был удален." :
             "The project you're looking for doesn't exist or has been removed."}
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href={`/${lang}/projects`}>
            <Button className="w-full">
              {lang === "uz" ? "Barcha loyihalarni ko'rish" :
               lang === "ru" ? "Посмотреть все проекты" :
               "View All Projects"}
            </Button>
          </Link>
          
          <Link href={`/${lang}`}>
            <Button variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {lang === "uz" ? "Bosh sahifaga qaytish" :
               lang === "ru" ? "Вернуться на главную" :
               "Back to Home"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
