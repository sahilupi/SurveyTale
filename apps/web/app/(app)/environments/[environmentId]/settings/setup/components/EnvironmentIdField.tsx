"use client";

import CodeBlock from "@formbricks/ui/CodeBlock";

export default function SetupInstructions({ environmentId }: { environmentId: string }) {
  return (
    <div className="prose prose-slate -mt-3">
      <CodeBlock language="js">{environmentId}</CodeBlock>
    </div>
  );
}
