import { Accordion } from "@/components/ui/accordion";
import ServiceCategory from "./ServiceCategory";
import { ServiceCategory as ServiceCategoryType, ServiceItem } from "@/types/layanan";

interface ServiceListProps {
  categories: ServiceCategoryType[];
  onServiceClick: (service: ServiceItem) => void;
}

const ServiceList = ({ categories, onServiceClick }: ServiceListProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {categories.map((category) => (
        <ServiceCategory
          key={category.id}
          category={category}
          onServiceClick={onServiceClick}
        />
      ))}
    </Accordion>
  );
};

export default ServiceList;
