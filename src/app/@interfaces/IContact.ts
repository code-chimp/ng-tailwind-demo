export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: {
    mobile: string;
    work?: string;
  };
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  avatar: string;
  notes: string;
  createdAt: string;
  updatedAt: string | null;
}
