class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable(value) {
        this.available = value;
    }
}

class GoodList {
    #goods;
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    set goods(goods) {
        this.#goods = goods;
    }
    get list() {
        const availableTrue = this.#goods.filter((good) => good.available == true)
        .filter((good) => filter.test(good.name) == true);
        if (this.sortPrice === true && this.sortDir === true) {
            availableTrue.sort((a, b) => (+a.price) - (+b.price));
            return availableTrue
        } else if (this.sortPrice == true && this.sortDir == false) {
            availableTrue.sort((a, b) => (+a.price) - (+b.price));
            return availableTrue.reverse();
        } else {
            return availableTrue
        }

    }
    add(good) {
        this.#goods.push(good);
    }
    remove(id) {
        let goodIndex = this.#goods.findIndex((good) => good.id == id);
        this.#goods.splice(goodIndex, 1);
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    constructor(goods) {
        this.goods = goods;
    }
    get totalAmount() {
        const totalAmount = this.goods.reduce((total, good) => total += good.price * good.amount, 0)
        return totalAmount
    }
    get totalSum() {
        let sum = 0
        const totalSum = this.goods.forEach(function(good) {
            sum += good.amount
        });
        return sum
    }
    add(good, amount) {
        const goodB = this.goods.filter((good1) => good1.id == good.id)
        if (goodB.length === 0) {
            const bg4 = new BasketGood(good, amount)
            this.goods.push(bg4);
            return console.log("Товар добавлен") 
        } else if (goodB.length > 0) {
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id === good.id) {
                    this.goods[i].amount += amount;
                    return console.log("Товар добавлен") 
                }
            }
        }
    }
    remove(good, amount) {
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                if (this.goods[i].amount - amount <= 0) {
                    this.goods.splice(i, 1);
                }
                else {
                    this.goods[i].amount -= amount; 
                }
            }
        }
    }
    clear() {
        this.goods.splice(0);
    }
    removeUnavailable() {
        const availableTrue = this.goods.filter((good) => good.available === true);
        this.goods = availableTrue;
    }
}

g1 = new Good(1, 'Кроссовки Asics', 'Для бега', '43', 5000, true)
g2 = new Good(2, 'Кроссовки Puma', 'Спортивные', '41', 4700, true)
g3 = new Good(3, 'Футболка P&B', 'С принтом Вазовски', 'M', 1500, false)
g4 = new Good(4, 'Футболка H&M', 'Белая', 'L', 1300, true)
g5 = new Good(5, 'Джоггеры P&B', 'Чёрные', '48', 2490, true)
g6 = new Good(6, 'Ремень HERMES', 'Чёрный', '54', 8900, false)

bg1 = new BasketGood(g3, 3)
bg2 = new BasketGood(g6, 1)
bg3 = new BasketGood(g4, 5)


filter = /Футбол/gi

gl1 = new GoodList([g1, g2, g3, g4, g5], filter, false, true)
b1 = new Basket([bg1, bg2, bg3])




console.log(gl1.list)
console.log(gl1.add(g6))
console.log(gl1.remove(5))
console.log(b1.add(g6, 100))
console.log(b1.totalAmount)
console.log(b1.totalSum)
console.log(b1.remove(g4, 10))
console.log(b1.removeUnavailable())
console.log(b1.clear())
