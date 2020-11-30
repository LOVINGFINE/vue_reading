<template>
    <div class="rank">
        <div class="rank_top">
            <router-link class="rank_back icon-chevron-thin-left" to="/shop"></router-link>
        </div>
        <div class="main_rank" :style="'height:'+(this.$store.state.height-45)+'px'">
            <div class="rank_nav" :style="'height:'+(this.$store.state.height-45)+'px'">
              <div 
              :class="{'nav_item':true,'nav_active':id==item._id}"
              v-for="item in nav_list"
              :key="item._id"
              @touchend="setData(item)">
                    {{item.shortTitle}}
              </div>
            </div>
            <div class="loading_img">
               
            </div>
            <transition
            enter-active-class="zoomIn"
            leave-active-class="rollOut">
            <div class="rank_body animated"  
            v-show="box_show" 
            :style="'height:'+(this.$store.state.height-75)+'px'">
                <h3 class="rank_show_title">
                    <span class="rank_icon icon-bar-chart-o"></span>
                    {{title}}
                    <i class="update"></i>
                </h3>
                <router-link 
                :to="'/book_detail?id='+item._id"
                tag="div" 
                class="ranking_item"
                v-for="(item,i) in books"
                :key="i">
                <img :src="'http://statics.zhuishushenqi.com'+item.cover" class="ranking_img">
                <p class="book_name">{{i+1}}.{{item.title}}</p>
                <div class="book_message">
                   {{item.author}} · {{item.majorCate}} · {{item.minorCate}}
                </div>
                </router-link>
            </div>                 
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            nav_list:[],
            box_show:true,
            id:'',
            title:'',
            updated:'',
            books:[]
        }
    },
    
    methods:{
        getInfo(tag){
            this.nav_list = JSON.parse(window.localStorage.getItem('ranking')).male
            this.setData(JSON.parse(window.localStorage.getItem('ranking')).male[0])
        },
        setData(item){
            this.box_show = false
            this.id = item._id
            this.title = item.shortTitle
            
            this.$axios.get(`https://novel.juhe.im/rank/${item._id}`).then(res=>{
                console.log(res.data);
                this.books = res.data.ranking.books
                this.updated = res.data.ranking.updated
                this.box_show = true
            })
        }
    },
    filters:{
        opDate:function(updated){
            let arr = updated.split(/[T\:\-]/g)
            return `${arr[0]}年${arr[1]}月${arr[2]}日${arr[3]}:${arr[4]}`
        }
    },
    created(){
        this.$store.state.flog = false
        let tag = parseInt(this.$route.query.tag)||0
        this.getInfo(tag)
    },
    mounted(){

    }
}
</script>

<style scoped lang="scss">

.rank {
    width: 100%;
    .rank_top {
        width: 100%;
        height: 45px;
        padding: 0 15px;
        position: fixed;
        top: 0;
        background-color: #fff;
        box-sizing: border-box;
        z-index: 3000;
        border-bottom: 1px solid rgb(199, 199, 199);
        .rank_back {
            color: rgb(155, 2, 2);
            font-size: 20px;
            line-height: 45px;
        }
    }
    .main_rank {
        width: 100%;
        overflow: hidden;
        margin-top: 45px;
        box-sizing: border-box;
        position: relative;
        .loading_img {
            position: fixed;
        }
        .rank_nav {
            width: 60px;
            background-color: rgb(240, 240, 240);
            overflow: auto;           
            .nav_item {
                width: 100%;
                height: 38px;
                text-align: center;
                line-height: 38px;
                color: rgb(85, 85, 85);
                box-sizing: border-box;

            }
            .nav_active {
                background-color: #fff;
                color: rgb(129, 1, 1);
                border-left: 2px solid rgb(146, 2, 2);
                transition: all 0.3 linear;
            }
        }
        .rank_body {
            width: 85%;
            position: absolute;
            right: 0;
            top: 0;
            overflow: auto;
            .rank_show_title {
                width: 90%;
                padding-left: 30px;
                margin: 0 auto 15px;
                box-sizing: border-box;
                line-height: 35px;
                font-size: 16px;
                font-weight: 400;
                color: #333;
                position: relative;
                border-bottom: 1px solid rgb(195, 195, 195);
                .rank_icon {
                    color: rgb(116, 2, 2);
                    font-size: 18px;
                    position: absolute;
                    top: 50%;
                    font-weight: normal;
                    transform: translateY(-50%);
                    left: 0;
                }
                .update {
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    color: rgb(19, 19, 19);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 5px;
                }
            }
            .ranking_item {
                width: 90%;
                height: 65px;
                box-sizing: border-box;
                margin: 8px auto;
                position: relative;
                .ranking_img {
                    height: 49px;
                    margin-right: 10px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .book_name {
                    width: 80%;
                    margin-left: 20%;
                    height: 50%;
                    line-height: 35px;
                }
                .book_message {
                    height: 50%;
                    width: 80%;
                    margin-left: 20%;
                    line-height: 32px;
                    font-size: 13px;
                    color: #333;
                    border-bottom: 1px solid rgb(226, 226, 226);
                }
            }
        }
    }
}

</style>