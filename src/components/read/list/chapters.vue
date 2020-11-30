<template>
    <div class="chapters">
        <div class="chap_top">
            正文卷
            <span class="target"></span>
        </div>
        <div class="main_box" :style="'height:'+h+'px'">
            <router-link class="box_item" :to="'/text?link='+item.link+'&p='+i" v-for="(item,i) in list" :key="i">
                <span class="chap_name text">{{item.title}}</span>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            h:null,
            list:[],
            link:null,
            max:0
        }
    },
    methods:{
        getInfo(id){
            let data = JSON.parse(window.localStorage.getItem("chapters"))
            // console.log(data);
             this.list = data.slice(0,100)
             this.max = data.length  
        }    
    },
    created(){
        this.offset = parseInt(this.$route.query.offset)||0
        this.getInfo(this.$route.query.id,this.$route.query.offset||0)    
    },
    mounted(){
        this.h = window.screen.availHeight - 170
    }
}
</script>

<style scoped lang="scss">
    .chapters {
        width: 100%;
        position: relative;
        .chap_top {
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            padding-left: 15px;
            box-sizing: border-box;
            color: rgb(121, 120, 120);
        }
        .main_box {
            overflow: auto;
            width: 100%;
            background-color: rgb(243, 243, 243);
            .box_item {
                display: block;
                width: 80%;
                height: 45px;
                margin: 0 auto 10px;
                border-bottom: 1px solid rgb(219, 216, 216);
                 background-color: rgb(243, 243, 243);
                color: #333;
                box-sizing: border-box;
                .chap_name {
                    font-size: 16px;
                    line-height: 28px;
                    display: block;
                    width: 220px;
                    color: #333;
                }
                .update_time {
                    font-style: normal;
                    color: rgb(32, 107, 107);
                }
            }
        }  
    }
</style>