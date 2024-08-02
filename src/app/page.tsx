"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
  CheckCircleIcon,
} from "lucide-react";
import wilayas from "../components/utils/wilayas";
import axios from "axios";

function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedBaladiya, setSelectedBaladiya] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(2999);
  const [showCountdown, setShowCountdown] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWilaya(e.target.value);
    setSelectedBaladiya("");
  };

  const handleBaladiyaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBaladiya(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    setTotalPrice(5990 * newQuantity);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      firstName,
      lastName,
      phoneNumber,
      selectedWilaya,
      selectedBaladiya,
      quantity,
      totalPrice,
    };

    try {
      const response = await axios.post("/api/order", orderData);

      if (response.data.success) {
        setShowSuccessModal(true);
      } else {
        console.error("Error creating order:", response.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      {showCountdown && (
        <div
          className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-lg shadow-md z-50 cursor-pointer"
          onClick={() => setShowCountdown(false)}
        >
          <span className="text-sm font-semibold">
            الوقت المتبقي: {formatTime(timeLeft)}
          </span>
        </div>
      )}

      <header className="fixed top-0 left-0 w-full px-6 lg:px-12 h-20 flex items-center justify-between bg-green-600 shadow-lg z-40">
        <Link href="#" className="flex items-center" prefetch={false}>
          <ShoppingBagIcon className="h-8 w-8 text-white" />
          <span className="ml-3 text-2xl font-bold text-white">OmniMart</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {[
            { name: "الرئيسية", id: "home" },
            { name: "المنتجات", id: "products" },
            { name: "المميزات", id: "features" },
            { name: "الطلب", id: "order" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-lg font-medium text-white hover:text-orange-300 transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-8 w-8" />
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white w-64 h-full p-6">
            <button
              className="absolute top-4 right-4 text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <XIcon className="h-6 w-6" />
            </button>
            <nav className="mt-8 space-y-4">
              {[
                { name: "الرئيسية", id: "home" },
                { name: "المنتجات", id: "products" },
                { name: "المميزات", id: "features" },
                { name: "الطلب", id: "order" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-right text-lg font-medium text-gray-800 hover:text-green-600 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 mt-20">
        <section
          id="home"
          className="w-full py-24 md:py-32 bg-gradient-to-r from-green-600 to-green-700 text-white"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 space-y-8">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  حزمة الأناقة الفاخرة للرجل العصري
                </h1>
                <p className="text-xl lg:text-2xl opacity-90 max-w-2xl">
                  اكتشف مجموعتنا الحصرية: حقيبة أنيقة، ساعة فاخرة، ومحفظة راقية.
                  مع هدية خاصة لك!
                </p>
                <button className="bg-orange-500 text-white text-xl font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors">
                  <a href="#order"> اطلب الآن</a>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="w-full py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-bold text-center mb-16 text-green-700">
              منتجاتنا الفاخرة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  name: "حقيبة جلدية فاخرة",
                  image: "https://telegra.ph/file/76c4ab01c165335b992be.jpg",
                  description: "مصنوعة من أجود أنواع الجلود، أناقة تدوم لسنوات",
                },
                {
                  name: "ساعة أنيقة",
                  image: "https://telegra.ph/file/a240c5f1b4b42e6794749.jpg",
                  description: "دقة سويسرية وتصميم عصري يناسب جميع المناسبات",
                },
                {
                  name: "محفظة عصرية",
                  image: "https://telegra.ph/file/c118e8484a211a3ef3bd3.jpg",
                  description: "عملية وأنيقة، تتسع لكل احتياجاتك اليومية",
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="bg-whit rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-auto h-64 object-cover mx-auto bg-white"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-24 bg-gray-100">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-bold text-center mb-16 text-green-700">
              لماذا تختار حزمة منتجاتنا؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "جودة استثنائية",
                  description:
                    "منتجات مصنوعة بعناية فائقة من أرقى المواد لتدوم معك طويلاً.",
                  icon: "🌟",
                  color: "bg-green-600",
                },
                {
                  title: "تصميم عصري",
                  description:
                    "تصاميم أنيقة تعكس الذوق الرفيع وتناسب الرجل العصري في كل المناسبات.",
                  icon: "🎩",
                  color: "bg-orange-500",
                },
                {
                  title: "قيمة مميزة",
                  description:
                    "حزمة متكاملة بسعر استثنائي مع هدية خاصة تزيد من قيمة اختيارك.",
                  icon: "💼",
                  color: "bg-red-600",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.color} text-white p-8 rounded-xl shadow-lg text-center transition-transform hover:scale-105`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="order" className="w-full py-24 bg-green-50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
              <h2 className="text-4xl font-bold text-center mb-10 text-green-700">
                اطلب حزمتك الآن
              </h2>
              <div className="text-2xl font-semibold text-center mb-8 text-orange-500">
                عرض خاص 2999 د.ج فقط
              </div>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full text-lg py-3 px-4 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      required
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full text-lg py-3 px-4 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-lg font-semibold mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    required
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d*$/.test(input) && input.length <= 10) {
                        setPhoneNumber(input);
                      }
                    }}
                    className="w-full text-lg py-3 px-4 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
                    placeholder="أدخل رقم الهاتف"
                    maxLength={10}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                      الولاية
                    </label>
                    <select
                      value={selectedWilaya}
                      required
                      onChange={handleWilayaChange}
                      className="w-full text-lg py-3 px-4 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
                    >
                      <option value="">اختر الولاية</option>
                      {wilayas?.map((wilaya, index) => (
                        <option key={index} value={wilaya.name}>
                          {wilaya.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                      البلدية
                    </label>
                    <select
                      value={selectedBaladiya}
                      onChange={handleBaladiyaChange}
                      required
                      className="w-full text-lg py-3 px-4 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
                      disabled={!selectedWilaya}
                    >
                      <option value="">اختر البلدية</option>
                      {selectedWilaya &&
                        wilayas
                          ?.find((wilaya) => wilaya?.name === selectedWilaya)
                          ?.baladiyas.map((baladiya, index) => (
                            <option key={index} value={baladiya}>
                              {baladiya}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                      الكمية
                    </label>
                    <input
                      required
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      className="w-full text-lg py-3 px-4 border border-green-500 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-lg font-semibold mb-2">
                      السعر الإجمالي
                    </label>
                    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-red-500 line-through text-xl font-semibold">
                          {(7000 * quantity).toLocaleString()} د.ج
                        </span>
                        <span className="text-gray-400 text-xl font-bold">
                          /
                        </span>
                        <span className="text-green-600 text-2xl font-extrabold">
                          {(5800 * quantity).toLocaleString()} د.ج
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white text-xl py-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  إضافة الطلب
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-green-700 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg mb-4 md:mb-0">
              &copy; 2024 OmniMart. جميع الحقوق محفوظة.
            </p>
            <nav className="flex gap-8">
              <Link
                href="#"
                className="text-lg hover:text-orange-300 transition-colors"
                prefetch={false}
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="#"
                className="text-lg hover:text-orange-300 transition-colors"
                prefetch={false}
              >
                الشروط والأحكام
              </Link>
            </nav>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-auto text-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">تم إرسال طلبك!</h2>
            <p className="text-gray-600 mb-6">
              شكراً لك على الطلب. سنقوم بمعالجته في أقرب وقت.
            </p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={closeModal}
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Component;
