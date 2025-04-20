
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuSectionProps {
  title: string;
  image: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  onIncrease: (index: number) => void;
  onDecrease: (index: number) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ 
  title, 
  image, 
  items, 
  onIncrease, 
  onDecrease 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <h2 className="text-2xl font-semibold text-[#b30000] text-center mb-6">{title}</h2>
      <div className="w-full aspect-[16/9] mb-8">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg text-gray-800">{item.name}</span>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onDecrease(index)}
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0",
                  item.quantity === 0 && "opacity-50"
                )}
                disabled={item.quantity === 0}
              >
                -
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                onClick={() => onIncrease(index)}
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0",
                  item.quantity === 5 && "opacity-50"
                )}
                disabled={item.quantity === 5}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
