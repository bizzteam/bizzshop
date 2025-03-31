import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAu1usBMOdB8C9rck2gzj4E3pvqCYZnyaY",
  authDomain: "bizz-shop.firebaseapp.com",
  projectId: "bizz-shop",
  storageBucket: "bizz-shop.firebasestorage.app",
  messagingSenderId: "1013170000716",
  appId: "1:1013170000716:web:f8479fa75bc2a1e503b5e9",
  measurementId: "G-NB8V0X2LSZ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

// Productos para la tienda
const products = [
  {
    id: 1,
    name: "Plan Básico",
    description: "Desarrollo de un bot con 10 comandos básicos.",
    originalPrice: 15,
    discountPrice: 5,
    discountPercentage: 67,
    image: "https://cdn.discordapp.com/attachments/1336806083523645482/1356289595167215646/image.png?ex=67ec069e&is=67eab51e&hm=ed75a3e30261c2d5fcac0e045edaff4d902d3c22be4c03fa870c14db47f88ab6&"
  },
  {
    id: 2,
    name: "Plan Avanzado",
    description: "Desarrollo de un bot con 20 comandos avanzados y personalizados.",
    originalPrice: 30,
    discountPrice: 15,
    discountPercentage: 50,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Plan Completo",
    description: "Desarrollo de un bot con más de 40 comandos y características avanzadas.",
    originalPrice: 50,
    discountPrice: 30,
    discountPercentage: 40,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    name: "Plan de Mantenimiento Mensual",
    description: "Soporte continuo, corrección de errores y actualizaciones.",
    originalPrice: 25,
    discountPrice: 10,
    discountPercentage: 60,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    name: "Desarrollador de Bot Personal",
    description: "Acceso a un desarrollador exclusivo para actualizaciones y soporte.",
    originalPrice: 40,
    discountPrice: 25,
    discountPercentage: 38,
    image: "https://via.placeholder.com/150"
  }
];

export default function OnlineStore() {
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    discordId: "",
    discordName: "",
    commands: "",
    additionalInfo: ""
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "AVXcUNpYGeIk8YtqCCLDRvTra1NyoPK27uyNa3iDNsaupGerg4YLh5H7i9_i582Sf-DfFpPA8PTd5XFW" }}>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-10">
        <nav className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6">
          <h1 className="text-xl font-bold">Tienda Online</h1>
          {user ? (
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleSignOut}>Cerrar sesión</Button>
          ) : (
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleGoogleSignIn}>Iniciar sesión con Google</Button>
          )}
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div key={product.id} whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-2xl shadow-lg">
              <Card>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-400 line-through">{product.originalPrice}€</p>
                  <p className="text-red-500 text-lg font-bold">{product.discountPrice}€</p>
                  <p className="text-green-500 font-semibold">{product.discountPercentage}% de descuento</p>
                  <Button 
                    className="w-full bg-blue-600 text-white mt-4 hover:bg-blue-700" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    Comprar Ahora
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {selectedProduct && user && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Formulario de Compra</h2>
              <input name="firstName" placeholder="Nombre" onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
              <input name="lastName" placeholder="Apellido" onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
              <input name="discordId" placeholder="ID de Discord" onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
              <input name="discordName" placeholder="Nombre en Discord" onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
              <input name="commands" placeholder="Comandos deseados" onChange={handleInputChange} className="w-full p-2 border rounded mb-2" />
              <textarea name="additionalInfo" placeholder="Información adicional" onChange={handleInputChange} className="w-full p-2 border rounded mb-2"></textarea>
              
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: selectedProduct.discountPrice.toString()
                      }
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(() => {
                    setSelectedProduct(null);
                    alert("Pago con éxito. Su bot será entregado por Discord cuando lo tengamos, tardamos aproximadamente 30 días en hacerlo.");
                  });
                }}
              />
              <Button className="w-full bg-red-600 text-white mt-2 hover:bg-red-700" onClick={() => setSelectedProduct(null)}>
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {user && (
          <p className="text-center text-white mt-6">Estás conectado como {user.displayName}. Para contacto, dirígete a: <a href="https://discord.gg/FbetE56SED" className="underline">Discord</a></p>
        )}
      </div>
    </PayPalScriptProvider>
  );
}
