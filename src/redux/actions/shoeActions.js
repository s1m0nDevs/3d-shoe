import { SET_CURRENT_PART, CHANGE_PART_COLOR } from "./types"

export const setCurrentPart = (part) => ({
  type: SET_CURRENT_PART,
  payload: part,
})

export const changePartColor = (color) => ({
  type: CHANGE_PART_COLOR,
  payload: color,
})
