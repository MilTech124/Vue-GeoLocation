<template>
<div class="signup container">
    <form @submit.prevent="signup"  class="card-panel">
        <h2 class="center deep-purple-text">Signup</h2>
        <div class="field">
            <label for="email">Email:</label>
            <input type="email" name="email" v-model="email">
        </div>
          <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password " v-model="password">
        </div>
          <div class="field">
            <label for="alias">Alias::</label>
            <input type="text" name="alias" v v-model="alias">
        </div>
        <p class="red-text center" v-if="feedback"> {{ feedback }} </p>
        <div class="field center">
            <button class="btn deep-purple">Signup</button>
        </div>
    </form>
</div>
  
</template>

<script>
import slugify from 'slugify'
import {db,auth} from '@/firebase/init.js'
import { getFirestore,doc, getDoc,setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "@firebase/auth";
export default {
    name:'Signup',
    data(){
        
        return{
            email:null,
            password:null,
            alias:null,
            feedback:null,
            slug:null

        }
    },
    methods:{
       async signup(){
            if(this.alias && this.email && this.password){
                this.slug=slugify(this.alias,{
                    replacement:'-',
                    remove: /[$*-_~.()'"!\-:@]/g,
                    lower:true
                })
                const docRef= doc(db,'users',this.slug)
                const docSnap=await getDoc(docRef)

                if(docSnap.exists()){
                    this.feedback='this alias exist'
                }else{
                    const res = await createUserWithEmailAndPassword(auth,this.email,this.password).catch(err=>this.feedback=err.message)
                     const docRef=doc(db,"users",this.slug)
        
        
        await setDoc(docRef,{
            alias:this.alias,
            geolocation:null,
            user_id:res.user.uid,
          
        }).then(()=>{
            this.$router.push({name:'GMap'})
        })

                    this.feedback='this alias is free to use'
                }
            }else{
                this.feedback="You must write something"
            }
        }
    }

}
</script>

<style>

.signup{
    max-width: 400px;
    margin-top: 60px;
}
.signup h2{
    font-size: 2.4em;
}
.signup .field {
    margin-bottom: 16px;
}

</style>