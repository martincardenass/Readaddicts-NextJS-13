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
  href,
  loading
}) => {
  const buttonRef = useRef(null)
  const [ripple, setRipple] = useState(false)
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  // * If props
  useEffect(() => {
    const button = buttonRef.current
    const styleConfig = {
      '--button-width': width,
      '--button-height': height,
      '--button-background-color': backgroundColor,
      '--button-text-color': textColor,
      '--effect-color': effectColor,
      '--effect-width': effectWidth,
      '--effect-height': effectHeight,
      '--effect-duration': duration
    }

    for (const [prop, value] of Object.entries(styleConfig)) {
      if (value !== undefined) {
        button.style.setProperty(prop, value)
      }
    }
  }, [
    duration,
    width,
    height,
    backgroundColor,
    textColor,
    effectColor,
    effectWidth,
    effectHeight
  ])

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
        {loading
          ? (
            <div className={styles.ldsring}>
              <div />
              <div />
              <div />
              <div />
            </div>
            )
          : href
            ? (
              <Link href={href}>{text}</Link>
              )
            : (
                text
              )}
      </span>
    </div>
  )
}

export default Button
