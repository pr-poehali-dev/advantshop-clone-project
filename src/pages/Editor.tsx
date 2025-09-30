import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

interface Block {
  id: string;
  type: 'hero' | 'text' | 'products' | 'image' | 'gallery' | 'form' | 'features';
  title: string;
  content: any;
  styles: {
    background: string;
    padding: number;
    borderRadius: number;
  };
}

const Editor = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Главный баннер',
      content: { title: 'Добро пожаловать', subtitle: 'Создайте сайт своей мечты' },
      styles: { background: '#FF1493', padding: 60, borderRadius: 20 }
    },
    {
      id: '2',
      type: 'products',
      title: 'Товары',
      content: { count: 3 },
      styles: { background: '#FFFFFF', padding: 40, borderRadius: 15 }
    }
  ]);

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);

  const availableBlocks = [
    { type: 'hero', icon: 'Star', label: 'Баннер', color: '#FF1493' },
    { type: 'text', icon: 'Type', label: 'Текст', color: '#FFB6C1' },
    { type: 'products', icon: 'ShoppingBag', label: 'Товары', color: '#FF69B4' },
    { type: 'image', icon: 'Image', label: 'Изображение', color: '#FFC0CB' },
    { type: 'gallery', icon: 'Images', label: 'Галерея', color: '#FFB6C1' },
    { type: 'form', icon: 'Mail', label: 'Форма', color: '#FF69B4' },
    { type: 'features', icon: 'Grid', label: 'Преимущества', color: '#FFB6C1' }
  ];

  const addBlock = (type: string) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type: type as any,
      title: `Новый блок ${type}`,
      content: {},
      styles: { background: '#FFFFFF', padding: 40, borderRadius: 15 }
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    setSelectedBlock(null);
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(newBlocks);
  };

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'hero':
        return (
          <div className="text-center py-20" style={{ background: block.styles.background, borderRadius: block.styles.borderRadius }}>
            <h1 className="text-5xl font-bold text-white mb-4">{block.content.title || 'Заголовок'}</h1>
            <p className="text-xl text-white/90">{block.content.subtitle || 'Подзаголовок'}</p>
          </div>
        );
      case 'text':
        return (
          <div className="prose max-w-none" style={{ padding: block.styles.padding, borderRadius: block.styles.borderRadius }}>
            <p>{block.content.text || 'Введите текст...'}</p>
          </div>
        );
      case 'products':
        return (
          <div className="grid grid-cols-3 gap-4" style={{ padding: block.styles.padding }}>
            {[1, 2, 3].map(i => (
              <Card key={i} className="p-4 wave-border-soft">
                <div className="h-40 bg-pink-100 rounded-lg mb-3" />
                <h3 className="font-bold mb-2">Товар {i}</h3>
                <p className="text-pink-600 font-semibold">1 000 руб</p>
              </Card>
            ))}
          </div>
        );
      case 'image':
        return (
          <div style={{ padding: block.styles.padding }}>
            <div className="h-64 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
              <Icon name="Image" size={48} className="text-pink-400" />
            </div>
          </div>
        );
      default:
        return <div className="p-8 text-center text-gray-500">Блок {block.type}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
                Визуальный редактор
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-full">
                <Icon name="Eye" size={16} className="mr-2" />
                Предпросмотр
              </Button>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full">
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        <aside className="w-80 bg-white border-r overflow-y-auto">
          <Tabs defaultValue="blocks" className="w-full">
            <TabsList className="w-full rounded-none">
              <TabsTrigger value="blocks" className="flex-1">
                <Icon name="Plus" size={16} className="mr-2" />
                Блоки
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blocks" className="p-4 space-y-3">
              <div className="mb-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Sparkles" size={16} className="text-pink-500" />
                  Добавить блок
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {availableBlocks.map((block) => (
                    <Card
                      key={block.type}
                      className="p-3 cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 wave-border-soft"
                      onClick={() => addBlock(block.type)}
                      style={{ borderLeft: `4px solid ${block.color}` }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: block.color }}>
                          <Icon name={block.icon as any} size={20} className="text-white" />
                        </div>
                        <span className="text-xs font-medium text-center">{block.label}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Layers" size={16} className="text-pink-500" />
                  Структура страницы
                </h3>
                <div className="space-y-2">
                  {blocks.map((block, index) => (
                    <Card
                      key={block.id}
                      className={`p-3 cursor-pointer hover:shadow-md transition-all ${
                        selectedBlock?.id === block.id ? 'ring-2 ring-pink-500' : ''
                      }`}
                      onClick={() => setSelectedBlock(block)}
                      draggable
                      onDragStart={() => setDraggedBlock(block)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggedBlock) {
                          const fromIndex = blocks.findIndex(b => b.id === draggedBlock.id);
                          moveBlock(fromIndex, index);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon name="GripVertical" size={16} className="text-gray-400" />
                          <span className="text-sm font-medium">{block.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBlock(block.id);
                          }}
                        >
                          <Icon name="Trash2" size={14} className="text-red-500" />
                        </Button>
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">{block.type}</Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-4">
              {selectedBlock ? (
                <>
                  <div>
                    <h3 className="font-semibold mb-3">Настройки блока</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Название блока</Label>
                        <Input
                          value={selectedBlock.title}
                          onChange={(e) => updateBlock(selectedBlock.id, { title: e.target.value })}
                          className="rounded-full mt-1"
                        />
                      </div>

                      {selectedBlock.type === 'hero' && (
                        <>
                          <div>
                            <Label>Заголовок</Label>
                            <Input
                              value={selectedBlock.content.title || ''}
                              onChange={(e) => updateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, title: e.target.value }
                              })}
                              className="rounded-full mt-1"
                            />
                          </div>
                          <div>
                            <Label>Подзаголовок</Label>
                            <Input
                              value={selectedBlock.content.subtitle || ''}
                              onChange={(e) => updateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, subtitle: e.target.value }
                              })}
                              className="rounded-full mt-1"
                            />
                          </div>
                        </>
                      )}

                      {selectedBlock.type === 'text' && (
                        <div>
                          <Label>Текст</Label>
                          <Textarea
                            value={selectedBlock.content.text || ''}
                            onChange={(e) => updateBlock(selectedBlock.id, {
                              content: { ...selectedBlock.content, text: e.target.value }
                            })}
                            className="mt-1"
                            rows={5}
                          />
                        </div>
                      )}

                      <div>
                        <Label>Цвет фона</Label>
                        <div className="flex gap-2 mt-2">
                          {['#FFFFFF', '#FFB6C1', '#FF69B4', '#FF1493', '#1F2937'].map(color => (
                            <button
                              key={color}
                              className="w-10 h-10 rounded-full border-2 hover:scale-110 transition-transform"
                              style={{ 
                                backgroundColor: color,
                                borderColor: selectedBlock.styles.background === color ? '#FF1493' : '#E5E7EB'
                              }}
                              onClick={() => updateBlock(selectedBlock.id, {
                                styles: { ...selectedBlock.styles, background: color }
                              })}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Отступы: {selectedBlock.styles.padding}px</Label>
                        <Slider
                          value={[selectedBlock.styles.padding]}
                          onValueChange={([value]) => updateBlock(selectedBlock.id, {
                            styles: { ...selectedBlock.styles, padding: value }
                          })}
                          min={0}
                          max={100}
                          step={5}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>Скругление: {selectedBlock.styles.borderRadius}px</Label>
                        <Slider
                          value={[selectedBlock.styles.borderRadius]}
                          onValueChange={([value]) => updateBlock(selectedBlock.id, {
                            styles: { ...selectedBlock.styles, borderRadius: value }
                          })}
                          min={0}
                          max={50}
                          step={5}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Icon name="Settings" size={48} className="mx-auto mb-3 opacity-30" />
                  <p>Выберите блок для настройки</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white shadow-lg overflow-hidden">
              {blocks.length === 0 ? (
                <div className="py-20 text-center">
                  <Icon name="Plus" size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">Добавьте первый блок</p>
                  <p className="text-sm text-gray-400">Выберите блок из левой панели</p>
                </div>
              ) : (
                <div className="divide-y">
                  {blocks.map((block, index) => (
                    <div
                      key={block.id}
                      className={`relative group cursor-pointer transition-all ${
                        selectedBlock?.id === block.id ? 'ring-2 ring-pink-500 ring-inset' : ''
                      }`}
                      onClick={() => setSelectedBlock(block)}
                    >
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-2">
                        {index > 0 && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBlock(index, index - 1);
                            }}
                          >
                            <Icon name="ArrowUp" size={14} />
                          </Button>
                        )}
                        {index < blocks.length - 1 && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveBlock(index, index + 1);
                            }}
                          >
                            <Icon name="ArrowDown" size={14} />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBlock(block.id);
                          }}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </div>
                      {renderBlock(block)}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Editor;