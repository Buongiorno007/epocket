import { StyleSheet, Dimensions, Platform } from "react-native"

const { width, height } = Dimensions.get("window")
import { colors } from "@constants/colors"
import sbHeight from "@services/getSBHeight"

export default StyleSheet.create({
  main_view: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  game_title: {
    flexDirection: "row",
    marginTop: 30,
    width: width - 32,
    marginBottom: 8,
  },
  game_cost_text: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    width: (width - 32) / 3,
    textAlign: "left",
  },
  game_title_text: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Rubik-Bold",
    width: (width - 32) / 3,
    textAlign: "center",
  },
  game_time_text: {
    color: colors.black,
    fontSize: 15,
    fontFamily: "Rubik-Regular",
    width: (width - 32) / 3,
    textAlign: "right",
  },
  btn_container: {
    marginBottom: 40,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: width - 32,
    height: width - 32,
  },
  item: {
    width: (width - 32) / 3,
    height: (width - 32) / 3,
    padding: 0,
    marginTop: -1,
    marginRight: -1,
    borderWidth: 1,
    zIndex: 9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    borderColor: colors.black_o33,
  },
  item_last_line: {
    width: (width - 32) / 3,
    height: (width - 32) / 3,
    padding: 0,
    borderRadius: 0,
    marginTop: Platform.OS === "ios" ? -2 : -1,
    marginRight: -1,
    borderWidth: 1,
    zIndex: 9,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.black_o33,
  },
  custom_progress: {
    transform: [{ rotate: "180deg" }],
  },
  game_description_text: {
    textAlign: "center",
    color: colors.black41,
    fontSize: 15,
    fontFamily: "Rubik-Bold",
    marginBottom: 16,
  },
  pressed_button: {
    width: (width - 32) / 3,
    height: (width - 32) / 3,
    borderWidth: 2,
    padding: 0,
    marginTop: -1,
    marginRight: -1,
    zIndex: 11,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.dark_pink,
    backgroundColor: colors.dark_pink_o10,
  },

  itemmmm: {
    width: (width - 32) / 3,
    height: (width - 32) / 3,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: colors.black_o33,
  },
  itemmmm_pressed: {
    width: (width - 32) / 3,
    height: (width - 32) / 3,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: colors.dark_pink,
    backgroundColor: colors.dark_pink_o10,
  },
	button: {
		height: 44,
		marginVertical: 10,
		paddingTop: 15,
    elevation: 0,
    backgroundColor: colors.blood_red,
  },
  text: {
		color: colors.white,
		marginBottom: 8,
		fontSize: 14,
		fontFamily: 'Rubik-Medium',
  },
  buttonExit: {
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute', 
    top: 0, 
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray_e5,
    backgroundColor: colors.white,
  },
  game_aval: {
    // position: 'absolute', 
    // top: 110, 
    borderRadius: 24,
    backgroundColor: colors.black111,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  game_aval_t: {
    color: colors.white,
    textAlign: 'center',
  },
  exitContainer: {
    marginTop: sbHeight + 16,
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: width - 32,
    margin : 16,
  },
  modalInner: {
    backgroundColor: 'white',
    borderRadius: 24, 
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalTextHeader: {
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
    paddingHorizontal: 16,
    color: colors.black111,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },  
  modalButtonContainer: {
    borderTopWidth: 1, 
    borderColor: colors.mild_gray, 
    paddingHorizontal: 16,
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
  },
  game_aval: {
    width: width - 32,
    height: 55,
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: sbHeight + 16,
  },
  game_aval_t: {
    borderRadius: 24,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.black111,
    color: colors.white,
  },
  game_aval_img: {
    width: 32,
    height: 32,
  },
})
