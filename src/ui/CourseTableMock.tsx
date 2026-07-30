

function CourseTableMock() {
    const rows = [
    { icon: "H", color: "bg-[#F3EEFF] text-[#7C3AED]", name: "Basic HTML 3", lessons: "12/15", level: "Beginner", levelClr: "text-[#1A1A1A]" },
    { icon: "P", color: "bg-[#E9F2FF] text-[#2563EB]", name: "Python for Abs…", lessons: "8/12", level: "Expert", levelClr: "text-[#F59E0B]" },
    { icon: "A", color: "bg-[#F3F0FF] text-[#7C3AED]", name: "Think Different…", lessons: "5/10", level: "Expert", levelClr: "text-[#F59E0B]" },
  ];
  return (
   <div className="mt-5 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="mb-2 text-[13px] font-semibold text-[#1A1A1A]">Course</div>
      <div className="grid grid-cols-[1fr_60px_70px] gap-2 border-b border-black/5 pb-2 text-[10px] font-medium text-[#8A8A8A]">
        <span>Course Name</span>
        <span>Lessons</span>
        <span>Level</span>
      </div>
      <div className="divide-y divide-black/[0.04]">
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-[1fr_60px_70px] items-center gap-2 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <div className={`grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold ${r.color}`}>{r.icon}</div>
              <span className="truncate text-[11px] font-medium text-[#1A1A1A]">{r.name}</span>
            </div>
            <span className="text-[11px] text-[#1A1A1A]">{r.lessons}</span>
            <span className={`text-[11px] font-semibold ${r.levelClr}`}>{r.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseTableMock