import { Linking, Platform, CameraRoll } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs'
import Share from 'react-native-share'

export function socialPost(data, confirmFunction, errorFunction) {
	const defaultParams = {
		first: 1,
		// groupTypes: 'video',
		// after: undefined,
	}

	RNFetchBlob.config({
		fileCache: true,
		appendExt: 'mp4',
	})
		.fetch('GET', data.video)
		.then(async (res) => {
			const path = await res.path()
			const base = await res.base64()
			if (Platform.OS === 'ios') {
				const data = encodeURIComponent(path)
				CameraRoll.saveToCameraRoll(data, 'video').then((result) => {
					Linking.openURL('instagram://library?AssetPath=' + result)
						.then(() => {
							setTimeout(async () => {
								confirmFunction()
							}, 5000)
						})
						.catch(() => errorFunction())
				})
				// Linking.openURL('instagram://library?AssetPath=' + data)
				// 	.then(() => {
				// 		setTimeout(async () => {
				// 			confirmFunction()
				// 			try {
				// 				await RNFS.exists(path)
				// 				await RNFS.unlink(path)
				// 			} catch (e) {}
				// 		}, 5000)
				// 	})
				// 	// .then(() => confirmFunction())
				// 	.catch(() => errorFunction())
			} else {
				const shareOptions = {
					url: 'data:video/mp4;base64,' + base,
				}
				try {
					await Share.open(shareOptions)
					setTimeout(async () => {
						confirmFunction()
						try {
							await RNFS.exists(path)
							await RNFS.unlink(path)
						} catch (e) {}
					}, 5000)
				} catch (e) {
					errorFunction()
				}
			}
		})
}
