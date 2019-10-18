import React, { useState } from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions } from "react-native"
import Modal from "react-native-modal";
import route from "@services/route"
import { connect } from "react-redux"
import { colors } from "@constants/colors"
import sbHeight from "@services/getSBHeight"


const { width } = Dimensions.get("window")

function TaskHeader({ progressTask, profileState }) {

  const [priceWith, setPriceWidth] = useState(0)
  const [visible, setVisible] = useState(false)

  agreed = () =>{
    setVisible(!visible)
    route.popToTop()
  }

  const textWidth = width - priceWith * 2 - 32

  return (
    <View style={styles.container}>
      <View
        style={styles.viewPrice}
        onLayout={event => {
          const { width } = event.nativeEvent.layout
          setPriceWidth(width)
        }}
      >
        <Text style={styles.price}>{`${progressTask.price} ${profileState.currency}`}</Text>
      </View>
      <Text style={[styles.text, { maxWidth: textWidth }]}  numberOfLines={1} ellipsizeMode={'tail'}>{progressTask.name}</Text>
      <View style={[styles.buttonView, { width: priceWith }]}>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(!visible)}>
          <Image source={require("@assets/dv4/taskClose.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
      <Modal isVisible={visible} style={{justifyContent: 'center', alignItems: 'center'}} backdropOpacity={0.2} backdropColor={colors.black111}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTextHeader}>{'Вы уверены,\nчто хотите выйти?'}</Text>
            <Text style={styles.modalTextNormal}>{'Продолжить выполнение задания будет невозможно.\nСредства будут зачислены только за предыдущие\nвыполненные этапы.'}</Text>
            <View style={[styles.row, styles.modalButtonContainer]}>
              <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.modalButton}>
                <Text style={[styles.modalButtonText, {color: colors.blood_red}]}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={agreed} style={[styles.modalButton, {borderLeftWidth: 1, borderColor: colors.mild_gray}]}>
                <Text style={[styles.modalButtonText]}>Выйти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const mapStateToProps = state => {
  return {
    profileState: state.profileState,
    progressTask: state.progressTask,
  }
}

export default connect(mapStateToProps)(TaskHeader)

const styles = StyleSheet.create({
  container: {
    minHeight: 56 + sbHeight,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
  },
  viewPrice: {
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E60050",
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: sbHeight,
  },
  price: {
    fontFamily: "Rubik-Regular",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  text: {
    fontFamily: "Rubik-Medium",
    fontSize: 20,
    paddingHorizontal: 16,
    color: "#111",
    textAlign: "center",
    marginTop: sbHeight,
  },
  buttonView: {
    height: 24,
    alignItems: "flex-end",
    marginTop: sbHeight,
  },
  button: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: width - 100,
    margin : 16
  },
  modalInner: {
    backgroundColor: 'white', 
    borderRadius: 24, 
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalTextHeader: {
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
    color: colors.black111,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  modalTextNormal: {
    fontFamily: 'Rubik-Regular',
    fontSize: 10,
    color: colors.black40,
    textAlign: 'center',
    marginHorizontal: 16
  },
  modalTextBold: {
    fontFamily: 'Rubik-Medium',
    fontSize: 8,
    color: colors.black111,
  }, 
  modalHeaderImage: {
    width: 42,
    height: 36,
    marginTop: 32,
    marginBottom: 8,
  },
  modalMainImage: {
    width: width - 100,
    height: 80,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  modalImageChecked: {
    width: 8,
    height: 8,
    marginRight: 5,
  },
  modalButtonContainer: {
    borderTopWidth: 1, 
    borderColor: colors.mild_gray, 
    height: 48, 
    alignSelf: 'stretch', 
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  modalButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    color: colors.black111,
  }
})
