'use client';

import { Editor } from '@/components/Editor';

export default function EditeurPage({ params }: { params: { tool: string } }) {
  return <Editor toolId={params.tool} />;
}
