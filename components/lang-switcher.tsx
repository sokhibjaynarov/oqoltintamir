"use client"

import { usePathname, useRouter, useParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const labels: Record<string, string> = {
  en: "English",
  ru: "Русский",
  uz: "O‘zbekcha"
}

export function LangSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams() as { lang?: string }
  const current = (params?.lang as string) || "en"

  const onChange = (next: string) => {
    const segments = pathname.split("/")
    // Replace first segment after leading slash with next locale
    if (segments.length > 1) {
      segments[1] = next
    }
    const nextPath = segments.join("/") || `/${next}`
    router.push(nextPath)
  }

  return (
    <Select value={current} onValueChange={onChange}>
      <SelectTrigger className="w-[130px] bg-white">
        <SelectValue aria-label={labels[current]} placeholder={labels[current]} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{labels.en}</SelectItem>
        <SelectItem value="ru">{labels.ru}</SelectItem>
        <SelectItem value="uz">{labels.uz}</SelectItem>
      </SelectContent>
    </Select>
  )
}
