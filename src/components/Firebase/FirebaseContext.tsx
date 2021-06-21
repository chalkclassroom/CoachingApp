import * as React from "react";
import Firebase from './Firebase'

const FirebaseContext = React.createContext<Firebase>(new Firebase());

export default FirebaseContext;
