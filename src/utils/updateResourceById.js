import deepmerge from "deepmerge"
import getResourceById from "./getResourceById.js"

const updateResourceById = (db, resourceName) => {
  const getSpecificResourceById = getResourceById(db, resourceName)

  return async (resourceId, patch, res) => {
    const resource = getSpecificResourceById(resourceId, res)

    if (!resource) {
      return null
    }

    const updatedResource = deepmerge(
      resource,
      Object.fromEntries(
        Object.entries(patch).filter(
          ([, value]) => typeof value !== "undefined"
        )
      )
    )

    await db.write({
      [resourceName]: {
        [resourceId]: updatedResource,
      },
    })

    return updatedResource
  }
}

export default updateResourceById
