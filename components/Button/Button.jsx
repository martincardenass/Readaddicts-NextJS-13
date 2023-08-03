'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styles from './button.module.css'

const Button = ({
  text,
  duration,
  width,
  height,
  backgroundColor,
  textColor,
  effectColor,
  effectWidth, // * If button size is changed, effect size should also be changed
  effectHeight,
  href
}) => {
  const buttonRef = useRef(null)
  const [ripple, setRipple] = useState(false)
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  // * If props
  useEffect(() => {
    const button = buttonRef.current

    if (duration !== undefined) {
      button.style.setProperty('--effect-duration', duration)
    }

    if (width !== undefined) {
      button.style.setProperty('--button-width', width)
    }

    if (height !== undefined) {
      button.style.setProperty('--button-height', height)
    }

    if (backgroundColor !== undefined) {
      button.style.setProperty('--button-background-color', backgroundColor)
    }

    if (textColor !== undefined) {
      button.style.setProperty('--button-text-color', textColor)
    }

    if (effectColor !== undefined) {
      button.style.setProperty('--effect-color', effectColor)
    }

    if (effectWidth !== undefined) {
      button.style.setProperty('--effect-width', effectWidth)
    }

    if (effectHeight !== undefined) {
      button.style.setProperty('--effect-height', effectHeight)
    }
  }, [duration, width, height, backgroundColor, textColor, effectColor, effectWidth, effectHeight])

  useEffect(() => {
    if (coordinates.x !== 0 && coordinates.y !== 0) {
      setRipple(true)
      setTimeout(() => {
        setRipple(false)
      }, 1000)
    } else {
      setRipple(false)
    }
  }, [coordinates])

  const handleClick = (e) => {
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)

    setCoordinates({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    button.style.setProperty(
      '--effect-top',
      `${e.clientY - rect.top - size / 2}px`
    )
    button.style.setProperty(
      '--effect-left',
      `${e.clientX - rect.left - size / 2}px`
    )
  }

  return (
    <div
      onClick={handleClick}
      ref={buttonRef}
      className={`${styles.effect} ${ripple ? styles.active : ''}`}
    >
      <span>
        <Link href={href}>{text}</Link>
      </span>
    </div>
  )
}

export default Button
