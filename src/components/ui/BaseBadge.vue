<template>
  <strong>
    <span class="badge" :class="['badge--' + mode, {nml: noMarginLeft}]">
    <slot></slot>
  </span>
  </strong>
</template>

<script>
export default {
  props: ['mode', 'noMarginLeft']
}
</script>
<style scoped>
  strong {
  position: relative;
  
  }
.badge {
  display: inline-block;
  padding: 0.1rem .1rem;
  background-color: #ccc;
  color: #292929;
  /* margin: 0 0.75rem; */
  border-radius: 10px;
  top: px;
  left:10px ;
}

.nml {
  margin-left: 0;
}

.badge--highlight {
  background-color: #f0b800;
  color: black;
  padding: .2rem;
}
.badge--elegant-cart {
  display: inline-block;
  background-color: #45006d;
  color: white;
  display: inline-block;
}
.badge--elegant {
  background-color: #ce0101;
  color: white;
  position: absolute;
  width:20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  padding: 0.1rem .2rem;
  font-size: 12px;
  bottom:10px;
  left: -5px;
}

</style>