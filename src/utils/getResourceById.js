const getResourceById = (db, resourceName) => (resourceId, response) => {
  const resource = db.data[resourceName][resourceId]

  if (!resource) {
    response.status(404).send({ error: "Not found" })

    return null
  }

  return resource
}

export default getResourceById
