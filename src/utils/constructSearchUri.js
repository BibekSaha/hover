export default (title, id) => {
  let uriBuilder = title.toLowerCase();
  uriBuilder = uriBuilder.replace(/\s/g, '-');
  uriBuilder += `-${id}`;
  return uriBuilder;
}
