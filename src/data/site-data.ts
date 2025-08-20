export const siteData = {
  company: {
    name: "A&V Squires Plant Company LTD",
    shortName: "A&V Squires",
    established: "50+ years",
    location: "East Midlands, UK",
    serviceArea: "Nottinghamshire, Derbyshire, Leicestershire, Lincolnshire, Yorkshire, and nationwide",
    tagline: "One of the East Midland's leading plant hire, civil engineering and contract earthmoving companies",
    description: "Using our vast range of the latest machines and through our trusted expert team, we are able to provide high-quality, efficient and reliable construction services to customers nationwide."
  },
  contact: {
    phone: "01636 812227",
    emails: [
      "info@avsquires.co.uk",
      "office@avsquires.co.uk"
    ]
  },
  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Our Services",
      href: "/services",
      submenu: [
        {
          label: "Civil Engineering & Groundwork",
          href: "/services#civil-engineering"
        },
        {
          label: "Contract Earthmoving",
          href: "/services#earthmoving"
        },
        {
          label: "Plant Hire",
          href: "/services#plant-hire"
        },
        {
          label: "Transport and Haulage",
          href: "/services#transport"
        },
        {
          label: "Aggregates Supplies",
          href: "/services#aggregates"
        },
        {
          label: "Road Sweeper",
          href: "/services#road-sweeper"
        },
        {
          label: "HIAB Hire",
          href: "/services#hiab-hire"
        },
        {
          label: "Grab Hire",
          href: "/services#grab-hire"
        },
        {
          label: "Workshop Services",
          href: "/services#workshop"
        }
      ]
    },
    {
      label: "Our Projects",
      href: "/projects",
    },
    {
      label: "Our Machines",
      href: "/machines",
    },
    {
      label: "Latest News",
      href: "/news",
    },
    {
      label: "Contact",
      href: "/contact",
    }
  ],
  services: [
    {
      id: "civil-engineering",
      name: "Civil Engineering & Groundwork",
      description: "We can work on any minor or major civil engineering projects, from driveway to highways.",
      image: "/images/civil-engineering.jpg",
      featured: true,
      icon: "Construction"
    },
    {
      id: "transport",
      name: "Transport and Haulage",
      description: "We operate a fleet of specialised, modern heavy vehicles. Our fleet offers cost-effective aggregate and material supplies nationally.",
      image: "/images/transport-haulage.jpg",
      featured: true,
      icon: "Truck"
    },
    {
      id: "hiab-hire",
      name: "HIAB Hire",
      description: "Hiab hire efficiently transports heavy loads. Our vehicles lift and move quickly, perfect for construction and logistics",
      image: "/images/hiab-hire.jpg",
      featured: true,
      icon: "Construction"
    },
    {
      id: "earthmoving",
      name: "Contract Earthmoving",
      description: "We have an unparalleled range of over 40 machines available for hire from world-leading manufacturers such as Volvo",
      featured: false,
      icon: "Pickaxe"
    },
    {
      id: "plant-hire",
      name: "Plant Hire",
      description: "We can handle all types of contract earthmoving for private & public companies on a short or long-term basis.",
      featured: false,
      icon: "Tractor"
    },
    {
      id: "aggregates",
      name: "Aggregates Supplies",
      description: "We have our own fleet of HGV tipper trucks which can deliver aggregates in either bulk loads or individually bagged products into any location.",
      featured: false,
      icon: "Mountain"
    },
    {
      id: "road-sweeper",
      name: "Road Sweeper",
      description: "We have our own state-of-the-art road sweeper available for hire",
      featured: false,
      icon: "Broom"
    },
    {
      id: "grab-hire",
      name: "Grab Hire",
      description: "Find out about our grab hire for all your waste disposal requirements",
      featured: false,
      icon: "Grip"
    },
    {
      id: "workshop",
      name: "Workshop Services",
      description: "Our workshop team offer expert maintenance and repair for both plant and vehicles, ensuring they operate efficiently and effectively.",
      featured: false,
      icon: "Wrench"
    }
  ],
  stats: [
    {
      number: "50+",
      label: "Years Experience"
    },
    {
      number: "75+",
      label: "Employees"
    },
    {
      number: "40+",
      label: "Machines Available"
    },
    {
      number: "24/7",
      label: "Service Available"
    }
  ]
};

export type Service = typeof siteData.services[0];
export type NavigationItem = typeof siteData.navigation[0];
