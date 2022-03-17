export const useAcademy = createGlobalState(
	() => useStorage('user:academy', {
		token: null,
	}),
)
