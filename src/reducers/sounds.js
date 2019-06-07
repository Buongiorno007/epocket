import Sound from 'react-native-sound'

const SET_SOUNDS = 'sounds/SET_SOUNDS'

export default (state = [{}, {}], action) => {
	switch (action.type) {
		case SET_SOUNDS:
			return action.sounds
		default:
			return state
	}
}
export const setSounds = () => {
	let sounds = []
	Sound.setCategory('Playback')
	const clock_tick = new Sound('clock_tick.wav', Sound.MAIN_BUNDLE, (error) => {
		if (error) {
			return
		}
	})
	const quest_complete = new Sound('quest_complete.mp3', Sound.MAIN_BUNDLE, (error) => {
		if (error) {
			return
		}
	})
	const quest_fail = new Sound('quest_fail.wav', Sound.MAIN_BUNDLE, (error) => {
		if (error) {
			return
		}
	})
	sounds.push(clock_tick)
	sounds.push(quest_complete)
	sounds.push(quest_fail)
	return {
		type: SET_SOUNDS,
		sounds,
	}
}
export const playClock = (clock_tick) => async (dispatch) => {
	clock_tick.play((success) => {
		if (!success) {
			clock_tick.reset()
		}
	})
}
export const playQuestComplete = (quest_complete) => async (dispatch) => {
	quest_complete.play((success) => {
		if (!success) {
			quest_complete.reset()
		}
	})
}
export const playQuestFail = (quest_fail) => async (dispatch) => {
	quest_fail.play((success) => {
		if (!success) {
			quest_fail.reset()
		}
	})
}
export const stopClock = (clock_tick) => async (dispatch) => {
	clock_tick.stop(() => {})
}
