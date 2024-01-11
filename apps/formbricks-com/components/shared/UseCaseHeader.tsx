interface UseCaseHeaderProps {
  title: string;

  difficulty: string;
  setupMinutes: string;
}

export default function UseCaseHeader({ title, difficulty, setupMinutes }: UseCaseHeaderProps) {
  return (
    <div>
      <div className="mb-4 flex-wrap space-y-2">
        <h1 className="mb-2 inline whitespace-nowrap pr-4 text-3xl font-semibold text-slate-800 dark:text-slate-200 ">
          {title}
        </h1>
        <div className="inline-flex items-center justify-center whitespace-nowrap ">
          <div className="rounded-full bg-indigo-200 px-4 py-1 text-sm text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200 ">
            {difficulty}
          </div>
          <div className="ml-2 rounded-full bg-slate-300 px-4 py-1 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-200  ">
            {setupMinutes} minutes
          </div>
        </div>
      </div>
    </div>
  );
}
