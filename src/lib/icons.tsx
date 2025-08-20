import { 
  Building2, 
  Truck, 
  Hammer, 
  Cog, 
  Mountain, 
  Brush, 
  Hand, 
  Wrench,
  LucideIcon 
} from "lucide-react";

// Map of icon names to Lucide React components
export const iconMap: Record<string, LucideIcon> = {
  Construction: Building2,
  Truck,
  Pickaxe: Hammer,
  Tractor: Cog,
  Mountain,
  Broom: Brush,
  Grip: Hand,
  Wrench,
};

// Component to render an icon by name
interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }
  
  return <IconComponent className={className} />;
}
