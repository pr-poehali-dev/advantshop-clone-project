import { Block } from '@/types/tilda';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BlockSettingsProps {
  block: Block;
  onUpdate: (block: Block) => void;
  onClose: () => void;
}

export default function BlockSettings({
  block,
  onUpdate,
  onClose,
}: BlockSettingsProps) {
  const updateContent = (key: string, value: string) => {
    onUpdate({
      ...block,
      content: { ...block.content, [key]: value },
    });
  };

  const updateStyles = (key: string, value: string) => {
    onUpdate({
      ...block,
      styles: { ...block.styles, [key]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Настройки блока
        </h3>
        <Button variant="outline" size="sm" onClick={onClose}>
          Закрыть
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Тип блока</Label>
          <p className="text-sm text-gray-600 mt-1 capitalize">{block.type}</p>
        </div>

        {(block.type === 'hero' || block.type === 'text' || block.type === 'features') && (
          <div>
            <Label>Заголовок</Label>
            <Input
              value={block.content.heading || ''}
              onChange={(e) => updateContent('heading', e.target.value)}
              placeholder="Введите заголовок"
            />
          </div>
        )}

        {block.type === 'hero' && (
          <div>
            <Label>Подзаголовок</Label>
            <Textarea
              value={block.content.subheading || ''}
              onChange={(e) => updateContent('subheading', e.target.value)}
              placeholder="Введите подзаголовок"
              rows={3}
            />
          </div>
        )}

        {block.type === 'text' && (
          <div>
            <Label>Текст</Label>
            <Textarea
              value={block.content.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              placeholder="Введите текст"
              rows={5}
            />
          </div>
        )}

        {(block.type === 'hero' || block.type === 'button') && (
          <>
            <div>
              <Label>Текст кнопки</Label>
              <Input
                value={block.content.buttonText || ''}
                onChange={(e) => updateContent('buttonText', e.target.value)}
                placeholder="Например: Начать"
              />
            </div>
            <div>
              <Label>Ссылка кнопки</Label>
              <Input
                value={block.content.buttonLink || ''}
                onChange={(e) => updateContent('buttonLink', e.target.value)}
                placeholder="https://"
              />
            </div>
          </>
        )}

        {block.type === 'image' && (
          <div>
            <Label>URL изображения</Label>
            <Input
              value={block.content.imageUrl || ''}
              onChange={(e) => updateContent('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        )}

        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-4">Стили</h4>

          <div className="space-y-4">
            <div>
              <Label>Цвет фона</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={block.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={block.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyles('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <Label>Цвет текста</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={block.styles.textColor || '#000000'}
                  onChange={(e) => updateStyles('textColor', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={block.styles.textColor || '#000000'}
                  onChange={(e) => updateStyles('textColor', e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <Label>Выравнивание текста</Label>
              <Select
                value={block.styles.textAlign || 'center'}
                onValueChange={(value) => updateStyles('textAlign', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Слева</SelectItem>
                  <SelectItem value="center">По центру</SelectItem>
                  <SelectItem value="right">Справа</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}