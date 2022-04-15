import React, {useContext, useEffect, useState} from 'react'
import {FirebaseContext} from "../Firebase";

import ButtonlessDialog from "../Shared/ButtonlessDialog";
import ConfirmationDialog from "../Shared/ConfirmationDialog";

const MODAL_VISIBLE_TIME = 10 // length of time the modal is visible before completing the observation
const TOTAL_TIME = 20 // Total time in seconds  that the timeout lasts
const TIME_FOR_MODAL = TOTAL_TIME - MODAL_VISIBLE_TIME // The elapsed time in seconds before the modal is visible

export default (WrappedComponent: React.Component) => {
  const withObservationWrapper = ({...props}) => {

    const [displayModal, setDisplayModal] = useState(false)
    const [timeoutText, setTimeoutText] = useState('')
    const [IntervalElapsed, setIntervalElapsed] = useState(0)
    const [confirmRef, setConfirmRef] = useState<{resolve:(x:boolean)=> void}| null>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)

    const firebase = useContext(FirebaseContext)

    // Code for the confirmation dialog

    //Runs when users confirm leaving the page
    const handleLeaveObservation = () => {
      if(confirmRef) {
        firebase.endSession()
        confirmRef.resolve(true)
      }
    }
    //Runs when users stay on the page
    const handleStay = () => {
      if(confirmRef) {
        confirmRef.resolve(false)
        setConfirmRef(null)
        setShowConfirmDialog(false)
      }
    }

    const handleConfirmationOpen = (): Promise<boolean> => {
      setShowConfirmDialog(true)
      return new Promise<boolean>((resolve, reject) => {
          setConfirmRef({resolve})
      })
    }

    // All code for handling idle timeouts (and eventually browser events?)
    useEffect(() => {

      // separated out to handle removing beforeUnload event
      // Not currently working; Chrome at least blocks all the code except the 'Leave Page' Confirmation.
      const endSession = (e) => {
        e.preventDefault()
        e.returnValue = ''
        let x =confirm("LEAVING")
        alert('LEAVING FOR REAL')
        if(!x) {

        } else  firebase.endSession();
      }
      const getTimeout =  () => {
        let elapsedTime = IntervalElapsed
        let time = setInterval(() => {
          let secondsLeft = TOTAL_TIME - elapsedTime
          if(!displayModal && elapsedTime > TIME_FOR_MODAL) {
            setDisplayModal(true)
          }
          if(elapsedTime > TIME_FOR_MODAL) {
            setTimeoutText(`This observation will automatically close in ${secondsLeft} seconds. Please touch or click anywhere to continue the observation.`)
          }
          if(elapsedTime >= TOTAL_TIME) {
            clearInterval(time)
            firebase.endSession() // There will always be a sessionID (and therefore the ability to end a session) during an observation.
            props.history.goBack()
          }
         setIntervalElapsed(IntervalElapsed + 1)
        }, 1000)
        return time
      }

      let timeoutId = getTimeout()


      const resetTimeout = () => {
        clearInterval(timeoutId)
        setIntervalElapsed(0)
        timeoutId = getTimeout()
        if(displayModal){
          setDisplayModal(false)
        }
      }

      window.addEventListener('click', resetTimeout)
      window.addEventListener('beforeunload', endSession)

      return () => {
        window.removeEventListener('click', resetTimeout)
        window.removeEventListener('beforeunload', endSession)
        clearTimeout(timeoutId)
      }
    });


    return  (
      <>
        <ButtonlessDialog onClose={() =>{}} display={displayModal} confirmationText={timeoutText}/>
        <ConfirmationDialog handleConfirm={handleLeaveObservation} handleCancel={handleStay}
                            dialogText={'Leaving this page will save your work and complete the observation. Would you like to continue?'}
                            cancelText={'No, stay here'}
                            confirmText={'Yes, leave observation'}
                            showDialog={showConfirmDialog}/>
      <WrappedComponent preBack={handleConfirmationOpen} {...props} />
        </>
    )
  }

  return withObservationWrapper
}