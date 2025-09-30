import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AddCategoryDialog from './AddCategoryDialog';
import { Category } from '@/types/shop';

interface CategoriesTabProps {
  categories: Category[];
  isAddCategoryOpen: boolean;
  onAddCategoryOpenChange: (open: boolean) => void;
  newCategoryName: string;
  onCategoryNameChange: (name: string) => void;
  onAddCategory: () => void;
  onDeleteCategory: (id: string) => void;
  hasDeletePermission: boolean;
}

export default function CategoriesTab({
  categories,
  isAddCategoryOpen,
  onAddCategoryOpenChange,
  newCategoryName,
  onCategoryNameChange,
  onAddCategory,
  onDeleteCategory,
  hasDeletePermission,
}: CategoriesTabProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Категории товаров
        </h3>
        <AddCategoryDialog
          isOpen={isAddCategoryOpen}
          onOpenChange={onAddCategoryOpenChange}
          newCategoryName={newCategoryName}
          onCategoryNameChange={onCategoryNameChange}
          onAddCategory={onAddCategory}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {category.productsCount} товаров
                </p>
              </div>
              {hasDeletePermission && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Icon name="Trash2" size={18} />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}