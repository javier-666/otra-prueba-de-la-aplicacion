
import React, { useMemo } from 'react';
import { Product } from '../types';
import { CubeIcon } from './icons/CubeIcon';
import { TagIcon } from './icons/TagIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { CurrencyDollarIcon } from './icons/CurrencyDollarIcon';


interface DashboardStatsProps {
  products: Product[];
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-6">
    <div className={`rounded-full p-3 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  </div>
);


const DashboardStats: React.FC<DashboardStatsProps> = ({ products }) => {
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const uniqueCategories = new Set(products.map(p => p.category)).size;

    return {
      totalProducts,
      totalQuantity,
      totalValue: totalValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }),
      uniqueCategories,
    };
  }, [products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        icon={<CubeIcon className="w-7 h-7 text-white" />}
        label="Productos Totales"
        value={stats.totalProducts}
        color="bg-blue-500"
      />
      <StatCard 
        icon={<ChartBarIcon className="w-7 h-7 text-white" />}
        label="Unidades Totales"
        value={stats.totalQuantity}
        color="bg-green-500"
      />
      <StatCard 
        icon={<CurrencyDollarIcon className="w-7 h-7 text-white" />}
        label="Valor Total del Inventario"
        value={stats.totalValue}
        color="bg-amber-500"
      />
      <StatCard 
        icon={<TagIcon className="w-7 h-7 text-white" />}
        label="Categorías"
        value={stats.uniqueCategories}
        color="bg-purple-500"
      />
    </div>
  );
};

export default DashboardStats;
