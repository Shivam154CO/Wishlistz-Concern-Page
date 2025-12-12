export type ConcernStatus = 'New' | 'In-progress' | 'Resolved';

export type IssueCategory = 
  | 'Payment issue'
  | 'Order not received'
  | 'Damaged or wrong item'
  | 'Technical bug'
  | 'Login/Account issue'
  | 'Other concern';

export interface Concern {
  id: string;
  fullName: string;
  email: string;
  orderId?: string;
  category: IssueCategory;
  description: string;
  screenshots: File[];
  status: ConcernStatus;
  createdAt: Date;
  ticketId: string;
  adminNotes?: string;
}

export interface ConcernFormData {
  fullName: string;
  email: string;
  orderId: string;
  category: IssueCategory;
  description: string;
  screenshots: File[];
}