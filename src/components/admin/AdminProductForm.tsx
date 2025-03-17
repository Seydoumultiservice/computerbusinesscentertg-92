
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface AdminProductFormProps {
  product: Product | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export const AdminProductForm = ({ product, onCancel, onSuccess }: AdminProductFormProps) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'> & { id?: string }>({
    id: product?.id,
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    oldPrice: product?.oldPrice || undefined,
    image: product?.image || '',
    category: product?.category || '',
    featured: product?.featured || false,
    stock: product?.stock || 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checkbox.checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would save the product to a database
    // For now, we'll just simulate a successful save
    setTimeout(() => {
      toast({
        title: product ? "Produit mis à jour" : "Produit ajouté",
        description: `Le produit "${formData.name}" a été ${product ? "mis à jour" : "ajouté"} avec succès.`
      });
      
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-md border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du produit*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="glass-input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie*
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="glass-input w-full"
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="Ordinateurs">Ordinateurs</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Tablettes">Tablettes</option>
              <option value="Accessoires">Accessoires</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              URL de l'image*
            </label>
            <input
              id="image"
              name="image"
              type="url"
              required
              value={formData.image}
              onChange={handleChange}
              className="glass-input w-full"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Prix (FCFA)*
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="glass-input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Ancien prix (FCFA)
              </label>
              <input
                id="oldPrice"
                name="oldPrice"
                type="number"
                min="0"
                value={formData.oldPrice || ''}
                onChange={handleChange}
                className="glass-input w-full"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
              Stock*
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              required
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="glass-input w-full"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Mettre en avant sur la page d'accueil
            </label>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="glass-input w-full"
            />
          </div>
          
          {formData.image && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Aperçu de l'image</p>
              <div className="mt-1 border rounded-md overflow-hidden bg-white">
                <img
                  src={formData.image}
                  alt="Aperçu du produit"
                  className="object-cover w-full h-40"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+non+disponible';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
        <Button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sauvegarde en cours...' : product ? 'Mettre à jour' : 'Ajouter le produit'}
        </Button>
      </div>
    </form>
  );
};
