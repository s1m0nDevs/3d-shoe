import produce from "immer"
import { SET_CURRENT_PART, CHANGE_PART_COLOR } from "../actions/types"

const initialState = {
  currentPart: null,
  parts: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
}

export const rootReducer = produce((draft, action) => {
  if (action.type === SET_CURRENT_PART) {
    draft.currentPart = action.payload
  }
  if (action.type === CHANGE_PART_COLOR && draft.currentPart != null) {
    draft.parts[draft.currentPart] = action.payload
  }
}, initialState)
