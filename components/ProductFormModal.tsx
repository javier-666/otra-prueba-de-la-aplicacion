
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { generateDescription } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { XMarkIcon } from './icons/XMarkIcon';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    description: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct({ name: '', category: '', quantity: 0, price: 0, description: '' });
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleGenerateDescription = async () => {
    if (!product.name) {
      alert("Por favor, introduce primero el nombre del producto.");
      return;
    }
    setIsGenerating(true);
    try {
      const description = await generateDescription(product.name);
      setProduct(prev => ({ ...prev, description }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.name && product.category && product.quantity >= 0 && product.price >= 0) {
      onSave({ ...product, id: productToEdit?.id || '' });
    } else {
      alert("Por favor, completa todos los campos requeridos.");
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{productToEdit ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre del Producto</label>
            <input type="text" name="name" id="name" value={product.name} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoría</label>
              <input type="text" name="category" id="category" value={product.category} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700" />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cantidad</label>
              <input type="number" name="quantity" id="quantity" value={product.quantity} onChange={handleChange} min="0" required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700" />
            </div>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Precio (€)</label>
            <input type="number" name="price" id="price" value={product.price} onChange={handleChange} min="0" step="0.01" required className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descripción</label>
             <div className="relative">
              <textarea name="description" id="description" value={product.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 resize-none pr-10"></textarea>
              <button 
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                title="Generar descripción con IA"
                className="absolute top-2 right-2 p-1.5 text-yellow-500 rounded-full hover:bg-yellow-100 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SparklesIcon className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
