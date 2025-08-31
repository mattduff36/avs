import { getFromStorage, setInStorage } from './storage';

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
    description: "Our All Terrain Vehicles (ATVs) are perfect for navigating challenging landscapes and accessing remote areas. These versatile machines are ideal for site surveys, equipment transportation, and maintenance tasks in difficult terrain. Available for short-term and long-term hire with experienced operators if required.",
    image: "/images/all-terrain-vehicles.jpg",
    features: ["All terrain capability", "Site surveys", "Equipment transportation"],
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

export interface MachineEditableData {
  id: number;
  description: string;
  features: string[];
}

export interface MachinesEditableData {
  machines: Record<number, MachineEditableData>; // machineId -> editable data
  lastUpdated: string | null;
  version: string;
}

// Storage keys
const MACHINES_FOR_SALE_KEY = 'machines-for-sale';
const MACHINES_EDITABLE_KEY = 'machines-editable';

/**
 * Reads the machines for sale data from storage
 */
export async function readMachinesForSaleData(): Promise<MachinesForSaleData> {
  const defaultData: MachinesForSaleData = {
    machines: {},
    lastUpdated: null,
    version: "1.0"
  };
  
  return await getFromStorage(MACHINES_FOR_SALE_KEY, defaultData);
}

/**
 * Writes the machines for sale data to storage
 */
export async function writeMachinesForSaleData(data: MachinesForSaleData): Promise<void> {
  // Update timestamp
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage(MACHINES_FOR_SALE_KEY, data);
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
 * Gets all machines that are currently for sale
 */
export async function getMachinesForSale(): Promise<MachineForSale[]> {
  const saleData = await readMachinesForSaleData();
  const editableData = await readMachinesEditableData();
  
  return defaultMachinesData
    .filter(machine => saleData.machines[machine.id])
    .map(machine => {
      const editableInfo = editableData.machines[machine.id];
      return {
        ...machine,
        description: editableInfo?.description || machine.description,
        features: editableInfo?.features || machine.features,
        forSale: true
      };
    });
}

/**
 * Checks if there are any machines for sale
 */
export async function hasMachinesForSale(): Promise<boolean> {
  const data = await readMachinesForSaleData();
  return Object.keys(data.machines).length > 0;
}

/**
 * Reads the machines editable data from storage
 */
export async function readMachinesEditableData(): Promise<MachinesEditableData> {
  const defaultData: MachinesEditableData = {
    machines: {},
    lastUpdated: null,
    version: "1.0"
  };
  
  return await getFromStorage(MACHINES_EDITABLE_KEY, defaultData);
}

/**
 * Writes the machines editable data to storage
 */
export async function writeMachinesEditableData(data: MachinesEditableData): Promise<void> {
  // Update timestamp
  data.lastUpdated = new Date().toISOString();
  
  await setInStorage(MACHINES_EDITABLE_KEY, data);
}

/**
 * Updates the editable data for a specific machine
 */
export async function updateMachineEditableData(machineId: number, description: string, features: string[]): Promise<void> {
  const data = await readMachinesEditableData();
  
  data.machines[machineId] = {
    id: machineId,
    description,
    features
  };
  
  await writeMachinesEditableData(data);
}

/**
 * Gets all machines with their sale status and editable content merged
 */
export async function getMachinesWithSaleStatus(): Promise<MachineForSale[]> {
  const [saleData, editableData] = await Promise.all([
    readMachinesForSaleData(),
    readMachinesEditableData()
  ]);
  
  return defaultMachinesData.map(machine => {
    const editableInfo = editableData.machines[machine.id];
    return {
      ...machine,
      description: editableInfo?.description || machine.description,
      features: editableInfo?.features || machine.features,
      forSale: !!saleData.machines[machine.id]
    };
  });
}