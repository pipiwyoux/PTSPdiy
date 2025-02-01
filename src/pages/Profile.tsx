import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import ServiceHistoryTable from "@/components/profile/ServiceHistoryTable";
import { doc, getDoc } from "firebase/firestore";

interface UserData {
  name: string;
  email: string;
  whatsapp: string;
  address: string;
  instansi: string;
  instansiName: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user || !userData) return null;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-primary">Profil Pengguna</h1>
      
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Informasi Akun</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Nama Lengkap:</p>
              <p className="text-gray-600">{userData.name}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <div>
              <p className="font-medium">WhatsApp:</p>
              <p className="text-gray-600">{userData.whatsapp}</p>
            </div>
            <div>
              <p className="font-medium">Alamat:</p>
              <p className="text-gray-600">{userData.address}</p>
            </div>
            <div>
              <p className="font-medium">Instansi:</p>
              <p className="text-gray-600">{userData.instansi}</p>
            </div>
            {userData.instansiName && (
              <div>
                <p className="font-medium">Nama Instansi:</p>
                <p className="text-gray-600">{userData.instansiName}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Permohonan Anda</h2>
          <ServiceHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default Profile;
