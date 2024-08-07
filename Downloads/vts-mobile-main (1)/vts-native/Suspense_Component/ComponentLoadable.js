import React from 'react';
import { Suspense } from 'react';
import ComponentLoader from './ComponentLoader';


const ComponentLoadable = (Component) => (props) => {
  return (
    <Suspense fallback={<ComponentLoader />}>
      <Component {...props} />
    </Suspense>
  )
}

export default ComponentLoadable