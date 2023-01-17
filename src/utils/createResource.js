const createResource = (db, resourceName) => async (data) => {
  const id = db.data.lastId[resourceName] + 1
  const resource = { id, ...data }

  await db.write({
    lastId: { [resourceName]: id },
    [resourceName]: {
      [id]: resource,
    },
  })

  return resource
}

export default createResource
