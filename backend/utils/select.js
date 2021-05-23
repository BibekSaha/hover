module.exports = (obj, ...fields) => {
  const filteredObject = {};
  fields.forEach(field => {
    if (obj[field])
      filteredObject[field] = obj[field];
  });
  return filteredObject;
}