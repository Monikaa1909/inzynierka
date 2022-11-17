export const validateLogin: any = (value: string) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex1 = /^[a-zA-Z0-9]+$/i
	if (!regex1.test(value)) {
		return 'error-messages.valid-login';
	}
	return '';
}

export const validateFirstName: any = (value: string) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex1 = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (regex2.test(value) || !regex1.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'error-messages.valid-name';
	}
	return '';
}

export const validateName: any = (value: string) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex1 = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9-"'\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (regex2.test(value) || !regex1.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'error-messages.valid-name';
	}
	return '';
}

export const validateNumber = (value: any) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex = /^[0-9]+$/i;
	if (!regex.test(value)) {
		return 'error-messages.valid-number';
	}
	return '';
}

export const validateNationality = (value: any) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex1 = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ-\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (regex2.test(value) || !regex1.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'error-messages.valid-nationality';
	}
	return '';
}

export const validatePhoneNumber = (value: any) => {
	if (!value) {
		// return 'error-messages.required-field';
		return '';
	}
	const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
	if (!regex.test(value)) {
		return 'error-messages.valid-phone-number'
	}
	return '';
}

export const validateEmail = (value: any) => {
	if (!value) {
		return 'error-messages.required-field'
	}
	const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if (!regex.test(value)) {
		return 'error-messages.valid-email'
	}
	return '';
}

export const validatePassword = (value: any) => {
	if (!value) {
		return 'error-messages.required-field'
	}
	const regex1 = /^(?=.*[a-z])/
	const regex2 =/^(?=.*[A-Z])/
	const regex3 = /^(?=.*[0-9])/
	const regex4 = /^(?=.{8,})/
	if (!regex1.test(value)) {
		return 'error-messages.password.lowercase'
	}

	if (!regex2.test(value)) {
		return 'error-messages.password.uppercase'
	}

	if (!regex3.test(value)) {
		return 'error-messages.password.numeric'
	}

	if (!regex4.test(value)) {
		return 'error-messages.password.lenght'
	}
	
	return '';
}

export const requiredField: any = (value: any) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	return '';
}

export const validatePostalCode = (value: any) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex = /^[0-9]{2}-[0-9]{3}$/;
	if (!regex.test(value)) {
		return 'error-messages.valid-postal-code';
	}
	return '';
}

export const validateCity = (value: any) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ-\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (!regex.test(value) || regex2.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'error-messages.valid-city';
	}
	return '';
}

export const validateStartYear = (value: any, endYear: any) => {
	if (!value) {
		return 'error-messages.required-field';
	}
	const regex = /^[1-2]{1}[0-9]{3}/i;
	if (!regex.test(value)) {
		return 'error-messages.year';
	}
	if (endYear && regex.test(endYear)) {
		if (value > endYear)
			return 'error-messages.start-year'
	}
	return '';
}

export const validateEndYear = (value: any, startYear: any) => {
	if (!value) {
		return ''
	}
	const regex = /^[1-2]{1}[0-9]{3}/i;
	if (!regex.test(value)) {
		return 'error-messages.year';
	}
	if (startYear && regex.test(startYear)) {
		if (value < startYear)
			return 'error-messages.end-year'
	}
	return '';
}

export const validateStartDate = (startDate: Date, endDate: Date) => {
	if (!startDate) {
		return ''
	}
	if (startDate >= endDate) {
		return 'error-messages.start-date'
	}
	return '';
}

export const validateEndDate = (endDate: Date, startDate: Date) => {
	if (!startDate) {
		return 'error-messages.required-field';
	}
	if (startDate >= endDate) {
		return 'error-messages.start-date'
	}
	return '';
}

export const validateMedicalExaminations = (date: Date) => {
	if (date < new Date()) {
		return 'error-messages.no-valid-examinations'
	}
	return '';
}
