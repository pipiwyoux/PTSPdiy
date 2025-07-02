import { useState } from "react";
import SearchBar from "@/components/layanan/SearchBar";
import ServiceModal from "@/components/layanan/ServiceModal";
import ServiceList from "@/components/layanan/ServiceList";
import { serviceCategories } from "@/components/layanan/ServiceData";
import { ServiceItem } from "@/types/layanan";

const Layanan = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCategories = serviceCategories.map(category => ({
    ...category,
    services: category.services.map(service => ({
      ...service,
      section: category.title.split(". ")[1]
    })).filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.services.length > 0);

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary text-center sm:text-left">Jenis Layanan</h1>
      
      <div className="mb-6 sm:mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <ServiceList 
        categories={filteredCategories}
        onServiceClick={handleServiceClick}
      />

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default Layanan;