<template>
  <van-popup v-model="visible" position="bottom" :overlay="true">
    <van-picker :columns="Category" @change="onChange" value-key="Category"  @confirm="onConfirm" @cancel="clear" show-toolbar/>
  </van-popup>
</template>

<script>
import {getArea} from "@/api/api.js"

export default {
  props: {
    confirm: Function,
    value: String
  },
  data() {
    return {
      Category:[],
      visible: false,
      dataArr:[],
      idList:[]
    };
  },
  mounted() {
    getArea().then((res)=>{
      this.dataArr=res.data.data;
      let itemArr = [];
      let itemArrId = [];
      let itemArrsId = [];
      this.dataArr.map(item=>{
        itemArr.push(item.label)
        itemArrId.push(item.value)
      })
      this.Category=[
        {
          values: itemArr,
          className: 'column1',
        },
        {
          values: this.dataArr[0].children.map(item=>item.label),
          className: 'column2',
        }
      ]
    })
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    onConfirm(list,index) {
      this.idList = [this.dataArr[index[0]].value,this.dataArr[index[0]].children[index[1]].value,]
      this.$emit("confirm",list,this.idList);
      this.hide();
    },
    clear() {
      this.$emit("confirm", "");
      this.hide();
    },
    onChange(picker, values, index) {
      this.dataArr.map((i,v)=>{
         if(i.label == values[0]){
          let newarr = i.children.map(item=>item.label)
            picker.setColumnValues(1, newarr)
         }
        })
      }
  }
};
</script>
