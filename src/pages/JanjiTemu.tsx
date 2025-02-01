import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppointmentModal from "@/components/appointment/AppointmentModal";

const JanjiTemu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Janji Temu</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Buat Janji Temu</h2>
          <p className="text-gray-600 mb-6">
            Silakan buat janji temu dengan pejabat kantor sesuai dengan keperluan Anda.
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
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
