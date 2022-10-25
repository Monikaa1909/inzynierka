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

export const requiredField: any = (value: string) => {
    if (!value) {
		return 'error-messages.required-field';
	}
	return '';
}
