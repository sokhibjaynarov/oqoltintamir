"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { sendContactMessage } from "@/app/[lang]/actions"
import { Send, MessageCircle } from "lucide-react"

interface ContactFormProps {
  lang: string
  dict: any
}

export function ContactForm({ lang, dict }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        setIsLoading(true)
        console.log("Submitting form data:", Object.fromEntries(formData))
        
        const result = await sendContactMessage(formData, lang)
        console.log("Server action result:", result)
        
        if (result.success) {
          return { success: true, message: result.message }
        } else {
          return { error: result.message || "Failed to send message" }
        }
      } catch (error) {
        console.error("Form submission error:", error)
        return {
          error: error instanceof Error ? error.message : "An error occurred"
        }
      } finally {
        setIsLoading(false)
      }
    },
    null
  )

  return (
    <form action={formAction} className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="grid gap-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            {dict.contact.form.name}
          </label>
          <input
            id="name"
            name="name"
            required
            className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-emerald-600"
            placeholder={dict.contact.form.name_ph}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              {dict.contact.form.email}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-emerald-600"
              placeholder={dict.contact.form.email_ph}
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              {dict.contact.form.phone}
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-emerald-600"
              placeholder={dict.contact.form.phone_ph}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium">
            {dict.contact.form.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-emerald-600"
            placeholder={dict.contact.form.message_ph}
          />
        </div>
        
        {state?.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}
        
        {state?.success && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md">
            <p className="text-sm text-emerald-700">
              {lang === "uz" ? "Xabar muvaffaqiyatli yuborildi!" :
               lang === "ru" ? "Сообщение успешно отправлено!" :
               "Message sent successfully!"}
            </p>
          </div>
        )}
        
        <SubmitButton dict={dict} lang={lang} isLoading={isLoading} />
        
        <div className="flex items-center gap-2 text-xs text-neutral-500 justify-center">
          <MessageCircle className="h-4 w-4" />
          <span>
            {lang === "uz" ? "Xabaringiz bizga yuboriladi" :
             lang === "ru" ? "Ваше сообщение будет отправлено нам" :
             "Your message will be sent to us"}
          </span>
        </div>
      </div>
    </form>
  )
}

function SubmitButton({ dict, lang, isLoading }: { dict: any; lang: string; isLoading: boolean }) {
  return (
    <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white" disabled={isLoading}>
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          {lang === "uz" ? "Yuborilmoqda..." :
           lang === "ru" ? "Отправляется..." :
           "Sending..."}
        </>
      ) : (
        <>
          <Send className="h-4 w-4 mr-2" />
          {dict.contact.form.submit}
        </>
      )}
    </Button>
  )
}
