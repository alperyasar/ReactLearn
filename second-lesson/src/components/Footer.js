export default function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 20;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer>
      {isOpen ? (
        <p>Aksam {closeHour}'a kadar sipariş verebilirsiniz.</p>
      ) : (
        <p>Şu an kapalıyız. Açılış saatimiz {openHour}</p>
      )}
    </footer>
  );
}
