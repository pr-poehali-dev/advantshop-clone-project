import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Block } from '@/types/tilda';
import BlockRenderer from '@/components/tilda/BlockRenderer';
import BlockLibrary from '@/components/tilda/BlockLibrary';
import BlockSettings from '@/components/tilda/BlockSettings';
import { useProject } from '@/contexts/ProjectContext';
import { toast } from 'sonner';

export default function TildaEditor() {
  const navigate = useNavigate();
  const { currentProject, updateProject } = useProject();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [showLibrary, setShowLibrary] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!currentProject) {
      navigate('/tilda');
      return;
    }
    const currentPage = currentProject.pages[0];
    if (currentPage) {
      setBlocks(currentPage.blocks);
    }
  }, [currentProject, navigate]);

  useEffect(() => {
    if (currentProject && blocks) {
      const updatedProject = {
        ...currentProject,
        pages: currentProject.pages.map((page, idx) =>
          idx === 0
            ? { ...page, blocks, updatedAt: new Date() }
            : page
        ),
      };
      updateProject(updatedProject);
    }
  }, [blocks]);

  const addBlock = (blockTemplate: Omit<Block, 'id' | 'order'>) => {
    const newBlock: Block = {
      ...blockTemplate,
      id: Date.now().toString(),
      order: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
    toast.success('Блок добавлен');
  };

  const updateBlock = (updatedBlock: Block) => {
    setBlocks(blocks.map((b) => (b.id === updatedBlock.id ? updatedBlock : b)));
    setSelectedBlock(updatedBlock);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
    setSelectedBlock(null);
    setShowSettings(false);
    toast.success('Блок удален');
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    )
      return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
  };

  const editBlock = (block: Block) => {
    setSelectedBlock(block);
    setShowSettings(true);
    setShowLibrary(false);
  };

  if (!currentProject) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/tilda')}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentProject.name}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={isPreview ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              className={isPreview ? 'bg-pink-500 hover:bg-pink-600' : ''}
            >
              <Icon
                name={isPreview ? 'Edit' : 'Eye'}
                size={16}
                className="mr-2"
              />
              {isPreview ? 'Редактор' : 'Превью'}
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            >
              <Icon name="Globe" size={16} className="mr-2" />
              Опубликовать
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        {!isPreview && (
          <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex space-x-2 mb-4">
                <Button
                  variant={showLibrary ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setShowLibrary(true);
                    setShowSettings(false);
                  }}
                  className={
                    showLibrary
                      ? 'flex-1 bg-pink-500 hover:bg-pink-600'
                      : 'flex-1'
                  }
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
                <Button
                  variant={showSettings ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setShowLibrary(false);
                    setShowSettings(true);
                  }}
                  disabled={!selectedBlock}
                  className={
                    showSettings
                      ? 'flex-1 bg-pink-500 hover:bg-pink-600'
                      : 'flex-1'
                  }
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки
                </Button>
              </div>

              {showLibrary && <BlockLibrary onAddBlock={addBlock} />}
              {showSettings && selectedBlock && (
                <BlockSettings
                  block={selectedBlock}
                  onUpdate={updateBlock}
                  onClose={() => setShowSettings(false)}
                />
              )}
            </div>
          </aside>
        )}

        <main
          className={`flex-1 overflow-y-auto ${isPreview ? 'bg-white' : 'bg-gray-100'}`}
        >
          {blocks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <Icon name="Layout" size={48} className="text-pink-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Начните создавать
                </h2>
                <p className="text-gray-600 mb-6">
                  Добавьте первый блок из библиотеки слева
                </p>
                <Button
                  onClick={() => setShowLibrary(true)}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить блок
                </Button>
              </div>
            </div>
          ) : (
            <div className={isPreview ? '' : 'p-8 space-y-2'}>
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`relative ${!isPreview ? 'group' : ''}`}
                >
                  {!isPreview && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => moveBlock(block.id, 'up')}
                        disabled={index === 0}
                        className="bg-white shadow-lg"
                      >
                        <Icon name="ChevronUp" size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => moveBlock(block.id, 'down')}
                        disabled={index === blocks.length - 1}
                        className="bg-white shadow-lg"
                      >
                        <Icon name="ChevronDown" size={14} />
                      </Button>
                    </div>
                  )}
                  <BlockRenderer
                    block={block}
                    isEditing={!isPreview}
                    onEdit={() => editBlock(block)}
                    onDelete={() => deleteBlock(block.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}