export const useCounter = () => {
	function increaseCounter() {
		let counter = 0

		return () => counter++
	}
	onMounted(() => {
		increaseCounter()
	})
	return { increaseCounter }
}
