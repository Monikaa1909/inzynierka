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

export const requiredField: any = (value: string) => {
    if (!value) {
		return 'error-messages.required-field';
	}
	return '';
}
