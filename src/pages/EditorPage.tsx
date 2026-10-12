import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Type, Image, Square, Circle, Trash2, Copy, Undo2, Redo2, Save, Download, ZoomIn, ZoomOut, Maximize2, Layers, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Minus, Plus, RotateCw, ChevronDown, QrCode, Upload } from 'lucide-react';
import { useStore } from '../store';
import { products } from '../data';
import { v4 as uuidv4 } from 'uuid';

interface CanvasObject {
  id: string;
  type: 'text' | 'image' | 'shape' | 'qr';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: string;
  src?: string;
  shapeType?: string;
  cornerRadius?: number;
  locked?: boolean;
}

export function EditorPage() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveProject, user } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const product = productId ? products.find(p => p.id === productId) : null;
  const templateId = searchParams.get('template');

  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<CanvasObject[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeTool, setActiveTool] = useState<string>('select');
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });
  const [projectName, setProjectName] = useState(product ? `${product.name} Design` : 'Untitled Design');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragObjStart, setDragObjStart] = useState({ x: 0, y: 0 });

  const selectedObject = objects.find(o => o.id === selectedId);

  // Canvas dimensions based on product
  useEffect(() => {
    if (product) {
      if (product.category === 'business-essentials') setCanvasSize({ width: 700, height: 400 });
      else if (product.category === 'signs-displays') setCanvasSize({ width: 600, height: 800 });
      else if (product.category === 'stickers-labels') setCanvasSize({ width: 500, height: 500 });
      else setCanvasSize({ width: 800, height: 500 });
    }
  }, [product]);

  // Push to history
  const pushHistory = useCallback((newObjects: CanvasObject[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newObjects]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setObjects([...history[historyIndex - 1]]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setObjects([...history[historyIndex + 1]]);
    }
  };

  const addObject = (type: CanvasObject['type'], extra?: Partial<CanvasObject>) => {
    const newObj: CanvasObject = {
      id: uuidv4(),
      type,
      x: canvasSize.width / 2 - 50,
      y: canvasSize.height / 2 - 25,
      width: 100,
      height: 50,
      rotation: 0,
      fill: type === 'text' ? '#1a1a1a' : '#2563eb',
      stroke: 'transparent',
      strokeWidth: 0,
      opacity: 1,
      ...extra,
    };
    if (type === 'text') {
      newObj.text = 'Your text here';
      newObj.fontSize = 24;
      newObj.fontFamily = 'Inter';
      newObj.fontWeight = 'normal';
      newObj.textAlign = 'center';
      newObj.width = 200;
      newObj.height = 40;
    }
    if (type === 'shape') {
      newObj.shapeType = extra?.shapeType || 'rect';
      if (newObj.shapeType === 'circle') {
        newObj.width = 80;
        newObj.height = 80;
      }
    }
    if (type === 'qr') {
      newObj.text = 'https://printcraftpro.com';
      newObj.width = 100;
      newObj.height = 100;
    }
    const newObjects = [...objects, newObj];
    setObjects(newObjects);
    pushHistory(newObjects);
    setSelectedId(newObj.id);
    setActiveTool('select');
  };

  const updateObject = (id: string, updates: Partial<CanvasObject>) => {
    const newObjects = objects.map(o => o.id === id ? { ...o, ...updates } : o);
    setObjects(newObjects);
  };

  const commitUpdate = () => {
    pushHistory(objects);
  };

  const deleteObject = (id: string) => {
    const newObjects = objects.filter(o => o.id !== id);
    setObjects(newObjects);
    pushHistory(newObjects);
    if (selectedId === id) setSelectedId(null);
  };

  const duplicateObject = (id: string) => {
    const obj = objects.find(o => o.id === id);
    if (!obj) return;
    const newObj = { ...obj, id: uuidv4(), x: obj.x + 20, y: obj.y + 20 };
    const newObjects = [...objects, newObj];
    setObjects(newObjects);
    pushHistory(newObjects);
    setSelectedId(newObj.id);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    // Check if clicked on an object (reverse order for top-most)
    let found = false;
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      if (x >= obj.x && x <= obj.x + obj.width && y >= obj.y && y <= obj.y + obj.height) {
        setSelectedId(obj.id);
        setIsDragging(true);
        setDragStart({ x, y });
        setDragObjStart({ x: obj.x, y: obj.y });
        found = true;
        break;
      }
    }
    if (!found) setSelectedId(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    const dx = x - dragStart.x;
    const dy = y - dragStart.y;
    updateObject(selectedId, { x: dragObjStart.x + dx, y: dragObjStart.y + dy });
  };

  const handleCanvasMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      commitUpdate();
    }
  };

  const handleSave = () => {
    const project: any = {
      id: uuidv4(),
      name: projectName,
      productId: productId || '',
      thumbnail: objects.length > 0 ? `https://picsum.photos/seed/${Date.now()}/400/300` : 'https://picsum.photos/seed/default/400/300',
      lastModified: new Date().toISOString(),
      pages: [{ id: 'p1', width: canvasSize.width, height: canvasSize.height, objects: objects.map(o => ({ ...o })) }],
    };
    saveProject(project);
    setShowSaveDialog(false);
    alert('Project saved successfully!');
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          addObject('image', { src: ev.target?.result as string, width: 150, height: 150 });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Render canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Bleed area indicator
    ctx.strokeStyle = '#e5e7eb';
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(15, 15, canvasSize.width - 30, canvasSize.height - 30);
    ctx.setLineDash([]);

    // Safe area
    ctx.strokeStyle = '#dbeafe';
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(30, 30, canvasSize.width - 60, canvasSize.height - 60);
    ctx.setLineDash([]);

    // Objects
    objects.forEach(obj => {
      ctx.save();
      ctx.globalAlpha = obj.opacity;
      
      if (obj.rotation) {
        ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        ctx.rotate((obj.rotation * Math.PI) / 180);
        ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
      }

      if (obj.type === 'text') {
        ctx.fillStyle = obj.fill;
        ctx.font = `${obj.fontWeight || 'normal'} ${obj.fontSize || 24}px ${obj.fontFamily || 'Inter'}`;
        ctx.textAlign = (obj.textAlign as CanvasTextAlign) || 'left';
        const textX = obj.textAlign === 'center' ? obj.x + obj.width / 2 : obj.textAlign === 'right' ? obj.x + obj.width : obj.x;
        ctx.fillText(obj.text || '', textX, obj.y + (obj.fontSize || 24));
      } else if (obj.type === 'shape') {
        ctx.fillStyle = obj.fill;
        if (obj.shapeType === 'circle') {
          ctx.beginPath();
          ctx.ellipse(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, obj.height / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          if (obj.stroke !== 'transparent') { ctx.strokeStyle = obj.stroke; ctx.lineWidth = obj.strokeWidth; ctx.stroke(); }
        } else {
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          if (obj.stroke !== 'transparent') { ctx.strokeStyle = obj.stroke; ctx.lineWidth = obj.strokeWidth; ctx.strokeRect(obj.x, obj.y, obj.width, obj.height); }
        }
      } else if (obj.type === 'image' && obj.src) {
        // Draw placeholder for image
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.strokeStyle = '#d1d5db';
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('📷 Image', obj.x + obj.width / 2, obj.y + obj.height / 2 + 4);
      } else if (obj.type === 'qr') {
        // QR code placeholder
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        // Draw QR pattern
        const cellSize = obj.width / 10;
        for (let r = 0; r < 10; r++) {
          for (let c = 0; c < 10; c++) {
            if (Math.random() > 0.5 || (r < 3 && c < 3) || (r < 3 && c > 6) || (r > 6 && c < 3)) {
              ctx.fillStyle = '#1a1a1a';
              ctx.fillRect(obj.x + c * cellSize, obj.y + r * cellSize, cellSize, cellSize);
            }
          }
        }
      }

      // Selection indicator
      if (obj.id === selectedId) {
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.strokeRect(obj.x - 4, obj.y - 4, obj.width + 8, obj.height + 8);
        // Corner handles
        const handles = [[obj.x - 4, obj.y - 4], [obj.x + obj.width + 4, obj.y - 4], [obj.x - 4, obj.y + obj.height + 4], [obj.x + obj.width + 4, obj.y + obj.height + 4]];
        handles.forEach(([hx, hy]) => {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(hx - 4, hy - 4, 8, 8);
          ctx.strokeStyle = '#2563eb';
          ctx.strokeRect(hx - 4, hy - 4, 8, 8);
        });
      }

      ctx.restore();
    });
  }, [objects, selectedId, canvasSize]);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-gray-100">
      {/* Top Toolbar */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="text-sm font-medium border-0 focus:outline-none focus:ring-0 bg-transparent w-48" />
          {product && <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">{product.name}</span>}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={undo} disabled={historyIndex === 0} className="p-2 hover:bg-gray-100 rounded disabled:opacity-30" title="Undo"><Undo2 className="w-4 h-4" /></button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-2 hover:bg-gray-100 rounded disabled:opacity-30" title="Redo"><Redo2 className="w-4 h-4" /></button>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button onClick={() => setZoom(z => Math.max(0.25, z - 0.25))} className="p-2 hover:bg-gray-100 rounded"><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs text-gray-600 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-2 hover:bg-gray-100 rounded"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => setZoom(1)} className="p-2 hover:bg-gray-100 rounded" title="Fit"><Maximize2 className="w-4 h-4" /></button>
          <div className="w-px h-6 bg-gray-200 mx-1" />
          <button onClick={() => setShowSaveDialog(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700"><Save className="w-3.5 h-3.5" /> Save</button>
          {product && (
            <button onClick={() => { handleSave(); navigate('/cart'); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 ml-2">Add to Cart</button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-14 bg-white border-r flex flex-col items-center py-3 gap-1 shrink-0">
          <button onClick={() => setActiveTool('select')} className={`p-2.5 rounded-lg ${activeTool === 'select' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100'}`} title="Select"><Layers className="w-5 h-5" /></button>
          <button onClick={() => addObject('text')} className={`p-2.5 rounded-lg ${activeTool === 'text' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-100'}`} title="Add Text"><Type className="w-5 h-5" /></button>
          <button onClick={handleImageUpload} className="p-2.5 rounded-lg text-gray-600 hover:bg-gray-100" title="Upload Image"><Image className="w-5 h-5" /></button>
          <button onClick={() => addObject('shape', { shapeType: 'rect' })} className="p-2.5 rounded-lg text-gray-600 hover:bg-gray-100" title="Rectangle"><Square className="w-5 h-5" /></button>
          <button onClick={() => addObject('shape', { shapeType: 'circle' })} className="p-2.5 rounded-lg text-gray-600 hover:bg-gray-100" title="Circle"><Circle className="w-5 h-5" /></button>
          <button onClick={() => addObject('qr')} className="p-2.5 rounded-lg text-gray-600 hover:bg-gray-100" title="QR Code"><QrCode className="w-5 h-5" /></button>
          <div className="w-8 h-px bg-gray-200 my-1" />
          <button onClick={() => selectedId && duplicateObject(selectedId)} disabled={!selectedId} className="p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30" title="Duplicate"><Copy className="w-5 h-5" /></button>
          <button onClick={() => selectedId && deleteObject(selectedId)} disabled={!selectedId} className="p-2.5 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-30" title="Delete"><Trash2 className="w-5 h-5" /></button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8" ref={containerRef}>
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }} className="transition-transform">
            <canvas
              ref={canvasRef}
              className="bg-white shadow-xl rounded cursor-crosshair"
              style={{ width: canvasSize.width, height: canvasSize.height }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
          </div>
        </div>

        {/* Right Properties Panel */}
        <div className="w-64 bg-white border-l overflow-y-auto shrink-0">
          {selectedObject ? (
            <div className="p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm">Properties</h3>
              
              {/* Position */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Position</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <span className="text-[10px] text-gray-400">X</span>
                    <input type="number" value={Math.round(selectedObject.x)} onChange={(e) => updateObject(selectedObject.id, { x: parseInt(e.target.value) })} onBlur={commitUpdate} className="w-full px-2 py-1 text-xs border rounded" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400">Y</span>
                    <input type="number" value={Math.round(selectedObject.y)} onChange={(e) => updateObject(selectedObject.id, { y: parseInt(e.target.value) })} onBlur={commitUpdate} className="w-full px-2 py-1 text-xs border rounded" />
                  </div>
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Size</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div>
                    <span className="text-[10px] text-gray-400">W</span>
                    <input type="number" value={Math.round(selectedObject.width)} onChange={(e) => updateObject(selectedObject.id, { width: parseInt(e.target.value) })} onBlur={commitUpdate} className="w-full px-2 py-1 text-xs border rounded" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400">H</span>
                    <input type="number" value={Math.round(selectedObject.height)} onChange={(e) => updateObject(selectedObject.id, { height: parseInt(e.target.value) })} onBlur={commitUpdate} className="w-full px-2 py-1 text-xs border rounded" />
                  </div>
                </div>
              </div>

              {/* Rotation */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Rotation</label>
                <div className="flex items-center gap-2 mt-1">
                  <input type="range" min="0" max="360" value={selectedObject.rotation} onChange={(e) => updateObject(selectedObject.id, { rotation: parseInt(e.target.value) })} onMouseUp={commitUpdate} className="flex-1 accent-brand-600" />
                  <span className="text-xs text-gray-600 w-8">{selectedObject.rotation}°</span>
                </div>
              </div>

              {/* Opacity */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Opacity</label>
                <div className="flex items-center gap-2 mt-1">
                  <input type="range" min="0" max="100" value={selectedObject.opacity * 100} onChange={(e) => updateObject(selectedObject.id, { opacity: parseInt(e.target.value) / 100 })} onMouseUp={commitUpdate} className="flex-1 accent-brand-600" />
                  <span className="text-xs text-gray-600 w-8">{Math.round(selectedObject.opacity * 100)}%</span>
                </div>
              </div>

              {/* Fill Color */}
              <div>
                <label className="text-xs text-gray-500 font-medium">Fill Color</label>
                <div className="flex items-center gap-2 mt-1">
                  <input type="color" value={selectedObject.fill} onChange={(e) => updateObject(selectedObject.id, { fill: e.target.value })} onBlur={commitUpdate} className="w-8 h-8 rounded border cursor-pointer" />
                  <input type="text" value={selectedObject.fill} onChange={(e) => updateObject(selectedObject.id, { fill: e.target.value })} onBlur={commitUpdate} className="flex-1 px-2 py-1 text-xs border rounded" />
                </div>
              </div>

              {/* Text Properties */}
              {selectedObject.type === 'text' && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Text</label>
                    <textarea value={selectedObject.text} onChange={(e) => updateObject(selectedObject.id, { text: e.target.value })} onBlur={commitUpdate} className="w-full px-2 py-1 text-xs border rounded mt-1 resize-none h-16" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Font Size</label>
                    <input type="number" value={selectedObject.fontSize} onChange={(e) => updateObject(selectedObject.id, { fontSize: parseInt(e.target.value) })} onBlur={commitUpdate} className="w-full px-2 py-1 text-xs border rounded mt-1" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Font Family</label>
                    <select value={selectedObject.fontFamily} onChange={(e) => updateObject(selectedObject.id, { fontFamily: e.target.value })} onBlur={commitUpdate} className="w-full px-2 py-1 text-xs border rounded mt-1">
                      <option value="Inter">Inter</option>
                      <option value="Arial">Arial</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Verdana">Verdana</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Alignment</label>
                    <div className="flex gap-1 mt-1">
                      <button onClick={() => { updateObject(selectedObject.id, { textAlign: 'left' }); commitUpdate(); }} className={`p-1.5 rounded ${selectedObject.textAlign === 'left' ? 'bg-brand-50 text-brand-600' : 'hover:bg-gray-100'}`}><AlignLeft className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { updateObject(selectedObject.id, { textAlign: 'center' }); commitUpdate(); }} className={`p-1.5 rounded ${selectedObject.textAlign === 'center' ? 'bg-brand-50 text-brand-600' : 'hover:bg-gray-100'}`}><AlignCenter className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { updateObject(selectedObject.id, { textAlign: 'right' }); commitUpdate(); }} className={`p-1.5 rounded ${selectedObject.textAlign === 'right' ? 'bg-brand-50 text-brand-600' : 'hover:bg-gray-100'}`}><AlignRight className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { updateObject(selectedObject.id, { fontWeight: selectedObject.fontWeight === 'bold' ? 'normal' : 'bold' }); commitUpdate(); }} className={`p-1.5 rounded ${selectedObject.fontWeight === 'bold' ? 'bg-brand-50 text-brand-600' : 'hover:bg-gray-100'}`}><Bold className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded hover:bg-gray-100"><Italic className="w-3.5 h-3.5" /></button>
                  </div>
                </>
              )}

              {/* Stroke */}
              {selectedObject.type === 'shape' && (
                <div>
                  <label className="text-xs text-gray-500 font-medium">Stroke</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="color" value={selectedObject.stroke === 'transparent' ? '#000000' : selectedObject.stroke} onChange={(e) => updateObject(selectedObject.id, { stroke: e.target.value })} onBlur={commitUpdate} className="w-8 h-8 rounded border cursor-pointer" />
                    <input type="number" value={selectedObject.strokeWidth} onChange={(e) => updateObject(selectedObject.id, { strokeWidth: parseInt(e.target.value) })} onBlur={commitUpdate} className="w-16 px-2 py-1 text-xs border rounded" min="0" max="20" />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-3 border-t space-y-2">
                <button onClick={() => duplicateObject(selectedObject.id)} className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50"><Copy className="w-3 h-3" /> Duplicate</button>
                <button onClick={() => deleteObject(selectedObject.id)} className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs border border-red-200 text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-3 h-3" /> Delete</button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Canvas</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium">Canvas Size</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-[10px] text-gray-400">Width</span>
                      <input type="number" value={canvasSize.width} onChange={(e) => setCanvasSize(s => ({ ...s, width: parseInt(e.target.value) }))} className="w-full px-2 py-1 text-xs border rounded" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400">Height</span>
                      <input type="number" value={canvasSize.height} onChange={(e) => setCanvasSize(s => ({ ...s, height: parseInt(e.target.value) }))} className="w-full px-2 py-1 text-xs border rounded" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">
                    <strong>Tip:</strong> Click tools on the left to add elements. Click elements to select and edit them. Drag to reposition.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-700">
                    <strong>Bleed area:</strong> The outer dashed line. <br/>
                    <strong>Safe area:</strong> The inner dashed line. Keep important content within the safe area.
                  </p>
                </div>
              </div>

              {/* Layers */}
              <h3 className="font-semibold text-gray-900 text-sm mt-6 mb-2">Layers ({objects.length})</h3>
              <div className="space-y-1">
                {[...objects].reverse().map(obj => (
                  <button key={obj.id} onClick={() => setSelectedId(obj.id)} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left ${obj.id === selectedId ? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-50 text-gray-600'}`}>
                    {obj.type === 'text' && <Type className="w-3 h-3" />}
                    {obj.type === 'image' && <Image className="w-3 h-3" />}
                    {obj.type === 'shape' && <Square className="w-3 h-3" />}
                    {obj.type === 'qr' && <QrCode className="w-3 h-3" />}
                    <span className="truncate">{obj.type === 'text' ? obj.text?.slice(0, 20) : obj.type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Save Project</h3>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Project name" />
            <div className="flex gap-3">
              <button onClick={() => setShowSaveDialog(false)} className="flex-1 px-4 py-2.5 border rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
