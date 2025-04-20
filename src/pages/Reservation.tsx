
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Reservation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const guest = searchParams.get('guest');
    if (guest) {
      setGuestName(decodeURIComponent(guest));
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-[#b30000] text-center mb-6">
          Prenotazione Colazione
        </h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Nome Ospite
          </label>
          <Input 
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Nome e cognome"
            className="mt-1"
          />
        </div>

        <Button 
          onClick={() => {
            // Qui puoi implementare la logica di conferma prenotazione
            toast.success(`Prenotazione confermata per ${guestName}`);
          }}
          className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-3"
        >
          Conferma Prenotazione
        </Button>
      </div>
    </div>
  );
};

export default Reservation;
