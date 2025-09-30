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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product, Category } from '@/types/shop';

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: Partial<Product>;
  onProductChange: (product: Partial<Product>) => void;
  categories: Category[];
  onAddProduct: () => void;
}

export default function AddProductDialog({
  isOpen,
  onOpenChange,
  newProduct,
  onProductChange,
  categories,
  onAddProduct,
}: AddProductDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-pink-500 hover:bg-pink-600">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить товар
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Новый товар</DialogTitle>
          <DialogDescription>
            Заполните информацию о товаре
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Название товара *</Label>
            <Input
              value={newProduct.name}
              onChange={(e) =>
                onProductChange({ ...newProduct, name: e.target.value })
              }
              placeholder="Введите название"
            />
          </div>
          <div>
            <Label>Категория *</Label>
            <Select
              value={newProduct.category}
              onValueChange={(value) =>
                onProductChange({ ...newProduct, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Цена *</Label>
              <Input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  onProductChange({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
                placeholder="0"
              />
            </div>
            <div>
              <Label>Старая цена</Label>
              <Input
                type="number"
                value={newProduct.oldPrice || ''}
                onChange={(e) =>
                  onProductChange({
                    ...newProduct,
                    oldPrice: Number(e.target.value),
                  })
                }
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <Label>Количество на складе</Label>
            <Input
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                onProductChange({
                  ...newProduct,
                  stock: Number(e.target.value),
                })
              }
              placeholder="0"
            />
          </div>
          <div>
            <Label>Статус</Label>
            <Select
              value={newProduct.status}
              onValueChange={(value: any) =>
                onProductChange({ ...newProduct, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Активен</SelectItem>
                <SelectItem value="draft">Черновик</SelectItem>
                <SelectItem value="outofstock">
                  Нет в наличии
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              value={newProduct.description}
              onChange={(e) =>
                onProductChange({
                  ...newProduct,
                  description: e.target.value,
                })
              }
              placeholder="Описание товара"
              rows={4}
            />
          </div>
          <Button
            onClick={onAddProduct}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            Добавить товар
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}