import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/shop';

interface ProductsTableProps {
  products: Product[];
  hasEditPermission: boolean;
  hasDeletePermission: boolean;
  onDeleteProduct: (id: string) => void;
}

export default function ProductsTable({
  products,
  hasEditPermission,
  hasDeletePermission,
  onDeleteProduct,
}: ProductsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'outofstock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'draft':
        return 'Черновик';
      case 'outofstock':
        return 'Нет в наличии';
      default:
        return status;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Товар</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Склад</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{product.image}</div>
                <div>
                  <p className="font-medium text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.description.slice(0, 40)}...
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{product.category}</Badge>
            </TableCell>
            <TableCell>
              <div>
                <p className="font-semibold text-gray-900">
                  {product.price} ₽
                </p>
                {product.oldPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    {product.oldPrice} ₽
                  </p>
                )}
              </div>
            </TableCell>
            <TableCell>
              <span
                className={
                  product.stock > 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {product.stock} шт
              </span>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={getStatusColor(product.status)}
              >
                {getStatusLabel(product.status)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                {hasEditPermission && (
                  <Button variant="ghost" size="icon">
                    <Icon name="Edit" size={18} />
                  </Button>
                )}
                {hasDeletePermission && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}