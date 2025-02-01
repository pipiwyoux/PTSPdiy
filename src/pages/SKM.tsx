import { Button } from "@/components/ui/button";

const SKM = () => {
  const handleViewSurvey = () => {
    window.location.href = "https://tolopani.net/skm/#services";
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-primary">Hasil SKM</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Silakan klik tombol di bawah ini untuk melihat hasil survey SKM.
          </p>
          <Button onClick={handleViewSurvey}>
            Lihat Hasil Survey SKM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SKM;
