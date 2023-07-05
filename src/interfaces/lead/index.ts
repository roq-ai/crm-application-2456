import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LeadInterface {
  id?: string;
  status: string;
  note?: string;
  assigned_to?: string;
  created_by?: string;
  created_at?: any;
  updated_at?: any;

  user_lead_assigned_toTouser?: UserInterface;
  user_lead_created_byTouser?: UserInterface;
  _count?: {};
}

export interface LeadGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  note?: string;
  assigned_to?: string;
  created_by?: string;
}
