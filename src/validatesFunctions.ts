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
		return 'This field is required';
	}
	const regex1 = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9-"'\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (regex2.test(value) || !regex1.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'This field must be a valid name';
	}
	return '';
}

export const validateNumber = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex = /^[0-9]+$/i;
	if (!regex.test(value)) {
		return 'This field must be a valid number';
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
		return 'error-messages.valid-name';
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
		return 'error-messages.valid-name'
	}
	return '';
}

export const validateEmail = (value: any) => {
	if (!value) {
		// return 'error-messages.required-field'
		return '';
	}
	const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if (!regex.test(value)) {
		return 'error-messages.valid-name'
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
		return 'This field is required';
	}
	const regex = /^[0-9]{2}-[0-9]{3}$/;
	if (!regex.test(value)) {
		return 'This field must be a valid postal code';
	}
	return '';
}

export const validateCity = (value: any) => {
	if (!value) {
		return 'This field is required';
	}
	const regex = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ-\s]+$/i;
	const regex2 = /^[\s]*$/i;
	const regex3 = /^[\s][.]*/i;
	const regex4 = /[.]*[\s]$/i;
	if (!regex.test(value) || regex2.test(value) || regex3.test(value) || regex4.test(value)) {
		return 'This field must be a valid city name (numbers and special characters are not allowed)';
	}
	return '';
}

export const validateStartYear = (value: any, endYear: any) => {
	if (!value) {
		return 'The field with the lower year is required';
	}
	const regex = /^[1-2]{1}[0-9]{3}/i;
	if (!regex.test(value)) {
		return 'The field with the lower year must be a valid number';
	}
	if (endYear && regex.test(endYear)) {
		if (value > endYear)
			return 'The lower year must be smaller than higher year'
	}
	return '';
}

export const validateEndYear = (value: any, startYear: any) => {
	if (!value) {
		return 'The field with the higher year is required';
	}
	const regex = /^[1-2]{1}[0-9]{3}/i;
	if (!regex.test(value)) {
		return 'The field with the higher year must be a valid number';
	}
	if (startYear && regex.test(startYear)) {
		if (value < startYear)
			return 'The higher year must be bigger than lower year'
	}
	return '';
}

export const validateStartDate = (startDate: Date, endDate: Date) => {
	if (!startDate) {
		return 'The field with the start date is required';
	}
	if (startDate >= endDate) {
		return 'Start date must be smaller than end date'
	}
	return '';
}

export const validateEndDate = (endDate: Date, startDate: Date) => {
	if (!startDate) {
		return 'The field with the start date is required';
	}
	if (startDate >= endDate) {
		return 'End date must be higher than start date'
	}
	return '';
}

export const validateMedicalExaminations = (date: Date) => {
	console.log(date)
	console.log(new Date)
	if (date < new Date()) {
		return 'Remember that medical examinations are no longer valid'
	}
	return '';
}
