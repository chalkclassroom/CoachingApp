import React, {useContext, useEffect, useRef, useState} from 'react'
import {FirebaseContext} from "../Firebase";

import ButtonlessDialog from "../Shared/ButtonlessDialog";
import ConfirmationDialog from "../Shared/ConfirmationDialog";

const MODAL_VISIBLE_TIME = 10 // length of time the modal is visible before completing the observation
const TOTAL_TIME = 20 // Total time in seconds  that the timeout lasts
const TIME_FOR_MODAL = TOTAL_TIME - MODAL_VISIBLE_TIME // The elapsed time in seconds before the modal is visible

export default (WrappedComponent: React.FunctionComponent<any>) => {
  return ({...props}) => {

    const [timeoutText, setTimeoutText] = useState('')
    const [confirmRef, setConfirmRef] = useState<{ resolve: (x: boolean) => void } | null>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const intervalRef = useRef(0)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()
    const displayModalRef = useRef(false)
    const firebase = useContext(FirebaseContext)

    // Code for the confirmation dialog

    //Runs when users confirm leaving the page
    const handleLeaveObservation = () => {
      if (confirmRef) {
        firebase.discardSession()
        confirmRef.resolve(true)
      }
    }
    //Runs when users stay on the page
    const handleStay = () => {
      if (confirmRef) {
        confirmRef.resolve(false)
        setConfirmRef(null)
        setShowConfirmDialog(false)
      }
    }

    const handleConfirmationOpen = (): Promise<boolean> => {
      setShowConfirmDialog(true)
      return new Promise<boolean>((resolve, _) => {
        setConfirmRef({resolve})
      })
    }
    const tick = () => {
      let intervalElapsed = intervalRef.current
      let secondsLeft = TOTAL_TIME - intervalElapsed
      if (!displayModalRef.current && intervalElapsed > TIME_FOR_MODAL) {
        displayModalRef.current = true
      }
      if (intervalElapsed > TIME_FOR_MODAL) {
        setTimeoutText(`This observation will automatically close in ${secondsLeft} seconds. Please touch or click anywhere to continue the observation.`)
      }
      if (intervalElapsed >= TOTAL_TIME) {
        clearInterval(timeoutRef.current!)
        firebase.endSession() // There will always be a sessionID (and therefore the ability to end a session) during an observation.
        props.history.goBack()
      }
      intervalRef.current = intervalElapsed + 1
    }

    const getTimeout = () => {
      let time = setInterval(tick, 1000)
      timeoutRef.current = time
      return time
    }


    const resetTimeout = () => {
      clearInterval(timeoutRef.current!)
      intervalRef.current = 0
      getTimeout()
      displayModalRef.current = false
      // This setTimeoutText is just a hacky way to force a rerender. without a rerender, the  timeout modal won't hide after a click,
      // And the boolean variable needs to be a ref (which won't rerender a page), or else it won't show when the interval changes it.
      setTimeoutText(`This observation will automatically close in ${MODAL_VISIBLE_TIME} seconds. Please touch or click anywhere to continue the observation.`)
    }
    const endSession = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
      let x = confirm("LEAVING")
      alert('LEAVING FOR REAL')
      if (!x) {

      } else firebase.endSession();
    }

    useEffect(() => {
      resetTimeout()
      return () => {
        clearTimeout(timeoutRef.current!)
      }
    }, []);

    useEffect(() => {
      window.addEventListener('click', resetTimeout)
      window.addEventListener('beforeunload', endSession)
      return () => {
        window.removeEventListener('click', resetTimeout)
        window.removeEventListener('beforeunload', endSession)
      }
    })


    return (
      <>
        <ButtonlessDialog onClose={() => {
        }} display={displayModalRef.current} confirmationText={timeoutText}/>
        <ConfirmationDialog handleConfirm={handleLeaveObservation} handleCancel={handleStay}
                            dialogText={'Leaving this page will save your work and complete the observation. Would you like to continue?'}
                            cancelText={'No, stay here'}
                            confirmText={'Yes, leave observation'}
                            showDialog={showConfirmDialog}/>
        <WrappedComponent preBack={handleConfirmationOpen} {...props} />
      </>
    )
  }
}