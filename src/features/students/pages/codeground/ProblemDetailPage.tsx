import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import StudentHeader from '../../components/StudentHeader'
import StudentSidebar from '../../components/StudentSidebar'
import ProblemDetailView from '../../components/codeground/ProblemDetailView'
import  { problems } from '../../components/codeground/mockproblem'

function ProblemDetailPage() {
  const { problemId } = useParams<{ problemId: string }>()
  const navigate = useNavigate()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const problem = problems.find((p) => p.id === Number(problemId))

  return (
    <div className="flex min-h-screen w-full">
      <StudentSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex flex-1 flex-col">
        <StudentHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-hidden bg-background">
          {problem ? (
            <ProblemDetailView problem={problem} onBack={() => navigate('/student/codeground')} />
          ) : (
            <div className="p-6 text-sm text-gray-500">Problem not found.</div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ProblemDetailPage