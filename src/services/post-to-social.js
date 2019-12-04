import { Linking, Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs'
import Share from 'react-native-share'

export function socialPost(data, confirmFunction, errorFunction) {
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
				Linking.openURL('instagram://library?LocalIdentifier=' + data)
					.then(() => confirmFunction())
					.catch(() => errorFunction())
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
