import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ComplaintInterface {
  id?: string;
  status: string;
  created_by?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ComplaintGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  created_by?: string;
}
