import React from "react"
import { HexColorPicker } from "react-colorful"

import { useDispatch, useSelector } from "react-redux"
import { changePartColor } from "../redux/actions/shoeActions"

export const Picker = () => {
  const dispatch = useDispatch()
  const currentColor = useSelector((state) => state.parts[state.currentPart])
  const currentPart = useSelector((state) => state.currentPart)

  const changeColorHandler = (color) => {
    dispatch(changePartColor(color))
  }

  return (
    <div style={{ display: "block" }}>
      <HexColorPicker className="picker" color={currentColor} onChange={changeColorHandler} />
      <h1>{currentPart}</h1>
    </div>
  )
}
