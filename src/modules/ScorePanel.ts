// 定义表示记分牌的类
class ScorePanel{
    // score和level记录分数和等级
    score = 0;
    level = 1;
    // 分数和等级所在的元素，在构造函数中进行初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 设置一个变量限制等级
    maxLevel: number;
    // 设置一个变量限制多少分升一级
    upScore: number;
    constructor(maxLevel: number = 10,upScore: number = 10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    // 设置一个加分的方法
    addScore(){
        this.scoreEle.innerHTML = ++ this.score + '';
        // 判断分数是多少
        if(this.score % this.upScore === 0) {
            this.levelUp();
        }
    }
    // 设置一个等级提升的方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++ this.level + '';
        }
    }
}

// 测试代码
// let scorePanel = new ScorePanel(100,5);
// for(let i = 0;i < 200;i++){
//     scorePanel.addScore();
// }

export default ScorePanel;