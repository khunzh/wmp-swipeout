
Component({
   relations:{
     './swipeoutItem': {
       type: 'child', // 关联的目标节点应为子节点
     }
   },
   methods:{
     getChildren(){
       return this.getRelationNodes('./swipeoutItem');
     }
   }
})
