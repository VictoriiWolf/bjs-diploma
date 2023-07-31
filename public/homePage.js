'use strict'

// login

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
	console.log(data);

	ApiConnector.login(data, (response) => {
		console.log(response);
		if (response.success) {
			location.reload();
		} else {
			setLoginErrorMessage(response.error);
		}
	});
}

// register

userForm.registerFormCallback = (data) => {
	console.log(data);

	ApiConnector.register(data, (response) => {
		console.log(response)
		if (response.success) {
			location.reload();
		} else {
			setRegisterErrorMessage(response.error);
		}
	});
}