import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAsync } from "react-async"
import { newApolloClient } from 'lib/apollo/newApolloClient'
import { FortmaticContext } from 'lib/context/FortmaticContext'

export default function ApolloWrapper({ children }) {
  let result = null

  let fortmatic = useContext(FortmaticContext)
  const { data, error, isPending } = useAsync({ promiseFn: newApolloClient, fortmatic })

  if (data) {
    result = (
      <ApolloProvider client={data}>
        {children}
      </ApolloProvider>
    )
  } else if (error) {
    console.error(error)
    result = <span>Error: {error.message}</span>
  } else if (isPending) {
    result = <span>Loading...</span>
  }

  return result
}