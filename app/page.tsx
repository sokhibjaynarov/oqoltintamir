import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"

const locales = ["en", "ru", "uz"] as const
const defaultLocale = "en"

function getPreferredLocale(): (typeof locales)[number] {
  const acceptLanguage = headers().get("accept-language") || ""
  const negotiator = new Negotiator({ headers: { "accept-language": acceptLanguage } })
  const languages = negotiator.languages()
  try {
    return match(languages, locales as unknown as string[], defaultLocale) as (typeof locales)[number]
  } catch {
    return defaultLocale
  }
}

export default function Page() {
  const locale = getPreferredLocale()
  redirect(`/${locale}`)
}
