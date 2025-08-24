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
            {lang === "uz" ? "Sahifa topilmadi" : 
             lang === "ru" ? "Страница не найдена" : 
             "Page Not Found"}
          </h1>
          <p className="text-neutral-600">
            {lang === "uz" ? "Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan." :
             lang === "ru" ? "Страница, которую вы ищете, не существует или была удалена." :
             "The page you're looking for doesn't exist or has been removed."}
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href={`/${lang}`}>
            <Button className="w-full">
              {lang === "uz" ? "Bosh sahifaga qaytish" :
               lang === "ru" ? "Вернуться на главную" :
               "Back to Home"}
            </Button>
          </Link>
          
          <Link href={`/${lang}#projects`}>
            <Button variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {lang === "uz" ? "Loyihalarni ko'rish" :
               lang === "ru" ? "Посмотреть проекты" :
               "View Projects"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
