"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, Users, TestTube } from "lucide-react"

interface TelegramAdminProps {
  lang: string
}

export function TelegramAdmin({ lang }: TelegramAdminProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [botInfo, setBotInfo] = useState<any>(null)

  const testTelegramAPI = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/test-telegram', {
        method: 'POST'
      })
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, message: 'Failed to test API' })
    } finally {
      setIsLoading(false)
    }
  }

  const getBotInfo = async () => {
    try {
      const response = await fetch('/api/test-telegram')
      const result = await response.json()
      if (result.success) {
        setBotInfo(result)
      }
    } catch (error) {
      console.error('Failed to get bot info:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-emerald-600" />
            {lang === "uz" ? "Bot Boshqaruvi" : 
             lang === "ru" ? "Управление Bot" : 
             "Bot Administration"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Button 
              onClick={testTelegramAPI} 
              disabled={isLoading}
              className="w-full"
            >
              <TestTube className="h-4 w-4 mr-2" />
              {isLoading ? 
                (lang === "uz" ? "Sinab ko'rilmoqda..." : 
                 lang === "ru" ? "Тестируется..." : 
                 "Testing...") :
                (lang === "uz" ? "API ni sinab ko'rish" : 
                 lang === "ru" ? "Протестировать API" : 
                 "Test API")
              }
            </Button>
            
            <Button 
              onClick={getBotInfo} 
              variant="outline"
              className="w-full"
            >
              <Bot className="h-4 w-4 mr-2" />
              {lang === "uz" ? "Bot ma'lumotlarini olish" : 
               lang === "ru" ? "Получить информацию о боте" : 
               "Get Bot Info"}
            </Button>
          </div>

          {botInfo && (
            <div className="space-y-3">
                          <h4 className="font-semibold text-sm">
              {lang === "uz" ? "Tizim ma'lumotlari:" : 
               lang === "ru" ? "Информация о системе:" : 
               "System Information:"}
            </h4>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {lang === "uz" ? "Nomi" : lang === "ru" ? "Имя" : "Name"}
                  </Badge>
                  <span>{botInfo.botInfo?.data?.first_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {lang === "uz" ? "Username" : lang === "ru" ? "Username" : "Username"}
                  </Badge>
                  <span>@{botInfo.botInfo?.data?.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {lang === "uz" ? "Guruh" : lang === "ru" ? "Группа" : "Group"}
                  </Badge>
                  <span>{botInfo.chatInfo?.data?.title || "Unknown"}</span>
                </div>
              </div>
            </div>
          )}

          {testResult && (
            <div className="space-y-3">
                          <h4 className="font-semibold text-sm">
              {lang === "uz" ? "Sinab ko'rish natijasi:" : 
               lang === "ru" ? "Результат проверки:" : 
               "Test Result:"}
            </h4>
              <div className={`p-3 rounded-md border ${
                testResult.success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={testResult.success ? "default" : "destructive"} className="text-xs">
                    {testResult.success ? 
                      (lang === "uz" ? "Muvaffaqiyatli" : lang === "ru" ? "Успешно" : "Success") :
                      (lang === "uz" ? "Xatolik" : lang === "ru" ? "Ошибка" : "Error")
                    }
                  </Badge>
                  <span className="text-sm font-medium">
                    {testResult.summary || testResult.message}
                  </span>
                </div>
                
                {testResult.messageResult && (
                  <div className="text-xs text-neutral-600">
                    {lang === "uz" ? "Xabar holati:" : 
                     lang === "ru" ? "Статус сообщения:" : 
                     "Message Status:"} {testResult.messageResult.message}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
