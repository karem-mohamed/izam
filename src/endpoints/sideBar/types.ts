export interface NavItem {
  id: number;
  title: string;
  target: string;
  visible?: boolean;
  children?: NavItem[];
}

export interface TrackData {
  id: number;
  from: number | undefined;
  to: number | undefined;
}
