export class Score {
  constructor(scoreElement) {
    this.scoreElement = scoreElement;
    this.clearScore();
  }

  clearScore() {
    this.score = 0;
    this.stageScore = 0;
    this.stagePass = false;
    this.updateScoreElement();
  }

  nextStage() {
    this.score += this.stageScore;
  }

  updateScoreElement() {
    this.nextStage();
    this.scoreElement.innerText = this.score;
  }

  setMaxStageScore(stage) {
    this.stageScore = stage.length - 1;
  }

  getMaxScore(list) {
    return list.reduce((acc, next) => {
      return (acc += next.length - 1);
    });
  }

  getResultScore() {
    return `${this.score}/${this.getMaxScore([[]])}`;
  }

  subScore() {
    this.stageScore =
      this.stageScore !== 0 ? this.stageScore - 1 : this.stageScore;
  }
}
