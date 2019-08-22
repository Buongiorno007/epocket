import { STOREPOINT } from './__proto__'

const SET_POINT = '[storePoint] SET_POINT'

// const initialState = new STOREPOINT()
const initialState = [
	{
		img: 'add cloth link',
		title: 'Одежда',
		count: '4',
		data: [
			{
				id: 1,
				image: 'cloth link',
				title: 'Футболка',
				price: '150',
			},
			{
				id: 2,
				image: 'cloth link',
				title: 'Костюм',
				price: '150',
			},
			{
				id: 3,
				image: 'cloth link',
				title: 'Костюм',
				price: '150',
			},
			{
				id: 4,
				image: 'cloth link',
				title: 'Кепка',
				price: '150',
			},
		],
	},
]

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export const setPoint = (point) => ({ type: SET_POINT, point })
