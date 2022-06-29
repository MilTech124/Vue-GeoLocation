import {ref,watchEffect} from 'vue'
import {db} from '../firebase/init'
import {collection,onSnapshot,} from 'firebase/firestore'


    const getCollection =  (c) => {
        const documents = ref()

        let colRef=collection(db,c)   
           
        const unsub = onSnapshot( colRef, snapshot => {
            let results=[]
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id:doc.id})  
            })

            documents.value=results   
                         
          
        })

        watchEffect(async(onInvalidate) => {
            onInvalidate(()=>unsub())
        })

        return documents
    }

    export default getCollection
