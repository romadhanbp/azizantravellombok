const armadaMobil = [
  { id: 1, nama: "Daihatsu Ayla", harga: 250000, hargaDriver: 600000, gambar: "ayla.jpg", kategori: "mobil" },
  { id: 2, nama: "Toyota Agya", harga: 300000, hargaDriver: 600000, gambar: "agya.jpg", kategori: "mobil" },
  { id: 3, nama: "Honda Brio", harga: 350000, hargaDriver: 600000, gambar: "brio.jpg", kategori: "mobil" },
  { id: 4, nama: "Toyota Raize", harga: 400000, hargaDriver: 700000, gambar: "raize.jpg", kategori: "mobil" },
  { id: 5, nama: "Daihatsu Xenia", harga: 350000, hargaDriver: 650000, gambar: "xenia.jpg", kategori: "mobil" },
  { id: 6, nama: "Toyota Avanza", harga: 300000, hargaDriver: 600000, gambar: "avanza.jpg", kategori: "mobil" },
  { id: 7, nama: "Grand Livina", harga: 400000, hargaDriver: 700000, gambar: "livina.jpg", kategori: "mobil" },
  { id: 8, nama: "All New Avanza", harga: 350000, hargaDriver: 650000, gambar: "avanza-new.jpg", kategori: "mobil" },
  { id: 9, nama: "Innova Reborn", harga: 550000, hargaDriver: 900000, gambar: "innova.jpg", kategori: "mobil" },
  { id: 10, nama: "Suzuki Ertiga", harga: 300000, hargaDriver: 600000, gambar: "ertiga.jpg", kategori: "mobil" },
  { id: 11, nama: "Toyota Veloz", harga: 400000, hargaDriver: 700000, gambar: "veloz.jpg", kategori: "mobil" },
  { id: 12, nama: "Mitsubishi Xpander", harga: 400000, hargaDriver: 700000, gambar: "xpander.jpg", kategori: "mobil" },
  { id: 13, nama: "Daihatsu Terios", harga: 450000, hargaDriver: 750000, gambar: "terios.jpg", kategori: "mobil" },
  { id: 14, nama: "Toyota Rush", harga: 500000, hargaDriver: 750000, gambar: "rush.jpg", kategori: "mobil" },
  { id: 15, nama: "Innova Zenix", harga: 700000, hargaDriver: 1000000, gambar: "zenix.jpg", kategori: "mobil" },
  { id: 16, nama: "Mitsubishi Pajero", harga: null, hargaDriver: 1500000, gambar: "pajero.jpg", kategori: "mobil" },
  { id: 17, nama: "Fortuner TRD", harga: 850000, hargaDriver: 1100000, gambar: "fortuner-trd.jpg", kategori: "mobil" },
  { id: 18, nama: "Fortuner GR", harga: 1000000, hargaDriver: 1200000, gambar: "fortuner-gr.jpg", kategori: "mobil" },
  { id: 19, nama: "Fortuner Legender", harga: 1100000, hargaDriver: 1500000, gambar: "fortuner-legend.jpg", kategori: "mobil" },
  { id: 20, nama: "Alphard Gen 3", harga: null, hargaDriver: 2500000, gambar: "alphard3.jpg", kategori: "mobil" },
  { id: 21, nama: "Alphard Gen 4", harga: null, hargaDriver: 4500000, gambar: "alphard4.jpg", kategori: "mobil" },
  { id: 22, nama: "Hiace Commuter", harga: null, hargaDriver: 1200000, gambar: "hiace-commuter.jpg", kategori: "mobil" },
  { id: 23, nama: "Hiace Premio", harga: null, hargaDriver: 1500000, gambar: "hiace-premio.jpg", kategori: "mobil" },
  { id: 24, nama: "Medium Bus", harga: null, hargaDriver: 1500000, gambar: "bus-medium.jpg", kategori: "mobil" },
  { id: 25, nama: "Big Bus", harga: null, hargaDriver: 2500000, gambar: "bus-big.jpg", kategori: "mobil" },
];

const armadaMotor = [
  { id: 101, nama: "Yamaha Filano", harga: 125000, gambar: "filano.jpg", kategori: "motor" },
  { id: 102, nama: "Yamaha NMAX", harga: 150000, gambar: "nmax.jpg", kategori: "motor" },
  { id: 103, nama: "Honda PCX", harga: 150000, gambar: "pcx.jpg", kategori: "motor" },
  { id: 104, nama: "Honda Vario", harga: 100000, gambar: "vario.jpg", kategori: "motor" },
  { id: 105, nama: "Yamaha Aerox", harga: 150000, gambar: "aerox.jpg", kategori: "motor" },
];

const getArmadaWA = (item, tipe) => {
  const noHP = "6281999868882";
  const isMobil = tipe === 'mobil';
  const nama = isMobil ? item.nama : item.nama;
  const text = `Halo Azizan Travel Lombok, Saya Ingin Sewa ${tipe === 'mobil' ? 'Mobil' : 'Motor'} ${nama}.`;
  return `https://wa.me/${noHP}?text=${encodeURIComponent(text)}`;
};
