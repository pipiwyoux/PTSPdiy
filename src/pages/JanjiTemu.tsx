import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppointmentModal from "@/components/appointment/AppointmentModal";

const JanjiTemu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Janji Temu</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Buat Janji Temu</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Silakan buat janji temu dengan pejabat kantor sesuai dengan keperluan Anda.
          </p>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto"
          >
            Buat Janji Temu
          </Button>
        </div>
      </div>
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default JanjiTemu;