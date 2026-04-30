export type Passport = {
  id: string;
  did: string;
  fullName: string;
  avatar: string;
  location: string;
  country: string;
  flag: string;
  occupation: string;
  score: number;
  verified: boolean;
  skills: string[];
  monthlyIncome: number;
  currency: string;
  income: { month: string; value: number }[];
  dataSources: { name: string; icon: string; verified: boolean }[];
  activity: { id: string; type: string; text: string; ago: string }[];
  issuedAt: string;
  credentialType: string;
};

const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export const PASSPORTS: Passport[] = [
  {
    id: '1',
    did: 'did:ep:0x7f3a9b2c8e1d4f6a5b3c2d1e0f9a8b7c6d5e4f3a',
    fullName: 'Maria Santos',
    avatar: 'MS',
    location: 'Manila',
    country: 'Philippines',
    flag: '🇵🇭',
    occupation: 'Domestic Worker',
    score: 785,
    verified: true,
    skills: ['Domestic Services', 'Scheduling', 'Client Management', 'Childcare', 'Languages: EN/TL'],
    monthlyIncome: 620,
    currency: 'USD',
    income: months.map((m, i) => ({ month: m, value: 480 + i * 30 + Math.round(Math.random() * 40) })),
    dataSources: [
      { name: 'GCash', icon: '💳', verified: true },
      { name: 'Utility Bills', icon: '⚡', verified: true },
      { name: 'Peer Attestations', icon: '👥', verified: true },
      { name: 'Employer Refs', icon: '📝', verified: true },
    ],
    activity: [
      { id: 'a1', type: 'verify', text: 'Verified by Tala Microfinance', ago: '2h ago' },
      { id: 'a2', type: 'score', text: 'Score increased by +12 points', ago: '1d ago' },
      { id: 'a3', type: 'credential', text: 'New skill credential issued', ago: '3d ago' },
    ],
    issuedAt: '2025-04-12',
    credentialType: 'W3C Verifiable Credential',
  },
  {
    id: '2',
    did: 'did:ep:0x9c4b3a2d1e0f8a7b6c5d4e3f2a1b0c9d8e7f6a5b',
    fullName: 'Ravi Kumar',
    avatar: 'RK',
    location: 'Bangalore',
    country: 'India',
    flag: '🇮🇳',
    occupation: 'Gig Driver',
    score: 720,
    verified: true,
    skills: ['Logistics', 'Navigation', 'Customer Service', 'Vehicle Maintenance', 'Time Management'],
    monthlyIncome: 410,
    currency: 'USD',
    income: months.map((m, i) => ({ month: m, value: 320 + i * 18 + Math.round(Math.random() * 30) })),
    dataSources: [
      { name: 'UPI', icon: '🇮🇳', verified: true },
      { name: 'Ola/Uber', icon: '🚗', verified: true },
      { name: 'Utility Bills', icon: '⚡', verified: true },
      { name: 'Peer Attestations', icon: '👥', verified: true },
    ],
    activity: [
      { id: 'b1', type: 'verify', text: 'Verified by KreditBee Lending', ago: '5h ago' },
      { id: 'b2', type: 'score', text: '6,400+ rides verified on-chain', ago: '2d ago' },
      { id: 'b3', type: 'credential', text: 'Passport credential refreshed', ago: '1w ago' },
    ],
    issuedAt: '2025-03-08',
    credentialType: 'W3C Verifiable Credential',
  },
  {
    id: '3',
    did: 'did:ep:0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    fullName: 'Amara Diallo',
    avatar: 'AD',
    location: 'Lagos',
    country: 'Nigeria',
    flag: '🇳🇬',
    occupation: 'Smallholder Farmer',
    score: 698,
    verified: true,
    skills: ['Agriculture', 'Inventory', 'Community Leadership', 'Crop Rotation', 'Cooperative Mgmt'],
    monthlyIncome: 285,
    currency: 'USD',
    income: months.map((m, i) => ({ month: m, value: 200 + i * 14 + Math.round(Math.random() * 25) })),
    dataSources: [
      { name: 'Mobile Money', icon: '📱', verified: true },
      { name: 'Co-op Records', icon: '🌾', verified: true },
      { name: 'Peer Attestations', icon: '👥', verified: true },
      { name: 'Land Registry', icon: '📜', verified: false },
    ],
    activity: [
      { id: 'c1', type: 'verify', text: 'Verified by AgriCredit Africa', ago: '1d ago' },
      { id: 'c2', type: 'score', text: 'Harvest season boost: +18 pts', ago: '4d ago' },
      { id: 'c3', type: 'credential', text: 'Cooperative attestation added', ago: '2w ago' },
    ],
    issuedAt: '2025-02-20',
    credentialType: 'W3C Verifiable Credential',
  },
];

export const getPassport = (id: string) => PASSPORTS.find(p => p.id === id) ?? PASSPORTS[0];
