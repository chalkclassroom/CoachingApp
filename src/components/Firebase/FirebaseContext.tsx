import * as React from "react";
import Firebase from './Firebase'

const FirebaseContext = React.createContext<null | Firebase>(null);

export default FirebaseContext;
