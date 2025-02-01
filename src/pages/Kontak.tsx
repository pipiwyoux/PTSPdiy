import { MapPin, Mail, Phone } from "lucide-react";

const Kontak = () => {
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6306220016545!2d123.05803069999999!3d0.5557672999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32792b5ea3e34c6f%3A0x76e513d09215ece1!2sKANTOR%20KEMENTERIAN%20AGAMA%20KOTA%20GORONTALO!5e0!3m2!1sen!2sid!4v1738415194252!5m2!1sen!2sid";

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-primary">Kontak</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
            <p>Jalan Arif Rahman Hakim No.22, Kota Gorontalo</p>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 flex-shrink-0" />
            <p>081143302000</p>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 flex-shrink-0" />
            <a
              href="mailto:gorontalokota@kemenag.go.id"
              className="hover:underline"
            >
              gorontalokota@kemenag.go.id
            </a>
          </div>
        </div>
        <div className="mt-6">
          <iframe
            title="Google Maps Location"
            src={googleMapsEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Kontak;
