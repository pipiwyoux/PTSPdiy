import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Kantor Kementerian Agama Kota Gorontalo</h3>
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
                <a href="mailto:gorontalokota@kemenag.go.id" className="hover:underline">
                  gorontalokota@kemenag.go.id
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Website</h3>
            <a
              href="https://gorontalokota.kemenag.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              gorontalokota.kemenag.go.id
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} PTSP Kementerian Agama Kota Gorontalo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
