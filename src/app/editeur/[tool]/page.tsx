
'use client';
import { Editor } from '@/components/Editor';
import { use } from 'react';
export default function EditeurPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = use(params);
  return <Editor toolId={tool} />;
}
