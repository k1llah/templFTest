const a = async function () {
	console.log('1')

	new Promise((resolve) => resolve(console.log('2'))).then(() => console.log('3'))

	await console.log('4')

	new Promise((resolve) => resolve(console.log('5'))).then(() => console.log('6'))

	console.log('7')
}

setTimeout(() => console.log('8'), 0)
a().then(() => console.log('9'))
console.log('10')





// console.logs tasks
let x = []
if (x) {
	console.log(true)
} else {
	console.log(false)
}
// false
// true
// Ничего не выведет
// Ошибка


const sym = Symbol('key')
const obj = {
	[sym]: 'value',
}
console.log(obj[sym])
console.log(obj['key'])
// 'value' undefined
// 'value' 'value'
// undefined 'value'
// Ошибка

async function fetchData() {
	return 'Data'
}
console.log(fetchData())
// Data
// Промис, завершившийся значением 'Data'
// undefined
// Ошибка

const object = { a: 1, b: { c: 2 } }
const shallowCopy = { ...object }
shallowCopy.b.c = 42

console.log(object.b.c)
// 2
// 42
// Ошибка
// undefined
