class Food{
    // 定义一个属性表示food所对应的元素
    element: HTMLElement;
    constructor(){
        // 获取页面中的food元素并把它复制给element
        this.element = document.getElementById('food')!;
    }
    // 定义一个获取food X轴坐标的方法
    get X(){
        return this.element.offsetLeft;
    }
    // 定义一个获取food Y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }
    // 改变食物的位置
    change(){
        // 生成一个随机的位置
        // 食物的最小位置(0,0)，最大位置(290,290)
        // 蛇的最小单位是10，所以食物所在位置也得是10的整数倍

        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;

        this.element.style.top = top + 'px';
        this.element.style.left = left + 'px';
    }
}

export default Food;