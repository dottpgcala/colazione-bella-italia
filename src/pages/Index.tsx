import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import MenuSection from '@/components/MenuSection';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast: useToastHook } = useToast();
  const [name, setName] = useState("");

  const [beverages] = useState([
    "Thè", "Caffè", "Caffè d'orzo", "Latte", "Latte macchiato",
    "Cappuccino", "Cappuccino di Soia", "Cappuccino di Soia con caffè d'orzo",
    "Succo di frutta", "Spremuta di arance", "Acqua gassata", "Acqua naturale"
  ].map(name => ({ name, quantity: 0 })));

  const [sweets] = useState([
    "Brioche vuota", "Brioche farcita con crema", "Brioches farcita alla marmellata",
    "Fette biscottate con marmellata", "Crepe al cioccolato", "Crepe alla marmellata",
    "Yogurt bianco", "Yogurt alla frutta", "Frutta di stagione"
  ].map(name => ({ name, quantity: 0 })));

  const [savory] = useState([
    "Uova sode", "Uova all'occhio di bue", "Uova strapazzate",
    "French toast", "Tagliere di salumi e formaggi", "Pancake alla spuma di formaggio"
  ].map(name => ({ name, quantity: 0 })));

  const [beverageItems, setBeverageItems] = useState(beverages);
  const [sweetItems, setSweetItems] = useState(sweets);
  const [savoryItems, setSavoryItems] = useState(savory);

  const updateQuantity = (
    items: typeof beverageItems,
    setItems: React.Dispatch<React.SetStateAction<typeof beverageItems>>,
    index: number,
    increment: boolean
  ) => {
    setItems(items.map((item, i) => {
      if (i === index) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: Math.min(Math.max(newQuantity, 0), 5)
        };
      }
      return item;
    }));
  };

  const submitOrder = () => {
    if (!name) {
      useToastHook({
        title: "Errore",
        description: "Per favore inserisci il tuo nome.",
        variant: "destructive"
      });
      return;
    }

    let orderText = `Ordine colazione per: ${name}\n\n`;

    const addItemsToOrder = (items: typeof beverageItems, section: string) => {
      const sectionItems = items.filter(item => item.quantity > 0);
      if (sectionItems.length > 0) {
        orderText += `${section}:\n`;
        sectionItems.forEach(item => {
          orderText += `${item.name}: ${item.quantity}\n`;
        });
        orderText += "\n";
      }
    };

    addItemsToOrder(beverageItems, "Bevande");
    addItemsToOrder(sweetItems, "Dolci");
    addItemsToOrder(savoryItems, "Salati");

    const encodedOrder = encodeURIComponent(orderText);
    const whatsappNumber = "+393200662447"; // Updated WhatsApp number
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedOrder}`;
  };

  const [reservationLink, setReservationLink] = useState<string | null>(null);

  const generateReservationLink = () => {
    if (!name) {
      toast.error("Per favore, inserisci il tuo nome prima di generare il link.");
      return;
    }

    // Genera un link univoco con il nome dell'ospite e una data casuale
    const uniqueId = Math.random().toString(36).substring(7);
    const link = `${window.location.origin}/reservation/${uniqueId}?guest=${encodeURIComponent(name)}`;
    
    setReservationLink(link);
    
    // Copia automaticamente il link negli appunti
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link di prenotazione copiato!");
    });
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-8">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold text-[#b30000] text-center mb-6 hover:scale-105 transition-transform duration-300">
          Menù Colazione
        </h1>
        
        <p className="text-center text-gray-600 italic mb-8 animate-fade-in">
          Il cibo e le bevande della colazione vanno consumati presso la struttura. Non è consentito l'asporto.
        </p>

        <div className="mb-8 animate-fade-in">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Inserisci il tuo nome:
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome e cognome"
            className="w-full transition-all duration-300 hover:border-[#b30000] focus:ring-[#b30000]"
          />
        </div>

        <MenuSection
          title="☕ Bevande"
          image="/lovable-uploads/57d6395c-29c4-440a-bbb0-09ec8e40a06c.png"
          items={beverageItems}
          onIncrease={(index) => updateQuantity(beverageItems, setBeverageItems, index, true)}
          onDecrease={(index) => updateQuantity(beverageItems, setBeverageItems, index, false)}
        />

        <MenuSection
          title="🥐 Cibi Dolci"
          image="/lovable-uploads/54fe0e52-6ed1-40b9-87ce-151ead4da53e.png"
          items={sweetItems}
          onIncrease={(index) => updateQuantity(sweetItems, setSweetItems, index, true)}
          onDecrease={(index) => updateQuantity(sweetItems, setSweetItems, index, false)}
        />

        <MenuSection
          title="🍳 Cibi Salati"
          image="/lovable-uploads/d7717f92-2b4a-4b71-92c3-5808fbd38d8c.png"
          items={savoryItems}
          onIncrease={(index) => updateQuantity(savoryItems, setSavoryItems, index, true)}
          onDecrease={(index) => updateQuantity(savoryItems, setSavoryItems, index, false)}
        />
        
        <div className="mt-4 flex space-x-2">
          <Button 
            onClick={submitOrder}
            className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white py-4 text-lg transition-all duration-300 transform hover:scale-105"
          >
            Salva ordine
          </Button>
          <Button 
            onClick={generateReservationLink}
            variant="secondary"
            className="flex-1 bg-[#b30000] text-white hover:bg-[#900000] py-4 text-lg transition-all duration-300 transform hover:scale-105"
          >
            Genera Link Prenotazione
          </Button>
        </div>

        {reservationLink && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-700 break-words">
              Link Prenotazione: {reservationLink}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
