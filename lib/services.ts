export type Service = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "precision-fade",
    name: "Precision Fade",
    price: 35,
    description: "Crisp transitions, detailed lineup, and finish work that holds all week.",
  },
  {
    id: "executive-cut",
    name: "Executive Cut",
    price: 25,
    description: "Timeless scissor-over-comb shaping for a sharp, boardroom-ready silhouette.",
  },
  {
    id: "beard-sculpture",
    name: "Beard Sculpture",
    price: 20,
    description: "Line, taper, and hot-towel conditioning for a defined, intentional beard.",
  },
  {
    id: "royal-shave",
    name: "The Royal Shave",
    price: 45,
    description: "Straight razor, steam, and balm — the full ritual, start to finish.",
  },
];

const serviceNames = new Set(SERVICES.map((s) => s.name));

export function getServiceById(id: string | null | undefined): Service | undefined {
  if (!id) return undefined;
  return SERVICES.find((s) => s.id === id);
}

export function isValidServiceName(name: string): boolean {
  return serviceNames.has(name);
}
