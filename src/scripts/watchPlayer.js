export class WatchPlayer {
  constructor(list) {
    this.list = list;
    this.active = null;
  }

  setActive(id) {
    console.log(this.list);
    if (this.active !== null) {
      this.list[this.active].stopPlayer();
    }
    this.active = id || 0;
  }

  getActive(player) {
    return this.list.indexOf(player);
  }

  callStop(player) {
    console.log(this.active);
    console.log(player);
    const draft = this.getActive(player);
    if (this.active !== null) {
      if (this.active !== draft) {
        this.setActive(draft);
        return true;
      }
    } else this.active = draft;
    return false;
  }
}
