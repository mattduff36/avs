import { promises as fs } from 'fs';
import path from 'path';

// Default machines data (fallback)
const defaultMachinesData = [
  {
    id: 1,
    title: "Komatsu D61 PXi",
    description: "The Intelligent Machine Control (iMC) on the D61 improves efficiency and reduces cost to our customers in any application. The iMC allows automated operation from heavy dozing to fine grading. Our Komatsu D61 PXi dozers are available for contracted works and short or long-term hire.",
    image: "/images/komatsu-d61-pxi.jpg",
    features: ["Intelligent Machine Control", "Heavy dozing to fine grading", "Available for hire"],
    side: "left" as const,
    forSale: false
  },
  {
    id: 2,
    title: "Komatsu's Intelligent Machine Control",
    description: "We have a choice of Komatsu excavators with Komatsu's intelligent machine control technology, meaning whatever the job we will have the right machine to ensure our customers projects are completed to highest accuracy and in a fraction of the time compared to conventional methods. Onboard weighing will optimize loading, ensuring every truck load is road legal and filled to its full capacity.",
    image: "/images/komatsu-intelligent-control.jpg",
    features: ["Multiple excavator options", "Highest accuracy", "Onboard weighing system"],
    side: "right" as const,
    forSale: false
  },
  {
    id: 3,
    title: "Dual View Dumpers",
    description: "Our high-performance Dual View Dumpers allow the driver to quickly change the seat position through a 180 degrees to ensure that the operator always has the best view, whether loading or during transportation. This helps save time on site and ensures maximum safety.",
    image: "/images/dual-view-dumpers.jpg",
    features: ["180-degree seat rotation", "Maximum safety", "Time-saving design"],
    side: "left" as const,
    forSale: false
  },
  {
    id: 4,
    title: "McCloskey R105 and 621",
    description: "The McCloskey Screener and Trommel are essential pieces of equipment for efficient material separation and screening. The screener is designed to handle a variety of materials, providing high throughput excellent performance in various applications. Meanwhile, the trommel offers a rotating drum that effectively separates materials based on size, ensuring optimal sorting and processing.",
    image: "/images/mccloskey-screener.webp",
    features: ["Material separation", "High throughput", "Optimal sorting"],
    side: "right" as const,
    forSale: false
  },
  {
    id: 5,
    title: "Loading Shovels",
    description: "A loading shovel, also known as a front-end loader, is a versatile piece of heavy machinery commonly used in construction, agriculture, and material handling. It is primarily utilised for moving bulk materials as soil, gravel, and sand, making it ideal for tasks like loading trucks, clearing debris, and digging trenches. We can provide loading shovels for hire either operated or on a self drive basis.",
    image: "/images/loading-shovels.jpg",
    features: ["Versatile machinery", "Bulk material handling", "Operated or self-drive"],
    side: "left" as const,
    forSale: false
  },
  {
    id: 6,
    title: "All Terrain Vehicles",
    description: "Our ATV hire service for construction sites provides reliable and durable all-terrain vehicles to enhance your project efficiency. Designed to navigate rough terrains and heavy loads, our ATVs help transport materials and personnel with ease. Each vehicle is well-maintained and equipped to handle the demands of any construction environment.",
    image: "/images/all-terrain-vehicles.jpg",
    features: ["Rough terrain navigation", "Material transport", "Well-maintained fleet"],
    side: "right" as const,
    forSale: false
  }
];

export interface MachineForSale {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
  side: 'left' | 'right';
  forSale: boolean;
}

export interface MachinesForSaleData {
  machines: Record<number, boolean>; // machineId -> forSale status
  lastUpdated: string | null;
  version: string;
}

const MACHINES_FOR_SALE_FILE = path.join(process.cwd(), 'src', 'data', 'machines-for-sale.json');

/**
 * Reads the machines for sale data from JSON file
 */
export async function readMachinesForSaleData(): Promise<MachinesForSaleData> {
  try {
    const fileContent = await fs.readFile(MACHINES_FOR_SALE_FILE, 'utf-8');
    const data: MachinesForSaleData = JSON.parse(fileContent);
    
    // Validate data structure
    if (!data.machines || !data.version) {
      throw new Error('Invalid data structure');
    }
    
    return data;
  } catch (error) {
    // If file doesn't exist or is corrupted, return default structure
    console.warn('Could not read machines for sale data, using default:', error);
    return {
      machines: {},
      lastUpdated: null,
      version: "1.0"
    };
  }
}

/**
 * Writes the machines for sale data to JSON file
 */
export async function writeMachinesForSaleData(data: MachinesForSaleData): Promise<void> {
  try {
    // Update timestamp
    data.lastUpdated = new Date().toISOString();
    
    // Write to file atomically
    const tempFile = MACHINES_FOR_SALE_FILE + '.tmp';
    await fs.writeFile(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    await fs.rename(tempFile, MACHINES_FOR_SALE_FILE);
  } catch (error) {
    console.error('Error writing machines for sale data:', error);
    throw new Error('Failed to save machine sale status');
  }
}

/**
 * Updates the sale status for a specific machine
 */
export async function updateMachineSaleStatus(machineId: number, forSale: boolean): Promise<void> {
  const data = await readMachinesForSaleData();
  
  if (forSale) {
    data.machines[machineId] = true;
  } else {
    delete data.machines[machineId];
  }
  
  await writeMachinesForSaleData(data);
}

/**
 * Gets the sale status for a specific machine
 */
export async function getMachineSaleStatus(machineId: number): Promise<boolean> {
  const data = await readMachinesForSaleData();
  return !!data.machines[machineId];
}

/**
 * Gets all machines with their sale status merged
 */
export async function getMachinesWithSaleStatus(): Promise<MachineForSale[]> {
  const data = await readMachinesForSaleData();
  
  return defaultMachinesData.map(machine => ({
    ...machine,
    forSale: !!data.machines[machine.id]
  }));
}

/**
 * Gets only machines that are for sale
 */
export async function getMachinesForSale(): Promise<MachineForSale[]> {
  const allMachines = await getMachinesWithSaleStatus();
  return allMachines.filter(machine => machine.forSale);
}

/**
 * Checks if any machines are currently for sale
 */
export async function hasMachinesForSale(): Promise<boolean> {
  const data = await readMachinesForSaleData();
  return Object.keys(data.machines).length > 0;
}
