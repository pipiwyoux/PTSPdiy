import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ServiceCategory as ServiceCategoryType } from "@/types/layanan";

interface ServiceCategoryProps {
  category: ServiceCategoryType;
  onServiceClick: (service: any) => void;
}

const ServiceCategory = ({ category, onServiceClick }: ServiceCategoryProps) => {
  return (
    <AccordionItem
      value={category.id}
      className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-primary hover:text-primary/80">
        {category.title}
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-4">
        <ul className="space-y-2">
          {category.services.map((service, index) => (
            <li key={index}>
              <button
                onClick={() => onServiceClick(service)}
                className="w-full text-left py-3 px-4 rounded-md hover:bg-secondary/10 transition-colors"
              >
                {service.name}
              </button>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ServiceCategory;
