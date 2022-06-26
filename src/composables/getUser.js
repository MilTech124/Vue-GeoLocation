import { ref } from "@vue/reactivity";
import { auth } from "../firebase/init";
import { onAuthStateChanged } from "@firebase/auth";




const user=ref(auth.currentUser)

onAuthStateChanged(auth,(_user)=>{
    console.log("user state change:",_user);
user.value=_user
})

const getUser= () =>{
    
    return {user}
}
export default getUser