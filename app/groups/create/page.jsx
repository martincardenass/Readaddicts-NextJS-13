'use client'
import { useReducer, useRef, useState } from 'react'
import styles from './creategroup.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '@/components/Button/Button'
import validateGroupName from './groupValidator'

const ACTIONS = {
  NAME_VALIDATOR: 'NAME-VALIDATOR',
  DESCRIPTION_VALIDATOR: 'DESCRIPTION-VALIDATOR',
  NAME_ERROR: 'NAME-ERROR'
}

const validationReducer = (validation, action) => {
  switch (action.type) {
    case ACTIONS.NAME_VALIDATOR: {
      if (action.payload.ok) {
        return {
          ...validation,
          groupNameTaken: true,
          groupNameBorder: 'red'
        }
      } else {
        return {
          ...validation,
          groupNameTaken: false,
          groupNameBorder: '#73ff83'
        }
      }
    }

    case ACTIONS.NAME_ERROR: {
      return {
        ...validation,
        groupNameTaken: true, // * Not really taken but just for error handling
        groupNameBorder: 'red'
      }
    }

    case ACTIONS.DESCRIPTION_VALIDATOR: {
      if (action.payload.length < 4) {
        return {
          ...validation,
          descriptionValid: false,
          descriptionBorder: 'red'
        }
      }

      if (action.payload.length >= 4 && action.payload.length <= 255) {
        return {
          ...validation,
          descriptionValid: true,
          descriptionBorder: '#73ff83'
        }
      }
    }
  }
}

const CreateGroup = () => {
  const router = useRouter()
  const inputRef = useRef(null)
  const [close, setClose] = useState(false)
  const [imageBlob, setImageBlob] = useState(null)

  const [validation, dispatch] = useReducer(validationReducer, {
    groupNameTaken: null,
    groupNameBorder: 'rgba(255, 255, 255, 0.0)',
    descriptionValid: null,
    descriptionBorder: 'rgba(255, 255, 255, 0.0)'
  })

  const handleModalClose = () => {
    setClose(true)

    // *
    setTimeout(() => {
      router.push('/groups')
    }, 250)
  }

  const validateGroupNameField = async (e) => {
    const groupName = e.target.value

    if (groupName.length < 4) {
      dispatch({ type: ACTIONS.NAME_ERROR })
    }

    if (groupName.length >= 4 && groupName.length <= 255) {
      const validate = await validateGroupName(groupName)
      dispatch({ type: ACTIONS.NAME_VALIDATOR, payload: validate })
    }
  }

  const handleInputClick = () => {
    inputRef.current.click()
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageBlob(URL.createObjectURL(file))
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      handleModalClose()
    }
  }

  return (
    <section
      tabIndex={0}
      onKeyDown={(event) => handleKeyPress(event)}
      className={styles.modalcontainer}
    >
      <span onClick={handleModalClose} className={styles.close} />
      <section
        className={`${styles.modal} ${
          close ? styles.slideouttop : styles.slideintop
        }`}
      >
        <aside className={styles.imagecontainer}>
          <div className={styles.image} onClick={handleInputClick}>
            {imageBlob
              ? (
                <Image
                  src={imageBlob}
                  alt='Uploaded image'
                  width={225}
                  height={225}
                />
                )
              : (
                <span>Upload picture</span>
                )}
          </div>
          <p>{imageBlob ? <>This will be the group picture</> : ''}</p>
        </aside>
        <section className={styles.creategroup}>
          <h1>Create a new group</h1>
          <input type='file' onChange={handleImageSelect} ref={inputRef} />
          <div className={styles.formfield}>
            <input
              type='text'
              placeholder='Group name'
              style={{ border: `2px solid ${validation.groupNameBorder}` }}
              onBlur={validateGroupNameField}
            />
            <h1
              style={{
                visibility:
                  validation.groupNameTaken === null ? 'hidden' : 'visible',
                color: validation.groupNameTaken ? 'red' : '#73ff83',
                userSelect: 'none',
                margin: '0',
                width: '10px'
              }}
            >
              {validation.groupNameTaken ? '!' : '✓'}
            </h1>
          </div>
          <div className={styles.formfield}>
            <input
              type='text'
              placeholder='Description'
              style={{ border: `2px solid ${validation.descriptionBorder}` }}
              onBlur={(e) =>
                dispatch({
                  type: ACTIONS.DESCRIPTION_VALIDATOR,
                  payload: e.target.value
                })}
            />
            <h1
              style={{
                visibility:
                  validation.descriptionValid === null ? 'hidden' : 'visible',
                color: validation.descriptionValid ? '#73ff83' : 'red',
                userSelect: 'none',
                margin: '0',
                width: '10px'
              }}
            >
              {validation.descriptionValid ? '✓' : '!'}
            </h1>
          </div>
          <Button
            text='Create group'
            backgroundColor='rgb(159, 225, 255)'
            width='150px'
            effectHeight='150px'
            effectWidth='150px'
          />
        </section>
      </section>
    </section>
  )
}

export default CreateGroup
