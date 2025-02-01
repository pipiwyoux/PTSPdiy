export interface ServiceItem {
  name: string;
  requirements: string;
  processingTime: string;
  formLink: string;
  section?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: ServiceItem[];
}
