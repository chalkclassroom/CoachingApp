import React, {useContext, useEffect, useRef, useState} from 'react'
import {FirebaseContext} from "../Firebase";
import ConfirmationDialog from "../Shared/ConfirmationDialog";


interface Options {
 totalTime: number
  modalTime: number
  confirmationPrompt: string
  confirmText: string
  cancelText: string
}

export default (options: Partial<Options> = {}) => {
  return ( WrappedComponent: React.FunctionComponent<any>) => {
    return ({...props}) => {

      const MODAL_VISIBLE_TIME = options?.modalTime ?? 20 // length of time the modal is visible before completing the observation
      const TOTAL_TIME = options?.totalTime ?? 60 * .5 // Total time in seconds  that the timeout lasts
      const TIME_FOR_MODAL = TOTAL_TIME - MODAL_VISIBLE_TIME // The elapsed time in seconds before the modal is visible

      const [confirmRef, setConfirmRef] = useState<{ resolve: (x: boolean) => void } | null>(null)
      const [showConfirmDialog, setShowConfirmDialog] = useState(false)
      const [displayTimeoutModal, setDisplayTimeoutModal] = useState(false)
      const [timeoutConfirmRef, setTimeoutConfirmRef] = useState<{ resolve: (x: boolean) => void } | null>(null)
      const [showCompleteDialog, setShowCompeteDialog] = useState(false)

      const intervalRef = useRef(0)
      const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()
      const canNavigateRef = useRef(false)

      const firebase = useContext(FirebaseContext)

      // Code for the confirmation dialog


      //Runs when users confirm leaving the page
      const handleLeaveObservation = () => {
        if (confirmRef) {
          firebase.discardSession()
          confirmRef.resolve(true)
          canNavigateRef.current = true
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

      const handleOpenNavConfirmation = (): Promise<boolean> => {
        setShowConfirmDialog(true)
        return new Promise<boolean>((resolve, _) => {
          setConfirmRef({resolve})
        })
      }

      const handleOpenTimeoutConfirmation = async () => {
        setDisplayTimeoutModal(true)
        let completeObservation = await new Promise<boolean>((resolve, _) => {
          setTimeoutConfirmRef({resolve})
        })
        if (completeObservation) {
          setShowCompeteDialog(true)
          canNavigateRef.current = true
        }
        setTimeoutConfirmRef(null)
        setDisplayTimeoutModal(false)

      }
      const handleTimeoutCancel = () => {
        if (timeoutConfirmRef) {
          timeoutConfirmRef.resolve(false)

        }
      }
      const handleTimeoutConfirm = () => {
        if (timeoutConfirmRef) {
          timeoutConfirmRef.resolve(true)
        }
      }
      const tick = () => {
        let intervalElapsed = intervalRef.current
        if (!displayTimeoutModal && intervalElapsed > TIME_FOR_MODAL) {
          handleOpenTimeoutConfirmation()
        }

        if (intervalElapsed >= TOTAL_TIME) {
          // What we do if the observation totally times out.
          clearInterval(timeoutRef.current!)
          firebase.endSession() // There will always be a sessionID (and therefore the ability to end a session) during an observation.
          canNavigateRef.current = true;
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
      }
      const endSession = async (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ''
        return "Leaving the page will result in losing the current observation."

      }


      // For handling direct navigation, esp  browser's back button. We may want to ONLY handle back button presses and let the
      // Beforeunload event handle direct navigation.
      //adapted from https://stackoverflow.com/questions/66529690/using-history-block-with-asynchronous-functions-callback-async-await
      useEffect(() => {
        const unblock = props.history.block((tx) => {
          // This will bypass the normal blocking if the prompt has already been displayed OR the observation is over
          if (canNavigateRef.current || !firebase.currentObservation) {
            return true
          }
          handleOpenNavConfirmation().then(res => {
            if (res) {
              firebase.discardSession()
              unblock()
              props.history.push(tx.pathname, tx.state)
            }
          })
          return false
        })
        return () => {
          unblock()
        }
      }, [])


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
          <ConfirmationDialog showDialog={displayTimeoutModal}
                              confirmText={options.confirmText ?? 'PLACEHOLDER CONFIRM'}
                              handleCancel={handleTimeoutCancel}
                              handleConfirm={handleTimeoutConfirm}
                              cancelText={options.cancelText ?? "PLACEHOLDER CANCEL"}
                              dialogText={options.confirmationPrompt ?? "PLACEHOLDER PROMPT"}/>
          <ConfirmationDialog handleConfirm={handleLeaveObservation} handleCancel={handleStay}
                              dialogText={'Leaving this page will cancel this observation. Are you sure you want to cancel this observation?'}
                              cancelText={'CONTINUE THE OBSERVATION'}
                              confirmText={'CANCEL THE OBSERVATION'}
                              showDialog={showConfirmDialog}/>
          <WrappedComponent preBack={handleOpenNavConfirmation} forceComplete={showCompleteDialog} {...props} />
        </>
      )
    }
  }
}