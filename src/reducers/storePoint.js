import { STOREPOINT } from './__proto__'

const SET_POINT = '[storePoint] SET_POINT'

// const initialState = new STOREPOINT()
const initialState = {
	uri:
		'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
	title: 'ADIDAS',
	subtitle: 'Ул. Пушкина, дом Колотушкина',
	data: [
		{
			id: 1,
			img: 'http://s1.iconbird.com/ico/2013/9/452/w512h4481380477147tshirt.png',
			title: 'Одежда',
			count: '4',
			data: [
				{
					id: 1,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Футболка',
					price: '150',
				},
				{
					id: 2,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Костюм',
					price: '150',
				},
				{
					id: 3,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Костюм',
					price: '150',
				},
				{
					id: 4,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Кепка',
					price: '150',
				},
			],
		},
		{
			id: 2,
			img: 'http://s1.iconbird.com/ico/2013/9/452/w512h4481380477147tshirt.png',
			title: 'Шорты',
			count: '4',
			data: [
				{
					id: 1,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Футболка',
					price: '150',
				},
				{
					id: 2,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Костюм',
					price: '150',
				},
				{
					id: 3,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Костюм',
					price: '150',
				},
				{
					id: 4,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Кепка',
					price: '150',
				},
			],
		},
		{
			id: 3,
			img: 'http://s1.iconbird.com/ico/2013/9/452/w512h4481380477147tshirt.png',
			title: 'Обувь',
			count: '4',
			data: [
				{
					id: 1,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Футболка',
					price: '150',
				},
				{
					id: 2,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Костюм',
					price: '150',
				},
				{
					id: 3,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Костюм',
					price: '150',
				},
				{
					id: 4,
					image:
						'https://www.washingtonpost.com/resizer/G7FOrmAKMqD15lb71tLjsbwTacg=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/7AFU46FDW4I6PLPBO3IGDVLO7I.jpg',
					title: 'Кепка',
					price: '150',
				},
			],
		},
	],
}

export default (state = initialState, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export const setPoint = (point) => ({ type: SET_POINT, point })
