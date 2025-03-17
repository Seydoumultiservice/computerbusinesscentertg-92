
import { useState } from 'react';
import { Order } from '@/lib/types';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdminOrdersListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export const AdminOrdersList = ({ orders, onUpdateStatus }: AdminOrdersListProps) => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prevExpanded => 
      prevExpanded.includes(orderId)
        ? prevExpanded.filter(id => id !== orderId)
        : [...prevExpanded, orderId]
    );
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-8 border rounded-md">
          <p className="text-gray-500">Aucune commande trouvée.</p>
        </div>
      ) : (
        orders.map((order) => (
          <Collapsible
            key={order.id}
            open={expandedOrders.includes(order.id)}
            onOpenChange={() => toggleOrderExpansion(order.id)}
            className="border rounded-md overflow-hidden bg-white"
          >
            <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="space-y-1 mb-2 md:mb-0">
                <div className="flex items-center">
                  <h3 className="font-medium">Commande #{order.id.substring(0, 8)}</h3>
                  <span className={`ml-2 text-xs rounded-full px-2 py-0.5 ${getStatusColor(order.status)}`}>
                    {order.status === 'pending' && 'En attente'}
                    {order.status === 'processing' && 'En traitement'}
                    {order.status === 'shipped' && 'Expédiée'}
                    {order.status === 'delivered' && 'Livrée'}
                    {order.status === 'cancelled' && 'Annulée'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(order.date)} • {order.items.reduce((total, item) => total + item.quantity, 0)} article(s)
                </p>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="flex-grow md:flex-grow-0">
                  <Select
                    value={order.status}
                    onValueChange={(value) => onUpdateStatus(order.id, value as Order['status'])}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="processing">En traitement</SelectItem>
                      <SelectItem value="shipped">Expédiée</SelectItem>
                      <SelectItem value="delivered">Livrée</SelectItem>
                      <SelectItem value="cancelled">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {expandedOrders.includes(order.id) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                    <span className="sr-only">Détails</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>

            <CollapsibleContent>
              <div className="border-t p-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Informations client</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Nom :</span> {order.customerInfo.name}
                    </div>
                    <div>
                      <span className="text-gray-500">Email :</span> {order.customerInfo.email}
                    </div>
                    <div>
                      <span className="text-gray-500">Téléphone :</span> {order.customerInfo.phone}
                    </div>
                    <div>
                      <span className="text-gray-500">Adresse :</span> {order.customerInfo.address}
                    </div>
                  </div>
                </div>

                <h4 className="font-medium mb-2">Articles commandés</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead className="text-right">Prix unitaire</TableHead>
                      <TableHead className="text-right">Quantité</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">{item.product.category}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {item.product.price.toLocaleString()} FCFA
                        </TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right font-medium">
                          {(item.product.price * item.quantity).toLocaleString()} FCFA
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {order.total.toLocaleString()} FCFA
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      )}
    </div>
  );
};
