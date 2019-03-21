class Enumerator {
    constructor() {
        this.items = []
    }

    add(item, n=0) {
        const enumItem = n ? `${item} ${n+1}` : item
        if ( this.items[enumItem] ) {
            this.add(item, n + 1)
        } else {
            this.items[enumItem] = enumItem           
        }
    }

    get(item) {
        return this.items[item] || ''
    }
}

const enumerable = base => {
    const items = []

    const append = (item, n=0) => {
        const enumItem = n ? `${item} ${n+1}` : item
        if ( items[enumItem] ) {
            append(item, n + 1)
        } else {
            items[enumItem] = enumItem           
        }
    }

    return Object.assign(base, {
        add: append,
        get: item => items[item] || '',
    })
}

const e = enumerable({})
e.add('unit')
e.add('unit')
e.add('unit')
e.add('unit')
console.log(e.get('unit'))
console.log(e.get('unit 0'))
console.log(e.get('unit 1'))
console.log(e.get('unit 2'))
console.log(e.get('unit 3'))
console.log(e.get('unit 4'))
console.log(e.get('unit 5'))
