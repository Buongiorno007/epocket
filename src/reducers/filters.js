const initialstate = {
	data: [
		{
			id: 'PO',
			image: 'https://epocket.dev.splinestudio.com/static/service_img/barcode3x.png',
			name: 'Оплата любого товара',
			checked: false,
		},
		{
			id: 'CO',
			image: 'https://epocket.dev.splinestudio.com/static/service_img/qrcode3x.png',
			name: 'Оплата акционных товаров',
			checked: true,
			data: [
				{
					id: 1,
					image: 'https://epocket.dev.splinestudio.com/static/service_img/drinks3x.png',
					name: 'Напитки',
					checked: false,
				},
				{
					id: 2,
					image: 'https://epocket.dev.splinestudio.com/static/service_img/meal3x.png',
					name: 'Еда',
					checked: false,
				},
				{
					id: 3,
					image: 'https://epocket.dev.splinestudio.com/static/service_img/cloth3x_sJqOjba.png',
					name: 'Одежда',
					checked: false,
				},
			],
		},
	],
	oldData: [
		{
			id: 'PO',
			image: 'https://epocket.dev.splinestudio.com/static/service_img/barcode3x.png',
			name: 'Оплата любого товара',
			checked: false,
		},
		{
			id: 'CO',
			image: 'https://epocket.dev.splinestudio.com/static/service_img/qrcode3x.png',
			name: 'Оплата акционных товаров',
			checked: true,
			data: [
				{
					id: 1,
					image: 'https://epocket.dev.splinestudio.com/static/service_img/drinks3x.png',
					name: 'Напитки',
					checked: false,
				},
				{
					id: 2,
					image: 'https://epocket.dev.splinestudio.com/static/service_img/meal3x.png',
					name: 'Еда',
					checked: false,
				},
				{
					id: 3,
					image: 'https://epocket.dev.splinestudio.com/static/service_img/cloth3x_sJqOjba.png',
					name: 'Одежда',
					checked: false,
				},
			],
		},
	],
}

export default (state = initialstate, action) => {
	switch (action.type) {
		default:
			return state
	}
}
