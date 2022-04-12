import React, {useEffect} from 'react'


export default (WrappedComponent: React.Component) => {
  const hocComponent = ({...props}) => {

    useEffect(() => {
      const getNewInactiveTimeout = () => window.setTimeout(() => {
        console.log('TIMEOUT HOC')}, 5000)

      let timeoutId = getNewInactiveTimeout()

      const resetTimeout = () => {
        console.log('clearing:', timeoutId)
        clearTimeout(timeoutId)
        timeoutId = getNewInactiveTimeout()
        console.log('New Id:', timeoutId)
      }

      window.addEventListener('click', resetTimeout)

      return () => {
        window.removeEventListener('click', resetTimeout)
        console.log('clearing:', timeoutId)
        clearTimeout(timeoutId)
      }
    });


    return  (
      <WrappedComponent {...props} />
    )
  }

  return hocComponent
}