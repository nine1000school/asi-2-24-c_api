const getResourceByField = (db, resourceName) => (field) => (value) =>
  Object.values(db.data[resourceName]).find((item) => item[field] === value)

export default getResourceByField
