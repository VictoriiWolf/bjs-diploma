// logout

const logoutButton = new LogoutButton();

logoutButton.action = function() {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	})
}

// username info

ApiConnector.current = (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
}

// ratesboard

const ratesBoard = new RatesBoard();

function getRates() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	})
}

getRates();

setInterval(getRates, 60000);

// money operation

let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Ваш баланс пополнен.')
		} else {
			moneyManager.setMessage(false, response.error)
		}
	})
}

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация валюты выполнена.')
		} else {
			moneyManager.setMessage(false, response.error)
		}
	})
}

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Перевод валюты выполнен.')
		} else {
			moneyManager.setMessage(false, response.error)
		}
	})
}

// favorite

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites = ((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь добавлен в список избранного.')
		} else {
			favoritesWidget.setMessage(false, response.error)
		}
	})
}

favoritesWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь удален из списка избранного.')
		} else {
			favoritesWidget.setMessage(false, response.error)
		}
	})
}