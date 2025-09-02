
import React from 'react';
import { Product } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface InventoryTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">Producto</th>
            <th scope="col" className="px-6 py-3">Categoría</th>
            <th scope="col" className="px-6 py-3 text-center">Cantidad</th>
            <th scope="col" className="px-6 py-3 text-right">Precio</th>
            <th scope="col" className="px-6 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map((product) => (
            <tr key={product.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                {product.name}
              </td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4 text-center">{product.quantity}</td>
              <td className="px-6 py-4 text-right">{product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center items-center gap-4">
                  <button onClick={() => onEdit(product)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" title="Editar">
                    <EditIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => onDelete(product)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors" title="Eliminar">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5} className="text-center py-10 text-slate-500 dark:text-slate-400">
                No se encontraron productos. ¡Intenta agregar uno nuevo!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
