/* 
  Since the songInput space bar does not work while typing a new input because 
  AudioPlayer has a global keydown event listener of space bar 
  which plays or pauses the song, so we need to export the event function in
  this object 
 */
export default {};