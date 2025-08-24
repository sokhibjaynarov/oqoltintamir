import { getDictionary } from "../dictionaries"

type Lang = "en" | "ru" | "uz"

interface ProjectsPageProps {
  params: Promise<{ lang: Lang }>
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  try {
    console.log("ProjectsPage params:", params)
    
    if (!params) {
      throw new Error("Params are required")
    }
    
    const resolvedParams = await params
    console.log("ProjectsPage resolvedParams:", resolvedParams)
    
    if (!resolvedParams || !resolvedParams.lang) {
      throw new Error("Language parameter is required")
    }
    
    const { lang } = resolvedParams
    console.log("ProjectsPage lang:", lang)
    
    const dict = await getDictionary(lang)

    return (
      <div className="min-h-screen bg-neutral-50 p-8">
        <h1 className="text-3xl font-bold mb-4">
          {lang === "uz" ? "Loyihalar" : lang === "ru" ? "Проекты" : "Projects"}
        </h1>
        <p className="text-lg">
          {dict.projects.title}
        </p>
        <div className="mt-4">
          <p>Language: {lang}</p>
          <p>Company: {dict.common.company}</p>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in ProjectsPage:", error)
    
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Projects
          </h1>
          <p className="text-neutral-600">
            Error loading projects: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    )
  }
}
