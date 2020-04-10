<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-real-img="realSrc" style="position: relative; background: gray;">
     <img alt="img" src="../assets/NotFound.png">
      <p style="background: red; position: absolute; left: 0; top: 0;">图片不存在</p>
    </div>
    <ul><li v-for="x in list" :key="x.id">{{x.id}}</li></ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
    realSrc: 'ttps://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1028330117,1016034217&fm=15&gp=0.jpg'
    }	
 },
 methods: {
   add() {
     let list = this.list;
     list.forEach((data, index) => {
       if (index === 1) {
         this.$set(data, 'id', 333);
       }
     })
   },
 },
  props: {
    msg: String
  },
  mounted() {
    console.log(this.root_data);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.real-src p {
  display: none;
}
</style>
