import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
  const [page, setPage] = useState(0);

  const onPageSelected = (e) => {
    setPage(e.nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <PagerView
        initialPage={0}
        style={styles.content}
        onPageSelected={onPageSelected}
      >
        <View key="1" style={styles.page}>
          <Image
            source={{ uri: 'https://images.kabum.com.br/produtos/fotos/112948/mouse-gamer-logitech-g203-rgb-lightsync-6-botoes-8000-dpi-preto-910-005793_1612880275_g.jpg' }}
            style={styles.image}
            resizeMode="contain" 
          />
        </View>

        <View key="2" style={styles.page}>
          <Image
            source={{ uri: 'https://a-static.mlcdn.com.br/450x450/teclado-gamer-com-fio-usb-silencioso-ergonomico-com-iluminacao-rgb-lehmox/shop-aquarela/ley-2086/4c4b4ba049bc33835e6e7f4d5d8daaca.jpeg' }}
            style={styles.image}
            resizeMode="contain" 
          />
        </View>

        <View key="3" style={styles.page}>
          <Image
            source={{ uri: 'https://images.tcdn.com.br/img/img_prod/779098/headset_gamer_havit_gamenote_h654d_rgb_preto_483_1_c8da1c21f25008d2b0e397135c852921.jpg' }}
            style={styles.image}
            resizeMode="contain" 
          />
        </View>
      </PagerView>
      
      <View style={styles.bulletContent}>
        <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
        <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
        <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 200, 
    width: "100%",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: "100%", 
    height: "100%", 
    borderRadius: 10, 
  },
  bulletContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    margin: 5,
  },
  activeBullet: {
    backgroundColor: "#000",
  },
});
