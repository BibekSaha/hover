module.exports = (obj, ...fields) => {
  if (!obj) return {};
  const filteredObject = {};
  fields.forEach(field => {
    if (obj[field])
      filteredObject[field] = obj[field];
  });
  return filteredObject;
}