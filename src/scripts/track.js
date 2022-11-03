import { RANGE_MAX } from '../env';

export class Track {
  constructor(track, start, end) {
    this.track = track;
    this.start = start;
    this.end = end;
  }

  getBackgroundAt(fill) {
    return (
      'linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ' +
      fill +
      '%, rgb(115, 115, 115) ' +
      fill +
      '%, rgb(115, 115, 115) 100%)'
    );
  }

  fillTrack(value) {
    const fill = (value / RANGE_MAX) * 100;
    return this.getBackgroundAt(fill);
  }

  updateTrack(step) {
    this.track.value = step;
    this.track.style.background = this.fillTrack(step);
  }

  getTimerFormat(current) {
    const str = current + '';
    if (str.length < 2) {
      return '0' + str;
    } else {
      return str;
    }
  }

  getTimerDisplay(time) {
    const minutes = this.getTimerFormat(parseInt(time / 60));
    const seconds = this.getTimerFormat(time % 60);
    return { minutes, seconds };
  }

  setTime(element, audio) {
    const { minutes, seconds } = this.getTimerDisplay(audio);
    element.innerText = `${minutes}:${seconds}`;
  }

  setStart(step, time) {
    this.updateTrack(step);
    this.setTime(this.start, time.toFixed(0));
  }

  setEnd(audio) {
    this.setTime(this.end, audio.duration.toFixed(0));
  }

  clearTrack() {
    this.setStart(0, 0);
  }
}
