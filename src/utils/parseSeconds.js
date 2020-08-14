function parseSeconds(seconds) {
  seconds = Math.round(seconds);
  if (seconds < 60) {
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `00:${seconds}`;
  }
  let stringBuilder = `${parseInt(seconds / 60)}:`;
  let tempSeconds = (seconds - ((parseInt(seconds / 60)) * 60))
  tempSeconds = tempSeconds < 10 ? `0${tempSeconds}` : tempSeconds;
  stringBuilder += `${tempSeconds}`;
  return stringBuilder;
}

export default parseSeconds;