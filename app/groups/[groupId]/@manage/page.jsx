'use client'
import styles from '@/app/groups/[groupId]/@delete/deletegroup.module.css'
import { useFetcher } from '@/hooks/useFetcher'
import { useReducer, useRef, useState } from 'react'
import ImageUtility from '@/components/ImageUploader/ImageUploader'
import formValidation from '@/utility/formValidation'
import validateGroupName from '../../(.)create/groupValidator'
import { useSubmitRef } from '@/utility/formSubmitRef'
import Button from '@/components/Button/Button'
import patchGroup from './patchGroup'

const ACTIONS = {
  PATCH_GROUP: 'PATCH_GROUP',
  SET_LOADING: 'SET_LOADING',
  SET_BANNER_FALSE: 'SET_BANNER_FALSE',
  SET_SUCCESS_FALSE: 'SET_SUCCESS_FALSE'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.PATCH_GROUP: {
      const { groupPatched } = action.payload
      if (groupPatched.status === 200) {
        return {
          ...state,
          loading: false,
          showBanner: true,
          success: true
        }
      }
      if (groupPatched.status !== 200) {
        return {
          ...state,
          loading: false,
          showBanner: false,
          success: false
        }
      } else {
        return {
          ...state,
          loading: false
        }
      }
    }

    case ACTIONS.SET_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case ACTIONS.SET_BANNER_FALSE: {
      return {
        ...state,
        showBanner: false
      }
    }

    case ACTIONS.SET_SUCCESS_FALSE: {
      return {
        ...state,
        success: false
      }
    }
  }
}

const ManageGroupPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    showBanner: false,
    success: false
  })

  const { group, updateGroupChanged } = useFetcher()
  const [image, setImage] = useState({
    image: group?.data?.group_Picture,
    text: 'Upload a new group picture here'
  })

  const [validator, setValidator] = useState({
    nameTaken: null,
    nameBorder: null,
    descriptionValid: null,
    descriptionBorder: null
  })

  const inputRef = useRef(null)
  const formRef = useRef(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage({
        ...image,
        image: URL.createObjectURL(file),
        text: 'This will be the new group picture'
      })
    }
  }

  const validateGroupNameField = async (e) => {
    const groupName = e.target.value

    const targetValue = groupName.toLowerCase()
    const groupNameFromDb = group?.data?.group_Name.toLowerCase()

    if (targetValue.length < 4) {
      setValidator({
        ...validator,
        nameTaken: true, // * NOT REALLY TAKEN BUT I WANT THE ERROR
        nameBorder: 'red'
      })
    }

    if (targetValue === groupNameFromDb) {
      setValidator({
        ...validator,
        nameTaken: true, // * NOT REALLY TAKEN BUT I WANT THE ERROR
        nameBorder: 'orange'
      })
    }

    if (
      targetValue.length >= 4 &&
      targetValue.length <= 255 &&
      targetValue !== groupNameFromDb
    ) {
      const validate = await validateGroupName(groupName)
      if (validate.ok) {
        setValidator({
          ...validator,
          nameTaken: true,
          nameBorder: 'red'
        })
      } else {
        setValidator({
          ...validator,
          nameTaken: false,
          nameBorder: '#73ff83'
        })
      }
    }
  }

  const validateDescriptionField = (e) => {
    const groupDescription = e.target.value

    const targetValue = groupDescription.toLowerCase()
    const descriptionFromDb = group?.data?.group_Description.toLowerCase()

    if (targetValue.length < 4) {
      setValidator({
        ...validator,
        descriptionValid: false,
        descriptionBorder: 'red'
      })
    }

    if (targetValue === descriptionFromDb) {
      setValidator({
        ...validator,
        descriptionValid: false,
        descriptionBorder: 'orange'
      })
    }

    if (
      targetValue.length >= 4 &&
      targetValue.length <= 255 &&
      targetValue !== descriptionFromDb
    ) {
      setValidator({
        ...validator,
        descriptionValid: true,
        descriptionBorder: '#73ff83'
      })
    }
  }

  const handlePatch = async (e) => {
    e.preventDefault()

    const patchedGroup = new FormData(e.target)
    const formValidator = Object.fromEntries(new FormData(e.target))

    const fieldsHaveContent = formValidation(formValidator)

    if (fieldsHaveContent) {
      dispatch({ type: ACTIONS.SET_LOADING })

      const groupPatched = await patchGroup(patchedGroup, group?.data?.group_Id)

      if (groupPatched.status === 200) {
        updateGroupChanged(true, 2000)

        setTimeout(() => {
          dispatch({ type: ACTIONS.SET_SUCCESS_FALSE })
        }, 2000)

        setTimeout(() => {
          dispatch({ type: ACTIONS.SET_BANNER_FALSE })
        }, 3000)
      }

      dispatch({
        type: ACTIONS.PATCH_GROUP,
        payload: { groupPatched }
      })
    }
  }

  const handleSubmit = useSubmitRef(formRef)

  return (
    <section className={styles.delete}>
      {state.showBanner && (
        <div
          className={`${styles.banner} ${
            state.success ? styles.appear : styles.disappear
          }`}
        >
          <span>Group updated</span>
        </div>
      )}
      <form ref={formRef} onSubmit={handlePatch}>
        <h4>Group name:</h4>
        <div className={styles.field}>
          <input
            type='text'
            name='Group_Name'
            defaultValue={`${group?.data?.group_Name}`}
            style={{ border: `2px solid ${validator.nameBorder}` }}
            onBlur={validateGroupNameField}
          />
          <h2
            style={{
              visibility: validator.nameTaken === null ? 'hidden' : 'visible',
              color: validator.nameBorder,
              userSelect: 'none',
              width: '5px'
            }}
          >
            {validator.nameTaken ? '!' : '✓'}
          </h2>
        </div>
        <h4>Group description:</h4>
        <div className={styles.field}>
          <input
            type='text'
            name='Group_Description'
            defaultValue={`${group?.data?.group_Description}`}
            style={{ border: `2px solid ${validator.descriptionBorder}` }}
            onBlur={validateDescriptionField}
          />
          <h2
            style={{
              visibility:
                validator.descriptionValid === null ? 'hidden' : 'visible',
              color: validator.descriptionBorder,
              userSelect: 'none',
              width: '5px'
            }}
          >
            {validator.descriptionValid ? '✓' : '!'}
          </h2>
        </div>
        <ImageUtility
          inputRef={inputRef}
          imageBlob={image.image}
          text={image.text}
        />
        <input
          type='file'
          name='imageFile'
          ref={inputRef}
          onChange={handleImageSelect}
        />
      </form>
      <div style={{ marginTop: '1rem' }} onClick={handleSubmit}>
        <Button
          text='Update group'
          backgroundColor='rgb(0, 210, 255)'
          width='150px'
          textColor='white'
          effectHeight='150px'
          effectWidth='150px'
          loading={state.loading}
        />
      </div>
    </section>
  )
}

export default ManageGroupPage
