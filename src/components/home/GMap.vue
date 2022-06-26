<template>
  <div class="map">
   <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import {db} from '@/firebase/init'
import { auth } from "@/firebase/init";
import getUser from '@/composables/getUser'
import {doc, updateDoc,query,where, collection, getDocs} from'firebase/firestore'
export default {
name:'GMap',
data(){

    return{
        lat:53,
        lng:-2,        
    }
}
,
methods:{
    renderMap(){
        const map= new google.maps.Map(document.getElementById('map'),{
            center:{lat:this.lat, lng:this.lng},
            zoom:10,
            maxZoom:15,
            minZoom:3,
            streetViewControl:false
        })
    },
  async updateCords(lat,lng){
               const {user} =getUser()              
          const q= query(collection(db,'users'),where('user_id','==', user.value.uid))
        const querySnapshot =await getDocs(q)
        querySnapshot.forEach((docR)=>{
            const docRef= doc(db,'users',docR.id)          
                 updateDoc(docRef,{
                    geolocation:{
                        lat:lat,
                        lng:lng
                    }
                    

                })
        })
    }
},
 mounted(){

   
 
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
        this.lat=pos.coords.latitude
        this.lng=pos.coords.longitude

      
        this.updateCords(this.lat,this.lng)
     
        this.renderMap()
        },(err)=>{console.log(err)
        this.renderMap()},
        {maximumAge:60000,timeout:3000}
                
        )
    }else{
        this.renderMap()
    }   
}
}
</script>

<style>
.google-map{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>