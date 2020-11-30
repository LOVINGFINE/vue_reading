<template>
<div class="container">
   <div class="top">
            <div class="top_left">
                <span class="title">Read</span>
            </div>
                <a href="" class="top_more icon-grid_view"></a>
        </div>
        <div class="show_nav">
            <router-link to="/shop/recommend" class="show_navLink" active-class="shop_active">推荐</router-link>
            <router-link to="/class_books" class="show_navLink" active-class="shop_active">分类</router-link>
            <router-link to="/ranking" class="show_navLink" active-class="shop_active">排行</router-link>
            <router-link to="/shop/reclist" class="show_navLink" active-class="shop_active">书单</router-link>
        </div>
         <transition>
                <router-view></router-view>
        </transition>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
           gender:'male'
        }
    },
    methods:{
        getData(gender){
            // console.log(gender);
            let all = [
                this.$axios.get(`https://novel.juhe.im/booklists?gender=${gender}&sort=collectorCount&duration=last-seven-days&start=0`),
                this.$axios.get(`https://novel.juhe.im/booklists?gender=${gender}&sort=created&duration=all`),
                this.$axios.get(`https://novel.juhe.im/booklists?gender=${gender}&sort=collectorCount&duration=all`)
            ]
            this.$axios.all(all).then(this.$axios.spread((a,b,c)=>{
                   let data_m = {hot:a.data,new:b.data,more:c.data}
                //    console.log(data_m);
                   if(gender==='male'){
                       window.localStorage.setItem('booklists_male',JSON.stringify(data_m))
                   }else{
                       window.localStorage.setItem('booklists_female',JSON.stringify(data_m))
                   } 
            }))
            this.$axios.get('https://novel.juhe.im/rank-category').then(res=>{
                console.log(res.data);  
            })
        },
    },
    created(){
        let a = 'male'
        let b = 'female'
        this.getData(a)
        this.getData(b)
    }
}
</script>

<style scoped lang="scss">
.shop_active {
    border-bottom: 3px solid #8a0202;
}

.container {
        width: 100%;
        overflow-x: hidden;
        .top {
            width: 100%;
            height: 60px;
            position: relative;
            .top_left {
                height: 100%;
                
                color: #d1cece;
                font-size: 40px;
                position: relative;
                .title {
                    float: left;
                    color: rgb(163, 13, 13);
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 60px;
                    padding-left: 20px;
                }
                .top_gender {
                    display: block;
                    font-size: 20px;
                    color: #504f4f;
                    position: absolute;
                    top:60%;
                    left: 40%;
                    transform: translate(-50%,-50%);
                }
            }
            .top_more {
                    font-size: 30px;
                    color: rgb(141, 139, 139);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #8a0202;
                    right: 25px;
                }
                 
        }
        .show_nav {
            width: 100%;
            margin-top: 10px;
            height: 50px;
            line-height: 50px;
            display: flex;
            .show_navLink {
                flex: 1;
                font-size: 18px;
                color: #6e6e6e;
                text-align: center;
            }
        }

  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute; 
  }
  .v-enter-active,
  .v-leave-active {
      transition: all .3s linear;
  }
</style>