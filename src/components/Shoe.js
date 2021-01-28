import React from "react"
import { useFrame } from "react-three-fiber"
import { useGLTF } from "@react-three/drei/useGLTF"
import { setCurrentPart } from "../redux/actions/shoeActions"

import { useDispatch, useSelector } from "react-redux"

export const Shoe = () => {
  const shoe = useSelector((state) => {
    return state.parts
  })
  const dispatch = useDispatch()
  const group = React.useRef()
  const { nodes, materials } = useGLTF("resources/shoe-draco.glb")
  const [hoveredPart, setHoveredPart] = React.useState(null)

  React.useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${shoe[hoveredPart]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hoveredPart}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hoveredPart ? cursor : auto)}'), auto`
  }, [hoveredPart])

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    group.current.rotation.x = Math.cos(t / 4) / 8
    group.current.rotation.y = Math.sin(t / 4) / 8
    group.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  const pointerOverHandler = (e) => {
    e.stopPropagation()
    setHoveredPart(e.object.material.name)
  }

  const pointerOutHandler = (e) => {
    if (e.intersections.length === 0) setHoveredPart(null)
  }

  const pointerMissedHandler = () => {
    dispatch(setCurrentPart(null))
  }

  const pointerDownHandler = (e) => {
    e.stopPropagation()
    dispatch(setCurrentPart(e.object.material.name))
  }

  return (
    <group
      ref={group}
      dispose={null}
      onPointerOver={pointerOverHandler}
      onPointerOut={pointerOutHandler}
      onPointerMissed={pointerMissedHandler}
      onPointerDown={pointerDownHandler}>
      {/* <mesh material-color={objCollors.laces} material={materials.gold} geometry={nodes.Ring.geometry} /> */}
      <mesh material-color={shoe.laces} material={materials.laces} geometry={nodes.shoe.geometry} />
      <mesh material-color={shoe.mesh} material={materials.mesh} geometry={nodes.shoe_1.geometry} />
      <mesh material-color={shoe.caps} material={materials.caps} geometry={nodes.shoe_2.geometry} />
      <mesh material-color={shoe.inner} material={materials.inner} geometry={nodes.shoe_3.geometry} />
      <mesh material-color={shoe.sole} material={materials.sole} geometry={nodes.shoe_4.geometry} />
      <mesh material-color={shoe.stripes} material={materials.stripes} geometry={nodes.shoe_5.geometry} />
      <mesh material-color={shoe.band} material={materials.band} geometry={nodes.shoe_6.geometry} />
      <mesh material-color={shoe.patch} material={materials.patch} geometry={nodes.shoe_7.geometry} />
    </group>
  )
}
