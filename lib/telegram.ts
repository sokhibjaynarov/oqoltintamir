const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8201172040:AAGOnsfj1ZD4eQaKJq76C06woR39hYBhTv8"
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID || "-1003052264175"

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  lang: string
}

export async function sendToTelegram(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    console.log("sendMessage called with data:", data)
    
    const message = formatMessage(data)
    console.log("Formatted message:", message)
    
    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    const requestBody = {
      chat_id: TELEGRAM_GROUP_ID,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      disable_notification: false,
    }
    
    console.log("Making API request to:", apiUrl)
    console.log("Request body:", requestBody)
    
    // Send message to Telegram group
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    console.log("Response status:", response.status, response.statusText)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
      
      // Handle specific Telegram API errors
      if (errorData.error_code === 403) {
              return {
        success: false,
        message: 'Bot is not a member of the group'
      }
    } else if (errorData.error_code === 400) {
      return {
        success: false,
        message: 'Invalid request to API'
      }
    } else if (errorData.error_code === 429) {
      return {
        success: false,
        message: 'Rate limit exceeded, please try again later'
      }
    }
    
    return {
      success: false,
      message: `API error: ${errorData.description || 'Unknown error'}`
    }
    }

    const result = await response.json()
    console.log('Message sent successfully:', result)
    
    return {
      success: true,
      message: 'Message sent successfully'
    }
  } catch (error) {
    console.error('Error sending message:', error)
    return {
      success: false,
      message: 'Network error while sending message'
    }
  }
}

function formatMessage(data: ContactFormData): string {
  const lang = data.lang
  
  const labels = {
    uz: {
      newContact: "🆕 Yangi aloqa so'rovi",
      name: "Ism",
      email: "Email",
      phone: "Telefon",
      message: "Xabar",
      from: "Kimdan"
    },
    ru: {
      newContact: "🆕 Новый запрос на контакт",
      name: "Имя",
      email: "Email",
      phone: "Телефон",
      message: "Сообщение",
      from: "От кого"
    },
    en: {
      newContact: "🆕 New Contact Request",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      from: "From"
    }
  }

  const currentLabels = labels[lang as keyof typeof labels] || labels.en

  let message = `<b>${currentLabels.newContact}</b>\n\n`
  message += `<b>${currentLabels.name}:</b> ${data.name}\n`
  message += `<b>${currentLabels.email}:</b> ${data.email}\n`
  
  if (data.phone) {
    message += `<b>${currentLabels.phone}:</b> ${data.phone}\n`
  }
  
  message += `\n<b>${currentLabels.message}:</b>\n${data.message}\n\n`
  message += `<b>${currentLabels.from}:</b> ${lang.toUpperCase()}`

  return message
}

// Additional Telegram API methods
export async function getBotInfo(): Promise<{ success: boolean; data?: any; message: string }> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`)
    
    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        message: `Failed to get system info: ${errorData.description || 'Unknown error'}`
      }
    }
    
    const result = await response.json()
    return {
      success: true,
      data: result.result,
      message: 'System info retrieved successfully'
    }
  } catch (error) {
    console.error('Error getting system info:', error)
    return {
      success: false,
      message: 'Network error while getting system info'
    }
  }
}

export async function getChatInfo(chatId: string = TELEGRAM_GROUP_ID): Promise<{ success: boolean; data?: any; message: string }> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat?chat_id=${chatId}`)
    
    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        message: `Failed to get group info: ${errorData.description || 'Unknown error'}`
      }
    }
    
    const result = await response.json()
    return {
      success: true,
      data: result.result,
      message: 'Group info retrieved successfully'
    }
  } catch (error) {
    console.error('Error getting group info:', error)
    return {
      success: false,
      message: 'Network error while getting group info'
    }
  }
}

export async function sendPhotoToTelegram(photoUrl: string, caption?: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_GROUP_ID,
        photo: photoUrl,
        caption: caption,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        message: `Failed to send photo: ${errorData.description || 'Unknown error'}`
      }
    }

    return {
      success: true,
      message: 'Photo sent successfully'
    }
  } catch (error) {
    console.error('Error sending photo:', error)
    return {
      success: false,
      message: 'Network error while sending photo'
    }
  }
}
