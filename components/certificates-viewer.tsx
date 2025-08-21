"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Download, X } from "lucide-react"

interface Certificate {
  id: string
  name: string
  filename: string
  description: string
  icon: string
}

interface CertificatesViewerProps {
  certificates: Certificate[]
  lang: string
}

export function CertificatesViewer({ certificates, lang }: CertificatesViewerProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setIsViewerOpen(true)
  }

  const downloadCertificate = (filename: string) => {
    const link = document.createElement('a')
    link.href = `/certificates/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
    setSelectedCertificate(null)
  }

  return (
    <div className="space-y-6">
      {/* Certificates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{cert.icon}</div>
              <div>
                <h4 className="font-semibold text-neutral-900">{cert.name}</h4>
                <p className="text-sm text-neutral-600">{cert.description}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openCertificate(cert)}
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                {lang === "uz" ? "Ko'rish" : lang === "ru" ? "Просмотр" : "View"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadCertificate(cert.filename)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">
                {selectedCertificate?.name}
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeViewer}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedCertificate && (
            <div className="mt-4">
              <div className="bg-neutral-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-neutral-600 mb-2">
                  {lang === "uz" ? "Sertifikat ma'lumotlari:" : 
                   lang === "ru" ? "Информация о сертификате:" : 
                   "Certificate Information:"}
                </p>
                <p className="text-neutral-800">{selectedCertificate.description}</p>
              </div>
              
              <div className="bg-white border rounded-lg overflow-hidden">
                <iframe
                  src={`/certificates/${selectedCertificate.filename}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-[70vh]"
                  title={selectedCertificate.name}
                />
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => downloadCertificate(selectedCertificate.filename)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {lang === "uz" ? "Yuklab olish" : 
                   lang === "ru" ? "Скачать" : 
                   "Download"}
                </Button>
                <Button onClick={closeViewer}>
                  {lang === "uz" ? "Yopish" : 
                   lang === "ru" ? "Закрыть" : 
                   "Close"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
