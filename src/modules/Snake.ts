class Snake{
    // 表示蛇头的元素
    head: HTMLElement;

    // 表示蛇的身体(包括蛇头)
    bodies: HTMLCollection;

    // 表示蛇的容器
    element: HTMLElement;

    constructor(){
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 获取蛇的坐标(蛇头坐标)
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value: number) {
        // 如果新值和旧值相同，则直接返回不再修改
        if(this.X === value){
            return;
        }
        // x的合法值0-290
        if(value < 0 || value > 290){
            // 说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }

        // 修改x时是在修改水平坐标，蛇在水平移动，蛇向左移动，不能向右掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向发生了掉头！')
            // 如果发生了掉头，让蛇继续向反方向移动
            if(value > this.X) {
                // 向右走
                value = this.X - 10;
            }else{
                // 向左走
                value = this.X + 10;
            }
        }

        this.moveBody();

        this.head.style.left = value + 'px';

        this.checkHeadBody();
    }
    set Y(value: number) {
        if(this.Y === value){
            return;
        }
        // y的合法值0-290
        if(value < 0 || value > 290){
            // 说明蛇撞墙了
            throw new Error('蛇撞墙了')
        }

        // 修改y时是在修改垂直坐标，蛇在垂直移动，蛇向下移动，不能向上掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // console.log('垂直方向发生了掉头！')
            // 如果发生了掉头，让蛇继续向反方向移动
            if(value > this.Y) {
                // 向右走
                value = this.Y - 10;
            }else{
                // 向左走
                value = this.Y + 10;
            }
        }

        this.moveBody();

        this.head.style.top = value + 'px';

        this.checkHeadBody();
    }

    // 蛇增加身体的方法
    addBody(){
        let tempDiv = document.createElement('div');
        this.element.insertAdjacentElement("beforeend", tempDiv);
    }

    // 蛇身体移动的方法
    moveBody(){
        // 将后边身体的位置设置为前边身体的位置
        // 第四节身体设置为第三节的位置，第三节设置为第二节的位置...
        // 遍历获取所有的身体
        for(let i = this.bodies.length - 1; i > 0; i--){
            // 获取上一个身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查蛇头是否撞到自己
    checkHeadBody(){
        // 获取所有的身体，检查是否和蛇头的位置发生重叠
        for(let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断，说明蛇头撞到身体，游戏结束
                throw new Error('撞到自己了！游戏结束')
            }
        }
    }
}

export default Snake;