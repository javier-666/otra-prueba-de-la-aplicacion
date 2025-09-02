
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from './types';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import InventoryTable from './components/InventoryTable';
import ProductFormModal from './components/ProductFormModal';
import ConfirmationDialog from './components/ConfirmationDialog';
import { PlusIcon } from './components/icons/PlusIcon';

// Mock Data
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Laptop Pro 15"', category: 'Electrónica', quantity: 25, price: 1499.99, description: 'Potente laptop para profesionales con pantalla Retina.' },
  { id: '2', name: 'Teclado Mecánico RGB', category: 'Accesorios', quantity: 75, price: 129.50, description: 'Teclado con switches mecánicos y retroiluminación RGB personalizable.' },
  { id: '3', name: 'Monitor UltraWide 34"', category: 'Monitores', quantity: 40, price: 799.00, description: 'Monitor curvo para una experiencia de inmersión total.' },
  { id: '4', name: 'Silla Ergonómica de Oficina', category: 'Mobiliario', quantity: 30, price: 349.99, description: 'Silla ajustable para máximo confort durante largas horas de trabajo.' },
  { id: '5', name: 'Webcam 4K', category: 'Accesorios', quantity: 60, price: 199.99, description: 'Cámara web de alta definición para streaming y videoconferencias.' },
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [productToDelete, setProductToDelete] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = products.filter(item =>
      item.name.toLowerCase().includes(lowercasedFilter) ||
      item.category.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredProducts(filteredData);
  }, [searchTerm, products]);

  const handleOpenAddModal = () => {
    setProductToEdit(undefined);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsConfirmDialogOpen(true);
  };

  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsConfirmDialogOpen(false);
    setProductToEdit(undefined);
    setProductToDelete(undefined);
  };

  const handleSaveProduct = (product: Product) => {
    if (productToEdit) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([...products, { ...product, id: Date.now().toString() }]);
    }
    handleCloseModals();
  };
  
  const confirmDelete = useCallback(() => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      handleCloseModals();
    }
  }, [productToDelete, products]);


  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <DashboardStats products={products} />
        
        <div className="mt-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-100">Inventario de Productos</h2>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-700"
                />
                <button 
                  onClick={handleOpenAddModal}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors duration-200"
                >
                  <PlusIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Añadir Producto</span>
                </button>
              </div>
            </div>
          </div>
          <InventoryTable 
            products={filteredProducts} 
            onEdit={handleOpenEditModal} 
            onDelete={handleOpenDeleteDialog} 
          />
        </div>
      </main>

      {isFormModalOpen && (
        <ProductFormModal
          isOpen={isFormModalOpen}
          onClose={handleCloseModals}
          onSave={handleSaveProduct}
          productToEdit={productToEdit}
        />
      )}

      {isConfirmDialogOpen && productToDelete && (
        <ConfirmationDialog
          isOpen={isConfirmDialogOpen}
          onClose={handleCloseModals}
          onConfirm={confirmDelete}
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que quieres eliminar el producto "${productToDelete.name}"? Esta acción no se puede deshacer.`}
        />
      )}
    </div>
  );
};

export default App;
