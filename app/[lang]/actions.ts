"use server"

import { sendToTelegram, ContactFormData } from "@/lib/telegram"

export async function sendContactMessage(formData: FormData, lang: string) {
  try {
    console.log("Server action called with lang:", lang)
    
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    console.log("Form data received:", { name, email, phone, message, lang })

    if (!name || !email || !message) {
      const errorMsg = lang === "uz" ? "Iltimos, barcha majburiy maydonlarni to'ldiring" :
                     lang === "ru" ? "Пожалуйста, заполните все обязательные поля" :
                     "Please fill in all required fields"
      console.log("Validation error:", errorMsg)
      throw new Error(errorMsg)
    }

    const contactData: ContactFormData = {
      name,
      email,
      phone: phone || undefined,
      message,
      lang
    }

    console.log("Calling sendToTelegram with:", contactData)
    const result = await sendToTelegram(contactData)
    console.log("Telegram API result:", result)

    if (result.success) {
      console.log("Message sent successfully")
      return { success: true, message: "Message sent successfully" }
    } else {
      const errorMsg = result.message || (lang === "uz" ? "Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring" :
                       lang === "ru" ? "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже" :
                       "An error occurred while sending the message. Please try again later")
      console.log("API error:", errorMsg)
      throw new Error(errorMsg)
    }
  } catch (error) {
    console.error("Error in sendContactMessage:", error)
    const errorMsg = lang === "uz" ? "Kutilmagan xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring" :
                   lang === "ru" ? "Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже" :
                   "An error occurred while sending the message. Please try again later"
    throw new Error(errorMsg)
  }
}
