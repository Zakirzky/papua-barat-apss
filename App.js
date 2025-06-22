import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  useColorScheme,
  Switch,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OnboardingScreen from './screens/OnboardingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const ThemeContext = createContext();

const data = [
  {
    key: 'Biografi',
    title: 'Biografi Papua Barat',
    content:
      'Papua Barat adalah salah satu provinsi di Indonesia yang terletak di bagian barat Pulau Papua. Ibu kota provinsi ini adalah Manokwari, yang juga menjadi pusat pemerintahan, pendidikan, dan aktivitas ekonomi utama.\n\n' +
      'Secara geografis, Papua Barat menyimpan kekayaan alam yang luar biasa. Dari gugusan kepulauan Raja Ampat yang mendunia, hingga hutan tropis, pegunungan tinggi, dan garis pantai yang masih alami. Wilayah ini juga termasuk salah satu kawasan dengan keanekaragaman hayati tertinggi di dunia.\n\n' +
      'Masyarakat Papua Barat terdiri dari beragam suku bangsa asli yang memiliki bahasa, adat istiadat, dan seni budaya yang sangat unik. Warisan budaya seperti tarian tradisional, rumah adat, dan musik lokal masih dilestarikan hingga saat ini.\n\n' +
      'Papua Barat juga memainkan peran penting dalam sejarah Indonesia, khususnya melalui proses integrasi ke Negara Kesatuan Republik Indonesia yang dimulai pada tahun 1969 lewat Penentuan Pendapat Rakyat (Pepera).\n\n' +
      'Saat ini, Papua Barat terus berkembang dalam bidang infrastruktur, pariwisata, pendidikan, dan pelestarian budaya lokal.',
    image: require('./assets/biografi2.jpg'),
    extraImages: [
      require('./assets/biografi1.jpg'),
      require('./assets/biografi3.jpg'),
    ],
  },


  {
    key: 'Sejarah',
    title: 'Sejarah Papua Barat',
    content: 'Papua Barat memiliki sejarah panjang yang kaya dan kompleks, dimulai dari masa prasejarah hingga menjadi bagian dari Negara Kesatuan Republik Indonesia.\n\n' +
    'Masa Prasejarah dan Kedatangan Bangsa Asing Penduduk asli Papua Barat adalah suku-suku Melanesia yang telah menghuni wilayah ini sejak ribuan tahun lalu. Mereka hidup dalam kelompok kecil dan memiliki budaya, bahasa, dan tradisi yang sangat beragam. Pada abad ke-16, bangsa Eropa mulai datang ke wilayah ini. Penjelajah asal Portugis dan Spanyol adalah yang pertama mencatatkan keberadaan Papua dalam peta dunia barat.\n\n' +
    'Masa Kolonial Belanda  Pada abad ke-19, Belanda mulai mengklaim Papua sebagai bagian dari Hindia Belanda. Namun, kekuasaan Belanda atas Papua Barat tidak berjalan mulus karena medan yang berat dan perlawanan dari penduduk lokal. Belanda mulai membangun pemerintahan kolonial secara bertahap, terutama di pesisir pantai dan beberapa daerah pedalaman.\n\n',
    image:require('./assets/sejarah1.jpg'),
    extraImages: [
      require('./assets/sejarah2.jpg'),
      require('./assets/sejarah3.png'),
    ],
  },


   {
    key: 'Pariwisata',
    title: 'Pariwisata Papua Barat',
    content: 'Papua barat memiliki banyak tempat wisata alam yang sangat indah, eksotis, dan masih alami. Berikut adalah beberapa wisata terkenal di Papua Barat yang wajib dikunjungi :\n\n' +
    '1. RAJA EMPAT\n\n' +
    'Raja Ampat adalah surga wisata bahari yang mendunia, terletak di ujung barat Papua. Terdiri dari lebih dari 1.500 pulau kecil, pulau karang, dan atol, dengan empat pulau utama: Waigeo, Batanta, Salawati, dan Misool. Raja Ampat menyimpan keanekaragaman hayati laut tertinggi di dunia. Air lautnya sangat jernih dengan terumbu karang yang berwarna-warni Daya Tarik iving & snorkeling kelas dunia (lebih dari 1.300 spesies ikan dan 600 jenis karang),Pemandangan bukit karst di Pianemo dan Wayag,Sunset romantis dan kehidupan kampung adatWisata edukasi ekosistem laut dan konservas.\n\n' +
    '2. PULAU MANSINAM\n\n' +
    'Pulau Mansinam adalah tempat bersejarah karena menjadi titik masuknya penyebaran agama Kristen di Tanah Papua pada tahun 1855 oleh dua misionaris Jerman, Ottow dan Geissler. Pulau ini dianggap sakral oleh umat Kristiani di Papua dan setiap 5 Februari diperingati sebagai hari bersejarah. Daya Tarik Patung Yesus setinggi 30 meter di atas bukit, pantai bersih, air laut jernih, cocok snorkeling dan berenang,Wisata religi dan budaya lokal\n\n' +
    '3.TAMAN NASIONAL TELUK CENDRAWASIH\n\n' +
    'aman Nasional Teluk Cenderawasih merupakan taman laut terbesar di Indonesia, luasnya mencapai 1,4 juta hektare. Dikenal sebagai tempat berenang bersama hiu paus (whale shark) secara alami dan aman. Daya Tarik Bertemu langsung dengan hiu paus di Kwatisore,Terumbu karang yang indah dan masih alami,Pulau-pulau kecil dengan hutan bakau dan ekosistem laut langka,Kampung apung dan budaya pesisir\n\n',
    image: require('./assets/rajaampat.jpg'),
    extraImages: [
      require('./assets/mansinam.jpg'),
      require('./assets/teluk.jpg')
    ]
  },

 {
  key: 'Infrastruktur',
  title: 'Infrastruktur Papua Barat',
  content:
    'Pembangunan infrastruktur di Papua Barat merupakan salah satu fokus utama pemerintah dalam mendorong konektivitas, pemerataan pembangunan, dan peningkatan kualitas hidup masyarakat di kawasan timur Indonesia.\n\n' +

    'Transportasi Darat\n' +
    'Papua Barat telah mengalami peningkatan signifikan dalam hal pembangunan jalan dan jembatan. Ruas jalan trans-Papua terus diperluas untuk menghubungkan kota dan kabupaten seperti Manokwari, Fakfak, Sorong, dan Teluk Bintuni. Meski tantangan geografis cukup berat, pembangunan terus berlanjut dengan pendekatan berkelanjutan.\n\n' +

    'Bandara dan Transportasi Udara\n' +
    'Bandara Domine Eduard Osok di Sorong menjadi pintu gerbang utama udara, didukung oleh beberapa bandara perintis seperti di Kaimana, Wasior, dan Raja Ampat. Pemerintah juga membangun terminal baru dan memperpanjang landasan pacu untuk mendukung pertumbuhan pariwisata dan distribusi logistik.\n\n' +

    'Pelabuhan Laut\n' +
    'Pelabuhan Sorong dan Pelabuhan Manokwari menjadi simpul penting dalam jalur logistik laut. Program tol laut menjadikan Papua Barat lebih terhubung dengan wilayah barat Indonesia, membantu distribusi barang dan mengurangi disparitas harga.\n\n' +

    'Telekomunikasi dan Digitalisasi\n' +
    'Proyek Palapa Ring Timur telah memperkuat jaringan internet dan telekomunikasi di Papua Barat. Akses internet kini semakin luas menjangkau daerah pelosok, mendukung layanan publik, pendidikan daring, dan peluang ekonomi digital lokal.\n\n' +

    'Energi dan Kelistrikan\n' +
    'Pemerintah bersama PLN memperluas jaringan listrik melalui program Papua Terang. Banyak desa yang kini teraliri listrik, termasuk dengan pendekatan energi terbarukan seperti PLTS (Pembangkit Listrik Tenaga Surya) untuk daerah terpencil.\n\n' +

    'Fasilitas Publik dan Sosial\n' +
    'Pembangunan rumah sakit regional, puskesmas terpadu, sekolah negeri, dan balai pelatihan vokasi terus digencarkan. Infrastruktur sosial ini penting untuk mendukung kualitas SDM lokal dan meningkatkan pelayanan dasar masyarakat.\n\n' +

    'Dengan pendekatan kolaboratif antara pemerintah pusat, daerah, dan mitra pembangunan, Papua Barat kini bergerak maju menuju wilayah yang lebih terhubung, inklusif, dan berdaya saing.',
  image: require('./assets/infrastruktur1.jpg'),
  extraImages: [
    require('./assets/infrastruktur2.jpg'),
    require('./assets/infrastruktur3.jpg'),
  ],
},


{
  key: 'Budaya',
  title: 'Budaya Papua Barat',
  content:
    'Budaya Papua Barat merupakan warisan leluhur yang sangat kaya dan beragam. Wilayah ini dihuni oleh puluhan suku asli seperti suku Arfak, Meyah, Hatam, Biak, dan Moi, yang masing-masing memiliki bahasa, adat istiadat, dan kearifan lokal yang unik.\n\n' +

    'Seni Tari dan Musik Tradisional\n' +
    'Tarian tradisional seperti Tari Wor dan Tari Yospan menjadi bagian penting dalam upacara adat dan penyambutan tamu. Musik tradisional khas Papua Barat dimainkan dengan alat musik tifa, drum kulit asli yang ditabuh secara ritmis sambil menari.\n\n' +

    'Ukiran dan Kerajinan Tangan\n' +
    'Masyarakat Papua Barat terkenal akan kemampuan seni ukir dan pahat, khususnya dalam pembuatan perahu, topeng, dan patung kayu yang digunakan dalam ritual adat. Kerajinan tangan seperti noken (tas rajut tradisional), perhiasan dari kerang, dan anyaman pandan juga populer.\n\n' +

    'Rumah Adat dan Arsitektur Tradisional\n' +
    'Setiap suku memiliki bentuk rumah adat yang berbeda. Suku Arfak misalnya memiliki rumah kaki seribu (mod aki aksa) yang dibangun di atas tiang-tiang untuk menghadapi kontur alam pegunungan dan menjaga suhu tetap hangat.\n\n' +

    'Bahasa Daerah dan Tradisi Lisan\n' +
    'Papua Barat memiliki lebih dari 80 bahasa daerah yang masih digunakan secara aktif. Tradisi lisan seperti dongeng rakyat, pantun adat, dan cerita asal-usul menjadi sarana pewarisan nilai-nilai budaya kepada generasi muda.\n\n' +

    'Upacara dan Ritual Adat\n' +
    'Berbagai upacara adat dilakukan untuk menandai kelahiran, pernikahan, panen, atau kedewasaan. Upacara adat juga menjadi simbol penghormatan kepada alam dan leluhur, serta bentuk solidaritas sosial antarwarga kampung.\n\n' +

    'Pelestarian Budaya di Era Modern\n' +
    'Kini, budaya Papua Barat mulai didokumentasikan melalui museum daerah, festival budaya seperti "Festival Danau Ayamaru", serta kolaborasi dengan seniman muda dan teknologi digital. Ini dilakukan untuk menjaga identitas lokal agar tetap lestari di tengah modernisasi.\n\n' +

    'Dengan segala keunikan dan keindahannya, budaya Papua Barat bukan hanya identitas lokal, tapi juga kekayaan bangsa yang harus terus dijaga dan diperkenalkan kepada dunia.',
  image: require('./assets/budaya1.jpg'),
  extraImages: [
    require('./assets/budaya2.jpg'),
    require('./assets/budaya3.jpg'),
  ],
},




];

