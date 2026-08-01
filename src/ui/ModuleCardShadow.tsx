

function ModuleCardShadow() {
  return (
   <div className="flex animate-pulse flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-card p-4 shadow">
      <div>
        <div className="flex items-start justify-between">
          <div className="h-11 w-11 rounded-xl bg-muted" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 rounded-full bg-muted" />
          </div>
        </div>

        <div className="mt-4 h-5 w-3/4 rounded bg-muted" />
        <div className="mt-2 h-4 w-full rounded bg-muted" />
        <div className="mt-1 h-4 w-2/3 rounded bg-muted" />

        <div className="mt-4 flex items-center gap-4">
          <div className="h-3.5 w-16 rounded bg-muted" />
          <div className="h-3.5 w-12 rounded bg-muted" />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between">
          <div className="h-3 w-14 rounded bg-muted" />
          <div className="h-3 w-8 rounded bg-muted" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted" />
        <div className="mt-4 h-10 w-full rounded-full bg-muted" />
      </div>
    </div>
  )
}

export default ModuleCardShadow