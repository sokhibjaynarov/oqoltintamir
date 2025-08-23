import { NextResponse } from "next/server"
import { sendToTelegram, getBotInfo, getChatInfo } from "@/lib/telegram"

export async function POST() {
  try {
    // Test bot info
    const botInfo = await getBotInfo()
    
    // Test chat info
    const chatInfo = await getChatInfo()
    
    // Test sending message
    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+998 99 555 50 07",
      message: "This is a test message to verify Telegram bot integration",
      lang: "en"
    }

    const messageResult = await sendToTelegram(testData)

    return NextResponse.json({ 
      success: true,
      botInfo,
      chatInfo,
      messageResult,
      summary: "Telegram API test completed"
    })
  } catch (error) {
    console.error("Error testing Telegram:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Failed to test Telegram integration" 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get bot information
    const botInfo = await getBotInfo()
    
    // Get chat/group information
    const chatInfo = await getChatInfo()
    
    return NextResponse.json({ 
      success: true,
      botInfo,
      chatInfo,
      message: "Telegram bot and chat info retrieved successfully"
    })
  } catch (error) {
    console.error("Error getting Telegram info:", error)
    return NextResponse.json({ 
      success: false, 
      message: "Failed to get Telegram information" 
    }, { status: 500 })
  }
}
