export class Score {
  constructor(scoreElement) {
    this.scoreElement = scoreElement;
    this.clearScore();
  }

  clearScore() {
    this.score = 0;
    this.stageScore = 0;
    this.updateScoreElement();
  }

  nextStage() {
    console.log('+++++++++++', this.stageScore, this.score);
    this.score += this.stageScore;
  }

  updateScoreElement() {
    this.nextStage();
    this.scoreElement.innerText = `Score: ${this.score}`;
  }

  setMaxStageScore(stage) {
    this.stageScore = stage.length - 1;
  }

  getMaxScore(list) {
    console.log(list);
    return list.reduce((acc, next) => {
      console.log(acc);
      return (acc += next.length - 1);
    }, 0);
  }

  getResultScore(list) {
    return this.score === this.getMaxScore(list)
      ? `${this.score}/${this.getMaxScore(list)}`
      : `максимум. Поздравляю!`;
  }

  subScore() {
    console.log('+++++++++++', this.stageScore, this.score);
    this.stageScore =
      this.stageScore !== 0 ? this.stageScore - 1 : this.stageScore;
  }
}
