<template>
    <div>
    </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


export default ({
   mounted() {
  Vue.axios.get('http://dummy.restapiexample.com/api/v1/employees').then((response) => {
  console.log(response.data)
})

   },
})

</script>
