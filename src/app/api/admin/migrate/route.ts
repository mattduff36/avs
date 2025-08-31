import { NextRequest, NextResponse } from 'next/server';
import { createMachine, createService, createProject } from '@/lib/dynamic-content';
import { siteData } from '@/data/site-data';
import { migrateStaticImage } from '@/lib/blob-storage';

// Default machines data from the original system
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
    description: "Our All Terrain Vehicles are designed to handle the most challenging environments and terrains. These robust machines provide excellent mobility and performance across various ground conditions, making them perfect for construction sites, agricultural applications, and specialized transport needs.",
    image: "/images/all-terrain-vehicles.jpg",
    features: ["All terrain capability", "Robust design", "Excellent mobility"],
    side: "right" as const,
    forSale: false
  }
];

// Default projects data from the current system
const defaultProjectsData = [
  {
    title: "Saint-Gobain Carpark",
    description: "A comprehensive carpark construction project for Saint-Gobain, involving excavation, groundwork, and surfacing to create a modern parking facility.",
    image: "/images/saint-gobain-carpark.jpg",
    client: "Saint-Gobain",
    completedDate: "2023-08-15",
    category: "Commercial Construction",
    tags: ["Carpark", "Commercial", "Groundwork"]
  },
  {
    title: "Tarmac Major Civils",
    description: "Major civil engineering project for Tarmac involving large-scale earthmoving, infrastructure development, and site preparation works.",
    image: "/images/tarmac-major-civils.jpg",
    client: "Tarmac",
    completedDate: "2023-06-30",
    category: "Civil Engineering",
    tags: ["Major Civils", "Infrastructure", "Earthmoving"]
  },
  {
    title: "Exolum Site Wide Works",
    description: "Comprehensive site-wide development project for Exolum, including groundwork, utilities installation, and site preparation for industrial facilities.",
    image: "/images/exolum-site-wide.jpg",
    client: "Exolum",
    completedDate: "2023-09-20",
    category: "Industrial",
    tags: ["Site Development", "Industrial", "Utilities"]
  },
  {
    title: "Omexom Tower Works",
    description: "Specialized tower construction and infrastructure project for Omexom, involving precision earthmoving and foundation works for telecommunications infrastructure.",
    image: "/images/omexom-tower-works.jpg",
    client: "Omexom",
    completedDate: "2023-07-10",
    category: "Infrastructure",
    tags: ["Tower Works", "Telecommunications", "Foundations"]
  }
];

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();
    
    if (!type || !['machines', 'services', 'projects', 'all'].includes(type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid migration type. Use: machines, services, projects, or all' },
        { status: 400 }
      );
    }

    const results = {
      machines: { count: 0, items: [] as unknown[] },
      services: { count: 0, items: [] as unknown[] },
      projects: { count: 0, items: [] as unknown[] },
      errors: [] as string[]
    };

    // Migrate machines
    if (type === 'machines' || type === 'all') {
      for (const machine of defaultMachinesData) {
        try {
          // Create machine without image first
          const newMachine = await createMachine({
            title: machine.title,
            description: machine.description,
            features: machine.features,
            side: machine.side,
            forSale: machine.forSale
          });

          // Try to migrate the image
          if (machine.image) {
            try {
              const imageUrl = await migrateStaticImage(machine.image, 'machines', newMachine.id);
              if (imageUrl) {
                // Update machine with image URL
                const { updateMachine } = await import('@/lib/dynamic-content');
                await updateMachine(newMachine.id, { image: imageUrl });
                newMachine.image = imageUrl;
              }
            } catch (imageError) {
              console.warn(`Failed to migrate image for machine ${machine.title}:`, imageError);
              results.errors.push(`Failed to migrate image for machine: ${machine.title}`);
            }
          }

          results.machines.items.push(newMachine);
          results.machines.count++;
        } catch (error) {
          console.error(`Failed to migrate machine ${machine.title}:`, error);
          results.errors.push(`Failed to migrate machine: ${machine.title}`);
        }
      }
    }

    // Migrate services
    if (type === 'services' || type === 'all') {
      for (const service of siteData.services) {
        try {
          // Create service without image first
          const newService = await createService({
            title: service.name,
            description: service.description,
            fullDescription: service.fullDescription,
            features: service.features,
            icon: service.icon
          });

          // Try to migrate the image
          if (service.image) {
            try {
              const imageUrl = await migrateStaticImage(service.image, 'services', newService.id);
              if (imageUrl) {
                // Update service with image URL
                const { updateService } = await import('@/lib/dynamic-content');
                await updateService(newService.id, { image: imageUrl });
                newService.image = imageUrl;
              }
            } catch (imageError) {
              console.warn(`Failed to migrate image for service ${service.name}:`, imageError);
              results.errors.push(`Failed to migrate image for service: ${service.name}`);
            }
          }

          results.services.items.push(newService);
          results.services.count++;
        } catch (error) {
          console.error(`Failed to migrate service ${service.name}:`, error);
          results.errors.push(`Failed to migrate service: ${service.name}`);
        }
      }
    }

    // Migrate projects
    if (type === 'projects' || type === 'all') {
      for (const project of defaultProjectsData) {
        try {
          // Create project without image first
          const newProject = await createProject({
            title: project.title,
            description: project.description,
            client: project.client,
            completedDate: project.completedDate,
            category: project.category,
            tags: project.tags
          });

          // Try to migrate the image
          if (project.image) {
            try {
              const imageUrl = await migrateStaticImage(project.image, 'projects', newProject.id);
              if (imageUrl) {
                // Update project with image URL
                const { updateProject } = await import('@/lib/dynamic-content');
                await updateProject(newProject.id, { image: imageUrl });
                newProject.image = imageUrl;
              }
            } catch (imageError) {
              console.warn(`Failed to migrate image for project ${project.title}:`, imageError);
              results.errors.push(`Failed to migrate image for project: ${project.title}`);
            }
          }

          results.projects.items.push(newProject);
          results.projects.count++;
        } catch (error) {
          console.error(`Failed to migrate project ${project.title}:`, error);
          results.errors.push(`Failed to migrate project: ${project.title}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migration completed for ${type}`,
      data: results
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { success: false, message: 'Migration failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
