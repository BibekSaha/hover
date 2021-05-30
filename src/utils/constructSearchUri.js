export default (title, id) => {
  let uriBuilder = title
    .toLowerCase()
    .trim()
    .replace(/[^\x20-\x7E]/g, '') // Removes the non-printable ASCII chars
    .replace(/\s/g, '-') // Removes all the whitespaces with -
    .replace(/\?/g, '%3F')
    .concat(`-${id}`);
  return uriBuilder;
}
