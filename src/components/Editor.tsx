const onEdDrop = (e: React.DragEvent) => {
    e.preventDefault(); if (!dragItem.current || !editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect();
    const item = dragItem.current; // ← capture avant de null
    dragItem.current = null;
    setPlaced(p => [...p, { ...item, x: e.clientX - rect.left - item.w / 2, y: e.clientY - rect.top - item.h / 2, uid: Date.now() }]);
};
