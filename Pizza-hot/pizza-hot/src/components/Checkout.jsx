import { useContext, useEffect, useState } from "react";
import Modal from "./UI/Modal";
import { UIContext } from "./UI/UIContext";
import { CartContext } from "../contexts/CartContext";

export default function Checkout() {
  const { UIProgress, hideCheckout } = useContext(UIContext);
  const { items, clearCart } = useContext(CartContext);

  // Sepet toplamı
  const cartTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Form state’leri
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [addressDetails, setAddressDetails] = useState("");

  // Dokunma + hatalar (e-posta ve telefon için)
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{11}$/;

  const handleEmailChange = (e) => {
    if (!emailTouched) setEmailTouched(true);
    setEmail(e.target.value);
  };
  const handleEmailBlur = () => {
    if (emailTouched && !emailRegex.test(email)) {
      setEmailError("Lütfen geçerli bir e-posta girin.");
      setTimeout(() => setEmailError(""), 3000);
    }
  };

  const handlePhoneChange = (e) => {
    if (!phoneTouched) setPhoneTouched(true);
    setPhone(e.target.value);
  };
  const handlePhoneBlur = () => {
    if (phoneTouched && !phoneRegex.test(phone)) {
      setPhoneError("11 haneli rakam olmalı.");
      setTimeout(() => setPhoneError(""), 3000);
    }
  };

  // Modal açıldığında focus’u temizle
  useEffect(() => {
    if (UIProgress === "checkout") document.activeElement.blur();
  }, [UIProgress]);

  // Form gönderim handler’ı
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      name,
      email,
      phone,
      city,
      district,
      street,
      addressDetails,
    };

    const orderPayload = {
      order: {
        items,
        customer: customerData,
      },
    };

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Sunucu hatası");
      }
      // Başarı durumu: sepeti temizleyip checkout’u kapat
      clearCart();
      hideCheckout();
      alert("Siparişiniz alındı!");
    } catch (err) {
      console.error(err);
      alert("Sipariş gönderilirken bir hata oldu: " + err.message);
    }
  };

  return (
    <Modal open={UIProgress === "checkout"} className="cart-modal">
      <header className="modal-header">
        <h2>Checkout</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {items.length === 0 ? (
            <p className="text-muted">No items in your cart.</p>
          ) : (
            <>
              {/* Sepet Özeti */}
              <ul className="list-group mb-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.title}</strong> × {item.quantity}
                    </div>
                    <div>{(item.price * item.quantity).toFixed(2)}₺</div>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>{cartTotal.toFixed(2)}₺</strong>
                </li>
              </ul>

              {/* Teslimat Formu */}
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ad Soyad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="row mb-2">
                <div className="col-md-6 position-relative">
                  {emailError && (
                    <div className="error-bubble">{emailError}</div>
                  )}
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-posta"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    required
                  />
                </div>
                <div className="col-md-6 position-relative">
                  {phoneError && (
                    <div className="error-bubble">{phoneError}</div>
                  )}
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Telefon"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    required
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Şehir"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="İlçe"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Sokak / Mahalle"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Adres Detayları"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <footer className="modal-footer">
          <div className="text-end w-100">
            <button
              type="button"
              onClick={hideCheckout}
              className="btn btn-sm btn-outline-danger me-2"
            >
              Cancel
            </button>
            {items.length > 0 && (
              <button type="submit" className="btn btn-sm btn-primary">
                Save
              </button>
            )}
          </div>
        </footer>
      </form>
    </Modal>
  );
}
