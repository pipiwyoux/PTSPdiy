import ServiceHistoryTable from "@/components/profile/ServiceHistoryTable";

const Permohonan = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-primary">Permohonan Saya</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ServiceHistoryTable />
      </div>
    </div>
  );
};

export default Permohonan;
