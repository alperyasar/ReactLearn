const Summary = ({ items }) => {
  if (items.length === 0) {
    return (
      <footer className="summary">
        Alışveriş Listenizi hazırlamaya başlayabilirsiniz.
      </footer>
    );
  }
  const itemsCount = items.length;
  const selectedItemsCount = items.filter((item) => item.completed).length;

  return (
    <footer className="summary">
      {itemsCount === selectedItemsCount ? (
        <p>Alışveriş tamamlandı.</p>
      ) : (
        <p>
          Alışveriş sepetinizide {itemsCount} üründen {selectedItemsCount} ürün
          konuldu.
        </p>
      )}
    </footer>
  );
};

export default Summary;
