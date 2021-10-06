const dbCons = require('../constant/db-constant')
const dbOpration = require('../constant/db-operation-constant')

const getQuery = (fieldName, value) => {
  const query = {}
  query[fieldName] = value
  return query
}

const getUpdateQuery = (op, fieldName, value) => {
  const json = {}
  json[op] = {}
  json[op][fieldName] = value
  return json
}

const getFindQuery = (operation, query) => {
  let operatedQuery = {}
  operatedQuery[operation] = query
  return operatedQuery
}

const getFinalQueryJson = (query) => {
  const isActiveQueryJson = {}
  isActiveQueryJson[dbCons.COMMON_IS_ACTIVE] = dbCons.VALUE_DEFAULT_IS_ACTIVE
  const queryJson = {}
  queryJson[dbOpration.OP_AND] = [query]
  queryJson[dbOpration.OP_AND].push(isActiveQueryJson)
  return queryJson
}

const getFilterQueryJson = (field, op, value) => {
  let query = {}
  query[field] = {}
  query[field][op] = value
  return query
}

const getLookup = (from, localField, foreignField, as) => {
  let json = {}
  json[dbOpration.FIELD_LOOKUP] = {}
  json[dbOpration.FIELD_LOOKUP][dbOpration.FIELD_FROM] = from
  json[dbOpration.FIELD_LOOKUP][dbOpration.FIELD_LOCAL_FIELD] = localField
  json[dbOpration.FIELD_LOOKUP][dbOpration.FIELD_FOREIGN_FIELD] = foreignField
  json[dbOpration.FIELD_LOOKUP][dbOpration.FIELD_AS] = as
  return json
}
const getQueryJson = (fieldName, operation, value) => {
  let query = {}
  query[fieldName] = {}
  query[fieldName][operation] = value
  return query
}
const getMatchedResult = (query) => {
  let queryToBeExecuted = {}
  queryToBeExecuted[dbOpration.FIELD_MATCH] = query
  return queryToBeExecuted
}

const getProjectedField = (projectedField) => {
  let projection = {}
  projection[dbOpration.FIELD_PROJECTION] = projectedField
  return projection
}

const getFacetJson = (facet) => {
  let facetJson = {}
  facetJson[dbOpration.FIELD_FACET] = facet
  return facetJson
}

const getSkipJson = (skipValue) => {
  let skipJson = {}
  skipJson[dbOpration.OP_SKIP] = skipValue
  return skipJson
}

const getLimitJson = (limit) => {
  let limitJson = {}
  limitJson[dbOpration.OP_LIMIT] = limit
  return limitJson
}

const getCountJson = (count) => {
  let countJson = {}
  countJson[dbOpration.OP_COUNT] = count
  return countJson
}

const getSortJson = (json) => {
  let sortJson = {}
  sortJson[dbOpration.OP_SORT] = json
  return sortJson
}

const getProjectionWithOpJson = (op, project) => {
  let projectJson = {}
  projectJson[op] = project
  return projectJson
}

const getJsonForUnwind = (path, preserveNullAndEmptyArrays) => {
  let json = {}
  json[dbOpration.FIELD_PATH] = '$' + path
  json[dbOpration.FIELD_PRESERVE_NULL_AND_EMPTY_ARRAYS] = preserveNullAndEmptyArrays // null, missing, or an empty array mean get all the obj
  return json
}

const getUnwindedResponse = (unwindObject) => {
  let json = {}
  json[dbOpration.FIELD_UNWIND] = unwindObject
  return json
}
module.exports = {
  getQuery,
  getUpdateQuery,
  getFindQuery,
  getFinalQueryJson,
  getLookup,
  getMatchedResult,
  getProjectedField,
  getUnwindedResponse,
  getQueryJson,
  getJsonForUnwind,
  getFacetJson,
  getSkipJson,
  getCountJson,
  getLimitJson,
  getSortJson,
  getFilterQueryJson,
  getProjectionWithOpJson,
}