const Section = ({ route }) => {
  const { isDark } = useContext(ThemeContext);
  const styles = getStyles(isDark);
  const { title, content, image, extraImages } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>

      {extraImages?.length > 0 && (
        <>
          <Text style={[styles.title, { marginTop: 20 }]}>Galeri</Text>
          <FlatList
            data={extraImages}
            horizontal
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => (
              <Image source={item} style={styles.galleryImage} />
            )}
          />
        </>
      )}
    </ScrollView>
  );
};

const ListScreen = ({ navigation }) => {
  const { isDark } = useContext(ThemeContext);
  const styles = getStyles(isDark);

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={3} style={styles.content}>
            {item.content}
          </Text>
          <Text
            style={{ color: 'tomato', marginTop: 8 }}
            onPress={() => navigation.navigate('Detail', item)}
          >
            Selengkapnya
          </Text>
        </View>
      )}
    />
  );
};

const Cari = ({ navigation }) => {
  const { isDark } = useContext(ThemeContext);
  const styles = getStyles(isDark);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 1) {
      const filtered = data.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.content.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari tentang Papua Barat..."
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={3} style={styles.content}>
              {item.content}
            </Text>
            <Text
              style={{ color: 'tomato', marginTop: 8 }}
              onPress={() => navigation.navigate('Detail', item)}
            >
              Selengkapnya
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const Pengaturan = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(isDark);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tema Gelap</Text>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
};

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Beranda: 'home',
          Cari: 'search',
          Pengaturan: 'settings',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Beranda" component={ListScreen} />
    <Tab.Screen name="Cari" component={Cari} />
    <Tab.Screen name="Pengaturan" component={Pengaturan} />
  </Tab.Navigator>
);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);

  useEffect(() => {
  const loadSettings = async () => {
    // Hapus untuk testing agar onboarding muncul lagi
    await AsyncStorage.removeItem('hasSeenOnboarding');

    const seen = await AsyncStorage.getItem('hasSeenOnboarding');
    const themePref = await AsyncStorage.getItem('theme');
    setHasSeenOnboarding(seen === 'true');
    if (themePref === 'dark') setIsDark(true);
    if (themePref === 'light') setIsDark(false);
  };
  loadSettings();
}, []);


  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    await AsyncStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const themeValue = useMemo(() => ({ isDark, toggleTheme }), [isDark]);

  if (hasSeenOnboarding === null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <Stack.Navigator
          initialRouteName={hasSeenOnboarding ? 'Login' : 'Onboarding'}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Detail" component={Section} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#f0f0f0',
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    card: {
      backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 16 / 9,
      borderRadius: 10,
      marginBottom: 12,
    },
    galleryImage: {
      width: 200,
      height: 120,
      borderRadius: 10,
      marginRight: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
      marginBottom: 6,
    },
    content: {
      fontSize: 14,
      color: isDark ? '#ccc' : '#444',
    },
    searchInput: {
      height: 45,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      marginBottom: 16,
      backgroundColor: isDark ? '#2b2b2b' : '#fff',
      color: isDark ? '#fff' : '#000',
    },
  });
