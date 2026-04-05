export type Barber = {
  name: string;
  specialty: string;
  initials: string;
};

export const BARBERS: Barber[] = [
  {
    name: "Marcus Cole",
    specialty: "Fades & texture",
    initials: "MC",
  },
  {
    name: "James Ortiz",
    specialty: "Classic cuts & scissor work",
    initials: "JO",
  },
  {
    name: "David Nguyen",
    specialty: "Beards & straight-razor detail",
    initials: "DN",
  },
];

const barberNames = new Set(BARBERS.map((b) => b.name));

export function isValidBarberName(name: string): boolean {
  return barberNames.has(name);
}
