export type ShipmentStatus = 'In Transit' | 'Custom Processing' | 'Out of Delivery' | 'Delivered' | 'At Hub' | 'Picked';
export type StaffStatus = 'Active' | 'Inactive' | 'Busy';
export type HubStatus = 'Active' | 'Inactive';
export type PaymentStatus = 'Active' | 'Pending' | 'Failed';
export type ReportStatus = 'Pending' | 'Replied';

export interface Shipment {
  id: string;
  trackingId: string;
  from: string;
  to: string;
  status: ShipmentStatus;
  assignedDate: string;
  customer: string;
  weight: string;
  hub: string;
  staff: string;
}

export interface User {
  id: string;
  serialNo: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  avatar: string;
  joinDate: string;
  totalOrders: number;
  status: 'Active' | 'Inactive';
}

export interface Hub {
  id: string;
  hubNameId: string;
  hubLocation: string;
  contactNumber: string;
  status: HubStatus;
  throughput: string;
  manager: string;
  email: string;
  address: string;
  openDays: string[];
  hours: string;
  staffCount: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  hub: string;
  status: StaffStatus;
  contact: string;
  avatar: string;
  email: string;
  joinDate: string;
  deliveries: number;
}

export interface Payment {
  id: string;
  customer: string;
  paymentId: string;
  type: string;
  amount: string;
  method: string;
  status: PaymentStatus;
  date: string;
  avatar: string;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  time: string;
  status: ReportStatus;
  reply?: string;
}

export interface HubRequest {
  id: string;
  hub: string;
  phone: string;
  location: string;
  store: string;
  type: 'hub' | 'partner';
}
