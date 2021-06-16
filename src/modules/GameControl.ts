// 引入其他的类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

// 游戏控制器，控制其他所有的类
class GameControl {
    // 定义三个属性
    // snake
    snake: Snake;
    // food
    food: Food;
    // scorePanel
    scorePanel: ScorePanel;
    // 蛇移动的方向（键盘的按键值）
    direction: string = '';
    // 定义游戏是否结束的属性
    isLive: Boolean = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    // 游戏的初始化，调用后游戏即开始
    init(){
        // 绑定键盘按键按下的事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用run方法，使蛇移动
        this.run();
    }

    // chrome  IE
    // ArrowUp Up
    // ArrowDown Down
    // ArrowLeft Left
    // ArrowRight Right
    keydownHandler(event: KeyboardEvent){
        // 需要检查event.key的值是否合法（用户是否按了正确的按键）
        this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run(){
        // 根据方向来使蛇的位置改变
        // 向上移动 top-
        // 向下移动 top+
        // 向左移动 left-
        // 向右移动 left+

        // 获取蛇现在的坐标
        let x = this.snake.X;
        let y = this.snake.Y;

        // 根据按键的方向修改x和y的值
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                x -= 10;
                break;
            case "ArrowRight":
            case "Right":
                x += 10;
                break;
        }

        this.checkEat(x,y)

        // 修改蛇的x和y值
        try{
            this.snake.X = x;
            this.snake.Y = y;
        }catch(e){
            alert(e.message + 'Game Over');
            this.isLive = false;
        }

        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 检查蛇是否吃到食物
    checkEat(x: number,y: number){
        if(x === this.food.X && y === this.food.Y){
            // 食物的位置进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇的身体增加
            this.snake.addBody();
        }

    }
}

export default GameControl;
