import styles from './(.)create/creategroup.module.css'
import Button from '@/components/Button/Button'
import { useState, useRef, useReducer } from 'react'
import { useSubmitRef } from '@/utility/formSubmitRef'
import validateGroupName from './(.)create/groupValidator'
import createGroup from './(.)create/createGroup'
import { useRouter } from 'next/navigation'
import ImageUtility from '@/components/ImageUploader/ImageUploader'
import formValidation from '@/utility/formValidation'

const ACTIONS = {
  NAME_VALIDATOR: 'NAME-VALIDATOR',
  DESCRIPTION_VALIDATOR: 'DESCRIPTION-VALIDATOR',
  NAME_ERROR: 'NAME-ERROR',
  ERRORS: 'ERRORS'
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

    case ACTIONS.ERRORS: {
      return {
        ...validation,
        groupNameTaken: true, // * Same as above
        groupNameBorder: 'red',
        descriptionValid: false,
        descriptionBorder: 'red'
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
      } else {
        return {
          ...validation,
          descriptionValid: false,
          descriptionBorder: 'red'
        }
      }
    }
  }
}

const CreateGroup = () => {
  const [validation, dispatch] = useReducer(validationReducer, {
    groupNameTaken: null,
    groupNameBorder: 'rgba(255, 255, 255, 0.0)',
    descriptionValid: null,
    descriptionBorder: 'rgba(255, 255, 255, 0.0)'
  })

  const [imageBlob, setImageBlob] = useState(null)
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const formRef = useRef(null)
  const inputRef = useRef(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageBlob(URL.createObjectURL(file))
    }
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

  const handleSubmit = useSubmitRef(formRef)

  const handlePost = async (e) => {
    e.preventDefault()

    const group = new FormData(e.target)
    const validator = Object.fromEntries(new FormData(e.target))

    const fieldsHaveContent = formValidation(validator)

    if (
      fieldsHaveContent &&
      validation.groupNameTaken === false &&
      validation.descriptionValid
    ) {
      setLoading(true)
      const newGroup = await createGroup(group)

      const newGroupName = newGroup?.data?.group_Name
      const newGroupId = newGroup?.data?.group_Id

      if (newGroup.status === 200) {
        setMsg(newGroupName + ' created')
        setLoading(false)
        router.push('/groups/' + newGroupId)
      }
      if (newGroup.status !== 200) {
        setMsg('Something went wrong')
        setLoading(false)
      }
    } else {
      setLoading(false)
      setMsg('')
    }
  }

  return (
    <>
      <ImageUtility inputRef={inputRef} imageBlob={imageBlob} text='This will be the group picture' />
      <section className={styles.creategroup}>
        <h1>Create a new group</h1>
        <form ref={formRef} onSubmit={handlePost}>
          <input
            type='file'
            name='imageFile'
            onChange={handleImageSelect}
            ref={inputRef}
          />
          <div className={styles.formfield}>
            <input
              type='text'
              name='Group_Name'
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
              name='Group_Description'
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
        </form>
        <p style={{ visibility: msg === null ? 'hidden' : 'visible' }}>{msg}</p>
        <div onClick={handleSubmit}>
          <Button
            text='Create group'
            backgroundColor='rgb(0, 210, 255)'
            width='150px'
            textColor='white'
            effectHeight='150px'
            effectWidth='150px'
            loading={loading}
          />
        </div>
      </section>
    </>
  )
}

export default CreateGroup
