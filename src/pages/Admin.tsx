
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PackageOpen, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  ChevronLeft, 
  BarChart3,
  Settings,
  PlusCircle, 
  Trash2
} from 'lucide-react';
import { getOrders, getAllProducts, getTestimonials, updateOrderStatus, Product } from '@/lib/data';
import { Order, Testimonial } from '@/lib/types';
import { AdminProductsList } from "@/components/admin/AdminProductsList";
import { AdminOrdersList } from "@/components/admin/AdminOrdersList";
import { AdminTestimonialsList } from "@/components/admin/AdminTestimonialsList";
import { AdminProductForm } from "@/components/admin/AdminProductForm";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        const fetchedOrders = getOrders();
        const fetchedTestimonials = getTestimonials();
        
        setProducts(fetchedProducts);
        setOrders(fetchedOrders);
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    // Refresh orders after update
    setOrders(getOrders());
  };

  // Stats calculation
  const totalRevenue = orders.reduce((total, order) => {
    if (order.status !== 'cancelled') {
      return total + order.total;
    }
    return total;
  }, 0);

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-gray-500">Gérer votre boutique et vos commandes</p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <ChevronLeft size={16} className="mr-1" />
              Retour au site
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Produits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <PackageOpen className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">{products.length}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Commandes en attente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-2xl font-bold">{pendingOrders}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Témoignages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">{testimonials.length}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Revenu total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">{totalRevenue.toLocaleString()} FCFA</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="products" className="space-y-4">
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger value="products" className="px-4 py-2">
                  <PackageOpen className="h-4 w-4 mr-2" />
                  Produits
                </TabsTrigger>
                <TabsTrigger value="orders" className="px-4 py-2">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Commandes
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  Témoignages
                </TabsTrigger>
                <TabsTrigger value="settings" className="px-4 py-2">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="border border-gray-200 rounded-md bg-white p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Gestion des produits</h2>
                    <p className="text-gray-500">Ajouter, modifier ou supprimer des produits</p>
                  </div>
                  <Button onClick={() => {
                    setSelectedProduct(null);
                    setIsAddingProduct(true);
                  }}>
                    <PlusCircle size={16} className="mr-2" />
                    Nouveau produit
                  </Button>
                </div>
                
                {isAddingProduct ? (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{selectedProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h3>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingProduct(false)}
                      >
                        Annuler
                      </Button>
                    </div>
                    <AdminProductForm 
                      product={selectedProduct}
                      onCancel={() => setIsAddingProduct(false)}
                      onSuccess={() => {
                        setIsAddingProduct(false);
                        setSelectedProduct(null);
                        // Refresh products after adding/updating
                        getAllProducts().then(setProducts);
                      }}
                    />
                  </div>
                ) : (
                  <AdminProductsList 
                    products={products}
                    onEdit={(product) => {
                      setSelectedProduct(product);
                      setIsAddingProduct(true);
                    }}
                    onDelete={(productId) => {
                      // In a real app, you would call a delete API here
                      // For now, just refresh the products list
                      getAllProducts().then(setProducts);
                    }}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="orders" className="border border-gray-200 rounded-md bg-white p-6">
                <h2 className="text-xl font-bold mb-4">Gestion des commandes</h2>
                <AdminOrdersList 
                  orders={orders}
                  onUpdateStatus={handleUpdateOrderStatus}
                />
              </TabsContent>
              
              <TabsContent value="testimonials" className="border border-gray-200 rounded-md bg-white p-6">
                <h2 className="text-xl font-bold mb-4">Témoignages des clients</h2>
                <AdminTestimonialsList testimonials={testimonials} />
              </TabsContent>
              
              <TabsContent value="settings" className="border border-gray-200 rounded-md bg-white p-6">
                <h2 className="text-xl font-bold mb-4">Paramètres du site</h2>
                <p className="text-gray-500 mb-4">Configurez les paramètres généraux de votre boutique en ligne.</p>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de la boutique</CardTitle>
                    <CardDescription>Mettez à jour les informations de base de votre boutique.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la boutique</label>
                      <input type="text" defaultValue="COMPUTER BUSINESS CENTER" className="glass-input w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
                      <input type="email" defaultValue="contact@computerbusiness.fr" className="glass-input w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input type="tel" defaultValue="+228 91254591" className="glass-input w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <textarea defaultValue="6°10'49.4&quot;N 1°11'43.0&quot;E" className="glass-input w-full" rows={3}></textarea>
                    </div>
                    <Button className="mt-2">Enregistrer les modifications</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
