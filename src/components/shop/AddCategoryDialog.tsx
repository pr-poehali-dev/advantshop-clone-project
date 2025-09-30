import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AddCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newCategoryName: string;
  onCategoryNameChange: (name: string) => void;
  onAddCategory: () => void;
}

export default function AddCategoryDialog({
  isOpen,
  onOpenChange,
  newCategoryName,
  onCategoryNameChange,
  onAddCategory,
}: AddCategoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-pink-500 hover:bg-pink-600">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить категорию
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая категория</DialogTitle>
          <DialogDescription>
            Создайте новую категорию товаров
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Название категории</Label>
            <Input
              value={newCategoryName}
              onChange={(e) => onCategoryNameChange(e.target.value)}
              placeholder="Введите название"
            />
          </div>
          <Button
            onClick={onAddCategory}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            Добавить категорию
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}