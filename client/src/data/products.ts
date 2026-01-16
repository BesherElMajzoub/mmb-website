export interface Spec {
  param: string;
  value: string;
  unit: string;
}

export interface Series {
  slug: string;
  title: string;
  category: string;
  heroImagePath: string;
  description: string;
  specs: Spec[];
  features: string[];
  applications: string[];
  datasheetPdfPath?: string;
  certificatePdfPath?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  series: Series[];
}

export const products: Category[] = [
  {
    id: 'submersible',
    name: 'Submersible Pumps',
    description: 'High-efficiency submersible pumps designed for deep wells and harsh environments.',
    series: [
      {
        slug: '6s-series',
        title: 'MMB 6S Series Submersible Pumps',
        category: 'submersible',
        heroImagePath: '/images/submersible-pump.jpg',
        description: 'The 6S Series is engineered for maximum durability and efficiency in deep well applications. Constructed entirely from high-grade stainless steel, these pumps offer superior resistance to corrosion and wear.',
        specs: [
          { param: 'Flow Rate', value: 'Up to 80', unit: 'm³/h' },
          { param: 'Head', value: 'Up to 400', unit: 'm' },
          { param: 'Power', value: '0.37 - 37', unit: 'kW' },
          { param: 'Efficiency', value: 'Up to 84', unit: '%' },
          { param: 'Material', value: 'AISI 304 / 316', unit: 'Stainless Steel' },
          { param: 'Outlet Diameter', value: '3 - 4', unit: 'inches' }
        ],
        features: [
          'Full Stainless Steel Construction (AISI 304/316)',
          'High Sand Resistance',
          'Built-in Check Valve',
          'NEMA Standard Coupling',
          'Rewindable Motor Option'
        ],
        applications: [
          'Agricultural Irrigation',
          'Municipal Water Supply',
          'Industrial Water Systems',
          'Mining Dewatering',
          'Fire Fighting Systems'
        ],
        datasheetPdfPath: '/datasheets/6s-series.pdf'
      },
      {
        slug: '4s-series',
        title: 'MMB 4S Series Submersible Pumps',
        category: 'submersible',
        heroImagePath: '/images/submersible-pump.jpg',
        description: 'Compact yet powerful, the 4S Series delivers reliable performance for residential and small-scale agricultural needs. Precision-engineered impellers ensure smooth operation and longevity.',
        specs: [
          { param: 'Flow Rate', value: 'Up to 24', unit: 'm³/h' },
          { param: 'Head', value: 'Up to 300', unit: 'm' },
          { param: 'Power', value: '0.37 - 7.5', unit: 'kW' },
          { param: 'Diameter', value: '4', unit: 'inches' },
          { param: 'Material', value: 'AISI 304', unit: 'Stainless Steel' }
        ],
        features: [
          'Floating Impeller Design',
          'Corrosion Resistant',
          'Energy Efficient',
          'Easy Installation'
        ],
        applications: [
          'Domestic Water Supply',
          'Small Irrigation',
          'Pressure Boosting',
          'Fountains'
        ]
      }
    ]
  },
  {
    id: 'multistage',
    name: 'Multistage Pumps',
    description: 'Vertical and horizontal multistage pumps for high-pressure applications.',
    series: [
      {
        slug: 'mv-series',
        title: 'MMB MV Vertical Multistage Pumps',
        category: 'multistage',
        heroImagePath: '/images/multistage-pump.jpg',
        description: 'The MV Series represents the pinnacle of high-pressure pumping technology. Its vertical in-line design saves space while delivering exceptional pressure and flow rates.',
        specs: [
          { param: 'Flow Rate', value: 'Up to 120', unit: 'm³/h' },
          { param: 'Head', value: 'Up to 320', unit: 'm' },
          { param: 'Max Pressure', value: '30', unit: 'bar' },
          { param: 'Liquid Temp', value: '-15 to +120', unit: '°C' },
          { param: 'Flange', value: 'DIN / ANSI', unit: 'Standard' }
        ],
        features: [
          'Cartridge Mechanical Seal',
          'Laser-welded Impellers',
          'High Efficiency IE3 Motors',
          'Low Noise Operation',
          'Space-saving Vertical Design'
        ],
        applications: [
          'Water Treatment (RO Systems)',
          'Boiler Feed',
          'High Rise Buildings',
          'Industrial Washing',
          'Fire Fighting'
        ]
      }
    ]
  },
  {
    id: 'motors',
    name: 'Motors',
    description: 'Robust submersible motors built to NEMA standards.',
    series: [
      {
        slug: 'm-series',
        title: 'MMB M-Series Submersible Motors',
        category: 'motors',
        heroImagePath: '/images/submersible-pump.jpg', // Using generic pump image as placeholder if motor specific not avail
        description: 'MMB submersible motors are the heart of our pumping systems. Designed for continuous duty in submerged conditions, they offer high efficiency and long service life.',
        specs: [
          { param: 'Power Range', value: '0.37 - 110', unit: 'kW' },
          { param: 'Voltage', value: '220 - 415', unit: 'V' },
          { param: 'Frequency', value: '50 / 60', unit: 'Hz' },
          { param: 'Protection', value: 'IP68', unit: 'Class' },
          { param: 'Insulation', value: 'Class F', unit: 'Standard' }
        ],
        features: [
          'Rewindable Stator',
          'Water Filled / Oil Filled Options',
          'NEMA Standard Flange',
          'High Thrust Load Capacity',
          'Stainless Steel Shell'
        ],
        applications: [
          'Deep Well Pumps',
          'Submersible Machinery',
          'Offshore Applications'
        ]
      }
    ]
  }
];
