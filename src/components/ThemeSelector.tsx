import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeSelector = () => {
  const { themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: 'white', label: 'White', color: 'bg-white' },
    { name: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { name: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { name: 'green', label: 'Green', color: 'bg-green-500' },
    { name: 'orange', label: 'Orange', color: 'bg-orange-500' },
  ] as const;

  return (
    <div className="relative">
      <Button
        variant="glass"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full"
      >
        <Palette className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 glass p-3 rounded-lg border border-white/20 z-50">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground mb-1">Theme Color</span>
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setThemeColor(color.name);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-colors"
              >
                <div className={`w-4 h-4 rounded-full ${color.color} border border-white/20`} />
                <span className="text-sm">{color.label}</span>
                {themeColor === color.name && <Check className="h-3 w-3 ml-auto" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;