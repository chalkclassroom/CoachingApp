import React, {Reducer, useContext, useEffect, useReducer, useRef, useState} from 'react'
import {FirebaseContext} from "../Firebase";
import ConfirmationDialog from "../Shared/ConfirmationDialog";
import {Alert} from "@material-ui/lab";


interface Options {
 totalTime: number
  modalTime: number
  confirmationPrompt: string
  confirmText: string
  cancelText: string
}

interface CompletionOptions {
  forceComplete: boolean
  showLiteracyActivity: boolean
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

      const intervalRef = useRef(0)
      const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>()
      const canNavigateRef = useRef(false)

      const firebase = useContext(FirebaseContext)

      // written to get around non-batched state updates in async calls (like a timeout) https://github.com/facebook/react/issues/14259
      const [completionOptions, setCompletionOptions] = useReducer<Reducer<CompletionOptions, Partial<CompletionOptions>>>(
                (state, newState) => ({...state, ...newState}),
        {forceComplete: false, showLiteracyActivity: true})

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
          setCompletionOptions({forceComplete: true})
          canNavigateRef.current = true
          clearInterval(timeoutRef.current!)
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
          clearInterval(timeoutRef.current!)
          canNavigateRef.current = true;
          setCompletionOptions({showLiteracyActivity: false, forceComplete: true})
        }
        intervalRef.current = intervalElapsed + 1
      }

      const getTimeout = () => {
        let time = setInterval(tick, 1000)
        timeoutRef.current = time
        return time
      }


      const resetTimeout = () => {
        if(!completionOptions.forceComplete) {
          clearInterval(timeoutRef.current!)
          intervalRef.current = 0
          getTimeout()
        }
      }

      // Still messing with this. I don't know think we can do any branching based on what a user chooses here.
      const endSession = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ''
        return "Leaving the page will result in losing the current observation."

      }


      // For handling direct navigation, esp  browser's back button. We may want to ONLY handle back button presses and let the
      // Beforeunload event handle direct navigation.
      //adapted from https://stackoverflow.com/questions/66529690/using-history-block-with-asynchronous-functions-callback-async-await
      useEffect(() => {
        const unblock = props.history.block((tx:{pathname: string, state: any}) => {
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


      let {forceComplete, showLiteracyActivity} = completionOptions
      let timedOut = forceComplete && !showLiteracyActivity
      return (
        <>
          {timedOut ?
            <Alert style={{
              zIndex: 4000,
              fontSize: '1.3rem',
              position: "absolute",
              width: '100%',
              backgroundColor: 'white',
              color: "black"
            }} severity={'info'}>Note: This observation was closed automatically due to inactivity</Alert>
            :null}
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
          <WrappedComponent preBack={handleOpenNavConfirmation}
                            showLiteracyActivity={showLiteracyActivity}
                            forceComplete={forceComplete}
                            {...props} />
        </>
      )
    }
  }
}